<?php


if(isset($_POST['fName'], $_POST['fGrams'], $_POST['fCalories'], $_POST['fProtein'], $_POST['fFat'], $_POST['fCarbs'])){


		require_once 'login.php';
		$conn = new mysqli($hn, $un, $pw, $db);
		if ($conn->connect_error) die($conn->connect_error);


		 $name = $conn->real_escape_string($_POST['fName']); 
		 $grams = $conn->real_escape_string($_POST['fGrams']); 
		 $calories = $conn->real_escape_string($_POST['fCalories']); 
		 $protein = $conn->real_escape_string($_POST['fProtein']); 
		 $fat = $conn->real_escape_string($_POST['fFat']); 
		 $carbs = $conn->real_escape_string($_POST['fCarbs']); 


mysqli_query($conn,"INSERT INTO userfoodtable (name, grams, calories, protein, fat, carbs, entrydate) 
					VALUES ('$name', '$grams', '$calories', '$protein', '$fat', '$carbs', curdate())");




$conn->close();


	}

?>