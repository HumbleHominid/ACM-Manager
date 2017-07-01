<?php
include('dbStartup.php');
require_once 'jwt/src/BeforeValidException.php';
require_once 'jwt/src/ExpiredException.php';
require_once 'jwt/src/SignatureInvalidException.php';
require_once 'jwt/src/JWT.php';

use \Firebase\JWT\JWT;

define('ALGORITHM','HS512');

class Login{

   private $domain = 'katie.mtech.edu/~acmuser';
   private $validatedUser = -1;
   private $currToken = '';

   private $fName = '';
   private $lName = '';
   private $email = '';
   private $user_type_id = '';
   private $name = '';


   function attemptLogin($user, $pass){
      include('dbStartup.php');
      $query = 'SELECT * FROM Users
      JOIN Passwords ON Users.password_id = Passwords.password_id
      WHERE (password_timeout >= NOW() OR password_timeout IS NULL)
      AND email = :user;';
      $statement = $db->prepare($query);
      $statement->bindValue(':user', $user);
      $statement->execute();
      $results = $statement->fetchAll(PDO::FETCH_ASSOC);
      $statement->closeCursor();

      if(COUNT($results) === 1){
         if(password_verify($pass, $results[0]['password'])){
            $this->validatedUser = $results[0]['user_id'];

            $typeId = $results[0]['user_type'];
            $userType = "SELECT * FROM User_Type WHERE user_type_id = :typeId";
            $statement = $db->prepare($userType);
            $statement->bindValue(':typeId', $typeId);
            $statement->execute();
            $typeResults = $statement->fetchAll(PDO::FETCH_ASSOC);
            $statement->closeCursor();


            $this->fName = $results[0]['fName'];
            $this->lName = $results[0]['lName'];
            $this->email = $results[0]['email'];
            $this->user_type_id = $typeId;
            $this->name = $typeResults[0]['name'];

            return TRUE;
         }
      }
      return FALSE;
   }

   public function validateToken($inToken){
      try {
         include('key.php');
         $secretKey = base64_decode($SECRET_KEY);
         $token = json_decode($inToken, true);
         $JWT = $token['jwt'];
         $DecodedDataArray = JWT::decode($JWT, $secretKey, array(ALGORITHM));
         $decodedToken = json_decode($token, true);

         $this->fName = $decodedToken['data']['fName'];
         $this->lName = $decodedToken['data']['lName'];
         $this->email = $decodedToken['data']['email'];
         $this->validatedUser = $decodedToken['data']['user_id'];
         $this->user_type_id = $decodedToken['data']['user_type']['user_type_id'];
         $this->name = $decodedToken['data']['user_type']['name'];

         return true;
      } catch (Exception $e) {
         return false;
      }
   }

   public function createUser($user, $pass, $first, $last){
      include('dbStartup.php');
      $query = 'INSERT INTO Passwords(password,password_timeout) VALUES (:pass, NULL);';

      $query2 = 'INSERT INTO Users(password_id, user_type, fName, lName, email) VALUES (:id, 1,:first, :last, :user);';

      try{
         $statement = $db->prepare($query);
         $statement->bindValue(':pass', $pass);
         $statement->execute();

         $statement2 = $db->prepare($query2);
         $statement2->bindValue(':user', $user);
         $statement2->bindValue(':first', $first);
         $statement2->bindValue(':last', $last);
         $statement2->bindValue(':id', $db->lastInsertId());
         $statement2->execute();

         return attemptLogin($user, $pass);
      }catch(Exception $e){
         echo $e->getMessage();
         die();
      }
   }


   public function getToken(){
      if($validatedUser > -1){
         include('dbStartup.php');
         $query = 'SELECT * FROM Users
         WHERE user_id = :user;';
         $statement = $db->prepare($query);
         $statement->bindValue(':user', $validatedUser);
         $statement->execute();
         $results = $statement->fetchAll(PDO::FETCH_ASSOC);
         $statement->closeCursor();

         include('key.php');

         $typeId = $results[0]['user_type'];
         $userType = "SELECT * FROM User_Type WHERE user_type_id = :typeId";
         $statement = $db->prepare($userType);
         $statement->bindValue(':typeId', $typeId);
         $statement->execute();
         $typeResults = $statement->fetchAll(PDO::FETCH_ASSOC);
         $statement->closeCursor();

         $tokenId    = base64_encode(mcrypt_create_iv(32));

         $data = array(
            'data' => [
               'fName' => $results[0]['fName'],
               'lName' => $results[0]['lName'],
               'email' => $results[0]['email'],
               'user_id' => $results[0]['user_id'],
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
               'exp' => time() + 3600,
               'nbf' => time()
            );

            $secretKey = base64_decode($SECRET_KEY);
            $jwt = JWT::encode(
               $data,
               $secretKey,
               ALGORITHM
            );
            $token = array(
               'user' => [
                  'jwt' => $jwt,
                  'fName' => $results[0]['fName'],
                  'lName' => $results[0]['lName'],
                  'email' => $results[0]['email'],
                  'user_id' => $results[0]['user_id'],
                  'user_type' => array(
                     'user_type_id' => $typeId,
                     'name' => $typeResults[0]['name'],
                     'description' => $typeResults[0]['description']
                  )
                  ]
               );
               return $token;

            }else{
               return NULL;
            }
         }

      }
      ?>
