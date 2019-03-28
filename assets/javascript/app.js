$(document).ready(function() {

// Global variable declarations here 

var questions = [
  {
    question: "What primarch of the legions did Horus kill before his confrontation with the Empereror of Mankind?",
    correct: "Sanguinius",
    answers: ["Rogal Dorn", "Gabriel Angelos", "Ferrus Manus"],
    imageURL: "assets/images/Sanguinius.jpg" 
  },
  {
    question: "The primary weapon of all space marines is the...",
    correct: "Bolter",
    answers: ["Plasma Gun", "Chainsword", "Volkite Charger"],
    imageURL: "assets/images/bolter.jpg" 
  },
  {
    question: "The first legion of space marines to be founded was the...",
    correct: "Dark Angels",
    answers: ["Ultramarines", "Space Wolves", "World Eaters"],
    imageURL: "assets/images/darkangelslogo.jpg" 
  },
  {
    question: "The space marine legions were reformed into what organization after the second founding?",
    correct: "Adeptus Astartes",
    answers: ["Adeptus Ministorum", "Ordo Inquisitorum", "Astra Militarum"],
    imageURL: "assets/images/astartes.jpg" 
  },
  {
    question: "The most powerful tank in the Imperial Guard is the...",
    correct: "Baneblade",
    answers: ["Leman Russ", "Chimera", "Hellhound"],
    imageURL: "assets/images/baneblade.jpg" 
  },
  {
    question: "Which winged vehicle carries the space marines down to battle from the ships in orbit?",
    correct: "Thunderhawk",
    answers: ["Interceptor", "Valkyrie", "Drop Pod"],
    imageURL: "assets/images/thunderhawk.jpg" 
  },
  {
    question: "The heaviest form of space marine armor is...",
    correct: "Terminator",
    answers: ["Mk. IV", "Corvus", "Mk. VII"],
    imageURL: "assets/images/terminator.jpg" 
  },
  {
    question: "__________ powers almost all of the equipment used by the Imperium...",
    correct: "Plasma",
    answers: ["Ions", "Faith in the Emperor", "Gravitons"],
    imageURL: "assets/images/plasmagun.jpg" 
  },
];

var correctCount = 0;
var wrongCount = 0;
var unanswerCount = 0;
var timer = 10;
var intervalId;
var userGuess ="";
var running = false;
var qCount = questions.length;
var index;
var newArray = [];
var holder = [];



$("#reset").hide();
//click start button to start game
$("#start-button").on("click", function () {
		$("#start").hide();
		displayQuestion();
		runTimer();
		for(var i = 0; i < questions.length; i++) {
	holder.push(questions[i]);
}
	})
//timer start
function runTimer(){
	if (!running) {
	intervalId = setInterval(decrement, 1000); 
	running = true;
	}
}
//timer countdown
function decrement() {
	$("#timeleft").html("<h3>Time remaining: " + timer + "</h3>");
	timer --;

	//timerStop timer if reach 0
	if (timer === 0) {
		unanswerCount++;
		timerStop();
		$("#answerblock").html("<p>Time is up! The correct answer is: " + questions.choice[questions.answer] + "</p>");
		hidepicture();
	}	
}

//timer stop function
function timertimerStop() {
	running = false;
	clearInterval(intervalId);
}
//randomly questions question in array if not already shown
//display question and loop though and display possible answers
function displayQuestion() {
	//generate random index in array
	index = Math.floor(Math.random()*questions.length);
	questions = questions[index];


		//iterate through answer array and display
    $("#questionblock").html("<h2>" + questions.question + "</h2>");
    i = Math.floor(Math.random()*3);
		for (var i = 0; i < questions.choice.length; i++) {
			var userChoice = $("<div class='answerchoice'>").text(questions.choice[i]).attr("data-guessvalue", i);
			//append question to the answerblock div
			$("#answerblock").append(userChoice);
//		}
}



//click function to select answer and outcomes
$(".answerchoice").on("click", function () {
	//grab array position from userGuess
	userGuess = parseInt($(this).attr("data-guessvalue"));

	//correct guess or wrong guess outcomes
	if (userGuess === questions.answer) {
		timerStop();
		correctCount++;
		userGuess="";
		$("#answerblock").html("<p>Correct!</p>");
		hidepicture();

	} else {
		timerStop();
		wrongCount++;
		userGuess="";
		$("#answerblock").html("<p>Wrong! The correct answer is: " + questions.choice[questions.answer] + "</p>");
		hidepicture();
	}
})
}


function hidepicture () {
	$("#answerblock").append("<img src=" + questions.photo + ">");
	newArray.push(questions);
	questions.splice(index,1);

	var hidpic = setTimeout(function() {
		$("#answerblock").empty();
		timer= 20;

	//run the score screen if all questions answered
	if ((wrongCount + correctCount + unanswerCount) === qCount) {
		$("#questionblock").empty();
		$("#questionblock").html("<h3>Game Over!  Here's how you did: </h3>");
		$("#answerblock").append("<h4> Correct: " + correctCount + "</h4>" );
		$("#answerblock").append("<h4> Incorrect: " + wrongCount + "</h4>" );
		$("#answerblock").append("<h4> Unanswered: " + unanswerCount + "</h4>" );
		$("#reset").show();
		correctCount = 0;
		wrongCount = 0;
		unanswerCount = 0;

	} else {
		runTimer();
		displayQuestion();

	}
	}, 3000);


}

$("#reset").on("click", function() {
$("#reset").hide();
$("#answerblock").empty();
$("#questionblock").empty();
for(var i = 0; i < holder.length; i++) {
	questions.push(holder[i]);
}
runTimer();
displayQuestion();

})

})