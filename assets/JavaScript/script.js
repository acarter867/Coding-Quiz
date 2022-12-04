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
    question: "Commonly used data types DO NOT include:",
    correctAnswer: "3. Alerts",
    answers: ["1. Strings", "2. Booleans", "3. Alerts", "4. Numbers"],
  },
  {
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
    question:
        "String values must be enclosed within _________ when being assigned to variables.",
    correctAnswer: "3. Quotes",
    answers: ["1. Commas", "2. Curly brackets", "3. Quotes", "4. Parenthesis"],
  },
  {
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


  let interval = setInterval(() => {
    timer.innerHTML = "Time: " + --initialTime;
    if (initialTime <= 0) {
      console.log("OUT OF TIME FUCK-O");
      clearInterval(interval);
    }
  }, 1000);

}

function setQuestions(qNum){
  console.log("qNum: " + (qNum + 1));
  quizQuestion.innerHTML = questions[qNum].question;
  if(btnClass.children.length < 3){
    console.log("this should only run once");
    const mChoice = [document.createElement('button'), document.createElement('button'), document.createElement('button')];

    for(let i = 0; i < mChoice.length; i++){
      btnClass.appendChild(mChoice[i]);
    }
  }


  // for(let j = 0; j < btnClass.children.length; j++){
  //   let currentBtn = btnClass.children[j];
  //   currentBtn.innerHTML = questions[qNum].answers[j];
  //
  //   currentBtn.addEventListener('mouseenter', (e) => {
  //     currentBtn.style.backgroundColor = 'red';
  //   });
  //   currentBtn.addEventListener('mouseleave', (e) => {
  //     currentBtn.style.backgroundColor = 'blue';
  //   })

  btnClass.children[0].innerHTML = questions[qNum].answers[0];
  btnClass.children[0].addEventListener('mouseenter', (e) => {
    btnClass.children[0].style.backgroundColor = 'red';
  });
  btnClass.children[0].addEventListener('mouseleave', (e) => {
    btnClass.children[0].style.backgroundColor = 'blue';
  });


  btnClass.children[1].innerHTML = questions[qNum].answers[1];
  btnClass.children[1].addEventListener('mouseenter', (e) => {
    btnClass.children[1].style.backgroundColor = 'red';
  });
  btnClass.children[1].addEventListener('mouseleave', (e) => {
    btnClass.children[1].style.backgroundColor = 'blue';
  });


  btnClass.children[2].innerHTML = questions[qNum].answers[2];
  btnClass.children[2].addEventListener('mouseenter', (e) => {
    btnClass.children[2].style.backgroundColor = 'red';
  });
  btnClass.children[2].addEventListener('mouseleave', (e) => {
    btnClass.children[2].style.backgroundColor = 'blue';
  });


  btnClass.children[3].innerHTML = questions[qNum].answers[3];
  btnClass.children[3].addEventListener('mouseenter', (e) => {
    btnClass.children[3].style.backgroundColor = 'red';
  });
  btnClass.children[3].addEventListener('mouseleave', (e) => {
    btnClass.children[3].style.backgroundColor = 'blue';
  });



  btnClass.children[0].addEventListener('click', () => {
    qResult.hidden = false;
    checkQuestion(qNum, btnClass.children[0].innerHTML);
  });
  btnClass.children[1].addEventListener('click', () => {
    qResult.hidden = false;
    checkQuestion(qNum, btnClass.children[1].innerHTML);
  });
  btnClass.children[2].addEventListener('click', () => {
    qResult.hidden = false;
    checkQuestion(qNum, btnClass.children[2].innerHTML);
  });
  btnClass.children[3].addEventListener('click', () => {
    qResult.hidden = false;
    checkQuestion(qNum, btnClass.children[3].innerHTML);
  });

    // currentBtn.addEventListener('click', () => {
    //   qResult.hidden = false;
    //   //console.log(currentBtn.innerHTML)
    //   checkQuesion(qNum, currentBtn.innerHTML);
    // });

}

function checkQuestion(qNum, answer){
  if(answer === questions[qNum].correctAnswer){
    qResult.innerHTML = 'Correct!'
  }else{
    qResult.innerHTML = 'Incorrect!'
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
