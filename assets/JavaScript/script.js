const btnStart = document.getElementById('btn-start'),
timer = document.getElementById('timer'),
buttons = document.getElementsByTagName('button'),
btnClass = document.getElementById('m-choice'),
quizQuestion = document.getElementById('question'),
qResult = document.getElementById('question-result');

let initialTime = 75;
qResult.hidden = true;

let questions = [
    {
      number: 1,
      question: "Commonly used data types DO NOT include:",
      correctAnswer: "3. Alerts",
      answers: ["1. Strings", "2. Booleans", "3. Alerts", "4. Numbers"],
    },
    {
      number: 2,
      question:
        "The condition in an if/else statement is enclosed with _________.",
      correctAnswer: "3. Parenthesis",
      answers: [
        "1. Quotes",
        "2. Curly brackets",
        "3. Parenthesis",
        "4. Square brackets",
      ],
    },
    {
      number: 3,
      question: "Arrays in JavaScript can be used to store ___________.",
      correctAnswer: "4. All of the above",
      answers: [
        "1. Numbers and strings",
        "2. Other Arrays",
        "3. Booleans",
        "4. All of the above",
      ],
    },
    {
      number: 4,
      question:
        "String values must be enclosed within _________ when being assigned to variables.",
      correctAnswer: "3. Quotes",
      answers: ["1. Commas", "2. Curly brackets", "3. Quotes", "4. Parenthesis"],
    },
    {
      number: 5,
      question:
        "A very useful tool used during development and debugging for printing content to the debugger is:",
      correctAnswer: "4. Console.log",
      answers: [
        "1. Javascript",
        "2. Terminal/bash",
        "3. For loops",
        "4. Console.log",
      ],
    },
  ];

btnStart.addEventListener('click', startQuiz);

function startQuiz() {
  btnStart.removeEventListener('click', startQuiz);
    setQuestions(0);

    for(let i = 0; i < buttons.length; i++){
      buttons[i].style.color = 'green';
      buttons[i].style.backgroundColor = 'blue';
    }


    interval = setInterval(() => {
    timer.innerHTML = "Time: " + --initialTime;
    if(initialTime <= 0){
        console.log("OUT OF TIME FUCK-O");
        clearInterval(interval);
      }
    }, 1000);  

} 

function setQuestions(qNum){
  quizQuestion.innerHTML = questions[qNum].question;
  if(btnClass.children.length < 4){
    const mChoice = [document.createElement('button'), document.createElement('button'), document.createElement('button')];

    for(let i = 0; i < mChoice.length; i++){
      btnClass.appendChild(mChoice[i]);
    }
  }
  
  for(let j = 0; j < btnClass.children.length; j++){
    let currentBtn = btnClass.children[j];
    currentBtn.innerHTML = questions[qNum].answers[j];
    
    currentBtn.addEventListener('mouseenter', (e) => {
      currentBtn.style.backgroundColor = 'red';
    });
    currentBtn.addEventListener('mouseleave', (e) => {
      currentBtn.style.backgroundColor = 'blue';
    })
      currentBtn.addEventListener('click', (e) => {
      qResult.hidden = false;
      console.log("asdf");
      checkQuesion(qNum, currentBtn.innerHTML);
    })
   

  }
}

function checkQuesion(qNum, answer){
  if(answer === questions[qNum].correctAnswer){
    qResult.innerHTML = 'Correct!'    
  }else{
    qResult.innerHTML = 'Incorrect!'
    console.log('hmm');
    initialTime -= 10;
  }

  if(qNum < questions.length - 1){
    setQuestions(qNum + 1);
  }else{
    endQuiz();
  }
}

function endQuiz(){
  quizQuestion.innerHTML = "QUIZ OVER";
}