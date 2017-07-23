<?php

class Metadata{

  private $conn = NULL;

  function Metadata(){
    $this->conn = new DbConn();
  }

  function getMetadata($endpoint){
    $query = "SELECT * FROM Metadata WHERE endpoint = ?";
    $result = $this->conn->select($query, [$endpoint]);  
    return array('metadata' => array('updateTime' => $result[0]['updateTime']));
  }

  function updateMetadata($endpoint){
    $query = "UPDATE Metadata SET updateTime = NOW() WHERE endpoint = ?";
    $this->conn->select($query, [$endpoint]);
  }

}

?>
