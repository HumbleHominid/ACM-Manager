<?php
  include('dbStartup.php');
  class Events{
    function listAll(){
      include('dbStartup.php');
      $query = 'SELECT * FROM Events 
                JOIN Event_Type ON Events.eventType = Event_Type.event_type_id
                JOIN Users ON Users.user_id = Events.coordinator;'; 
      $statement = $db->prepare($query);
      $statement->execute();
      $results = $statement->fetchAll(PDO::FETCH_ASSOC);
      $statement->closeCursor();
      return $results;
    }  

    function getEvent($eventID){
       $query = 'SELECT * FROM Events 
                 JOIN Event_Type ON Events.eventType = Event_Type.event_type_id
                 LEFT JOIN Event_Files ON Events.event_id = Event_Files.event_id
                 LEFT JOIN Files ON Event_Files.file_id = Files.file_id
                 JOIN (SELECT CONCAT(CONCAT(fName, \' \'), lName) AS Coordinator, user_id FROM Users) AS Coord ON Coord.user_id=Events.coordinator
                 JOIN (SELECT CONCAT(CONCAT(fName, \' \'), lName) AS Uploader, user_id FROM Users) AS owner ON owner.user_id=Files.uploader
                 WHERE Events.event_id = :id;'; 
      $statement = $db->prepare($query);
      $statement->bindValue(':id', $eventID); 
      $statement->execute();
      $results = $statement->fetchAll();
      $statement->closeCursor();
      return $results;

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
