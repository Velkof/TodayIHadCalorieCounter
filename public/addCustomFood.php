<?php


if(isset($_POST['customName'], $_POST['customCalories'], $_POST['customProtein'], $_POST['customFat'], $_POST['customCarbs'])){


		require_once 'login.php';
		$conn = new mysqli($hn, $un, $pw, $db);
		if ($conn->connect_error) die($conn->connect_error);


		 $name = $conn->real_escape_string($_POST['customName']); 
		 $calories = $conn->real_escape_string($_POST['customCalories']); 
		 $protein = $conn->real_escape_string($_POST['customProtein']); 
		 $fat = $conn->real_escape_string($_POST['customFat']); 
		 $carbs = $conn->real_escape_string($_POST['customCarbs']); 

		 	if(strlen($name) > 0 && strlen($calories) > 0 && strlen($protein) > 0 && strlen($fat) > 0 && strlen($carbs) > 0) {



				mysqli_query($conn,"INSERT INTO usercustomfoodtable (name, calories, protein, fat, carbs, entrydate) 
									VALUES ('$name', '$calories', '$protein', '$fat', '$carbs', curdate())");


			}

$conn->close();


	}

?>