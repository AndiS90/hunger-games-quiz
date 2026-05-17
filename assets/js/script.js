var timer = document.querySelector("#timer");

var question = document.querySelector("#question");
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

    retrHS();

    }
  }

