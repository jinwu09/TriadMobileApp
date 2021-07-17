<?php
    require_once("./config/database.php");
    require_once("./models/auth.php");

    $db = new Connection();
    $pdo = $db->connect();

    $auth = new Auth($pdo);

    $req = [];
    if(isset($_REQUEST['request'])){
        $req = explode('/', rtrim($_REQUEST['request'], '/'));
    }else{
        $req = array("errorcatcher");
    }

    switch($_SERVER['REQUEST_METHOD']){
        case 'POST':
            switch($req[0]){
                case 'login':
                    $d = json_decode(file_get_contents("php://input"));
                    echo json_encode($auth->login($d));
                    break;
                case 'register':
                    $d = json_decode(file_get_contents("php://input"));
                    echo json_encode($auth->register($d));
                    break;
                case 'update':
                    $d = json_decode(file_get_contents("php://input"));
                    echo json_encode($auth->update($d));
                    break;
                case 'delete':
                    $d = json_decode(file_get_contents("php://input"));
                    echo json_encode($auth->delete($d));
                    break;
                default: 
                    echo "no endpoint on post";
                    break;
            }
            break;
        default:
            echo "Prohibited";
            break;
    }



?>