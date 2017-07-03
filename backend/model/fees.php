<?php
include('dbStartup.php');
class Fees{

   private $login = NULL;
   private $members = NULL;

   function Fees($login, $members){
      $this->login = $login;
      $this->members = $members;
   }

   function listFeeTypes(){
      include('dbStartup.php');
      $query = 'SELECT fee_type_id FROM Fee_Type';
      $statement = $db->prepare($query);
      $statement->execute();
      $results = $statement->fetchAll(PDO::FETCH_ASSOC);
      $statement->closeCursor();

      $types = array();

      foreach($results as $result){
         array_push($types, $this->getFeeType($result['fee_type_id']));
      }
      return $types;
   }

   function getFeeType($fee_type_id){
      include('dbStartup.php');
      $query = 'SELECT * FROM Fee_Type
      WHERE fee_type_id = :id;';
      $statement = $db->prepare($query);
      $statement->bindValue(':id', $fee_type_id);
      $statement->execute();
      $results = $statement->fetchAll(PDO::FETCH_ASSOC);
      $statement->closeCursor();

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
      include('dbStartup.php');
      $query = 'SELECT * FROM Fees
      WHERE fee_id = :id;';
      $statement = $db->prepare($query);
      $statement->bindValue(':id', $fee_id);
      $statement->execute();
      $results = $statement->fetchAll(PDO::FETCH_ASSOC);
      $statement->closeCursor();

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
      include('dbStartup.php');
      if($this->login->getType() > 1
      || $this->login->getUserID() === $user_id){
         $unpaidQuery = 'SELECT * FROM Debtor_Fees
         WHERE debtor_id = :id AND paid = 0;';
         $statement = $db->prepare($unpaidQuery);
         $statement->bindValue(':id', $user_id);
         $statement->execute();
         $unpaidResults = $statement->fetchAll(PDO::FETCH_ASSOC);
         $statement->closeCursor();

         $paidQuery = 'SELECT * FROM Debtor_Fees
         WHERE debtor_id = :id AND paid = 1;';
         $statement = $db->prepare($paidQuery);
         $statement->bindValue(':id', $user_id);
         $statement->execute();
         $paidResults = $statement->fetchAll(PDO::FETCH_ASSOC);
         $statement->closeCursor();

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
      include('dbStartup.php');
      $query = 'SELECT DISTINCT debtor_id FROM Debtor_Fees;';
      $statement = $db->prepare($query);
      $statement->execute();
      $results = $statement->fetchAll(PDO::FETCH_ASSOC);
      $statement->closeCursor();

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
