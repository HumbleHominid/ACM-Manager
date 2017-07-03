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
   private $user_type_id = 0;
   private $name = '';


   function attemptLogin($user, $pass){
      include('dbStartup.php');
      $query = 'SELECT * FROM Users
      JOIN Passwords ON Users.password_id = Passwords.password_id
      WHERE (passwordTimeout >= NOW() OR passwordTimeout IS NULL)
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

            $this->validatedUser = $results[0]['user_id'];
            $this->fName = $results[0]['fName'];
            $this->lName = $results[0]['lName'];
            $this->email = $results[0]['email'];
            $this->user_type_id = $typeId;
            $this->type_name = $typeResults[0]['name'];

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

         return true;
      } catch (Exception $e) {
         echo $e->getMessage();
         return false;
      }
   }

   public function createUser($user, $pass, $first, $last){
      include('dbStartup.php');
      $query = 'INSERT INTO Passwords(password,passwordTimeout) VALUES (:pass, NULL);';

      $query2 = 'INSERT INTO Users(password_id, user_type, fName, lName, email) VALUES (:id, 1,:first, :last, :user);';

      try{
         $statement = $db->prepare($query);
         $statement->bindValue(':pass', password_hash($pass, PASSWORD_BCRYPT));
         $statement->execute();

         $statement2 = $db->prepare($query2);
         $statement2->bindValue(':user', $user);
         $statement2->bindValue(':first', $first);
         $statement2->bindValue(':last', $last);
         $statement2->bindValue(':id', $db->lastInsertId());
         $statement2->execute();

         return $this->attemptLogin($user, $pass);
      }catch(Exception $e){
         echo $e->getMessage();
         die();
      }
   }


   public function getToken(){
      if($this->validatedUser > -1){
         include('dbStartup.php');
         $query = 'SELECT * FROM Users
         WHERE user_id = :user;';
         $statement = $db->prepare($query);
         $statement->bindValue(':user', $this->validatedUser);
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
      }
      ?>
