<?php

ini_set('display_errors', 'On');
error_reporting(E_ALL);


class Server{

   private $relAddress = '/~acmuser/backend/';
   private $login;
   private $data;

   //Main handler method
   public function serve(){
      //Get the URL info for REST
      $URI = str_replace($this->relAddress, '', $_SERVER['REQUEST_URI']);

      //Refactoring out. Should always be post.
      /*//Get the method of the request.
      $method = $_SERVER['REQUEST_METHOD'];*/

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
         $login->validateToken($this->data['token']);
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
         case 'testValidate':
         include('model/login.php');
         $login = new Login();
         $login->validateToken();
         case 'testInfoPath':
         include('model/login.php');
         $login = new Login;

         // $data = json_decode(file_get_contents('php://input'), true);
         //  $jwt = $data['jwt'];

         $arr = $login->validateToken(file_get_contents('php://input'));
         var_dump($arr);
         //echo $login->getCurrentUser($arr);
         //header('HTTP/1.1 200 OK');
         break;
         default:
         echo $object;
         header('HTTP/1.1 400 Bad Request');
         break;
      }
   }

   private function events(){
      $item = NULL;
      $task = $this->data['task'];
      switch($task){
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
            echo 'INVALID CREDENTIALS';
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
            echo 'Error creating account.';
         }
         header('HTTP/1.1 200 OK');
         break;
      }
   }

   private function fees(){
      $task = $this->data['task'];
      switch($task){
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

   private function files(){
      $task = $this->data['task'];
      switch($task){
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
