<?php
include('dbStartup.php');
class Files{

   private $login = NULL;
   private $members = NULL;

   function Files($login, $members){
      $this->login = $login;
      $this->members = $members;

   }

   function getFile($file_id){
      include('dbStartup.php');
      $query = 'SELECT * FROM Files
      WHERE file_id = :id AND audience <= :uType;';
      $statement = $db->prepare($query);
      $statement->bindValue(':id', $file_id);
      $statement->bindValue(':uType', $this->login->getType());
      $statement->execute();
      $results = $statement->fetchAll(PDO::FETCH_ASSOC);
      $statement->closeCursor();
      if(count($results) === 1){
      return array(
         "file_id"=> $results[0]['file_id'],
         "uploader"=> $this->members->getMember($results[0]['uploader']),
         "audience" => $results[0]['audience'],
         "fileName"=> $results[0]['fileName'],
         "description"=> $results[0]['description']

      );
   }else{
      return FALSE;
   }
   }

   function getEventFiles($event_id){
      include('dbStartup.php');
      $query = 'SELECT * FROM Event_Files
      WHERE event_id = :id;';
      $statement = $db->prepare($query);
      $statement->bindValue(':id', $event_id);
      $statement->execute();
      $results = $statement->fetchAll(PDO::FETCH_ASSOC);
      $statement->closeCursor();
      $arr = array();
      foreach($results as $result){
         $file = $this->getFile($result['file_id']);
         if($file != FALSE){
            $file['eventNote'] = $result['additionalInfo'];
            array_push($arr, $file);
         }
      }
      return $arr;
   }
}

?>
