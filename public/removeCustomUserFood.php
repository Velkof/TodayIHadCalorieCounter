<?php

if(isset($_POST['id'])) {

	require_once 'login.php';
	$conn = new mysqli($hn, $un, $pw, $db);

	if($conn->connect_error) die ($conn->connect_error);

	$id = $conn->real_escape_string($_POST['id']);


	if(strlen($id) > 0 ) {

		mysqli_query($conn,"DELETE FROM usercustomfoodtable WHERE id = '$id'");

	}

	$conn->close(); 
}



?>
