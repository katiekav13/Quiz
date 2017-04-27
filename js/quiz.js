var pos = 0, test, test_status, question, choice, choices, choiceA, choiceB, choiceC, correct=0, name = 0; 
//f= freetext
// q3 ewe's, q5 Jones',		
// 30 questions

var answers = new Array();
var timeLimit = 180;

var questions=[
	['F', 'In Bingo, what number is referred to as ‘Doctor’s Orders’?', "9"],
	['What is the Mexican food Gazpacho?', 'Cold soup', 'Ketchup', 'A burger', "A"],
	['What is the French blue cheese made from ewes milk?', 'Bree', 'Edam', 'Roquefort', "C"],
	['Who would use a trudgeon?', 'A farmer', 'A swimmer', 'A doctor', "B"],
	['In what year was the All Ireland Football Championship first held in Jones Road (now Croke Park)?', 1890, 1895, 1990, "B"],
	['What did Thomas Crapper invent?', 'Thomas the Tank Engine', 'The modern flushing toilet', 'The light bulb', "B"],
	['What is the second smallest county in Ireland?', 'Carlow', 'Louth', 'Longford', "A"],
	['What is the minimum age one must be to contest the Irish Presidential election?', 32, 43, 35, "C"],
	['The Book of Kells was written in what language?', 'Latin', 'Irish', 'English', "A"],
	['How many people are needed for a three-legged race?', 2, 3, 4, "C"],
	['What type of footwear invented in 1815, which enables the wearer to move very quickly over smooth, flat ground?', 'Roller-skates', 'Skateboards', 'Healys', "A"],
	['The basket under a hot-air balloon is officially known as what?', 'A basket', 'A gondola', 'A bucket', "B"],
	['What dog is named after a Mexican State?', 'Lassie', 'Toto', 'The Chihuaha', "C"],
	['If it is 12 midday in Dublin, what time is it in Tokyo?', '3PM', '6PM', '9PM', "C"],
	['F', 'Which country reaches further North, Finland or Norway?', "Norway"],
	['What was the first country to win the World Cup twice?', 'Italy', 'Geramny', 'France', "A"],
	['How many sides has a heptagon?', 5, 6, 7, "C"],
	['Name one of the two tiles with the highest score in Scrabble?', 'Q', 'Z', 'Both', "C"],
	['What is the name of the police officer in Top Cat?', 'Chief Wiggum', 'Officer Dibble', 'Inspector Clouseau', "B"],
	['Which three-digit number refers to the NOT FOUND error message indicating that a HTTP server cannot find the requested item?', 404, 132, 212, "A"],
	['In the song "The 12 Days of Xmas", what did my true love send to me on the 9th day?', 'Gold rings', 'Pipers piping', 'Ladies dancing', "C"],
	['How many digits in a Visa Card number??', 14, 16, 18, "B"],
	['Which early President of the United States, as well as writing most of the Declaration of Independence, also invented the swivel chair?', 'George Washington', 'John Adams', 'Thomas Jefferson', "C"],
	['What angle (in degrees)is formed by the hands of a clock at 4 o clock?', 90, 180, 120, "C"],
	['How did Vincent Van Gogh sign his paintings?', 'Vincent', 'Van Gogh', 'VVG', "A"],
	['How many toes does a dog have?', 12, 18, 20, "B"],
	['What canal is located behind Croke Parks Canal End?', 'The Royal Canal', 'The Barrow Way', 'The Grand Canal', "A"],
	['What was the first phrase recorded by Thomas Edison on his phonograph?', 'Twinkle twinkle', 'Ba ba black sheep', 'Mary had a little lamb', "C"],
	['What life-saving device did Sir Humphry Davy invent?', 'The Defibulator', 'The Davy Lamp', 'The Pace-Maker', "B"],
	['What is the main ingredient of pasta?', 'Flour', 'Water', 'Both', "C"]
]

var x = setInterval(function() {
	
	minutes = Math.floor(timeLimit / 60);
	seconds = timeLimit - minutes * 60;
	
	// add a leading zero if seconds are less than 10
	if (seconds < 10) seconds = "0"+seconds;
	// timer
	_("timer").innerHTML = minutes+":"+seconds;
	
	if(timeLimit < 1)
	{
		clearInterval(x);
		// reset the quiz
		window.location = "index.html";
	}
	
	timeLimit--;
}, 1000);

function _(x)
{ 
    return document.getElementById(x);
} 

// percent		
function percent()
{
    var perc = Math.round((correct/questions.length)*100);
    return perc;
}

function ValidateEmail(mail)    
{   
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail))
    {   
        return (true)   
    }   
    return (false)   
}
 
//validation with alert if no values in either
function validate()
{
	errorText = "";
	if (!ValidateEmail(document.getElementById("email").value))
	{
		errorText += "You must supply a valid e-mail address\n\n";
	}
	if((document.getElementById("person").value).length < 3 )
	{
		errorText += "You must supply a name longer than 3 characters\n\n";
	}
	if(errorText == "")
	{
		return true;
	}
	else
	{
		alert(errorText);
		return false;
	}
}

//opens mail
function mailTo()
{
	if(validate())
	{
		formattedBody = "Hi "+document.getElementById("person").value+", \n";
		formattedBody += "\n";
		formattedBody += "Your score was "+percent()+"%";
		mailToLink = "mailto:"+document.getElementById("email").value+"?subject=Score&body=" + encodeURIComponent(formattedBody);
		window.location.href = mailToLink;
	}
	
}

//opens print
function printTo()
{
	if(validate())
	{
		window.print();
	}
}

// questions right/wrong in results
function createCell(idx, cell) 
{
	var div = document.createElement('div'); // create DIV element
	txt = document.createTextNode(idx+1); // create text node
	div.appendChild(txt);
	if(answers[idx] == true)
	{
		div.setAttribute('class', 'green');        // set DIV class attribute
	}
	else
	{
		div.setAttribute('class', 'red');        // set DIV class attribute
	}
	cell.appendChild(div);                   // append DIV to the table cell
}

function renderQuestion()
{
	
	test = _("test");
	//display result
	if(pos >= questions.length)
	{
		// Stop the timer
		clearInterval(x);
		
		_("test_status").innerHTML = "";
		_("test_status").style="max-width: 400px;";
		test.innerHTML = "<h2>You got "+correct+" of "+questions.length+" questions correct (" +percent() + "%)</h2>";
		_("test_status").innerHTML += "&nbsp;Thank you for completing the quiz";//print "thank you .... "
		// free text and buttons for print and email
		test.innerHTML += "Name : <input id='person' type='text' />&nbsp;&nbsp;&nbsp;&nbsp;";
		test.innerHTML += "e-mail : <input id='email' type='text' /><br /><br />";
		test.innerHTML += "<input id='send' type='button' value='Send e-mail' onclick='mailTo();' />";
		test.innerHTML += "<input id='print' type='button' value='Print Result' onclick='printTo();' />";
		
		test.innerHTML += "<br /><br />";
		
		test.innerHTML += "<table id='resultsTable'></table>";
		
		myTab = document.getElementById("resultsTable");
		row = myTab.insertRow(0);
		for (i = 0; i < 30; i++) 
		{
			createCell(i, row.insertCell(i));
		}
    
		pos = 0
		
		return false;
	}
	
	//progress bar
	var bar=document.getElementById("progressBar");
	
	_("test_status").innerHTML = "&nbsp;Question "+(pos+1)+" of "+questions.length;
	
	bar.value = (pos+1);
	//multi or free text
	type = questions[pos][0];
	if (type == 'F')
	{
		question = questions[pos][1];
		test.innerHTML = "<h3>"+question+"</h3>";
		test.innerHTML += "<input type='text' name='choices'><br><br>";
		test.innerHTML += "<button onclick='checkAnswer()'>Submit Answer</button>";
	}
	else
	{
		question = questions[pos][0];
		choiceA = questions[pos][1];
		choiceB = questions[pos][2];
		choiceC = questions[pos][3];
		test.innerHTML = "<h3>"+question+"</h3>";
		test.innerHTML += "<input type='radio' name='choices' value='A' checked> "+choiceA+"<br>";
		test.innerHTML += "<input type='radio' name='choices' value='B'> "+choiceB+"<br>";
		test.innerHTML += "<input type='radio' name='choices' value='C'> "+choiceC+"<br><br>";
		test.innerHTML += "<button onclick='checkAnswer()'>Submit Answer</button>";
	}
}

function checkAnswer()
{
	type = questions[pos][0];
	if (type == 'F')
	{
		choices = document.getElementsByName("choices");
		choice = choices[0].value;
		
		console.log(choice);
		if(choice.toUpperCase() == questions[pos][2].toUpperCase())
		{
			answers[pos] = true;
			alert('Correct!');
			correct++;
		}
		else
		{
			answers[pos] = false;
			alert('Sorry wrong answer. The correct answer is ' + questions[pos][2]);
		}
	}
	else
	{
		choices = document.getElementsByName("choices");
		for(var i=0; i<choices.length; i++)
		{
			if(choices[i].checked)
			{
				choice = choices[i].value;
			}
		}
		
		console.log(choice);
		if(choice == questions[pos][4])
		{
			answers[pos] = true;
			alert('Correct!');
			correct++;
		}
		else
		{
			answers[pos] = false;
			alert('Sorry wrong answer. The correct answer is ' + questions[pos][4]);
		}
	}	


	
	pos++
	
	renderQuestion();
}

window.addEventListener("load", renderQuestion, false);

//college
/*function validateEmail(field) {
    if (field == "")
        return "No Email was entered.\n";
      else if (!((field.indexOf(".") > 0) &&
                 (field.indexOf("@") > 0)) ||
                 /[^a-zA-Z0-9.@_-]/.test(field))
          return "The Email address is invalid.\n";

    return "";
}*/

//online
/*function ValidateEmail(mail)   
{  
	if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(myForm.emailAddr.value))  
	{  
    return (true)  
	}  
		alert("You have entered an invalid email address!")  
		return (false)  
}  */
