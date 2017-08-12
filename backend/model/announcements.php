<?php

class Announcements{

  private $conn = NULL;
  private $autoLeadDays = 3;
  private $endpoint = 'Announcements';
  private $members = NULL;

  function Announcements($members){
    $this->conn = new DbConn();
    $this->members = $members;
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
    $autoAnnos = array();
    $query = "SELECT * FROM Events WHERE eventTime <= NOW() + INTERVAL $this->autoLeadDays DAY AND NOW() < eventTime;";
    $events = $this->conn->select($query);
    /*foreach($ids as $id){
      array_push($autoAnnos, $getAnnouncement($id));
    } */
    return ['autoAnnos'=>$autoAnnos];

  }
  
  function updateAnnouncement($data){
    $this->conn->modify('UPDATE Announcements)');         
  }
  
  function addAnnouncement($data){
  
  }

  function deleteAnnouncement($anno_id){
  
  }

  function getAnnouncementsBar($user_type_id){
    $results = array();
    $results += $this->getCurrentAnnouncements($user_type_id);
    $results += $this->getAutomaticAnnouncments($user_type_id);
    return $results; 
  }
}

?>
