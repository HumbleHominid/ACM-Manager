<?php

class Announcements{

  private $conn = NULL;
  private $autoLeadDays = 3;
  private $endpoint = 'Announcements';
  private $members = NULL;
  private $metadata = NULL;
  private $events = NULL;

  function Announcements($members, $events){
    $this->conn = new DbConn();
    $this->members = $members;
    $this->events = $events;
    require_once('metadata.php');
    $this->metadata = new Metadata();


  }
  
  private function getAnnouncement($anno_id){
    $result = $this->conn->select('SELECT * FROM Announcements WHERE anno_id = ?;', [$anno_id]);  
    if(!empty($result)){
      $anno = $result[0];
      $anno['creator'] = $this->members->getMember($anno['creator_id']);
      unset($anno['creator_id']);
      return $anno;
    }else{
      return NULL;
    }
  }

  function getPastAnnouncements($user_type_id){
    $pastAnnos = array();
    $ids = $this->getAnnouncementsByRelTime('<','<', $user_type_id);
    foreach($ids as $id){
      array_push($pastAnnos, $this->getAnnouncement($id['anno_id']));
    } 
    return ['pastAnnos'=>$pastAnnos];
  }

  function getCurrentAnnouncements($user_type_id){
    $currentAnnos = array();
    $ids = $this->getAnnouncementsByRelTime('<=','>=', $user_type_id);
    foreach($ids as $id){
      array_push($currentAnnos, $this->getAnnouncement($id['anno_id']));
    } 
    return ['currentAnnos'=>$currentAnnos];  
  }

  function getFutureAnnouncements($user_type_id){
    $futureAnnos = array();
    $ids = $this->getAnnouncementsByRelTime('>','>', $user_type_id);
    foreach($ids as $id){
      array_push($futureAnnos, $this->getAnnouncement($id['anno_id']));
    } 
    return ['futureAnnos'=>$futureAnnos];
  }

  function getAnnouncementsByRelTime($startComparisonOp, $endComparisonOp, $user_type_id){
    $query = 'SELECT anno_id FROM Announcements WHERE startTime' 
      . $startComparisonOp . 'NOW() AND endTime' . $endComparisonOp . 'NOW() AND ? >= user_type;';
    return $this->conn->select($query, [$user_type_id]); 
  }
  
  function getAutomaticAnnouncments($user_type_id){ 
    return ['autoAnnos'=>$this->events->getEventsInDateRange($user_type_id, $this->autoLeadDays, 0)];
  }
  
  function updateAnnouncement($data){
    $query = 'UPDATE Announcements SET message = ?, startTime = ?, 
        endTime = ?, user_type = ?, creator_id = ? WHERE anno_id = ?';
    $updateData = $this->pushAnnouncementDataToArray($data);
    array_push($updateData, $data['anno_id']);
    $this->conn->modify($query, $updateData);
    $this->metadata->updateMetadata($this->endpoint); 
    return ['annoData'=>$this->getAnnouncement($data['anno_id'])];
  }
  
  function addAnnouncement($data){
    $query = 'INSERT INTO Announcements(message, startTime, endTime, user_type, creator_id) 
      VALUES(?,?,?,?,?)';  
    $insertData = $this->pushAnnouncementDataToArray($data);
    $this->conn->modify($query, $insertData);
    $this->metadata->updateMetadata($this->endpoint); 
    $anno_id = $this->conn->lastInsertId(); 
    return ['annoData'=>$this->getAnnouncement($anno_id)];
  }

  private function pushAnnouncementDataToArray($data){
    $annoData = array();
    array_push($annoData, $data['message']);
    array_push($annoData, $data['startTime']);
    array_push($annoData, $data['endTime']);
    array_push($annoData, $data['user_type']);
    array_push($annoData, $data['creator_id']);
    return $annoData;
  }

  function deleteAnnouncement($anno_id){
    $query = 'DELETE FROM Announcements WHERE anno_id = ?;';
    $result = $this->conn->modify($query, [$anno_id]);
    $this->metadata->updateMetadata($this->endpoint); 
    return ['status'=>$result];
  }

  function getAnnouncementsBar($user_type_id){
    $results = array();
    $results += $this->getCurrentAnnouncements($user_type_id);
    $results += $this->getAutomaticAnnouncments($user_type_id);
    return $results; 
  }
}

?>
