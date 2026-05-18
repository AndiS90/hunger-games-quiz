var timerEl = document.querySelector("#timer");

var questionEl = document.querySelector("#question");
var ansA = document.querySelector("#ans1");
var ansB = document.querySelector("#ans2");
var ansC = document.querySelector("#ans3");
var ansD = document.querySelector("#ans4");
var ansElArray = [ansA, ansB, ansC, ansD];

var validator = document.querySelector("#validator");

var startB = document.querySelector("#start");

var score1 = document.querySelector("#score1");
var score2 = document.querySelector("#score2");
var score3 = document.querySelector("#score3");
var score4 = document.querySelector("#score4");
var score5 = document.querySelector("#score5");
var hsElArray = [score1, score2, score3, score4, score5];

//declare these variables globally so they can be referenced within multiple functions.
var secondsLeft = 0; 
var currentQ = [];
var score = 0;
var clickCount = 0;

//storing the questions and answers as key-value pairs in objects, later put into an accesible array
var question1 = {
    question: "What District of Panem is Katniss from?",
    correct: "12",
    wrong1: "8",
    wrong2: "3",
    wrong3: "5"
}

var question2 = {
    question: "What industry is District 12 known for?",
    correct: "Coal Mining",
    wrong1: "Farming/Agriculture",
    wrong2: "Weapons Manufacturing",
    wrong3: "Textiles/Fabrics"
}

var question3 = {
    question: "What item of food did Peeta throw to Katniss?",
    correct: "a burnt bread loaf ",
    wrong1: "a dirty bundle of carrots",
    wrong2: "a fresh rabbit carcass",
    wrong3: "a moldy wheel of cheese"
}

var question4 = {
    question: "What's Katniss's little sister's name?",
    correct: "Prim",
    wrong1: "Rue",
    wrong2: "Glimmer",
    wrong3: "Hope"
}

var question5 = {
    question: "What does Peeta do to upset Katniss during the pre-game interviews?",
    correct: "admit he has a life-long crush on her",
    wrong1: "insults her back-alley hunting skills",
    wrong2: "trips her, ripping and ruining her pretty dress",
    wrong3: "say he's determined to win no matter what"
}

var question6 = {
    question: "When Katniss is forced up a tree and surrounded by enemies below, what does Rue point to?",
    correct: "a tracker jacker nest",
    wrong1: "an incoming sponsor delivery",
    wrong2: "the sky display announcing the day's deaths",
    wrong3: "a mockingjay nest"
}

var question7 = {
    question: "When Rue dies, how does Katniss rebel against the capitol?",
    correct: "adorning Rue's body with flowers",
    wrong1: "going on a rampage and winning the entirety of the games in 2 hours",
    wrong2: "using her bow and arrows to shoot down the drone retreiving Rue's body",
    wrong3: "immediately tried to poison herself"
}

var question8 = {
    question: "What is the historic game changing announcement made by the gamemakers?",
    correct: "There can be multiple winners, as long as they are from the same district",
    wrong1: "Each player may choose one ally to 'co-win' with",
    wrong2: "There's been a revolution and the players must now kill citizens",
    wrong3: "There's been a revolution and the games are over, survivors go home."
}

var question9 = {
    question: "Who makes Katniss and Peeta into a complicated love triangle?",
    correct: "Gale",
    wrong1: "Cato",
    wrong2: "Thrash",
    wrong3: "Katniss's distant cousin"
}

var question10 = {
    question: "What was the head gamemaker's fate?",
    correct: "a highly implied forced suicide",
    wrong1: "a really big promotion",
    wrong2: "a public whipping",
    wrong3: "his own tv show"
}

var questionArray = [question1, question2, question3, question4, question5, question6, question7, question8, question9, question10];

//as the first thing this game should load is previous hs
//we'll start there.

init();

function init() {
  retrHS();
}

//gets scores out of local storage or sets a default list if empty

function retrHS() {
  var hsRetr = JSON.parse(localStorage.getItem("scoreList"));

  if (hsRetr !== null) {
    for (i = 0; i < hsElArray.length; i++) {
      hsElArray[i].textContent = hsRetr[i].score + ":" + hsRetr[i].initials;
    }
  } else {
    var scoresArray = [{
        score: 0o0,
        initials: "AAA",
    },{
        score: 0o0,
        initials: "AAA",
    },{
        score: 0o0,
        initials: "AAA",
    },{
        score: 0o0,
        initials: "AAA",
    },{
        score: 0o0,
        initials: "AAA",
    }];

    localStorage.setItem("scoreList", JSON.stringify(scoresArray));
    //you want to recall the function because after setting the scores to local storage,
    //you still need them pulled into the page.
    retrHS();

    }
  }

//We'll want to start the game by pressing the start button and having the questions and answers rendered,
//while a timer starts.

//import/copy the Fisher-Yates shuffle for easy random array item shuffling.

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}


function renderQnAs(){

    //currentQ becomes an array with the one element being the returned value of the first element in the array, an object.
    currentQ = questionArray.shift();

    //assign the text content of the question element to the object's value at key 'question'
    questionEl.textContent = currentQ.question;

    //put the possible answers into an array and shuffle them using the previous provided function
    possAnswersArray = [currentQ.correct, currentQ.wrong1, currentQ.wrong2, currentQ.wrong3];

    shuffle(possAnswersArray);

    //then use a for loop to assign each element in the possAnswerArray to be the content of the corresponding html element array element m
    for (i = 0; i < possAnswersArray.length; i++){

        ansElArray[i].textContent = possAnswersArray[i];
    }
}

function setTimer(){
    var timeInterval = setInterval(function(){
       secondsLeft--;
       var pluralness = secondsLeft > 1? "s" : "";
        timerEl.textContent = secondsLeft + " second" + pluralness + " left"

        if (secondsLeft >= 0 && clickCount >= 10) {

            playerWon();
            clearInterval(timeInterval);

        }
        if (secondsLeft === 0){
            clearInterval(timeInterval)

            timerEl.textContent = "The timer was not in your favor. Sorry you lost."

        }

    }, 1000);
}

//now that a timer is built, let's activate it when the start button is clicked.
startB.addEventListener("click", startGame);

function startGame(){
    //set the timer to start amount.
    secondsLeft = 25;
    setTimer();

    //since you don't want the game to accidentally start over, over a misclick, disable the start button.
    startB.disabled = true;

    //as the timer starts, you want the questions to appear simultaneously.
    renderQnAs();
}


//now that the questions are appearing when the start button is clicked, we need to check if the clicked answer is correct
//as well as render the following question.
//first add event listeners for the answer choices.

for (i = 0; i < ansElArray.length; i++){

    ansElArray[i].addEventListener("click", checkAnswer);

    ansElArray[i].addEventListener("click", renderQnAs);
}

function checkAnswer(event){
    event.stopPropagation();

    var selected = event.currentTarget;
        
    clickCount+= 1;

    if(selected.textContent === currentQ.correct){
        score += 10;
        secondsLeft += 2;

        validator.textContent = "The odds appear in your favor. Score = " + score;
    } else {
        score -= 5;
        secondsLeft -= 3;

        validator.textContent = "The odds ARE NOT in your favor. Score = " + score;
    }
}

function playerWon(){
    //first let the player know they've completed the game w/ a lil pop-up
    alert("Congratulations! You Win! Your score is " + score);

    //pull the scores uno mas
     var hsRetr = JSON.parse(localStorage.getItem("scoreList"));

     //check to see if players current score is higher than the last element in the retreived high scores array

     if( score > hsRetr[hsRetr.length-1].score){
        
        submitHS = confirm("Submit your score to the leaderboard?");
     }

     if (submitHS){

        //if player chooses to submit, grab initials and score and store them in object matching items in scoresArray
        var initials = prompt("What are your initials?")

        var submission = {
            score: score,
            initials: initials
        };

        hsRetr.push(submission);

        //the sort below puts the lowest score at index 0 and highest in last place
        hsRetr.sort((a,b) => a.score - b.score);
        //reverse the order of the array
        hsRetr.reverse();
        //remove the lowest score from the array which is in the last index spot.
        hsRetr.pop()

        localStorage.setItem("scoreList", JSON.stringify(hsRetr));
    //you want to recall the function because after setting the scores to local storage,
    //you still need them pulled into the page.
    retrHS();
     }
}