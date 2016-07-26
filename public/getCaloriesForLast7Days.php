<?php


	$totalCalories = 0;
	$total7dayCalories = 0;

	$last7DaysCaloriesArray = [];


	if(isset($_POST['particularDate'])) {

		require_once 'login.php';
		$conn = new mysqli($hn, $un, $pw, $db);
		if ($conn->connect_error) die($conn->connect_error);


		$date = $conn->real_escape_string($_POST['particularDate']); 


		if(strlen($date) > 1) {
			for ($i = 1; $i<8; $i++){

			$result = $conn->query("SELECT calories FROM userfoodtable WHERE entrydate LIKE '$date'");


			$date = date("Y-m-d", strtotime('-'.$i.' days'));

			if ($result->num_rows > 0) {
								while ($rows = $result->fetch_assoc()) {


									$calories = $rows['calories'];


									$totalCalories = $totalCalories + $calories;
									$total7dayCalories = $total7dayCalories + $calories;
								}

								array_push($last7DaysCaloriesArray, $totalCalories);
								$totalCalories = 0;

							} else {
								array_push($last7DaysCaloriesArray, "0");
	
							}


			}
							$calorie7DayAverage = round($total7dayCalories/7);
							array_push($last7DaysCaloriesArray, $calorie7DayAverage);

		}
	$conn->close();

	}

?>

			<script type="text/javascript"> 	
				var last7DaysCaloriesArray = <?php echo json_encode($last7DaysCaloriesArray); ?>;
			</script>