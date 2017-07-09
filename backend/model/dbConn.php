<?php

class DbConn{

    private $db = NULL;

    function DbConn(){
        include('dbStartup.php');
        $this->db = $db;
    }

    function select($query, $bindValues = NULL){ 
        $statement = $this->db->prepare($query);
        for($i = 0; $i < count($bindValues); $i++){
            $statement->bindValue($i+1, $bindValues[$i]);
        }
        $statement->execute();
        $results = $statement->fetchAll(PDO::FETCH_ASSOC);
        $statement->closeCursor();
        return $results;
    }

}

?>
