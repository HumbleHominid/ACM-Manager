<?php
  include('dbStartup.php');
  require_once 'jwt/src/BeforeValidException.php';
  require_once 'jwt/src/ExpiredException.php';
  require_once 'jwt/src/SignatureInvalidException.php';
  require_once 'jwt/src/JWT.php';
  
  use \Firebase\JWT\JWT; 
  
  define('ALGORITHM','HS512'); 

  class Login{
    
    private $domain = 'katie.mtech.edu/~tbrooks';
    
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
          include('key.php');
          
          $tokenId    = base64_encode(mcrypt_create_iv(32));

          $data = array(
            'data' => [
                'fName' => $results[0]['fName'],
                'lName' => $results[0]['lName'],
                'email' => $results[0]['email'],
                'userID' => $results[0]['user_id']
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
          $token = ['jwt' => $jwt];
          return $token; 
        }
      }
      return FALSE;
    }   
    
    public function validateToken(){
      try {
        include('key.php');
        $secretKey = base64_decode($SECRET_KEY); 
       // $DecodedDataArray = JWT::decode($_REQUEST['tokVal'], $secretKey, array(ALGORITHM));
        $token = json_decode($testJWT, true); 
        $JWT = $token['jwt']; 
        $DecodedDataArray = JWT::decode($JWT, $secretKey, array(ALGORITHM));
        echo  "{'status' : 'success' ,'data':".json_encode($DecodedDataArray)." }";die();

      } catch (Exception $e) {
        echo "{'status' : 'fail' ,'msg':'Unauthorized'}";die();
      } 
    }


  }

?>
