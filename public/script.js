$("#form").submit(function(e) {
    e.preventDefault();
});


$("#submit").click(function() {
	$("#fillAll").remove();
	$("#useValidEmail").remove();

	var name = $("input[name=name]").val();
	var num = $("input[name=number]").val();
	var email = $("input[name=email]").val();

	var btnEdit = "<input type='image' src='img/edit20px.png' class='edit'/>";
	var btnDelete = "<input type='image' src='img/delete20px.png' class='delete'/>";

	if (name == "" || num == "" || email == "") {
		$('#form').append("<div><p id='fillAll'>Please fill all fields properly.</p></div>");
	 } else if (chkEmail(email) == false) {
	 	$('#form').append("<div><p id='useValidEmail'>Please enter a valid email.</p></div>");
	} else {

	$('#myTable').prepend("<tr><td id='foodName'>" + name +"</td><td id='grams'>" + email + "</td><td id='calories'>" +
						num + "</td><td id='action'>" + btnEdit + " " +btnDelete + "</td></tr>");
	}

	$(".edit").bind("click", Edit);
	$(".delete").bind("click", Delete);

});


// $(document).on("click", "#myTable tr", function(e) {

// 		$(".test").css("background-color", "");
// 		$(this).css("background-color", "#FAFCFC");
// 		$(this).attr('class', 'test');
		
// });


function Delete(){ 
        $( this ).parent().parent().hide(500, function(){ //callback function is here because when hiding rows
        	$( this ).remove();							  //the table rows kept their original colors and so the table
        });												  //didn't keep the blue-white pattern. Remove helped with this
 														  //but the hide animation was lost. This way both the pattern 
}; 														  //and animation are kept

 function Edit(){ 
	var par = $(this).parent().parent(); 

	var tdName = par.children("td:nth-child(1)");
	var tdEmail = par.children("td:nth-child(2)");
	var tdNumber =  par.children("td:nth-child(3)");
	var tdAction = par.children("td:nth-child(4)");

	var btnSave = "<input type='image' src='img/save20px.png' class='save'/>";
	var btnDelete = "<input type='image' src='img/delete20px.png' class='delete'/>";


	tdName.html("<input type='text' id='editName' value='"+tdName.html()+"'/>");
	tdEmail.html("<input type='email' id='editEmail' maxlength='4' size='4' value='"+tdEmail.html()+"'/>");
	tdNumber.html(tdNumber.html());
	tdAction.html(btnSave + " " + btnDelete);


	$(".save").bind("click", Save);
	$(".delete").bind("click", Delete);
 }; 


function Save(){

	$("#fillAll").remove();
	$("#useValidEmail").remove();

	var par = $(this).parent().parent(); 

	var tdName = par.children("td:nth-child(1)");
	var tdEmail = par.children("td:nth-child(2)");
	var tdNumber =  par.children("td:nth-child(3)");
	var tdAction = par.children("td:nth-child(4)");

	var name = $("input[id=editName]").val();
	var num = $("input[id=editNumber]").val();
	var email = $("input[id=editEmail]").val();
	var btnEdit = "<input type='image' src='img/edit20px.png' class='edit'/>";
	var btnDelete = "<input type='image' src='img/delete20px.png' class='delete'/>";

	if (name == "" || num == "" || email == "") {
		$('#form').append("<div><p id='fillAll'>Please fill all fields properly.</p></div>");
	 } else if (chkEmail(email) == false) {
	 	$('#form').append("<div><p id='useValidEmail'>Please enter a valid email.</p></div>");
	} else {

		tdName.html(name);
		tdEmail.html(email);
		tdNumber.html(num);
		tdAction.html(btnEdit + " " +btnDelete);
	}

	$(".delete").bind("click", Delete);
	$(".edit").bind("click", Edit);
}


function Close () {
	$("#details").remove();
}

// function Read(){

// 	var par = $(this).parent().parent(); 

// 	var tdName = par.children("td:nth-child(1)");
// 	var tdEmail = par.children("td:nth-child(2)");
// 	var tdNumber =  par.children("td:nth-child(3)");
// 	var tdAction = par.children("td:nth-child(4)");

// 	var btnClose = "<button class='close'>Close </button>";

// 	$("#details").remove();

// 	$('#container').append("<div id='details'> "
// 					+ "<b>Details:</b>"
// 					+ btnClose 
// 					+"<br/>"
// 					+ "Name: "
// 					+ tdName.html()
// 					+"<br/>"
// 					+ "Email: "
// 					+ tdEmail.html()
// 					+"<br/>"
// 					+ "Number: "
// 					+ tdNumber.html()
// 						+"</div>");

// 	$(".close").bind("click", Close);

// }


function chkEmail (input) {
	var string1 = "@";
	var string2 = ".";
 
	if (input.indexOf(string1) > -1 && input.indexOf(string2) > -1 ) {
		return true;
	} else {
		return false;
	}
};