<?php
require_once 'jwt/src/BeforeValidException.php';
require_once 'jwt/src/ExpiredException.php';
require_once 'jwt/src/SignatureInvalidException.php';
require_once 'jwt/src/JWT.php';

use \Firebase\JWT\JWT;

define('ALGORITHM','HS512');

class Login{
  private $emailRegex = '/^[a-zA-Z]+[0-9]*@mtech\\.edu$/';
  private $domain = 'katie.mtech.edu/~acmuser';
  private $validatedUser = -1;
  private $currToken = '';
  private $conn = NULL;
  private $fName = '';
  private $lName = '';
  private $email = '';
  private $user_type_id = 0;
  private $name = '';
  private $rememberMe = false;

  private $normalTimeout = 3600;
  private $rememberTimeout = 1814400;

  private $metadata = NULL;
  private $endpoint = 'Login';

  function Login(){

    $this->conn = new DbConn;
    require_once('metadata.php');
    $this->metadata = new Metadata(); 
  }

  function attemptLogin($user, $pass, $rememberMe){

    $query = 'SELECT * FROM Users
    JOIN Passwords ON Users.password_id = Passwords.password_id
    WHERE (passwordTimeout >= NOW() OR passwordTimeout IS NULL)
    AND email = ?;';
    $results = $this->conn->select($query, [$user]);

    if(COUNT($results) === 1){
      if(password_verify($pass, $results[0]['password'])){
        $this->validatedUser = $results[0]['user_id'];

        $typeId = $results[0]['user_type'];
        $userType = "SELECT * FROM User_Type WHERE user_type_id = ?;";
        $typeResults = $this->conn->select($userType, [$typeId]);

        $this->validatedUser = $results[0]['user_id'];
        $this->fName = $results[0]['fName'];
        $this->lName = $results[0]['lName'];
        $this->email = $results[0]['email'];
        $this->user_type_id = $typeId;
        $this->type_name = $typeResults[0]['name'];
        $this->rememberMe = $rememberMe;

        return TRUE;
      }
    }
    return FALSE;
  }

  public function validateToken($inToken){
    try {
      include('key.php');
      $secretKey = base64_decode($SECRET_KEY);
      $decodedObject = JWT::decode($inToken, $secretKey, array(ALGORITHM));
      $decodedToken = (array) $decodedObject;

      $decodedData = (array) $decodedToken['data'];

      $this->fName = $decodedData['fName'];
      $this->lName = $decodedData['lName'];
      $this->email = $decodedData['email'];
      $this->validatedUser = $decodedData['user_id'];
      $userType = (array) $decodedData['user_type'];
      $this->user_type_id = $userType['user_type_id'];
      $this->type_name = $userType['name'];
      $this->rememberMe = $decodedData['rememberMe'];
      return true;
    } catch (Exception $e) {
      //echo ["reason" =>$e->getMessage()];
      return false;
    }
  }

  public function createUser($user, $pass, $first, $last, $rememberMe){
    $query = 'INSERT INTO Passwords(password,passwordTimeout) VALUES (?, NULL);';
    $query2 = 'INSERT INTO Users(password_id, user_type, fName, lName, email) VALUES (?, 1, ?, ?, ?);';
    if($this->validateEmail($user)){ 
      try{ 
        $this->conn->modify($query, [password_hash($pass, PASSWORD_BCRYPT)]);   
        $this->conn->modify($query2, [$this->conn->lastInsertId(), $first, $last, $user]); 

        $this->metadata->updateMetadata($this->endpoint); 
        return ['status'=>'success']; 
      }catch(Exception $e){
        echo ["reason" => $e->getMessage()];
        die();
      }
    }else{
      return ['status'=>'failure'];
    }
  }
  
  private function validateEmail($email){
    $valid = preg_match($this->emailRegex, $email); 
    if($valid){
      $query = 'SELECT COUNT(*) AS CNT FROM Users WHERE email = ?;';
      $result = $this->conn->select($query, [$email]);
      $valid = $result[0]['CNT'] == 0;
    }
    return $valid;
  }


  public function getToken(){
    if($this->validatedUser > -1){
      $query = 'SELECT * FROM Users
      WHERE user_id = ?;';

      $results = $this->conn->select($query, [$this->validatedUser]);

      include('key.php');

      $typeId = $results[0]['user_type'];
      $userType = "SELECT * FROM User_Type WHERE user_type_id = ?;";
      $typeResults = $this->conn->select($userType, [$typeId]);
      $timeout = $this->rememberMe ? $this->rememberTimeout : $this->normalTimeout;
      $tokenId    = base64_encode(mcrypt_create_iv(32));

      $data = array(
        'data' => [
          'fName' => $results[0]['fName'],
          'lName' => $results[0]['lName'],
          'email' => $results[0]['email'],
          'user_id' => $results[0]['user_id'],
          'rememberMe' => $this->rememberMe,
          'user_type' => array(
            'user_type_id' => $typeId,
            'name' => $typeResults[0]['name'],
            'description' => $typeResults[0]['description']
          )
          ],
          'jti' => $tokenId,
          'iss' => $this->domain,
          'aud' => $this->domain,
          'iat' => time(),
          'exp' => time() + $timeout,
          'nbf' => time()
        );

        $secretKey = base64_decode($SECRET_KEY);
        $jwt = JWT::encode(
          $data,
          $secretKey,
          ALGORITHM
        );
        $token = array(
          'jwt' => $jwt,
          'fName' => $results[0]['fName'],
          'lName' => $results[0]['lName'],
          'email' => $results[0]['email'],
          'user_id' => $results[0]['user_id'],
          'points' => $results[0]['points'],
          'user_type' => array(
            'user_type_id' => $typeId,
            'name' => $typeResults[0]['name'],
            'description' => $typeResults[0]['description']
          )
        );
        return $token;

      }else{
        return NULL;
      }
    }
    function getType(){
      return $this->user_type_id;
    }

    function getUserID(){
      return $this->validatedUser;
    }

    function isOfficer(){
      return $this->user_type_id > 1;
    }
    
    function isLoggedIn(){
      return $this->validatedUser > -1;
    }
  }
  ?>
