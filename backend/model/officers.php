<?php
include('dbStartup.php');
class Officers{
  
  private $login = NULL;
  private $members = NULL;

  function Officers($login, $members){
    $this->login = $login;
    $this->members = $members;
  }
  
  function getOfficers(){
    include('dbStartup.php');
    $data = array(
      'president' => $this->getOfficer('President'),
      'vicePresident' => $this->getOfficer('Vice President'),
      'secretary' => $this->getOfficer('Secretary'),
      'treasurer' => $this->getOfficer('Treasurer')
    ); 


    return $data;
  }

  function getOfficer($position){
      include('dbStartup.php'); 

      $query = "SELECT user_type_id FROM User_Type
                WHERE description = '$position'";
      $statement = $db->prepare($query);
      $statement->execute();
      $results = $statement->fetchAll(PDO::FETCH_ASSOC);
      $statement->closeCursor();
      
      if(count($results) == 1){
        $typeId = $results[0]['user_type_id'];
        $offQuery = "SELECT user_id FROM Users 
          WHERE user_type = $typeId LIMIT 1";
      $offStatement = $db->prepare($offQuery);
      $offStatement->execute();
      $offResults = $offStatement->fetchAll(PDO::FETCH_ASSOC);
      $offStatement->closeCursor();
      
      if(count($offResults) == 1){
        return $this->members->getMember($offResults[0]['user_id']);
      }else{
        return FALSE;
      }

      }else{
        return FALSE;
      }

  }

}

?>
