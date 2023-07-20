let time = document.getElementById("time");
let highScoresButton = document.getElementById("highScoresButton");
let startButton = document.getElementById("startButton");
// Classname?????
let answerOptions = document.getElementsByClassName("option-button");
let startCard = document.getElementById("startCard");
let questionCard = document.getElementById("questions");
let resultCard = document.getElementById("result");
let questionText = document.getElementById("question-text");
let scoreCard = document.getElementById("score");
let highScoreCard = document.getElementById("highScores");
let winsEl = document.getElementById("wins");
let lossesEl = document.getElementById("losses");
let pointsEl = document.getElementById("points");
let gamesWon = 0;
let gamesLost = 0;

let wins = localStorage.getItem("wins");
let losses = localStorage.getItem("losses");

//Questions, options and answers are stored in an array
let questions = [
  {
    questionText: "Where do you place an external JavaScript file?",
    options: ["1. <h1>", "2. <js>", "3. <script>", "4. <head>"],
    answer: "3. <script>",
  },
  {
    questionText: "What does the DOM stand for?",
    options: [
      "1. do overnight modules",
      "2. document object model",
      "3. department of modeling",
      "4. do over methods",
    ],
    answer: "2. document object model",
  },
  {
    questionText: "String values must be enclosed in what?",
    options: ["1. commas", "2. curly brackets", "3. quotes", "4. parentheses"],
    answer: "3. quotes",
  },
  {
    questionText:
      "A very useful tool used during development and debugging for printing content to the debugger is:",
    options: [
      "1. JavaScript",
      "2. terminal/bash",
      "3. for loops",
      "4. console.log",
    ],
    answer: "4. console.log",
  },
  {
    questionText: "Arrays in Javascript can be used to store __________.",
    options: ["1. numbers", "2. booleans", "3. strings", "4. all of the above"],
    answer: "4. all of the above",
  },
];

// Timer for the game to countdown
let timeLeft = 5;

const countdown = () => {
  let timeInterval = setInterval(() => {
    if (timeLeft > 0) {
      time.textContent = "Time Left: " + timeLeft;
      timeLeft--;
      loseGame();
    } else {
      time.textContent = "Time is up!";
      clearInterval(timeInterval);
      endGame();
    }
  }, 1000);
};

// When the start button is clicked, begin the timer
startButton.addEventListener("click", () => {
  if (startButton) {
    countdown();
    hideCards();
    renderQuestion();
  }
});

// NOT WORKING!
// Only first index is responding
let answers = answerOptions[0];
answers.addEventListener("click", () => {
  firstQuestion();
  renderQuestion();
});

// Setting attribute to hide cards
const hideCards = () => {
  startCard.setAttribute("hidden", true);
  questionCard.removeAttribute("hidden", true);
  resultCard.setAttribute("hidden", true);
  scoreCard.setAttribute("hidden", true);
};

// Let the questions start at index 0
let currentQuestion = 0;

const firstQuestion = () => {
  if (currentQuestion < questions.length - 1) {
    currentQuestion++;
  }
};

// After the first question is display, iterate through questions
const renderQuestion = () => {
  questionText.textContent = questions[currentQuestion].questionText;
  // answerOptions.textContent = questions[currentQuestion].options[0];
}

const winGame = () => {
  gamesWon++;
  winsEl.textContent = gamesWon;
  localStorage.setItem("wins", gamesWon);
}

const loseGame = () => {
  gamesLost++;
  lossesEl.textContent = gamesLost;
  localStorage.setItem("losses", gamesLost);
}

const endGame = () => {
  scoreCard.removeAttribute("hidden", true);
  questionCard.setAttribute("hidden", true);
  winGame();
  loseGame();
}

highScoresButton.addEventListener("click", () => {
  highScoreCard.removeAttribute("hidden", true);
  startCard.setAttribute("hidden", true);
  resultCard.setAttribute("hidden", true);
  scoreCard.setAttribute("hidden", true);
})