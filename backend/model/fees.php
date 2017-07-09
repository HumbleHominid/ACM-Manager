<?php

class Fees{

   private $login = NULL;
   private $members = NULL;
    private $conn = NULL;

   function Fees($login, $members){

      $this->conn = new DbConn(); 
      $this->login = $login;
      $this->members = $members;
   }

   function listFeeTypes(){
     
      $query = 'SELECT fee_type_id FROM Fee_Type';
      $results = $this->conn->select($query);

      $types = array();

      foreach($results as $result){
         array_push($types, $this->getFeeType($result['fee_type_id']));
      }
      return $types;
   }

   function getFeeType($fee_type_id){

      $query = 'SELECT * FROM Fee_Type
      WHERE fee_type_id = ?;';
      $results = $this->conn->select($query, [$fee_type_id]);
     
      if(count($results) === 1){
         $feeType = array(
            "fee_type_id" => $results[0]['fee_type_id'],
            "name" => $results[0]['name'],
            "description" => $results[0]['description']
         );

         return $feeType;
      }else {
         return FALSE;
      }
   }

    function getFee($fee_id){
        $query = 'SELECT * FROM Fees
           WHERE fee_id = ?;';
        $results = $this->conn->select($query, [$fee_id]);

        if(count($results) === 1){
            $fee = array(
            "fee_id" => $results[0]['fee_id'],
            "name" => $results[0]['name'],
            "description" => $results[0]['description'],
            "dueDate" => $results[0]['dueDate'],
            "fee" => $results[0]['fee'],
            "feeType" => $this->getFeeType($results[0]['fee_type_id'])
         );
         return $fee;
      }else {
         return FALSE;
      }
   }

   function getMemberFees($user_id){
         return $this->feeOutput($this->memberFees($user_id));
   }

   function memberFees($user_id){
      if($this->login->getType() > 1
      || $this->login->getUserID() === $user_id){
         $unpaidQuery = 'SELECT * FROM Debtor_Fees
         WHERE debtor_id = ? AND paid = 0;';
         $unpaidResults = $this->conn->select($unpaidQuery, [$user_id]);
      

         $paidQuery = 'SELECT * FROM Debtor_Fees
         WHERE debtor_id = ? AND paid = 1;'; 
         $paidResults = $this->conn->select($paidQuery, [$user_id]);

         $unpaidFees = array();
         foreach($unpaidResults as $result){
            $fee = array();
            $fee['fee'] = $this->getFee($result['fee_id']);
            $fee['additionalInfo'] = $result['additionalInfo'];
            $fee['paid'] = FALSE;
            array_push($unpaidFees, $fee);
         }
         $paidFees = array();
         foreach($paidResults as $result){
            $fee = array();
            $fee['fee'] = $this->getFee($result['fee_id']);
            $fee['additionalInfo'] = $result['additionalInfo'];
            $fee['paid'] = TRUE;
            array_push($paidFees, $fee);
         }

         $fees['unpaid'] = $unpaidFees;
         $fees['paid'] = $paidFees;

         return array("user"=>$this->members->getMember($user_id), "fees" => $fees);
      }else{
         return FALSE;
      }
   }

   function getAllFees(){
     
      $query = 'SELECT DISTINCT debtor_id FROM Debtor_Fees;';
        $results = $this->conn->select($query);

      $debtors = array();
      foreach($results as $result){
         array_push($debtors, $this->memberFees($result['debtor_id']));
      }
      return $this->feeOutput($debtors);
   }

   function feeOutput($fees){
      return array("debtors" => $fees, "feeTypes" => $this->listFeeTypes());
   }


}

?>
