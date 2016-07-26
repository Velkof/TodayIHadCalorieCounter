<!DOCTYPE html>
<html>
<head>
	<title>Today I Had</title>
	<link rel="stylesheet" type="text/css" href="css/style.css">
	<link rel="stylesheet" type="text/css" href="css/jqueryuistyle.css">
	<link rel="icon" type="image/png" href="favicon-32x32.png" sizes="32x32"/>


</head>
<body>

			<div id="header">  
				<nav>
					<p id="siteName">TodayIHad</p>

					<nav id="navButtons">
							<input type="button" value="Profile" id="profileBtn"> </input>
							<input type="button" value="FAQ" id="faqBtn"> </input>
							<input type="button" value="Add Food" id="addFoodBtn"> </input>
							<input type="button" value="Stats" id="statsBtn"> </input>
							<input type="button" value="Home" id="homeBtn"> </input>
					</nav>

				</nav>

			</div>

			<div id="content"> 

				<div class="formSearch">
					<form action="" method="post" id="form">
									<input type="text" onkeyup="getFood(this.value)" autocomplete="off" placeholder="Search for food" name="search" id="searchBox"/>
					</form>
				</div>

				<div id="resultsDiv">
 				</div>

				<div id="infoDiv"> 
					<div id="infoDivLeft">
						<div id="infoDivLeftTop">Last Seven Days</div>
									<canvas id="barChart" width="400px"></canvas>

					</div>
					<div id="infoDivRight">
						<div id="infoDivRightTop" ><button id="choosePrevDate" class="chooseDate">&lt; </button> &nbsp;&nbsp;<button id="chooseDate"  class="chooseDate" onclick="toggleDatepicker()"></button>&nbsp;&nbsp;<button id="chooseNextDate" class="chooseDate">	    &gt;</button></div>
										<div id="datepicker" class="datepicker"><p id="today">Jump to today</p>


								</div>

						<div id="infoDivRightBottom">	<div id="infoDivRightBtmContainer"><div id="dayInfo"></div>		<canvas id="mycanvas"></div></canvas>
</div>

					</div>
				</div>


				<div id="tableDiv" class="tableDiv">

					<table id="header-fixed">					
						<th class="foodName">Food Name</th>
						<th class="grams">Grams</th>
						<th class="calories">Calories</th>
						<th class="action">Action</th>
					</table>

					<table id="myTable" class="myTable">				
					</table>
				</div>

			</div>

			<div id="addFoodContent">
				<div id="addFoodFormContainer">
					<h4>Add your own custom food.</h4>

					<form action="" method="post" id="AddFoodForm">
							<input type="text" style="width: 43.7%" placeholder="Food name" name="nameCustom"></input>
							<input type="number" placeholder="Calories"  style="width: 9%" name="caloriesCustom"></input>
							<input type="number" maxlength="4" size="5" style="width: 9%" placeholder="Protein (gr)" name="proteinCustom"></input>
							<input type="number"  style="width: 9%" placeholder="Fat (gr)" name="fatCustom"></input>
							<input type="number"  style="width: 9%" placeholder="Carbs (gr)"  name="carbsCustom"></input>
							<input type="submit" style="width: 9%" value="Add" id="submitFood"></input>

					</form>
					<p id="formExplanation">All values should be per 100 grams. If you aren't sure about the protein, fat and carbs values, you can put 0. However, this will affect your macros, so it's recommended you add them.</p>

				</div>

				<div id="tableCustomFoodContainer">
					<table id="customFoodTableHeader">
						<th class="customFoodName">Food Name</th>
						<th class="CustomFoodCalories">Cal.</th>
						<th class="CustomFoodProtein">Prot.</th>
						<th class="CustomFoodFat">Fat</th>
						<th class="CustomFoodCarbs">Carb.</th>
						<th class="CustomFoodAction">Act.</th>
					</table>
					<table id="customFoodTable">					

					</table>

				</div>	

			</div>



 			<div id="footer">		
			</div>

	<script type="text/javascript" src="js/jquery-2.2.0.min.js"></script>
	<script type="text/javascript" src="js/jquery-ui.min.js"></script>
	<script type="text/javascript" src="js/Chart.min.js"></script>
	<script type="text/javascript" src="js/Chart.Doughnut.js"></script>
	<script type="text/javascript" src="js/Chart.Bar.js"></script>
	<script type="text/javascript" src="js/script.js"></script>


</body>
</html>


