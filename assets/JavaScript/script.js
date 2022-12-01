const btnStart = document.getElementById('btn-start'),
timer = document.getElementById('timer');

let initialTime = 75;

let questions = [
    {
      number: 1,
      question: "Commonly used data types DO NOT include:",
      correctAnswer: "alerts",
      answers: ["1. strings", "2. booleans", "3. alerts", "4. numbers"],
    },
    {
      number: 2,
      question:
        "The condition in an if/else statement is enclosed with _________.",
      correctAnswer: "parenthesis",
      answers: [
        "1. quotes",
        "2. curly brackets",
        "3. parenthesis",
        "4. square brackets",
      ],
    },
    {
      number: 3,
      question: "Arrays in JavaScript can be used to store ___________.",
      correctAnswer: "all of the above",
      answers: [
        "1. numbers and strings",
        "2. other arrays",
        "3. booleans",
        "4. all of the above",
      ],
    },
    {
      number: 4,
      question:
        "String values must be enclosed within _________ when being assigned to variables.",
      correctAnswer: "quotes",
      answers: ["1. commas", "2. curly brackets", "3. quotes", "4. parenthesis"],
    },
    {
      number: 5,
      question:
        "A very useful tool used during development and debugging for printing content to the debugger is:",
      correctAnswer: "console.log",
      answers: [
        "1. Javascript",
        "2. terminal/bash",
        "3. for loops",
        "4. console.log",
      ],
    },
  ];

btnStart.addEventListener('click', startQuiz);

function startQuiz() {
    interval = setInterval(() => {
    timer.innerHTML = "Time: " + --initialTime;
    if(initialTime <= 0){
        console.log("OUT OF TIME FUCK-O");
        clearInterval(interval);
    }
}, 1000);
} 

function startTimer(){
    setInterval(updateTimer, 1000);    
}

