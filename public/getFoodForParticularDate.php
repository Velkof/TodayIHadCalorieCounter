<?php

	$output2 = NULL;

	$foodDetailsArray = [];


	if(isset($_POST['particularDate'])) {

		require_once 'login.php';
		$conn = new mysqli($hn, $un, $pw, $db);
		if ($conn->connect_error) die($conn->connect_error);


		$date = $conn->real_escape_string($_POST['particularDate']); 


		if(strlen($date) > 1) {

			$result = $conn->query("SELECT id, name, grams, calories, protein, fat, carbs  FROM userfoodtable WHERE entrydate LIKE '$date'");

			if ($result->num_rows > 0) {
								while ($rows = $result->fetch_assoc()) {

									$id = $rows['id'];						
									$name = $rows['name'];
									$grams = $rows['grams'];
									$calories = $rows['calories'];
									$protein = $rows['protein'];
									$fat = $rows['fat'];
									$carbs = $rows['carbs'];


									array_push($foodDetailsArray, $name, $id, $grams, $calories, $protein, $fat, $carbs);
								}
							} else {
								$output2 = "No results";
							}


		}
	$conn->close();

	}

?>

			<script type="text/javascript"> 	
				foodDetailsArray = <?php echo json_encode($foodDetailsArray); ?>;
			</script>
