<?php

ini_set('display_errors', 'On');
error_reporting(E_ALL);


class Server{

  private $relAddress = '/~tbrooks/ACM-Manager/backend/';
  private $login;
  private $data;

  //Main handler method
  public function serve(){
    include('model/dbConn.php');
    //Get the URL info for REST
    $URI = str_replace($this->relAddress, '', $_SERVER['REQUEST_URI']);

    //Explode the trimmed URI
    $explArr = explode('/', $URI);
    //Get the object and id of the request
    $object = $explArr[0];
    $id = '';
    if(count($explArr) >= 2){
      $id = $explArr[1];
    }

    $this->data = json_decode(file_get_contents('php://input'), true);

    require_once('model/login.php');
    $this->login = new Login;
    if(!empty($this->data['token'])){
      $this->login->validateToken($this->data['token']);
    }

    switch($object){
    case 'events':
      $this->events();
      break;
    case 'members':
      $this->members();
      break;
    case 'login':
      $this->login();
      break;
    case 'fees':
      $this->fees();
      break;
    case 'files':
      $this->files();
      break;
    case 'officers':
      $this->officers();
      break;
    case 'metadata':
      $this->metadata();
      break;
    case 'announcements':
      $this->announcements();
      break;
    default:
      header('HTTP/1.1 400 Bad Request');
      break;

    }
  }

  private function events(){
    $task = $this->data['task'];
    include('model/members.php');
    $members = new Members;
    include('model/events.php');
    $events = new Events($this->login, $members);
    switch($task){
    case 'GET_LIST':
      $list = $events->listAll();
      $json = $this->response($list);
      echo $json;
      break;
    case 'CREATE_EVENT':
      if($this->login->isOfficer()){
        $result = $events->createEvent($this->data['data']); 
        echo $this->response($result);
      }else{
        echo $this->response(array('reason'=>'You are not an officer.'));
      }

      break;  
    case 'DELETE_EVENT':
      if($this->login->isOfficer()){
        $result = $events->deleteEvent($this->data['data']['event_id']);
        echo $this->response($result);
      }else{
        echo $this->response(array('reason'=>'You are not an officer.'));
      }
      break;  
    case 'UPDATE_EVENT':
      if($this->login->isOfficer()){
        $result = $events->updateEvent($this->data['data']);
        echo $this->response($result);
      }else{
        echo $this->response(array('reason'=>'You are not an officer.'));
      }
      break; 
    case 'CREATE_EVENT_TYPE':
      if($this->login->isOfficer()){
        $result = $events->createEventType($this->data['data']);  
        echo $this->response($result);
      }else{
        echo $this->response(array('reason'=>'You are not an officer.'));
      }
      break; 
    case 'UPDATE_EVENT_TYPE':
      if($this->login->isOfficer()){
        $result =  $events->updateEventType($this->data['data']);
        echo $this->response($result);
      }else{
        echo $this->response(array('reason'=>'You are not an officer.'));
      }
      break;
    default:
      header('HTTP/1.1 400 Bad Request');
      break;
    }
  }

  private function members(){
    $task = $this->data['task'];
    include('model/members.php');
    $member = new Members;
    switch($task){
    case 'GET_MEMBER_BY_ID':
      $id = $this->data['data']['id'];
      $info = $member->getMember($id);
      $json = $this->response($info);
      echo $json;
      break;
    case 'LIST_MEMBERS':
      if($this->login->isOfficer()){
        $info = $member->listMembers();
      }else if($this->login->isLoggedIn()){
        $info = $member->getMember($this->login->getUserID());
      }else{
        $info = ['reason'=>'You cannot lookup user data while not logged in.'];
      }
      $json = $this->response($info);
      echo $json;
      break;
    case 'LIST_USER_TYPES':
      $list = $member->listUserTypes();
      $json = $this->response($list);
      echo $json;
      break;
    default:
      header('HTTP/1.1 400 Bad Request');
      break;
    }
  }

  private function login(){
    $task = $this->data['task'];

      $rememberMe = FALSE;

      if(!empty($this->data['data']['rememberMe'])){
        $rememberMe = $this->data['data']['rememberMe'];
      }



    switch($task){
    case 'ATTEMPT_LOGIN':

      $user = $this->data['data']['username'];
      $pass = $this->data['data']['password'];
      $result = $this->login->attemptLogin($user, $pass, $rememberMe);
      if($result){
        $json = $this->response(array());
        echo $json;
      }else{
        echo $this->response(['reason'=>'INVALID CREDENTIALS']);
      }
      break;
    case 'CREATE_ACCOUNT':

      $user = $this->data['data']['username'];
      $pass = $this->data['data']['password'];
      $first = $this->data['data']['first'];
      $last = $this->data['data']['last'];
      $result = $this->login->createUser($user, $pass, $first, $last, $rememberMe);
      $json = $this->response($result);
      echo $json;

      header('HTTP/1.1 200 OK');
      break;
    case 'UPDATE_TOKEN':
      $json = $this->response(array());
      echo $json;
      break;
    default:
      header('HTTP/1.1 400 Bad Request');
      break;
    }
  }

  private function fees(){
    $task = $this->data['task'];
    include('model/members.php');
    $members = new Members;
    include('model/fees.php');
    $fees = new Fees($this->login, $members);
    switch($task){
    case 'GET_FEES_BY_MEMBER':

      $user_id = $this->data['data']['user_id'];
      $result = $fees->getMemberFees($user_id);
      $json = $this->response($result);
      echo $json;
      break;
    case 'GET_ALL_FEES':
      $result = $fees->getAllFees();
      $json = $this->response($result);
      echo $json;
      break;
    default:
      header('HTTP/1.1 400 Bad Request');
      break;
    }
  }

  private function files(){
    $task = $this->data['task'];
     include('model/members.php');
    $members = new Members;
    include('model/files.php'); 
    $files = new Files($this->login, $members);
    switch($task){
    case 'GET_FILE_INFO':
      $fileID = $this->data['data']['fileID'];
      $files->getFile($fileID);
      break;
    case 'DOWNLOAD_FILE':
      $file_id = $this->data['data']['file_id'];
      $files->downloadFile($file_id);
      break;
    default:
    header('HTTP/1.1 400 Bad Request');
    break;
    }
  }

  private function officers(){
    $task = $this->data['task'];
    include('model/members.php');
    $members = new Members;
    include('model/officers.php');
    $officers = new Officers($this->login, $members);
    switch($task){
    case 'GET_OFFICERS':
      $info = $officers->getOfficers();
      $json = $this->response($info);
      echo $json;
      break;
    default:
      header('HTTP/1.1 400 Bad Request');
      break;
    }
  }

  private function metadata(){
    $task = $this->data['task'];
    switch($task){
      case 'GET_METADATA':
        require_once('model/metadata.php');
        $metadata = new Metadata();
        $results = $metadata->getMetadata($this->data['data']['endpoint']);
        echo $this->response($results);
        break;
      default:
        header('HTTP/1.1 400 Bad Request');
        break;
    }
  }

  private function announcements(){
    $task = $this->data['task'];
     include('model/members.php');
    $members = new Members;
    include('model/events.php');
    $events = new Events($this->login, $members);

    include('model/announcements.php');
    $announcements = new Announcements($members, $events);
    switch($task){
      case('GET_ACTIVE'):
        $results = $announcements->getAnnouncementsBar($this->login->getType());
        echo $this->response($results); 
        break;
      case('UPDATE_ANNO'):
        if($this->login->isOfficer()){
          $results = $announcements->updateAnnouncement($this->data['data']);
          echo $this->response($results);
        }else{
          echo $this->response(array('reason'=>'You are not an officer.'));
        } 
        break;
      case('CREATE_ANNO'):
        if($this->login->isOfficer()){
          $results = $announcements->addAnnouncement($this->data['data']);
          echo $this->response($results);
        }else{
          echo $this->response(array('reason'=>'You are not an officer.'));
        } 
        break;
      case('DELETE_ANNO'):
        if($this->login->isOfficer()){
          $results = $announcements->deleteAnnouncement($this->data['data']['anno_id']);
          echo $this->response($results);
        }else{
          echo $this->response(array('reason'=>'You are not an officer.'));
        } 
        break;
      case('LIST_ALL'):
        break; 
      default: 
        header('HTTP/1.1 400 Bad Request');
      break;
    }
  }

  //Encodes the JSON response. If it is not valid, sends error header and ends.
  private function response($builtArr){
    $token = $this->login->getToken();
    if(!empty($token)){
      $builtArr['user'] = $token;
    }
    $json = json_encode($builtArr);

    if($json === FALSE){
      header('HTTP/1.1 500 Internal Server Error');
      exit();
    }else if(count($builtArr) > 0) {
      header('Content-Type: application/json');
      return $json;
    }
    return FALSE;
  }
}

$server = new Server;
$server->serve();


?>
