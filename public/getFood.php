<?php

	$output = NULL;
	$foodArray = [];
	$foodDetailsArray = [];

	if(isset($_POST['partialFood'])){


		require_once 'login.php';
		$conn = new mysqli($hn, $un, $pw, $db);
		if ($conn->connect_error) die($conn->connect_error);


		$search = $conn->real_escape_string($_POST['partialFood']); 

		if(strlen($search) > 1) {


		$searchWords = preg_split('/ /', $search, NULL, PREG_SPLIT_NO_EMPTY);

		if (sizeof($searchWords) == 1) {

				$result = $conn->query("SELECT id, name, calories, protein, fat, carbs, fiber, sodium, cholesterol FROM foodTable WHERE name LIKE '%$searchWords[0]%'");
				$result2 = $conn->query("SELECT id, name, calories, protein, fat, carbs FROM usercustomfoodtable WHERE name LIKE '%$searchWords[0]%'");

		} else if(sizeof($searchWords) == 2){

				$result = $conn->query("SELECT id, name, calories, protein, fat, carbs, fiber, sodium, cholesterol FROM foodTable WHERE name LIKE '%$searchWords[0]%' AND name LIKE '%$searchWords[1]%'");

				$result2 = $conn->query("SELECT id, name, calories, protein, fat, carbs FROM usercustomfoodtable WHERE name LIKE '%$searchWords[0]%' AND name LIKE '%$searchWords[1]%'");


		} else if (sizeof($searchWords) == 3) {

				$result = $conn->query("SELECT id, name, calories, protein, fat, carbs, fiber, sodium, cholesterol FROM foodTable WHERE name LIKE '%$searchWords[0]%' AND name LIKE '%$searchWords[1]%' AND name LIKE '%$searchWords[2]%'");
				$result2 = $conn->query("SELECT id, name, calories, protein, fat, carbs FROM usercustomfoodtable WHERE name LIKE '%$searchWords[0]%' AND name LIKE '%$searchWords[1]%' AND name LIKE '%$searchWords[2]%'");

		} else {
			
				$result = $conn->query("SELECT id, name, calories, protein, fat, carbs, fiber, sodium, cholesterol FROM foodTable WHERE name LIKE '%$searchWords[0]%' AND name LIKE '%$searchWords[1]%' AND name LIKE '%$searchWords[2]%' AND name LIKE '%$searchWords[3]%'");
				$result2 = $conn->query("SELECT id, name, calories, protein, fat, carbs FROM usercustomfoodtable WHERE name LIKE '%$searchWords[0]%' AND name LIKE '%$searchWords[1]%' AND name LIKE '%$searchWords[2]%' AND name LIKE '%$searchWords[3]%'");
		}

		// $result = $conn->query("SELECT id, name, calories, protein, fat, carbs, fiber, sodium, cholesterol FROM foodTable WHERE MATCH(name) AGAINST('$search')");

		// $result = $conn->query("SELECT id, name, calories, protein, fat, carbs, fiber, sodium, cholesterol FROM foodTable WHERE name LIKE '%$search%'");


				if ($result->num_rows > 0) {
					while ($rows = $result->fetch_assoc()) {

						$id = $rows['id'];						
						$name = $rows['name'];
						$grams = "100";
						$calories = $rows['calories'];
						$protein = $rows['protein'];
						$fat = $rows['fat'];
						$carbs = $rows['carbs'];
						$fiber = $rows['fiber'];
						$sodium = $rows['sodium'];
						$cholesterol = $rows['cholesterol'];


						array_push($foodDetailsArray, $name, $id, $grams, $calories, $protein, $fat, 
									$carbs, $fiber, $sodium, $cholesterol);
						$foodArray[] =  $name;
					}
				} else {
					$output = "No results";
				}

				if ($result2->num_rows > 0) {
					while ($rows = $result2->fetch_assoc()) {

						$id = $rows['id'];						
						$name = $rows['name'];
						$grams = "100";
						$calories = $rows['calories'];
						$protein = $rows['protein'];
						$fat = $rows['fat'];
						$carbs = $rows['carbs'];
						$fiber = $rows['0'];
						$sodium = $rows['0'];
						$cholesterol = $rows['0'];


						array_push($foodDetailsArray, $name, $id, $grams, $calories, $protein, $fat, 
									$carbs, $fiber, $sodium, $cholesterol);
						$foodArray[] =  $name;
					}
				} else {
					$output = "No results";
				}



	}

	$conn->close();

}


?>
			<script type="text/javascript"> 	
				var foodArray = <?php echo json_encode($foodArray); ?>;
				var foodDetailsArray = <?php echo json_encode($foodDetailsArray); ?>;
			</script>
