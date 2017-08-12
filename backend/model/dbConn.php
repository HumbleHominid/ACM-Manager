<?php

class DbConn{

  private $db = NULL;

  function DbConn(){
    include('dbStartup.php');
    $this->db = $db;
  }
  
  private function setupQuery($query, $bindValues = NULL){
    $statement = $this->db->prepare($query);
    for($i = 0; $i < count($bindValues); $i++){
      $statement->bindValue($i+1, $bindValues[$i]);
    } 
    return $statement;
  }

  function select($query, $bindValues = NULL){ 
    $statement = $this->setupQuery($query, $bindValues);
    $statement->execute();
    $results = $statement->fetchAll(PDO::FETCH_ASSOC);
    $statement->closeCursor();
    return $results;
  }

  function modify($query, $bindValues = NULL){
    $statement = $this->setupQuery($query, $bindValues);    
    return $statement->execute();
  }

  function lastInsertId(){
    return $this->db->lastInsertId();
  }
}

?>
