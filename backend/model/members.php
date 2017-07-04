<?php
include('dbStartup.php');
class Members{

   function getMember($userId){
      include('dbStartup.php');
      $query = "SELECT * FROM Users
      WHERE user_id = $userId";
      $statement = $db->prepare($query);
      $statement->execute();
      $results = $statement->fetchAll(PDO::FETCH_ASSOC);
      $statement->closeCursor();


      $typeId = $results[0]['user_type'];
      $userType = "SELECT * FROM User_Type WHERE user_type_id = :typeId";
      $statement = $db->prepare($userType);
      $statement->bindValue(':typeId', $typeId);
      $statement->execute();
      $typeResults = $statement->fetchAll(PDO::FETCH_ASSOC);
      $statement->closeCursor();


      if(count($results)){
         $data = array(
            'user_id' => $results[0]['user_id'],
            'fName'=> $results[0]['fName'],
            'lName'=> $results[0]['lName'],
            'email'=> $results[0]['email'],
            'user_type' => array(
               'user_type_id' => $typeId,
               'name' => $typeResults[0]['name'],
               'description' => $typeResults[0]['description']
            )
         );
         return $data;
      }else{
         return false;
      }
   }

   function listMembers(){
      include('dbStartup.php');
      $query = "SELECT * FROM Users
      ORDER BY lName, fName";
      $statement = $db->prepare($query);
      $statement->execute();
      $results = $statement->fetchAll(PDO::FETCH_ASSOC);
      $statement->closeCursor();

      $members = array();
      foreach($results as $result){
         array_push($members, $this->getMember($result['user_id']));
      }

      return array("memberList" => $members);

   }
}

?>
