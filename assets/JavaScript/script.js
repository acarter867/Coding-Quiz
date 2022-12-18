// DOM variables
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

// Don't show result until question is answered
qResult.hidden = true;

//hide submission until quiz is complete 
submitScore.style.display = 'none';

//starting time 
let initialTime = 75;

//set true when quiz is over to stop timer
let endOfQuiz = false;

//starting question
let currentQuestion = 0;

// To make sure scores can only be submitted once
let dontRepeat = true;

//array of quiz questions
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

//activate 'view scores' option 
scoresLink.addEventListener('click', showScores);

//start quiz
btnStart.addEventListener('click', startQuiz);


function startQuiz() {
  //initial quiz styling
  quizWindow.style.marginLeft = '20%'
  quizWindow.style.justifyContent = 'left';
  quizWindow.style.textAlign = 'left'
  btnClass.style.marginLeft = '0%';

  //make scores link only clickable once to avoid repeating submissions
  scoresLink.removeEventListener('click', showScores);

  //Avoid abandoning quiz before completion
  scoresLink.addEventListener('click', function (){
    alert('Finish quiz to view high scores!');
  });

  //hide subtext
  subText.hidden = true;
  btnStart.removeEventListener('click', startQuiz);

  //call formatting and text for answer buttons
  setButtons();

  //format all current buttons
  for(let i = 0; i < buttons.length; i++){
    buttons[i].style.color = 'white';
    buttons[i].style.backgroundColor = 'blue';
  }

  //set time interval
  let interval = setInterval(() => {
    timer.innerHTML = "Time: " + --initialTime;
    if (initialTime <= 0 || endOfQuiz) {
      clearInterval(interval);
      if(initialTime <= 0){
        //skip to end when time hits zero
        endQuiz();
      }
      
    }
  }, 1000); 
}

//set buttons for current question
function setButtons(){
  //if currentquestion is >= 5, quiz is over
  if(currentQuestion >= 5){
    endQuiz();
    return;
  }
  //set quiz question to currentquestion
    quizQuestion.innerHTML = questions[currentQuestion].question;
    if(btnClass.children.length < 4) {
      //ensure that all question choices are listed
      const mChoice = [document.createElement('button'), document.createElement('button'), document.createElement('button')];
      for (let i = 0; i < mChoice.length; i++) {
        //append new buttons to parent
        btnClass.appendChild(mChoice[i]);
      }
    }


    //set answer buttons text & hover properties for asthetics
    for(let j = 0; j < btnClass.children.length; j++){
    let currentBtn = btnClass.children[j];
    currentBtn.innerHTML = questions[currentQuestion].answers[j];

    currentBtn.addEventListener('mouseenter', (e) => {
      currentBtn.style.backgroundColor = 'red';
    });
    currentBtn.addEventListener('mouseleave', (e) => {
      currentBtn.style.backgroundColor = 'blue';
    });
      //submit answer and go to next question
      currentBtn.addEventListener('click', updateButtons);
    }
  }

  function updateButtons(){
    //show result (correct or incorrect) status of last question
    qResult.hidden = false;

    //get text from selected answer
    let userAnswer = this.innerHTML;

    //compare user answer to correct answer
    if(userAnswer === questions[currentQuestion].correctAnswer){      
      qResult.innerHTML = "Correct!";
    }else{
      //if wrong, deduct 10 seconds
      initialTime -= 10;
      qResult.innerHTML = "Incorrect!";
    }
    for(let i = 0; i < btnClass.children.length; i++){
      //set text for next question
      btnClass.children[i].innerHTML = questions[currentQuestion].answers[i];
    }

    //increment question number
    currentQuestion++;
    
    //recursive call to set buttons for next question
    setButtons();
  }

//end of quiz formats for score submission
function endQuiz(){
  //stop timer
  endOfQuiz = true;

  //bring subtext back for display
  subText.hidden = false;

  //from none to flex
  submitScore.style.display = 'flex';

  //display score
  subText.innerHTML = "Your final score is: " + (initialTime - 1);
    console.log(questions.length);
    quizQuestion.innerHTML = "All Done!";

    //remove all answer buttons
    while(btnClass.firstChild){
      btnClass.removeChild(btnClass.firstChild);
    }
  }

  //submit initials and score to local storage
  btnSubmit.addEventListener('click', function(){
    let pScore = initialTime;
    let pName = initials.value;

    //pull scores array from local storage to compare
    let localStorageScores = JSON.parse(localStorage.getItem('entries'));

      //submission object
      const entry = {
      initials: pName,
      score: pScore
    };
    //'high scores' link was submitting current score when no quiz had been taken. 75 score is not possible, and should be excluded
    if(dontRepeat && entry.score < 75){

      //if local storage is not null, pull scores and add newest submission to array and push appended array to local storage
      if(localStorageScores != null){
        localStorageScores.push(entry);
        let submission = JSON.stringify(localStorageScores);
        console.log("submission: " + submission);
        localStorage.setItem('entries', submission);
      }else{
        // if localStorageScores is null, no submissions have been made, so we need to create the first submission manually.
        let firstSub = [entry];
        localStorage.setItem('entries', JSON.stringify(firstSub));
      }
    }
    
    //reactivate so future scores can be processsed.
    dontRepeat = false;

    showScores();
    formatScoreBtns();
  });

function showScores(){

  //prevent user from repeatedly clicking scores link and creating multiple lists of scores
  scoresLink.removeEventListener('click', showScores);

  //reformat scores display manually
  btnSubmit.style.backgroundColor = 'blue';
  quizQuestion.innerHTML = "High Scores";
  quizWindow.style.marginLeft = '20%'
  quizWindow.style.marginRight = '20%';
  quizWindow.style.justifyContent = 'left';
  quizWindow.style.textAlign = 'left'
  btnClass.style.marginLeft = '0%';

  //hide all in-quiz items
  subText.hidden = true;
  lblName.hidden = true;
  initials.hidden = true;
  btnStart.hidden = true;

  //submitScore.children.length should be 4 with clear scores button, so we need to double check to make sure we have all needed elements
  if(submitScore.children.length < 4){
    const newButton = document.createElement('button');
    newButton.setAttribute('id', 'clearScores');
    buttonsDiv.appendChild(newButton);
    newButton.textContent = 'Clear Scores'

    //restyle buttons manually in the event that they havent been styled yet
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


    //pull all scores from local storage
    let allEntries = JSON.parse(localStorage.getItem('entries'));

    //sort allEntries by score in descending order
    allEntries.sort((a, b) => {
      return b.score - a.score;
    });
    
    //more formatting for submission display
    submitScore.style.display = 'flex';
    submitScore.style.flexDirection = 'column';

    //display all submissions in ordered list in a list item
    for(let i = 0; i < allEntries.length; i++){
      let listItem = document.createElement('li');
      listItem.textContent = allEntries[i].initials + '-' + allEntries[i].score;

      //alternate setting background color from white to lightgray for asthetics
      if(i % 2 === 0){
        listItem.style.backgroundColor = 'lightgray';
      }

      //add list item to ordered list
      scoresList.appendChild(listItem);
      
      //additional styling for list items
      listItem.style.textAlign = 'left';
      listItem.style.paddingLeft = '10px';
    }

    btnSubmit.textContent = 'Go back';
    btnSubmit.addEventListener('click', () => {
      
      //reactivate 'Show Scores'
      scoresLink.addEventListener('click', showScores);

      //refresh webpage
      location.reload();

      //reactivate don't repeat to prevent duplicates
      dontRepeat = true;
    });
  }
}


//formatting for submission buttons after quiz is complete
  function formatScoreBtns(){
    btnSubmit.textContent = 'Go back';
    const newButton = document.getElementById('clearScores');
    btnSubmit.addEventListener('click', () => {
      location.reload();
      dontRepeat = true;
    });

    //clear scores button clears list and local storage. lets user know that the local storage wipe was succsessful
    newButton.addEventListener('click', () => {
      localStorage.clear();
      initials.value = " ";
      scoresList.hidden = true;
      quizQuestion.textContent = 'High Scores Cleared!';
    });
  }