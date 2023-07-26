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
let finalScore;

// Questions, options and answers are stored in an array
let questions = [
  {
    questionText:
      "What is the correct way to declare a variable in JavaScript?",
    options: [
      "1. variable = 10;",
      "2. var = 10;",
      "3. let variable = 10;",
      "4. int variable = 10;",
    ],
    answer: "3. let variable = 10;",
  },
  {
    questionText:
      "Which method is used to add an element to the end of an array in JavaScript?",
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
  }
];

// Timer for the game to countdown
let timeLeft = 45;

const countdown = () => {
  timeInterval = setInterval(() => {
    if (timeLeft > 0) {
      timeLeft--;
      time.textContent = "Time Left: " + timeLeft;
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
    btn.setAttribute("class", "answerBtn");
    btn.textContent = questions[currentQuestion].options[i];
    answerOptions.append(btn);
  }
};

// Check if the answer is correct and if not remove 5 seconds
const checkAnswer = (userChoice) => {
  if (userChoice === questions[currentQuestion].answer) {
    resultCard.classList.replace("hide", "show");
    result.textContent = "Correct";
    setTimeout(() => {
      resultCard.classList.replace("show", "hide");
      currentQuestion++;
      renderQuestionText();
    }, 1000);
  } else {
    resultCard.classList.replace("hide", "show");
    result.textContent = "Incorrect";
    setTimeout(() => {
      resultCard.classList.replace("show", "hide");
      currentQuestion++;
      timeLeft -= 5;
      renderQuestionText();
    }, 1000);
  }
};

const endGame = () => {
  questionCard.style.display = "none";
  resultCard.style.display = "none";
  scoreCard.classList.replace("hide", "show");
  clearInterval(timeInterval);
  time.textContent = `Time Left: ${timeLeft}`;
  finalScore = timeLeft;
};

// Save the score and user to localstorage
const saveHighScore = (initials) => {
  storeInitials = JSON.parse(localStorage.getItem("highScores")) || [];
  const user = {
    initials: initials,
    score: finalScore,
  };
  storeInitials.push(user);
  localStorage.setItem("highScores", JSON.stringify(storeInitials));
  // Store score and initials to highscores
  const pEl = document.createElement("p");
  pEl.textContent = user.initials + ": " + user.score;
  savedScore.append(pEl);
};

let allScores = document.getElementById("allScores");
// Pull initials and scores from local storage and store in high scores
const saveToHighScoreCard = () => {
  allScores.innerHTML = "";
  storeInitials = JSON.parse(localStorage.getItem("highScores")) || [];
  //Create and appen list items to ul in high scores
  for (let i = 0; i < storeInitials.length; i++) {
    const li = document.createElement("li");
    li.textContent = storeInitials[i].initials + ": " + storeInitials[i].score;
    allScores.append(li);
  }
};

highScoresButton.addEventListener("click", () => {
  highScoreCard.classList.replace("hide", "show");
  resultCard.classList.replace("show", "hide");
  scoreCard.classList.replace("show", "hide");
  startCard.setAttribute("hidden", true);
  saveToHighScoreCard();
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
  // If no value is entered return an alert to the user
  if (!userInitials) {
    alert("Please enter your initials!");
    return;
  }
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

// Clear the local storage and empty highscores 
clear.addEventListener("click", () => {
  localStorage.clear();
  allScores.innerHTML = " ";
});
