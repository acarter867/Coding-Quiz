const btnStart = document.getElementById('btn-start'),
timer = document.getElementById('timer'),
buttons = document.getElementsByTagName('button'),
btnClass = document.getElementById('m-choice'),
quizQuestion = document.getElementById('question'),
qResult = document.getElementById('question-result'),
subText = document.getElementById('subtext'),
submitScore = document.getElementById('initials-text'),
buttonsDiv = document.getElementById('post-quiz-buttons');
btnSubmit = document.getElementById('submit-score'),
initials = document.getElementById('txt-score'),
lblName = document.getElementById('name'),
scoresLink = document.getElementById('view-scores'),
scoresList = document.getElementById('scores'),
quizWindow = document.getElementById('quiz-start');

qResult.hidden = true;
submitScore.style.display = 'none';
let initialTime = 20;
let endOfQuiz = false;
let currentQuestion = 0;

let dontRepeat = true;

let questions = [
    {
      question: "Commonly used data types DO NOT include:",
      correctAnswer: "3. Alerts",
      answers: ["1. Strings", 
      "2. Booleans", 
      "3. Alerts", 
      "4. Numbers"]
    },
    {
      question:
        "The condition in an if/else statement is enclosed with _________.",
      correctAnswer: "3. Parenthesis",
      answers: [
        "1. Quotes",
        "2. Curly brackets",
        "3. Parenthesis",
        "4. Square brackets"]
    },
    {
      question: "Arrays in JavaScript can be used to store ___________.",
      correctAnswer: "4. All of the above",
      answers: [
        "1. Numbers and strings",
        "2. Other Arrays",
        "3. Booleans",
        "4. All of the above"]
    },
    {
      question:
        "String values must be enclosed within _________ when being assigned to variables.",
      correctAnswer: "3. Quotes",
      answers: ["1. Commas", 
      "2. Curly brackets", 
      "3. Quotes", 
      "4. Parenthesis"]
    },
    {
      question:
        "A very useful tool used during development and debugging for printing content to the debugger is:",
      correctAnswer: "4. Console.log",
      answers: [
        "1. Javascript",
        "2. Terminal/bash",
        "3. For loops",
        "4. Console.log"]
    },
  ];

scoresLink.addEventListener('click', showScores);

btnStart.addEventListener('click', startQuiz);

function startQuiz() {
  quizWindow.style.marginLeft = '20%'
  quizWindow.style.justifyContent = 'left';
  quizWindow.style.textAlign = 'left'
  btnClass.style.marginLeft = '0%';
  scoresLink.removeEventListener('click', showScores);
  scoresLink.addEventListener('click', function (){
    alert('Finish quiz to view high scores!');
  });
  subText.hidden = true;
  btnStart.removeEventListener('click', startQuiz);
  setButtons();

  for(let i = 0; i < buttons.length; i++){
    buttons[i].style.color = 'white';
    buttons[i].style.backgroundColor = 'blue';
  }

  let interval = setInterval(() => {
    timer.innerHTML = "Time: " + --initialTime;
    if (initialTime <= 0 || endOfQuiz) {
      if(initialTime <= 0){
        endQuiz();
      }
      clearInterval(interval);
    }
  }, 1000); 
}

function setButtons(){
  if(currentQuestion >= 5){
    endQuiz();
    return;
  }
    quizQuestion.innerHTML = questions[currentQuestion].question;
    if(btnClass.children.length < 4) {
      const mChoice = [document.createElement('button'), document.createElement('button'), document.createElement('button')];
      for (let i = 0; i < mChoice.length; i++) {
        btnClass.appendChild(mChoice[i]);
      }
    }

    for(let j = 0; j < btnClass.children.length; j++){
    let currentBtn = btnClass.children[j];
    currentBtn.innerHTML = questions[currentQuestion].answers[j];

    currentBtn.addEventListener('mouseenter', (e) => {
      currentBtn.style.backgroundColor = 'red';
    });
    currentBtn.addEventListener('mouseleave', (e) => {
      currentBtn.style.backgroundColor = 'blue';
    });
      currentBtn.addEventListener('click', updateButtons);
    }
  }

  function updateButtons(){
    qResult.hidden = false;
    let userAnswer = this.innerHTML;
    if(userAnswer === questions[currentQuestion].correctAnswer){      
      qResult.innerHTML = "Correct!";
    }else{
      initialTime -= 10;
      qResult.innerHTML = "Incorrect!";
    }
    for(let i = 0; i < btnClass.children.length; i++){
      btnClass.children[i].innerHTML = questions[currentQuestion].answers[i];
    }
    currentQuestion++;
    setButtons();
  }

function endQuiz(){
  endOfQuiz = true;
  subText.hidden = false;
  submitScore.style.display = 'flex';
  subText.innerHTML = "Your final score is: " + (initialTime - 1);
    console.log(questions.length);
    quizQuestion.innerHTML = "All Done!";
    while(btnClass.firstChild){
      btnClass.removeChild(btnClass.firstChild);
    }
  }

  btnSubmit.addEventListener('click', function(){
    let pScore = initialTime;
    let pName = initials.value;

    let localStorageScores = JSON.parse(localStorage.getItem('entries'));

      const entry = {
      initials: pName,
      score: pScore
    };
    if(dontRepeat && entry.score < 75){
      if(localStorageScores != null){
        localStorageScores.push(entry);
        let submission = JSON.stringify(localStorageScores);
        console.log("submission: " + submission);
        localStorage.setItem('entries', submission);
      }else{
        let firstSub = [entry];
        localStorage.setItem('entries', JSON.stringify(firstSub));
      }
    }

    dontRepeat = false;

    showScores();
    formatScoreBtns();
  });



function showScores(){
  btnSubmit.style.backgroundColor = 'blue';
  scoresLink.removeEventListener('click', showScores);
  quizQuestion.innerHTML = "High Scores";
  quizWindow.style.marginLeft = '20%'
  quizWindow.style.marginRight = '20%';
  quizWindow.style.justifyContent = 'left';
  quizWindow.style.textAlign = 'left'
  btnClass.style.marginLeft = '0%';

  subText.hidden = true;
  lblName.hidden = true;
  initials.hidden = true;
  btnStart.hidden = true;

  if(submitScore.children.length < 4){
    const newButton = document.createElement('button');
    newButton.setAttribute('id', 'clearScores');
    buttonsDiv.appendChild(newButton);
    newButton.textContent = 'Clear Scores'
    newButton.style.backgroundColor = 'blue';

    newButton.addEventListener('mouseenter', () => {
      newButton.style.backgroundColor = 'red';
    });
    newButton.addEventListener('mouseleave', () => {
      newButton.style.backgroundColor = 'blue';
    });

    btnSubmit.addEventListener('mouseenter', () => {
      btnSubmit.style.backgroundColor = 'red';
    });
    btnSubmit.addEventListener('mouseleave', () => {
      btnSubmit.style.backgroundColor = 'blue';
    });

    let allEntries = JSON.parse(localStorage.getItem('entries'));
    allEntries.sort((a, b) => {
      return b.score - a.score;
    });


    submitScore.style.display = 'flex';
    submitScore.style.flexDirection = 'column';
    for(let i = 0; i < allEntries.length; i++){
      let listItem = document.createElement('li');
      listItem.textContent = allEntries[i].initials + '-' + allEntries[i].score;
      if(i % 2 === 0){
        listItem.style.backgroundColor = 'lightgray';
      }
      scoresList.appendChild(listItem);

      listItem.style.textAlign = 'left';
      listItem.style.paddingLeft = '10px';
    }
    console.log(allEntries);

    btnSubmit.textContent = 'Go back';
    btnSubmit.addEventListener('click', () => {
      scoresLink.addEventListener('click', showScores);
      location.reload();
      dontRepeat = true;
    });
  }
}

  function formatScoreBtns(){
    btnSubmit.textContent = 'Go back';
    const newButton = document.getElementById('clearScores');
    btnSubmit.addEventListener('click', () => {
      location.reload();
      dontRepeat = true;
    });

    newButton.addEventListener('click', () => {
      localStorage.clear();
      initials.value = " ";
      scoresList.hidden = true;
      quizQuestion.textContent = 'High Scores Cleared!';
    });
  }