let time = document.getElementById("time");
let highScoresButton = document.getElementById("highScoresButton");
let startButton = document.getElementById("startButton");
let answerOptions = document.querySelector("#question-answers");
let startCard = document.getElementById("startCard");
let questionCard = document.getElementById("questions");
let resultCard = document.getElementById("result");
let questionText = document.getElementById("question-text");
let scoreCard = document.getElementById("score");
let highScoreCard = document.getElementById("highScores");
let pointsEl = document.getElementById("points");
let restartEl = document.getElementById("restart");
let backEl = document.getElementById("back");
let saveEl = document.getElementById("save");
let userName = document.getElementById("userName");
let savedUser = document.getElementById("savedUser");
let savedScore = document.getElementById("savedScore");
let clear = document.getElementById("clear");
let storeInitials = [];
let timeInterval;

// Questions, options and answers are stored in an array
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
let timeLeft = 30;

const countdown = () => {
  timeInterval = setInterval(() => {
    if (timeLeft > 0) {
      time.textContent = "Time Left: " + timeLeft;
      timeLeft--;
    } else {
      time.textContent = "Time is up!";
      endGame();
    }
  }, 1000);
};

// Let the questions start at index 0
let currentQuestion = 0;

// After the first question is display, iterate through questions
const renderQuestionText = () => {
  questionCard.classList.replace("hide", "show");
  if (currentQuestion === questions.length) {
    endGame();
  }
  answerOptions.innerHTML = "";
  questionText.textContent = questions[currentQuestion].questionText;
  for (let i = 0; i < questions[i].options.length; i++) {
    const btn = document.createElement("button");
    btn.textContent = questions[currentQuestion].options[i];
    answerOptions.append(btn);
  }
};

// Check if the answer is correct and if not remove 5 seconds
const checkAnswer = (userChoice) => {
  if (userChoice === questions[currentQuestion].answer) {
    currentQuestion++;
    renderQuestionText();
  } else {
    currentQuestion++;
    timeLeft -= 5;
    renderQuestionText();
  }
};

const endGame = () => {
  questionCard.style.display = "none";
  resultCard.style.display = "none";
  scoreCard.classList.replace("hide", "show");
  clearInterval(timeInterval);
};

// Save the score and user to localstorage
const saveHighScore = (initials) => {
  storeInitials = JSON.parse(localStorage.getItem("highScores")) || [];
  const user = {
    initials: initials,
    score: timeLeft + 1,
  }
  storeInitials.push(user);
  localStorage.setItem("highScores", JSON.stringify(storeInitials));
};

highScoresButton.addEventListener("click", () => {
  highScoreCard.classList.replace("hide", "show");
  startCard.setAttribute("hidden", true);
  resultCard.setAttribute("hidden", true);
  scoreCard.setAttribute("hidden", true);
});

// Reload window to starting card
restartEl.addEventListener("click", () => {
  window.location.reload();
});

// Reload window to starting card
backEl.addEventListener("click", () => {
  window.location.reload();
});

// Save the users initials to saveHighScore function
saveEl.addEventListener("click", () => {
  const userInitials = userName.value;
  saveHighScore(userInitials);
});

// When the start button is clicked, begin the timer
startButton.addEventListener("click", () => {
  startCard.classList.add("hide");
  countdown();
  renderQuestionText();
});

answerOptions.addEventListener("click", (event) => {
  let userChoice = event.target.textContent;
  checkAnswer(userChoice);
});

// Clear the local storage
clear.addEventListener("click", () => {
  localStorage.clear();
});