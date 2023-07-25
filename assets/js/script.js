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
let clear = document.getElementById("clear");
let result = document.getElementById("result-text");
let savedScore = document.getElementById("savedScore");
let storeInitials = [];
let timeInterval;

// Questions, options and answers are stored in an array
let questions = [
  {
    questionText: "What is the correct way to declare a variable in JavaScript?",
    options: ["1. variable = 10;", "2. var = 10;", "3. let variable = 10;", "4. int variable = 10;"],
    answer: "3. let variable = 10;",
  },
  {
    questionText: "Which method is used to add an element to the end of an array in JavaScript?",
    options: [
      "1. array.add(element);",
      "2. array.insertLast(element);",
      "3. array.push(element);",
      "4. array.addElement(element);",
    ],
    answer: "3. array.push(element);",
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
    btn.classList.add("answerBtn");
    btn.textContent = questions[currentQuestion].options[i];
    answerOptions.append(btn);
  }
};

// Show whether the answer is correct or incorrect for 2 seconds
// LAST ANSWER DOES NOT DISPLAY
const displayAnswer = () => {
  let timeInterval = 2;
  timeInterval = setInterval(() => {
    if (timeInterval > 0) {
      resultCard.classList.remove("hide");
    } else {
      resultCard.classList.add("hide");
      clearInterval(timeInterval);
    }
  }, 1000);
};

// Check if the answer is correct and if not remove 5 seconds
const checkAnswer = (userChoice) => {
  if (userChoice === questions[currentQuestion].answer) {
    currentQuestion++;
    result.textContent = "Correct";
    displayAnswer();
    renderQuestionText();
  } else {
    currentQuestion++;
    timeLeft -= 5;
    result.textContent = "Incorrect";
    displayAnswer();
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
    score: timeLeft,
  };
  storeInitials.push(user);
  localStorage.setItem("highScores", JSON.stringify(storeInitials));
  // Store score and initials to highscores
  let pEl = document.createElement("p");
  pEl.textContent = user.initials + ": " + user.score;
  savedScore.append(pEl);
};

let allScores = document.getElementById("allScores");
// Save scores to localstorage and high scores
const saveToHighScoreCard = () => {
  user = JSON.parse(localStorage.getItem("highScores"));
  user.push(allScores);
  console.log("user", user);
}
allScores.textContent = "Test";

highScoresButton.addEventListener("click", () => {
  highScoreCard.classList.replace("hide", "show");
  resultCard.classList.replace("show", "hide");
  scoreCard.classList.replace("show", "hide");
  startCard.setAttribute("hidden", true);
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
  saveToHighScoreCard();
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
