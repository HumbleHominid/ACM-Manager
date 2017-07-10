<?php

ini_set('display_errors', 'On');
error_reporting(E_ALL);


class Server{

  private $relAddress = '/~acmuser/backend/';
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
    default:
      echo $object;
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
      $info = $member->listMembers();
      $json = $this->response($info);
      echo $json;
      break;
    default:
      header('HTTP/1.1 400 Bad Request');
      break;
    }
  }

  private function login(){
    $task = $this->data['task'];

    switch($task){
    case 'ATTEMPT_LOGIN':

      $user = $this->data['data']['username'];
      $pass = $this->data['data']['password'];

      $result = $this->login->attemptLogin($user, $pass);
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
      $result = $this->login->createUser($user, $pass, $first, $last);
      if($result){
        $json = $this->response(array());
        echo $json;
      }else{
        echo $this->response(['reason'=>'Error creating account.']);
      }
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
    switch($task){
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
