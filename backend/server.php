<?php

ini_set('display_errors', 'On');
error_reporting(E_ALL);


class Server{

  private $relAddress = '/~tbrooks/ACM-Manager/backend/';

  //Main handler method
  public function serve(){
    //Get the URL info for REST
    $URI = str_replace($this->relAddress, '', $_SERVER['REQUEST_URI']);
    
    //Get the method of the request.
    $method = $_SERVER['REQUEST_METHOD'];

    //Explode the trimmed URI   
    $explArr = explode('/', $URI);
    //Get the object and id of the request
    $object = $explArr[0];
    $id = '';
    if(count($explArr) >= 2){
      $id = $explArr[1];
    }
    
    switch($object){
      case 'events':
        $this->events($method, $id); 
        break;
      case 'members':
        $this->members($method, $id);
        break;
      case 'login':
        $this->login($method, $id);
        break;
      case 'fees':
        $this->fees($method, $id);
        break;
      case 'files':
        $this->files($method, $id);
        break;
      case 'officers':
        $this->officers($method, $id);
        break;
      case 'pass':
        echo password_hash($id, PASSWORD_BCRYPT);
      case 'testValidate':
        include('model/login.php');
        $login = new Login();
        $login->validateToken();
      default:
        header('HTTP/1.1 400 Bad Request');
        break;
    }

  }

  private function events($method, $id){
    $item = NULL;
    switch($method){
      case 'GET': 
        if(!isset($id) || strlen($id) === 0){
          include('model/events.php');
          $events = new Events; 
          $list = $events->sidebar();
          echo $this->response($list);
        }        
        break;
      case 'PUT':
        if($id === ''){
          header('HTTP/1.1 400 Bad Request');
          exit();
        }
        break;
      case 'POST':
         if($id === ''){
          header('HTTP/1.1 400 Bad Request');
          exit();
         }

        break;
      case 'DELETE':
         if($id === ''){
          header('HTTP/1.1 400 Bad Request');
          exit();
         }

        break;
    }
    $this->response($item);
  }
 
  private function members($method, $id){
    switch($method){
      case 'GET':
        break;
      case 'PUT':
        if($id === ''){
          header('HTTP/1.1 400 Bad Request');
          exit();
        }
        break;
      case 'POST':
        if($id === ''){
          header('HTTP/1.1 400 Bad Request');
          exit();
         }
        break;
      case 'DELETE':
         if($id === ''){
          header('HTTP/1.1 400 Bad Request');
          exit();
         }

        break;
    } 
  }

  private function login($method, $id){
    switch($method){
      case 'POST':
        include('model/login.php');
        $login = new Login;
        $user = $_POST['username'];
        $pass = $_POST['password'];
        $result = $login->attemptLogin($user, $pass);
        $json = $this->response($result);
        if($json !== 'false'){
          echo $json;
        }else{
          echo 'INVALID CREDENTIALS';
        }
        break;  
    } 
  }

  private function fees($method, $id){
    switch($method){
      case 'GET':
        break;
      case 'PUT':
         if($id === ''){
          header('HTTP/1.1 400 Bad Request');
          exit();
         }

        break;
      case 'POST':
         if($id === ''){
          header('HTTP/1.1 400 Bad Request');
          exit();
         }

        break;
      case 'DELETE':
         if($id === ''){
          header('HTTP/1.1 400 Bad Request');
          exit();
         }

        break;
    } 
  }
  
  private function files($method, $id){
    switch($method){
      case 'GET':
        break;
      case 'PUT':
         if($id === ''){
          header('HTTP/1.1 400 Bad Request');
          exit();
         }

        break;
      case 'POST':
         if($id === ''){
          header('HTTP/1.1 400 Bad Request');
          exit();
         }

        break;
      case 'DELETE':
         if($id === ''){
          header('HTTP/1.1 400 Bad Request');
          exit();
         }

        break;
    } 
  }
  
  private function officers($method, $id){ 
    switch($method){
      case 'GET':
        break;
      case 'PUT':
         if($id === ''){
          header('HTTP/1.1 400 Bad Request');
          exit();
         }

        break;
      case 'POST':
         if($id === ''){
          header('HTTP/1.1 400 Bad Request');
          exit();
         }

        break;
      case 'DELETE':
         if($id === ''){
          header('HTTP/1.1 400 Bad Request');
          exit();
         }

        break;
    } 
  } 
  
  
  //Encodes the JSON response. If it is not valid, sends error header and ends.
  private function response($builtArr){
    $json = json_encode($builtArr);

    if($json === FALSE){
      header('HTTP/1.1 500 Internal Server Error');
      exit();
    }else{
      header('Content-Type: application/json');
      return $json;
    }
    return FALSE;
  }
}

$server = new Server;
$server->serve();


?>

