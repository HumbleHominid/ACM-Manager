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

      if(count($results)){
        $data = array(
          'fName'=> $results[0]['fName'],
          'lName'=> $results[0]['lName'],
          'email'=> $results[0]['email'],
          'user_type' => array(
            'user_type_id' => $typeId,
            'name' => $typeResults['name'],
            'description' => $typeResults['description']
          )
        );
        return $data;
      }else{
        return false;
      }
    }

  }

?>
