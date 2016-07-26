var savedFoodObject;
var foodToBeRemovedObject;
var foodDetailsArray;
var foodCreationFormObject;
var customFoodId;
var curdate = new Date().toISOString().slice(0, 10);
var last7DaysArray = []; 
var last7DaysCaloriesArray = [];

var btnSave = "<input type='image' src='img/save20px.png' name='save' class='save'/>";
var btnDelete = "<input type='image' src='img/delete20px.png' class='delete'/>";
var btnExpand = "<input type='image' src='img/plus20px.png' class='expand'/>";
var btnEdit = "<input type='image' src='img/edit20px.png' class='edit'/>";
var btnDeleteCustom = "<input type='image' src='img/delete20px.png' class='deleteCustom'/>";


$(function() {        //gives the jquery ui datepicker functionality to a div 
    $( "#datepicker" ).datepicker();

 });

function dateToUserFriendlyFormat(curdate) {

	var dateArray = curdate.split("-");
	var dateArrayReversed = dateArray.reverse();
	var dateUserFriendlyFormat = dateArrayReversed.join("/");
	return dateUserFriendlyFormat;
}


function dateToDisplay(dateText) {

    var x = dateText.split("/");
    var dateToDisplayArray  = [];
    dateToDisplayArray.push(x[1], x[0], x[2]);
    return dateToDisplayArray.join("/");

}


function dateToSQLFriendlyFormat(dateText){

	var dateTextArray = dateText.split("/");
	var dateArray2 = [];
	dateArray2.push(dateTextArray[2], dateTextArray[0], dateTextArray[1]);
	return dateArray2.join("-");

}

function toggleDatepicker(){
	$("#datepicker").toggle();
}


$(document).ready(function() {

	$("#homeBtn").css("background-color","white");
	$("#homeBtn").css("color","#22558C");

    $("#chooseDate").html(dateToUserFriendlyFormat(curdate));

	$("#addFoodContent").hide();

    $("#content").show();

    getDaysOfMonthForLast7Days();

	getCaloriesForLast7Days(curdate); //It's very inefficient,it searches the database 7 times on every reload.


	appendDatabaseRowsForChosenDate(curdate); //populates table with that date's data from the database

});

$('#datepicker').datepicker({
    onSelect: function(dateText, inst) {

    $("#chooseDate").html(dateToDisplay(dateText));

	appendDatabaseRowsForChosenDate(dateToSQLFriendlyFormat(dateText));

	$("#datepicker").hide();

    }
});


function SavedFood (name, grams, calories, protein, fat, carbs) {
	this.name = name;
	this.grams = grams;
	this.calories = calories;
	this.protein = protein;
	this.fat = fat;
	this.carbs = carbs;
};


function FoodToBeRemoved (name, grams, dateadded) {
	this.name = name;
	this.grams = grams;
	this.dateadded = date; 
};


$('html').click(function(e) {                 //empties formsearch div (removes li search results) when you click anywhere
   if(!$(e.target).hasClass('#formSearch'))	  //outside of that div
   {
       $('#resultsDiv').empty();                
   }

}); 


function getFood(value) {       //appends retrieved data as unnumbered list items to results div
	
	var counter = 0;

	$.post("getFood.php", {partialFood:value}, function(data) {

		$("#resultsDiv").html(data);

		if (counter == 0) {
			$("#resultsDiv").empty();
		}

		for (var i = 0; i < foodArray.length; i++) {
			$('#resultsDiv').append("<ul id='searchResultsUL'><li id='foodListUL'>" + foodArray[i] +  "</li></ul>");
			counter = counter + 1;
		}
	});
}


function prependClickedSearchResultToTable(liContent) {

		var liContent = liContent;
		var a = foodDetailsArray.indexOf(liContent);

		$("#myTable").prepend("<tr class='additionalInfoNotSaved'><td>" + 
								"  Prot: " + foodDetailsArray[a+4] + 
								"  Fat: " + foodDetailsArray[a+5] +
								"  Carbs: " + foodDetailsArray[a+6]  +
								"</td><td></td><td></td><td></td></tr>");

		$('.additionalInfoNotSaved').hide();

		$("#myTable").prepend("<tr class='todaysFoodListNotSaved'><td class='foodName'>" + foodDetailsArray[a] 	 +  
							"</td><td class='grams'><input type='text' id='editGrams' maxlength='4' size='4' value='"
							+foodDetailsArray[a+2]+"'/>" +
							"</td><td  class='calories'>" + foodDetailsArray[a+3]  +
							"</td><td class='action'>" + btnSave + " " + btnDelete + 
							"</td><td class='dateadded'>"+ curdate+"</td></tr>");

}


$(document).on({//on click, appends clicked search result to table
    mouseenter: function () {
        		$(this).css("background-color", "white"); //changes color on mouseenter
        		$(this).attr('class', 'test');
    },
    mouseleave: function () {
    			$(".test").css("background-color", "");
    },
    click: function () {

		var liContent = $(this).text();

		if ($(".todaysFoodListNotSaved").length >0 ) {

			$('.additionalInfoNotSaved').remove();
			$('.todaysFoodListNotSaved').remove();
			prependClickedSearchResultToTable(liContent);		

		} else {
			prependClickedSearchResultToTable(liContent);
				$('.emptyRows').last().remove();
		}

		$(this).parent().parent().empty(); //empties contents of search result ul list
		$("#searchBox").val(''); //removes user input from search box

		$(".save").bind("click", Save);
		$(".delete").bind("click", Delete);

	}

}, "#searchResultsUL li"); //pass the element as an argument to .on



$( "#choosePrevDate" ).on( "click", function() {

	var displayedDate = $("#chooseDate").text();
	var uuu = displayedDate.split("/");

	var d1 = new Date(Number(uuu[2]), Number(uuu[1]) - 1, Number(uuu[0]));
	var prevDate =  d1.toISOString().slice(0, 10);


     $("#chooseDate").html(dateToUserFriendlyFormat(prevDate));

	appendDatabaseRowsForChosenDate(prevDate);

});





$( "#chooseNextDate" ).on( "click", function() {

	var displayedDate = $("#chooseDate").text();
	var uuu = displayedDate.split("/");
	var d1 = new Date(Number(uuu[2]), Number(uuu[1]) - 1, Number(uuu[0]) + 2);
	var nextDate =  d1.toISOString().slice(0, 10);


     $("#chooseDate").html(dateToUserFriendlyFormat(nextDate));

	appendDatabaseRowsForChosenDate(nextDate);

});


$( "#today" ).on( "click", function() {

    $("#chooseDate").html(dateToUserFriendlyFormat(curdate));
	appendDatabaseRowsForChosenDate(curdate);
	$("#datepicker").hide();
});



$(document).on({                        //When you click on a row, additional info appears
    click: function() {

    	if($(this).attr('src') == 'img/plus20px.png'){
    		$('.expand').attr('src', 'img/plus20px.png');
			$(this).attr('src', 'img/minus20px.png');
    	} else {
    		$(this).attr('src', 'img/plus20px.png');
    	}

    	var bgColor = $(this).parent().parent().css("background-color");
    	$(addInfoRowForThisBtn).css("background-color", "");

    	var addInfoRowForThisBtn = $(this).parent().parent().next();

    	$(addInfoRowForThisBtn).css("background-color", bgColor);

		$(".additionalInfo").not(addInfoRowForThisBtn).hide();

    	addInfoRowForThisBtn.toggle();

    }
}, ".expand"); //passes the element as an argument to .on


function Delete(){ 

		$('.additionalInfo').hide();

		var grandParent = $(this).parent().parent(); 

		var tdName = grandParent.children("td:nth-child(1)");
		var tdGrams = grandParent.children("td:nth-child(2)");
		var tdDate = grandParent.children("td:nth-child(5)");

		var name = tdName.text();
		var grams = tdGrams.text();
		var date = tdDate.text();

		foodToBeRemovedObject = {name: name, grams:grams, dateadded:date};

		removeUserFood();

	    grandParent.next().remove();			  
        grandParent.remove();

        addEmptyRow();

		appendDatabaseRowsForChosenDate(date);

}; 		


function addEmptyRow(){
		 $("#myTable").append("<tr class='emptyRows'><td></td><td></td><td></td><td></td></tr>");

}		


 function Edit(){ 

	var grandParent = $(this).parent().parent(); 

	var tdName = grandParent.children("td:nth-child(1)");
	var tdGrams = grandParent.children("td:nth-child(2)");
	var tdAction = grandParent.children("td:nth-child(4)");
	var tdDate = grandParent.children("td:nth-child(5)");

	var name = tdName.text();
	var grams = tdGrams.text();
	var date = tdDate.text();

	foodToBeRemovedObject = {name: name, grams:grams, dateadded:date}; 
	removeUserFood();

	tdGrams.html("<input type='text' id='editGrams' maxlength='4' size='4' value='"+tdGrams.html()+"'/>");

	tdAction.html(btnExpand + " "+ btnSave + " " + btnDelete);

	$(".save").bind("click", Save);
	$(".delete").bind("click", Delete);
 }; 



function Save(){

	$(".additionalInfoNotSaved").removeClass('additionalInfoNotSaved').addClass('additionalInfo');
	$(".todaysFoodListNotSaved").removeClass('todaysFoodListNotSaved').addClass('todaysFoodList');
	

	var grandParent = $(this).parent().parent();

	var foodName = grandParent.children("td:nth-child(1)").text(); //finds value of first td (food name) in row

	var a = foodDetailsArray.indexOf(foodName); //gets the text from the first cell (food name)
 
	var additionalInfoRow = grandParent.next().children("td:nth-child(1)"); //gets to the additional row element

	var tdName = grandParent.children("td:nth-child(1)");
	var tdGrams = grandParent.children("td:nth-child(2)");
	var tdCalories =  grandParent.children("td:nth-child(3)");
	var tdAction = grandParent.children("td:nth-child(4)");
	var tdDate = grandParent.children("td:nth-child(5)");

	var name = tdName.text();
	var grams = $("input[id=editGrams]").val();
	var date = tdDate.text();

	var calorieChange =  (foodDetailsArray[a+3] * (grams / foodDetailsArray[a+2])).toFixed(2);
	var proteinChange = (foodDetailsArray[a+4] * (grams / foodDetailsArray[a+2])).toFixed(2);
	var fatChange = (foodDetailsArray[a+5] * (grams / foodDetailsArray[a+2])).toFixed(2);
	var carbsChange = (foodDetailsArray[a+6] * (grams / foodDetailsArray[a+2])).toFixed(2);


	tdName.text(name);
	tdGrams.html(grams);
	tdCalories.html(calorieChange);
	tdAction.html(btnExpand + " " +btnEdit + " " +btnDelete);

	additionalInfoRow.html("  Protein: " + proteinChange + ",  Fat: " + fatChange +
						   ",  Carbs: " + carbsChange +""); //changes values of additional row if grams change


	$(".delete").bind("click", Delete);
	$(".edit").bind("click", Edit);


	savedFoodObject = {name:name, grams:grams, calories:calorieChange, protein:proteinChange,
						fat:fatChange, carbs:carbsChange};

	addUserFood();

	appendDatabaseRowsForChosenDate(date);

}


function addUserFood(){

	$.post("addUserFood.php",{  fName:savedFoodObject.name, 
								fGrams:savedFoodObject.grams,
								fCalories:savedFoodObject.calories,
								fProtein:savedFoodObject.protein,
								fFat:savedFoodObject.fat,
								fCarbs:savedFoodObject.carbs
							},  function(data) {
	});
}

function removeUserFood(){

	$.post("removeUserFood.php", {frName:foodToBeRemovedObject.name,
								  frGrams:foodToBeRemovedObject.grams,
								  frDate:foodToBeRemovedObject.dateadded
								}, function(data) {
	});
}



function appendDatabaseRowsForChosenDate(date) {

			$.post('getFoodForParticularDate.php', {particularDate:date}, function(data) {


	$("#myTable").empty();

		for (var i=0; i<12; i++) {
		$("#myTable").prepend("<tr class='emptyRows'><td></td><td></td><td></td><td></td></tr>");
	}

							$('#myTable').append(data); 

							var counter2 = 0;

							var arrayLength = foodDetailsArray.length / 7;

							 for (var i = 0; i < arrayLength; i++) {


							 	$("#myTable").prepend("<tr class='additionalInfo'><td>" + 
								"  Protein: " + foodDetailsArray[counter2+4] + 
								" g,  Fat: " + foodDetailsArray[counter2+5] +
								" g,  Carbs: " + foodDetailsArray[counter2+6]  +
								" g</td><td></td><td></td><td></td></tr>");


								$("#myTable").prepend("<tr class='todaysFoodList'><td class='foodName'>" + foodDetailsArray[counter2] 	 +  
													"</td><td class='grams'>" +foodDetailsArray[counter2+2]+
													"</td><td  class='calories'>" + Math.round(foodDetailsArray[counter2+3])  +
													"</td><td class='action'>" + btnExpand + " " +btnEdit + " " +btnDelete + 
													"</td><td class='dateadded'>"+ curdate+"</td></tr>");

								counter2 = counter2 + 7;

								$('.emptyRows').first().remove();

							 }

				$('.additionalInfo').hide();

				$(".delete").bind("click", Delete);
				$(".edit").bind("click", Edit);

				updateDaysTotals();
				getCaloriesForLast7Days(curdate);
			}); 
}


function updateDaysTotals(){

	var totalCalories = 0;
	var totalProtein = 0;
	var totalFat = 0;
	var totalCarbs = 0;

	counter3 = 0;

	var arrayLength = foodDetailsArray.length / 7;

 	for (var i = 0; i < arrayLength; i++) {

 		totalCalories += parseInt(foodDetailsArray[counter3+3]);
 		totalProtein += parseFloat(foodDetailsArray[counter3+4]);
 		totalFat += parseFloat(foodDetailsArray[counter3+5]);
 		totalCarbs += parseFloat(foodDetailsArray[counter3+6]);

 		counter3 = counter3 + 7;

	}


	if (totalCarbs == 0 && totalProtein == 0 &&  totalFat == 0) {
		var carbsChartData = 33;
		var protChartData = 33;
		var fatChartData = 33;

		var carbPercentage = 0;
		var protPercentage = 0;
		var fatPercentage = 0;
	} else {
		var carbsChartData = Math.round(totalCarbs*4);
		var protChartData = Math.round(totalProtein*4);
		var fatChartData = Math.round(totalFat*9);

		var carbPercentage = Math.round(totalCarbs * 4 / (totalCarbs*4 + totalProtein*4 + totalFat*9) *1000)/10;
		var protPercentage = Math.round(totalProtein * 4 / (totalCarbs*4 + totalProtein*4 + totalFat*9) *1000)/10;
		var fatPercentage = Math.round(totalFat * 9 / (totalCarbs*4 + totalProtein*4 + totalFat*9) *1000)/10;
	}


		var ctx = $("#mycanvas").get(0).getContext("2d");

		var data = [
			{
				value: carbsChartData,
				color: "#C4472B",
				highlight: "#D46C55",
				label: "Carbs"
			},
			{
				value: protChartData,
				color: "#5072AD",
				highlight: "#89A8CC",
				label: "Protein"
			},
			{
				value: fatChartData,
				color: "#64A177",
				highlight: "#A1CCAF",
				label: "Fat"
			}
		];

	var chart = new Chart(ctx).Doughnut(data);

	$("#dayInfo").html("<div id='daysTotalsDiv'>"+

		"<table id='dayInfoTable'><tr><td></td><td>Gr </td><td>Kcal </td><td>%</td></tr>"+

		"<tr><td id='dayInfoCarbs'><b>Carb. </b></td><td >" + Math.round(totalCarbs) +" </td><td>"+ Math.round(totalCarbs*4)+"</td><td>"+carbPercentage+"</td></tr>"+
		"<tr ><td id='dayInfoProtein'><b>Prot. </b></td><td>" + Math.round(totalProtein) +" </td><td>"+ Math.round(totalProtein*4)+"</td><td>"+protPercentage+"</td></tr>"+
		"<tr><td id='dayInfoFat'><b>Fat </b></td><td>" + Math.round(totalFat) +" </td><td>"+ Math.round(totalFat*9)+"</td><td>"+fatPercentage+"</td></tr></table>"+
		"<p id='dayInfoKcal'><b>Total calories: </b>"+ totalCalories + "</p>");




var barData = {
    labels: [last7DaysArray[12], last7DaysArray[10], last7DaysArray[8], last7DaysArray[6], 
    		last7DaysArray[4], last7DaysArray[2], last7DaysArray[0], 'avg'],
    datasets: [
        {
            label: 'Calorie intake',
            fillColor: ['#538741','#538741','#538741','#538741','#538741','#538741','#538741','#CC3825'],
            strokeColor:'#5072AD',
            data: [last7DaysCaloriesArray[6], last7DaysCaloriesArray[5], last7DaysCaloriesArray[4], last7DaysCaloriesArray[3], 
            last7DaysCaloriesArray[2], last7DaysCaloriesArray[1], last7DaysCaloriesArray[0], last7DaysCaloriesArray[7]]
        },
        {
            label: 'Calorie goal',
            fillColor: ['#626880','#626880','#626880','#626880','#626880','#626880','#626880','#626880'],
            strokeColor:'#5072AD',
            data: [2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000]
        }
    ]
};

var context = document.getElementById('barChart').getContext('2d');

var barChart = new Chart(context).Bar(barData);

}


function getDaysOfMonthForLast7Days(){
	
	var day = new Date();

	last7DaysArray.push(day.toISOString().slice(8, 10), day.toISOString().slice(0, 10));


	for (var i = 0; i <6; i++) {
		day.setDate(day.getDate() - 1);
		var justDays = day.toISOString().slice(8, 10);
		var justDaysLongForm = day.toISOString().slice(0, 10);
		last7DaysArray.push(justDays, justDaysLongForm);
	}
}


function getCaloriesForLast7Days(date) {


	$.post('getCaloriesForLast7Days.php', {particularDate:date}, function(data) {


							$('#myTable').append(data); 
							updateDaysTotals();

});

}


$("#homeBtn").on("click", function(){

	resetTabColor();

	$(this).css("background-color","white");
	$(this).css("color","#22558C");


	$("#addFoodContent").hide();

	$("#content").show();

});



$("#addFoodBtn").on("click", function(){

	resetTabColor();

	$(this).css("background-color","white");
	$(this).css("color","#22558C");

	$("#content").hide();

	$("#addFoodContent").show();

	updateCustomFoodList();

});


function resetTabColor() {
	$("#homeBtn").css("background-color","");
	$("#homeBtn").css("color","");

	$("#addFoodBtn").css("background-color","");
	$("#addFoodBtn").css("color","");

}



// CUSTOM FOOD -- CUSTOM FOOD -- CUSTOM FOOD -- CUSTOM FOOD -- CUSTOM FOOD -- CUSTOM FOOD



$("#AddFoodForm").submit(function(e) {
    e.preventDefault();
});


$("#submitFood").click(function() {
	
	$("#fillAll").remove();


	var name = $("input[name=nameCustom]").val();
	var calories = $("input[name=caloriesCustom]").val();
	var protein = $("input[name=proteinCustom]").val();
	var fat = $("input[name=fatCustom]").val();
	var carbs = $("input[name=carbsCustom]").val();




	foodCreationFormObject = {name:name, calories:calories, protein:protein,
						fat:fat, carbs:carbs};




	if (name == "" || calories == "" || protein == "" || fat == "" || carbs == "") {
		$('#addFoodFormContainer').append("<div><p id='fillAll'>Please fill all fields.</p></div>");

	} else {

	$('#customFoodTable').append("<tr><td>" + name +"</td><td>" + calories + 
								"</td><td>" + protein + "</td><td>" + fat + 
								"</td><td>" + carbs + "</td><td>" + btnDeleteCustom + 
								"</td></tr>");
	}

	$(".deleteCustom").bind("click", deleteCustom);

	addCustomFood();

});



function addCustomFood(){

	$.post("addCustomFood.php",{ customName:foodCreationFormObject.name, 
								customCalories:foodCreationFormObject.calories,
								customProtein:foodCreationFormObject.protein,
								customFat:foodCreationFormObject.fat,
								customCarbs:foodCreationFormObject.carbs
							},  function(data) {
	});


	$( '#AddFoodForm' ).each(function(){
	    this.reset();
	});

}



function deleteCustom() {
	var tdId = $(this).parent().parent().children("td:nth-child(7)");
	customFoodId = tdId.text();

	$.post("removeCustomUserFood.php", {id:customFoodId}, function(data) {
		updateCustomFoodList();
	});
}



function updateCustomFoodList() {


	$.post('getCustomFoods.php', function(data) {



	$("#customFoodTable").empty();


							$('#customFoodTable').append(data);

							var counter2 = 0;

							var arrayLength = customFoodsArray.length / 7;

							 for (var i = 0; i < arrayLength; i++) {



								$("#customFoodTable").append("<tr class='customFoodList'><td class='customFoodName'>" + customFoodsArray[counter2 + 1] 	 +  
													"</td><td class='customFoodCalories'>" +Math.round(customFoodsArray[counter2+2])+
													"</td><td  class='customFoodProtein'>" + Math.round(customFoodsArray[counter2+3])  +
													"</td><td  class='customFoodFat'>" + Math.round(customFoodsArray[counter2+4])  +
													"</td><td  class='customFoodCarbs'>" + Math.round(customFoodsArray[counter2+5])  +

													"</td><td class='customFoodAction'>" +btnDeleteCustom + 
													"</td><td class='customFoodId'>"+ customFoodsArray[counter2]+"</td></tr>");

								counter2 = counter2 + 7;


							 }


				$(".deleteCustom").bind("click", deleteCustom);
			}); 
}
