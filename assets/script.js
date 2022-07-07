var welcome = document.getElementById("Welcome");
var startBtn = document.getElementById("start_button");
var openingPage =document.getElementById("opening_page");
var backBtn =document.getElementById("back_btn");
var clearBtn=document.getElementById("clear_btn");

var questionPage = document.getElementById("question_page");
var askQuestion = document.getElementById("ask_question");

var choiceButtons = document.querySelectorAll(".choices");
var answer1 = document.getElementById("answer1");
var answer2 = document.getElementById("answer2");
var answer3 = document.getElementById("answer3");
var answer4 = document.getElementById("answer4");

var checkChoice = document.getElementById("checkChoice");
var ScoreList = document.getElementById("submit_page");
var finalScore = document.getElementById("final_score");
var userInitial =document.getElementById("initial");

var submitBtn =document.getElementById("submit");
var highScores =document.getElementById("highscores");
var scoreRecord =document.getElementById("score_record");
var done =document.getElementById("finish");

var secondsLeft = 60;
var totalScore = 0;
var questionCount = 1;
var questionIndex = 0;


//list of questons for quiz
var questionArray = [
    {
        question: "Questions 1 : The condition in an if / else statement is enclosed within ___.",
        choices: ["a. quotes", "b. curly brackets", "c. parenthesis", "d. square brackets"],
        answer: "c"
    },
    {
        question: "Questions 2 : A very useful tool used during development and debugging for printing content to the debugger is",
        choices: ["a. JavaScript", "b. terminal or bash", "c. console log", "d. numbers"],
        answer: "c"
    },
    {
        question: "Questions 3 : String values must be enclosed within _____ when being assigned to variables.",
        choices: ["a. commas", "b. quotes", "c. curly brackets", "d. parentheses"],
        answer: "b"
    },
    {
        question: "Questions 4 : How do you write 'Hello World' in an alert box?",
        choices: ["a. alert('Hello World')", "b. prompt('Hello World')", "c. alert('Hello World')", "d. alertBox('Hello World')"],
        answer: "c"
    },
    {
        question: "Questions 5 : Arrays in JavaScript can be used to store _____.",
        choices: ["a. other arrays", "b. booleans", "c. numbers and strings", "d. all of the above"],
        answer: "d"
    },
];
   

var timeLeft = document.getElementById("timer");

//set timer function for quiz
function countdown() {
        
        var timerInterval = setInterval(function () {

          secondsLeft--;
          timeLeft.textContent = "Time left: " + secondsLeft + " s";
    
            if (secondsLeft <= 0){
                clearInterval(timerInterval);
                timeLeft.textContent = "Time has run out"; 
                
                finish.textContent = "Time has run out!";
                gameOver();

            } else  if(questionCount >= questionArray.length +1) {
                clearInterval(timerInterval);
                gameOver();
                } 
    }, 1000);
}

    
function startQuiz () {
        openingPage.style.display = "none";
        questionPage.style.display = "block";
        questionIndex = 0
        countdown();    
        showQuestion(questionIndex);
      
}
//present the questions and answers
function showQuestion (x) {
        askQuestion.textContent = questionArray[x].question;
        answer1.textContent = questionArray[x].choices[0];
        answer2.textContent = questionArray[x].choices[1];
        answer3.textContent = questionArray[x].choices[2];
        answer4.textContent = questionArray[x].choices[3];
        questionIndex= x
    }

//checking to see if right or wrong answer was clicked and adding points to score
function checkAnswer(event) {
    event.preventDefault();
    checkChoice.style.display = "block";
    setTimeout(function () {
        checkChoice.style.display = 'none';
    }, 1000);

    if (questionArray[questionIndex].answer == event.target.value) {
        checkChoice.textContent = "Correct!"; 
        totalScore = totalScore + 1;

    } else {
        secondsLeft = secondsLeft - 10;
        checkChoice.textContent = "Wrong!"
    }
        
    if (questionIndex < questionArray.length -1 ) {
 
        showQuestion(questionIndex +1);
    } else {
    gameOver();
}
questionCount++;
}
//need to end the quiz
function gameOver() {

        questionPage.style.display = "none";
        ScoreList.style.display = "block";
        console.log(ScoreList);
        finalScore.textContent = "Final score :" + totalScore ;  
        timeLeft.style.display = "none"; 
};

//local storage and users initials for score list 
function getScore () {
    var currentList =localStorage.getItem("ScoreList");
    if (currentList !== null ){
        freshList = JSON.parse(currentList);
        return freshList;
    } else {
        freshList = [];
    }
    return freshList;
};


//displaying of highscores
function renderScore () {
    scoreRecord.innerHTML = "";
    scoreRecord.style.display ="block";
    var highScores = sort();   
    var topFive = highScores.slice(0,5);
    for (var i = 0; i < topFive.length; i++) {
        var item = topFive[i];
    var li = document.createElement("li");
    li.textContent = item.user + " - " + item.score;
    li.setAttribute("data-index", i);
    scoreRecord.appendChild(li);
    }
};

function sort () {
    var unsortedList = getScore();
    if (getScore == null ){
        return;
    } else{
    unsortedList.sort(function(a,b){
        return b.score - a.score;
    })
    return unsortedList;
}};

//setting up local storage 
function addItem (n) {
    var addedList = getScore();
    addedList.push(n);
    localStorage.setItem("ScoreList", JSON.stringify(addedList));
};

function saveScore () {
    var scoreItem ={
        user: userInitial.value,
        score: totalScore
    }
    addItem(scoreItem);
    renderScore();
}


startBtn.addEventListener("click", startQuiz);

choiceButtons.forEach(function(click){

    click.addEventListener("click", checkAnswer);
});

submitBtn.addEventListener("click", function(event) {
    event.preventDefault();
    ScoreList.style.display = "none";
    openingPage.style.display = "none";
    highScores.style.display = "block";
    questionPage.style.display ="none";
    saveScore();
});