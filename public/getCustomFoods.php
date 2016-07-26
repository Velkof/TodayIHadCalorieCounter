<?php

	$output2 = NULL;

	$customFoodsArray = [];


	// if(isset($_POST['particularDate'])) {

		require_once 'login.php';
		$conn = new mysqli($hn, $un, $pw, $db);
		if ($conn->connect_error) die($conn->connect_error);


		// $date = $conn->real_escape_string($_POST['particularDate']); 


		// if(strlen($date) > 1) {

			$result = $conn->query("SELECT *  FROM usercustomfoodtable");

			if ($result->num_rows > 0) {
								while ($rows = $result->fetch_assoc()) {

									$id = $rows['id'];						
									$name = $rows['name'];
									$calories = $rows['calories'];
									$protein = $rows['protein'];
									$fat = $rows['fat'];
									$carbs = $rows['carbs'];
									$entrydate = $rows['entrydate']; 


									array_push($customFoodsArray, $id, $name, $calories, $protein, $fat, $carbs, $entrydate);
								}
							} else {
								$output2 = "No results";
							}


		// }
	$conn->close();

	// }

?>

			<script type="text/javascript"> 	
				var customFoodsArray = <?php echo json_encode($customFoodsArray); ?>;
			</script>