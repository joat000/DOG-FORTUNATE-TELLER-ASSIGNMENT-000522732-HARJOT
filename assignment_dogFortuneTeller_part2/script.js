// TODO(you): Write the JavaScript necessary to complete the homework.

// You can access the RESULTS_MAP from "constants.js" in this file since
// "constants.js" has been included before "script.js" in index.html.

//The choice  picked for each question. null means "not answered yet".
let answerone = null;
let answertwo = null;
let answerthree = null;

//Becomes true once all 3 questions are answered
let quizisdone = false;

//Grab the page elements we need
const allchoices = document.querySelectorAll('.choice-grid div');
const resultbox = document.getElementById('results');
const resulttitle = document.getElementById('result-title');
const resultcontents = document.getElementById('result-contents');
const restartbutton = document.getElementById('restart-btn');
const pickaup = document.querySelector('.question-name');

//what happens when user clcik a choice
function handleclick(event){
    //if quiz is finished do nothing
    if (quizisdone=== true){
        return;
    }


//The choice that was clicked
const clicked = event.currentTarget;
const questionId = clicked.dataset.questionId;
const choiceId = clicked.dataset.choiceId;

//Remember the answer for that question
if (questionId ==="one"){
    answerone = choiceId;
}else if (questionId === "two"){
    answertwo = choiceId;
}else if (questionId === "three"){
    answerthree=choiceId;
}

//Go Through every choice and updatethe look of thisquestion choices
for (let i =0; i<allchoices.length; i++){
    const choice = allchoices[i];
    //skip choices that belong to other questions
    if(choice.dataset.questionId !==questionId){
        continue;
    }
    const checkboxImage = choice.querySelector('.checkbox');
    if (choice===clicked){
        //The chosen one
        checkboxImage.src = 'images/checked.png';
    
        choice.style.backgroundColor = '#cfe3ff';
        choice.style.opacity = 1; 
    }else{
        //The ones not chosen
        checkboxImage.src = 'images/unchecked.png';
        choice.style.backgroundColor ='';
        choice.style.opacity = 0.6;
    }
}
    //if all 3 questions have an answer, the game is over
if (answerone !== null && answertwo !==null && answerthree !== null){
        quizisdone = true;
        showresult();
    }
}
//workout and show the result
function showresult(){
    //look up for each answer
    const total=
        RESULTS_MAP[answerone].id +
        RESULTS_MAP[answertwo].id +
        RESULTS_MAP[answerthree].id;

    //divide by 3 and round down to get whole number
    const average = Math.floor(total/3);
    //Find which result has that id number
    for (const key in RESULTS_MAP){
        if (RESULTS_MAP[key].id===average){
            resulttitle.textContent= RESULTS_MAP[key].title;
            resultcontents.textContent= RESULTS_MAP[key].contents;
        }
    }
    //make the result visible
    resultbox.hidden =false;

}
//restart the quiz
function restartquiz(){
    answerone=null;
    answertwo=null;
    answerthree=null;
    quizisdone = false;
    //put every choice back to normal
    for(let i =0; i<allchoices.length;i++){
        const choice = allchoices[i];
        choice.querySelector('.checkbox').src='images/unchecked.png';
        choice.style.backgroundColor='';
        choice.style.opacity='';

    }
    //hide the result and scroll backup
    resultbox.hidden = true;
    pickaup.scrollIntoView();
}
//connect the clicks to functions
for(let i =0; i<allchoices.length;i++){
    allchoices[i].addEventListener('click', handleclick);
}
restartbutton.addEventListener('click', restartquiz);

