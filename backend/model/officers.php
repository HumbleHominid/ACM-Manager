<?php
include('dbStartup.php');
class Officers{
  function getOfficers($userId){
    include('dbStartup.php');
    include('members.php');

    $members = new Members;

    $data = array(
      'user' => '', // Need to create login method.
      'president' => getOfficer('President'),
      'vicePresident' => getOfficer('Vice President'),
      'secretary' => getOfficer('Secretary'),
      'treasurer' => getOfficer('Treasurer')
    ); 


    return $data;
  }

  function getOfficer($position){
      include('dbStartup.php');
      
      include('members.php');
      $members = new Members;

      $query = "SELECT user_type_id FROM User_Type
                WHERE description = '$position'";
      $statement = $db->prepare($query);
      $statement->execute();
      $results = $statement->fetchAll(PDO::FETCH_ASSOC);
      $statement->closeCursor();
      
      if(count($results) == 1){
        $offQuery = "SELECT user_id FROM Users 
          WHERE user_type = $results[0]['user_type_id'] LIMIT 1";
      $offStatement = $db->prepare($offQuery);
      $offStatement->execute();
      $offResults = $offStatement->fetchAll(PDO::FETCH_ASSOC);
      $offStatement->closeCursor();
      
      if(count($offResults) == 1){
        return $members->getMember($offResults[0]['user_id']);
      }else{
        return FALSE;
      }

      }else{
        return FALSE;
      }

  }

}

  }

?>
