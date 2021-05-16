$(document).ready(function(){
	//global variables
	var history=[];
	var expression=0;
	var result=0;
	
	//open history tab
	$("#history_btn").click(function(){
		$("#history").width(400);
		$("#buttons").find("button").attr("disabled", "disabled");
	});

	//close history tab
	$("#close_history_btn").click(function(){
		$("#history").width(0);
		$("#buttons").find("button").removeAttr("disabled");

	});

	//clear history
	$("#clear_history_btn").click(function(){
		history =[];
		$('#history_display').html("");
	});

	//create expression
	$('.expression').click(function(){
		var value =  $(this).val();
		var id= $(this).attr('id');
		var result_text = $("#display").text();
		if(result_text == 0 || result_text !=result ){
			if(expression==0){
				expression = value;
			}
			else{
				prev = expression;
				expression = expression + value;
			}
			$('#display').text(expression);
		}
		else if(result_text == result){	
			if(id=="add_btn" || id=="sub_btn" || id=="mul_btn" || id=="square_btn" || id=="div_btn")
			{
				prev = expression;
				expression = expression + value;
				$('#display').text(expression);	
			}
			else{
				prev = result_text;
				expression = value;
				$('#display').text(expression);	
			}
		}
		
	});

	//evaluate
	$('#equal_btn').click(function(){
		try{
			if(expression =="")
			expression=0;
			result= eval(expression);
			if($.type(result)!="undefined"){
				prev = expression + "=" + result;
				expression = result;
				$('#prev').text(prev);
				$('#display').text(result);
				console.log("length: "+history.length);
				if(history.length>15){
					history.shift();
				}
				console.log(history);
				history.push("<br/>"+prev);
				$('#history_display').html(history);
			}
			else{
				alert("Invalid expression");
				expression = 0;
				$('#prev').text(prev);
				$('#display').text('0');
			}
		}
		catch(err){
			alert("Invalid expression");
			expression = 0;
			$('#display').text(0);
		}
		
	});

	//clear prev and current expr
	$('#clear_all_btn').click(function(){
		expression = 0 ;
		prev =0 ;

		$('#prev').text(prev);
		$('#display').text(expression);
	});

	//clear last typed key
	$('#clear_btn').click(function(){
		try{
			expression = expression.substr(0,expression.length-1);
			if(expression.length ==0 )
			expression=0;
		}
		catch(err){
			expression=0;
		}
		$("#display").text(expression);
	});

	//evaluate using enter key
	$(document).keypress(function(event){
		var keycode = event.keyCode ? event.keyCode : event.which;

		if(keycode=='13'){
			$('#equal_btn').click();
		}
	});
});
	