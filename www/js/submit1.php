<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type");

mysql_connect("localhost", "root", "minowss") or die("Error Connecting to MySQL");
mysql_select_db("reportsdb") or die("Error Connecting to DB");
$data = json_decode(file_get_contents("php://input"));

$myresults = array();
@$activities = $data->activities1;
@$challenges = $data->challenges1;
@$plans = $data->plans1;
@$suggestions = $data->suggestions1;
@$fullname = $data->fullname;
@$designation = $data->designation;
@$currentWeekNumber = $data->currentWeekNumber;

$myqry = "INSERT INTO submittab (activities, challenges, plans, suggestions, submittime,  submittedby, designation) VALUES
          ('$activities', '$challenges', '$plans', '$suggestions', now(), '$fullname', '$designation' )";
$result = mysql_query($myqry);
$myresults["status"] = "200";
mysql_close();

 header('Content-type: application/json');
 echo json_encode($myresults);
