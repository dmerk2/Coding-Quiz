let time = document.getElementById("time");
let startButton = document.getElementById("startButton");
// Classname?????
let answerOptions = document.getElementsByClassName("option-button");
let startCard = document.getElementById("startCard");
let questionCard = document.getElementById("questions");
let resultCard = document.getElementById("result");
let questionText = document.getElementById("question-text");

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
let timeLeft = 60;

const countdown = () => {
  let timeInterval = setInterval(() => {
    if (timeLeft > 0) {
      time.textContent = "Time Left: " + timeLeft;
      timeLeft--;
    } else {
      time.textContent = "Time is up!";
      clearInterval(timeInterval);
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
  console.log("clicked");
  nextQuestion();
  renderQuestion();
});

// Setting attribute to hide cards
const hideCards = () => {
  startCard.setAttribute("hidden", true);
  questionCard.removeAttribute("hidden", true);
  resultCard.removeAttribute("hidden", true);
};

let currentQuestion = 0;

const nextQuestion = () => {
  if (currentQuestion < questions.length - 1) {
    currentQuestion++;
  }
};

const renderQuestion = () => {
  questionText.textContent = questions[currentQuestion].questionText;
}