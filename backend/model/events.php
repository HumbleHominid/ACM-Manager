<?php
include('dbStartup.php');
class Events{

   private $login = NULL;
   private $members = NULL;
   private $files = NULL;

   function Events($login, $members){
      $this->login = $login;
      $this->members = $members;
      include('files.php');
      $this->files = new Files($this->login, $this->members);
   }

   function listAll(){
      include('dbStartup.php');
      //Get past
      $pastQuery = 'SELECT event_id FROM Events
      WHERE eventTime < NOW()
      ORDER BY eventTime;';
      $pastStatement = $db->prepare($pastQuery);
      $pastStatement->execute();
      $pastResults = $pastStatement->fetchAll(PDO::FETCH_ASSOC);
      $pastStatement->closeCursor();

      //Get future
      $futureQuery = 'SELECT event_id FROM Events
      WHERE eventTime > NOW()
      ORDER BY eventTime;';
      $futureStatement = $db->prepare($futureQuery);
      $futureStatement->execute();
      $futureResults = $futureStatement->fetchAll(PDO::FETCH_ASSOC);
      $futureStatement->closeCursor();

      $pastArr = array();
      foreach($pastResults as $result){
         array_push($pastArr, $this->getEvent($result['event_id']));
      }
      $futureArr = array();
      foreach($futureResults as $result){
         array_push($futureArr, $this->getEvent($result['event_id']));
      }

      return array("data" => array("past"=>$pastArr, "future"=>$futureArr),
                  "eventTypes" => $this->listEventTypes());
   }

   function getEvent($eventID){
      include('dbStartup.php');

      $query = 'SELECT * FROM Events
      WHERE event_id = :id;';
      $statement = $db->prepare($query);
      $statement->bindValue(':id', $eventID);
      $statement->execute();
      $results = $statement->fetchAll();
      $statement->closeCursor();

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

   function sidebar(){
      include('dbStartup.php');
      $pastQuery = 'SELECT * FROM Events
      JOIN Event_Type ON Events.eventType = Event_Type.event_type_id
      JOIN (SELECT fName, lName, user_id, email FROM Users)
      AS Coord ON Coord.user_id=Events.coordinator
      WHERE event_time < NOW()
      ORDER BY event_time DESC;';
      $pastState = $db->prepare($pastQuery);
      $pastState->execute();
      $pastResults = $pastState->fetchAll(PDO::FETCH_ASSOC);
      $pastState->closeCursor();

      $futureQuery = 'SELECT * FROM Events
      JOIN Event_Type ON Events.eventType = Event_Type.event_type_id
      JOIN (SELECT fName, lName, user_id, email FROM Users)
      AS Coord ON Coord.user_id=Events.coordinator
      WHERE event_time > NOW()
      ORDER BY event_time ASC
      LIMIT 5;';
      $futureState = $db->prepare($futureQuery);
      $futureState->execute();
      $futureResults = $futureState->fetchAll(PDO::FETCH_ASSOC);
      $futureState->closeCursor();

      $results = array('past' => $pastResults, 'future'=> $futureResults);


      return $results;
   }

   function getAttendanceObject($event_id){
      include('dbStartup.php');
      $cntQuery = 'SELECT COUNT(*) AS Count FROM User_Attendance
      WHERE event_id = :id;';
      $statement = $db->prepare($cntQuery);
      $statement->bindValue(':id', $event_id);
      $statement->execute();
      $cntResults = $statement->fetchAll(PDO::FETCH_ASSOC);
      $statement->closeCursor();

      $attendance['amount'] = $cntResults[0]['Count'];

      if($this->login->getType() > 1){
         $query = 'SELECT user_id FROM User_Attendance
         WHERE event_id = :id;';
         $statement = $db->prepare($query);
         $statement->bindValue(':id', $event_id);
         $statement->execute();
         $results = $statement->fetchAll(PDO::FETCH_ASSOC);
         $statement->closeCursor();

         $attendees = array();

         foreach($results as $result){
            array_push($attendees, $this->members->getMember($result['user_id']));
         }
         $attendance['attendees'] = $attendees;
      }
      return $attendance;
   }

   function listEventTypes(){
      include('dbStartup.php');
      $query = 'SELECT event_type_id FROM Event_Type';
      $statement = $db->prepare($query);
      $statement->execute();
      $results = $statement->fetchAll(PDO::FETCH_ASSOC);
      $statement->closeCursor();

      $types = array();

      foreach($results as $result){
         array_push($types, $this->getEventType($result['event_type_id']));
      }
      return $types;
   }

   function getEventType($event_type_id){
      include('dbStartup.php');
      $query = 'SELECT * FROM Event_Type
      WHERE event_type_id = :id;';
      $statement = $db->prepare($query);
      $statement->bindValue(':id', $event_type_id);
      $statement->execute();
      $results = $statement->fetchAll(PDO::FETCH_ASSOC);
      $statement->closeCursor();

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

   function createEvent(){

   }

   function updateEvent(){

   }

   function deleteEvent(){

   }

   function getFiles(){

   }

   function deleteFile(){

   }

   function updateFile(){

   }

   function createFile(){

   }
}

?>
