const questions = [
    {
        question: "Which planet is known as the 'Red Planet'?",
        answers: [
            { text: "Venus", correct: false },
            { text: "Mars", correct: true },
            { text: "Jupiter", correct: false },
            { text: "Saturn", correct: false },
        ]
    },
    {
        question: "What is the capital city of France?",
        answers: [
            {text: "Berlin", correct: false},
            {text: "London", correct: false},
            {text: "Paris", correct: true},
            {text: "Rome", correct: false},
        ]
    },
    {
        question: "What is the chemical symbol for water?",
        answers: [
            {text: "H2O", correct: true},
            {text: "CO2", correct: false},
            {text: "NaCI", correct: false},
            {text: "O2", correct: false},
        ]
    },
    {
        question: "Who painted the Mona Lisa?",
        answers: [
            {text: "Vincent van Gogh", correct: false},
            {text: "Leonardo da Vinci", correct: true},
            {text: "Pablo Picasso", correct: false},
            {text: "Michelangelo Buonarroti", correct: false},
        ]
    }
];

const questionElement = document.getElementById("question");
const answerBtn = document.getElementById("answer-buttons");
const nextBtn = document.getElementById("next-btn");

let currentQtnIdx = 0;
let score = 0;

function startQuiz(){
    currentQtnIdx = 0;
    score = 0;
    nextBtn.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQtnIdx];
    let questionNo = currentQtnIdx + 1;
    questionElement.innerHTML = questionNo + "." + currentQuestion.question;

    currentQuestion.answers.forEach(answer =>{
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        // to display the buttons in div
        answerBtn.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click",selectAnswer);
    });
}

function resetState(){
    nextBtn.style.display = "none";
    while(answerBtn.firstChild){
        answerBtn.removeChild(answerBtn.firstChild);
    }

}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerBtn.children).forEach(button =>{
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextBtn.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `Your Score is ${score} out of ${questions.length}`;
    nextBtn.innerHTML = "Play Again";
    nextBtn.style.display = "block";
}

function handleNextButton(){
    currentQtnIdx++;
    if(currentQtnIdx < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextBtn.addEventListener("click",()=>{
    if (currentQtnIdx < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});

startQuiz();

