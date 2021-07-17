<?php
    class Auth{
        protected $pdo;

        public function __construct(\PDO $pdo){
            $this->pdo = $pdo;
        }

        public function login($d){
            $em = $d->account_email;
            $pw = $d->account_password;

            $sql = "SELECT * FROM accounts_tbl WHERE account_email='$em' AND account_password = '$pw' LIMIT 1";

            if($res = $this->pdo->query($sql)->fetchAll()){
                return array("data"=>array("account_id"=>$res[0]['account_id'],"account_email"=>$res[0]['account_email'],"account_fname"=>$res[0]['account_fname'],"account_lname"=>$res[0]['account_lname'],"account_address"=>$res[0]['account_address']));
            }else{
                return array("error"=>"Incorrect username or password");
            }
        }

        public function register($d){
            $sql = "SELECT * FROM accounts_tbl WHERE account_email='$d->account_email' LIMIT 1";
            
            if($result = $this->pdo->query($sql)->fetchAll()){
                return array("error"=>"Failed Registered");
            }else{
                $sql="INSERT INTO accounts_tbl(account_email,account_password,account_fname,account_lname,account_address) VALUES(?,?,?,?,?)";

                $sql = $this->pdo->prepare($sql);
                $sql->execute([
                    $d->account_email,
                    $d->account_password,
                    $d->account_fname,
                    $d->account_lname,
                    $d->account_address
                ]);
                return array("data"=>"Successfully Registered");
            }
        }

        public function update($d){
            $sql = "UPDATE accounts_tbl SET account_email= ? ,account_password=?, account_fname = ?, account_lname=?, account_address=? WHERE account_id = ?";

            $sql = $this->pdo->prepare($sql);
            $sql->execute([
                $d->account_email,
                $d->account_password,
                $d->account_fname,
                $d->account_lname,
                $d->account_address,
                $d->account_id
            ]);

            return array("data"=> "Successfully updated");
        }

        public function delete($d){
            $sql = "DELETE FROM accounts_tbl WHERE account_id = ? ";
            $sql = $this->pdo->prepare($sql);
            $sql->execute([
                $d->account_id
            ]);
            return array("data"=> "Successfully Deleted");
        }
    }
    

?>