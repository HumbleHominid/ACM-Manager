<?php
class Files{

  private $login = NULL;
  private $members = NULL;
  private $conn = NULL;
  //naming this as 'files' will cause issues with htaccess
  private $folder = '_files';

  function Files($login, $members){

    $this->conn = new DbConn();
    $this->login = $login;
    $this->members = $members;
  }

  function getFile($file_id){

    $query = 'SELECT * FROM Files
    WHERE file_id = ? AND audience <= ?;';
    $results = $this->conn->select($query, [$file_id, $this->login->getType()]);

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

  function downloadFile($file_id){
     $query = 'SELECT * FROM Files
    WHERE file_id = ? AND audience <= ?;';
    $results = $this->conn->select($query, [$file_id, $this->login->getType()]);

    if(count($results) === 1){
      $filename = $results[0]['fileName'];
      header("Content-disposition: attachment;filename=$filename");
      readfile($this->folder.'/'.$filename);   
    }
  }

  function getEventFiles($event_id){

    $query = 'SELECT * FROM Event_Files
    WHERE event_id = ?;';
    $results = $this->conn->select($query, [$event_id]);

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
