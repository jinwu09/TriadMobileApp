<?php
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Credentials: true');
    header("Content-type: text/html; charset=utf-8");
    header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');
    header("Access-Control-Allow-Method: POST");  
    header("Access-Control-Max-Age: 3600");
    set_time_limit(1000);

    define("DBASE", "triad");
    define("USER", "root");
    define("PW","");
    define("SERVER", "localhost");
    define("CHARSET", "utf8");

    class Connection{
        protected $constring = "mysql:host=".SERVER.";dbname=".DBASE.";charset=".CHARSET;
        protected $options = [
            \PDO::ATTR_ERRMODE => \PDO::ERRMODE_EXCEPTION,
            \PDO::ATTR_DEFAULT_FETCH_MODE => \PDO::FETCH_ASSOC,
            \PDO::ATTR_EMULATE_PREPARES => false
        ];
        
        public function connect()
        {
			return new \PDO($this->constring, USER, PW, $this->options);
        }
    }
?>