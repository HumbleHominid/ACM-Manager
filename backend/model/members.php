<?php
class Members{
  private $conn = NULL;
  function Members(){
    $this->conn = new DbConn();
  }

  function getMember($userId){
    $query = "SELECT * FROM Users
    WHERE user_id = ?";
    $results = $this->conn->select($query, [$userId]);

    $typeId = $results[0]['user_type'];
    $userType = "SELECT * FROM User_Type WHERE user_type_id = ?";
    $typeResults = $this->conn->select($userType, [$typeId]);

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

    $query = "SELECT * FROM Users
    ORDER BY lName, fName";
    $results = $this->conn->select($query);

    $members = array();
    foreach($results as $result){
      array_push($members, $this->getMember($result['user_id']));
    }
    return array("memberList" => $members);

  }
  
  //recalculatePoints
}
?>
