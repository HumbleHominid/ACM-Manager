<?php
class Officers{

  private $login = NULL;
  private $members = NULL;
  private $conn = NULL;

  function Officers($login, $members){

    $this->conn = new DbConn;
    $this->login = $login;
    $this->members = $members;
  }

  function getOfficers(){

    $data = array(
      'president' => $this->getOfficer('President'),
      'vicePresident' => $this->getOfficer('Vice President'),
      'secretary' => $this->getOfficer('Secretary'),
      'treasurer' => $this->getOfficer('Treasurer'),
      'advisor' => $this->getOfficer('Advisor')
    );


    return $data;
  }

  function getOfficer($position){
    $query = "SELECT user_type_id FROM User_Type
    WHERE description = ?";
    $results = $this->conn->select($query, [$position]);

    if(count($results) == 1){
      $typeId = $results[0]['user_type_id'];
      $offQuery = "SELECT user_id FROM Users
      WHERE user_type = ? LIMIT 1";
      $offResults = $this->conn->select($offQuery, [$typeId]);

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
