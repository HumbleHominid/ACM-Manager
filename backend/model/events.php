<?php
class Events{

  private $login = NULL;
  private $members = NULL;
  private $files = NULL;
  private $conn = NULL;

  function Events($login, $members){
    $this->conn = new DbConn(); 
    $this->login = $login;
    $this->members = $members;
    include('files.php');
    $this->files = new Files($this->login, $this->members);
  }

  function listAll(){

    //Get past
    $pastQuery = 'SELECT event_id FROM Events
      WHERE eventTime < NOW()
      ORDER BY eventTime;'; 
    $pastResults = $this->conn->select($pastQuery);


    //Get future
    $futureQuery = 'SELECT event_id FROM Events
      WHERE eventTime > NOW()
      ORDER BY eventTime;'; 
    $futureResults = $this->conn->select($futureQuery);


    $pastArr = array();
    foreach($pastResults as $result){
      array_push($pastArr, $this->getEvent($result['event_id']));
    }
    $futureArr = array();
    foreach($futureResults as $result){
      array_push($futureArr, $this->getEvent($result['event_id']));
    }

    return array("eventData" => array("past"=>$pastArr, "future"=>$futureArr),
      "eventTypes" => $this->listEventTypes());
  }

  function getEvent($eventID){


    $query = 'SELECT * FROM Events
      WHERE event_id = ?;';
    $results = $this->conn->select($query, [$eventID]); 

    if(count($results) === 1){
      $event = array(
        "event_id" => $results[0]['event_id'],
        "coordinator" => $this->members->getMember($results[0]['coordinator']),
        "eventType" => $this->getEventType($results[0]['eventType']),
        "name" => $results[0]['name'],
        "additionalInfo" => $results[0]['additionalInfo'],
        "location" => $results[0]['location'],
        "eventTime" => $results[0]['eventTime'],
        "points" => $results[0]['points'],
        "attendance" => $this->getAttendanceObject($eventID),
        "files" => $this->files->getEventFiles($results[0]['event_id'])
      );

      return $event;
    }
    return FALSE;
  }

  function getAttendanceObject($event_id){

    $cntQuery = 'SELECT COUNT(*) AS Count FROM User_Attendance
      WHERE event_id = ?;';     
    $cntResults = $this->conn->select($cntQuery, [$event_id]);

    $attendance['amount'] = $cntResults[0]['Count'];

    if($this->login->getType() > 1){
      $query = 'SELECT user_id FROM User_Attendance
        WHERE event_id = ?;';
      $results = $this->conn->select($query, [$event_id]);   

      $attendees = array();

      foreach($results as $result){
        array_push($attendees, $this->members->getMember($result['user_id']));
      }
      $attendance['attendees'] = $attendees;
    }
    return $attendance;
  }

  function listEventTypes(){

    $query = 'SELECT event_type_id FROM Event_Type';
    $results = $this->conn->select($query);

    $types = array();

    foreach($results as $result){
      array_push($types, $this->getEventType($result['event_type_id']));
    }
    return $types;
  }

  function getEventType($event_type_id){

    $query = 'SELECT * FROM Event_Type
      WHERE event_type_id = ?;';
    $results = $this->conn->select($query, [$event_type_id]);

    if(count($results) === 1){
      $eventType = array(
        "event_type_id" => $results[0]['event_type_id'],
        "name" => $results[0]['name'],
        "description" => $results[0]['description'],
        "defaultPoints" => $results[0]['defaultPoints']
      );
      return $eventType;
    }else {
      return FALSE;
    }
  }

  function pushEventInfoToArray($data){
    $values = array();
    array_push($values, $data['coordinator']);
    array_push($values, $data['eventType']);
    array_push($values, $data['name']);
    array_push($values, $data['additionalInfo']);
    array_push($values, $data['location']);
    array_push($values, $data['eventTime']);
    array_push($values, $data['points']);
    return $values;
  }

  function createEvent($data){
    $query = 'INSERT INTO Events(coordinator, eventType, name, 
                                additionalInfo, location, eventTime, points)
                                VALUES(?,?,?,?,?,?,?);';
    $values = $this->pushEventInfoToArray($data);
    $this->conn->modify($query, $values);
    return array("eventData" => $this->getEvent($this->conn->lastInsertId()));        
  }

  function updateEvent($data){
    $query = 'UPDATE Events 
              SET coordinator = ?, eventType = ?, name = ?, 
              additionalInfo = ?, location = ?, 
              eventTime = ?, points = ?
              WHERE event_id = ?';
                 
    $values = $this->pushEventInfoToArray($data);
    array_push($values, $data['event_id']); 
    $this->conn->modify($query, $values);
    return array("eventData" => $this->getEvent($data['event_id'])); 
  }

  function deleteEvent($eventId){

    $deleteAttendance = "DELETE FROM User_Attendance WHERE event_id = ?;";
    $this->conn->modify($deleteAttendance, [$eventId]);

    $deleteEvent = 'DELETE FROM Events WHERE event_id = ?';
    $result = $this->conn->modify($deleteEvent, [$eventId]);

    return array('Status'=>$result); 
  }

  function pushEventTypeDataToArray($data){
    $values = array();
    array_push($values, $data['name']);
    array_push($values, $data['description']);
    array_push($values, $data['defaultPoints']);
    return $values;
  }

  function createEventType($data){
    $insert = 'INSERT INTO Event_Type(name, description, defaultPoints)
               VALUES(?,?,?);';
    $values = $this->pushEventTypeDataToArray($data);
    $this->conn->modify($insert, $values);
    return array("EventType" => $this->getEventType($this->conn->lastInsertId()));
  }

  function updateEventType($data){
    $update = 'UPDATE Event_Type 
               SET name=?, description=?, defaultPoints=?
               WHERE event_type_id = ?;';
    $values = $this->pushEventTypeDataToArray($data);
    array_push($values, $data['event_type_id']);
    $this->conn->modify($update, $values);
    $this->getEventType($this->conn->lastInsertId());
    return array("EventType" => $this->getEventType($data['event_type_id']));
  }

}

?>
