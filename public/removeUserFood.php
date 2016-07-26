<?php

if(isset($_POST['frName'], $_POST['frGrams'], $_POST['frDate'])) {

	require_once 'login.php';
	$conn = new mysqli($hn, $un, $pw, $db);

	if($conn->connect_error) die ($conn->connect_error);

	$name = $conn->real_escape_string($_POST['frName']);
	$grams = $conn->real_escape_string($_POST['frGrams']);
	$date =  $conn->real_escape_string($_POST['frDate']);

	if(strlen($name) > 0 && strlen($grams) > 0 && strlen($date) > 0) {

		mysqli_query($conn,"DELETE FROM userfoodtable WHERE name = '$name' AND grams = '$grams' AND entrydate = '$date' LIMIT 1");

	}

	$conn->close(); 
}



?>

