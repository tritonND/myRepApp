<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type");
//insert into testtab (username, password, usertype, fullname) values ("username1", "password1", "tl", "user one");

mysql_connect("localhost", "root", "minowss") or die("Error Connecting to MySQL");
mysql_select_db("reportsdb") or die("Error Connecting to DB");

$data = json_decode(file_get_contents("php://input"));
//$username = mysql_real_escape_string($data->username);
//$password = mysql_real_escape_string($data->password);
$myresults = array();
@$username = $data->username;
@$password = $data->password;

//mysql_query("INSERT INTO testtab VALUES (".$username.", ".$password.");
//$myqry = 'SELECT count(*) co FROM `testtab` WHERE username="'.$username.'" AND password="'.$password.'"';

$myqry = 'SELECT * FROM `testtab` WHERE username="'.$username.'" AND password="'.$password.'"';
$result = mysql_query($myqry);

if(mysql_num_rows($result) > 0)
{
    $rows = mysql_fetch_assoc($result);

       $userType = $rows['usertype'];
       $fulname = $rows['fullname'];
       $designation = $rows['designation'];
    //  $_SESSION['usertype'];
    //  $_SESSION['fullname'];
    //  $myresults[] = array("usertype" =>  $userType, "fullname" => $fulname);
$currentWeekNumber = date('W');
$myresults["status"] = "200";
$myresults["usertype"] = $userType;
$myresults["fullname"] = $fulname;
$myresults["currentWeekNumber"] = $currentWeekNumber;
$myresults["designation"] = $designation;


mysql_close();
}
 header('Content-type: application/json');
 echo json_encode($myresults);
