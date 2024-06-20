<?php 


include 'include/config.php';
include('include/AppFunctions.php');

$appFunction = new AppFunctions();

$data = (array) json_decode(file_get_contents("php://input"));
$response = array();

if(isset($data['userToken']) && !empty($data['userToken']) && isset($data['id']) && !empty($data['id'])) {
	$userToken = json_decode($data['userToken']);
	$userDetails = $appFunction->getUniqueUserByToken($userToken);
	$id = $appFunction->escape_string($appFunction->strip_all($data['id']));


} 
else {
	$response['status'] = false;
	$response['error'] = "Server Error";
	$response['message'] = "No token found";
}

echo json_encode($response);