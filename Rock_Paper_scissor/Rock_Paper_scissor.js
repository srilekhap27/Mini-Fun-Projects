let userScore = 0;
let compScore = 0;

const choices = document.querySelectorAll(".choice");
const msg = document.querySelector("#msg");
const userScorePara = document.querySelector("#user-score");
const compScorePara = document.querySelector("#comp-score");

const drawGame = () =>{
    msg.innerText = "Game draw, Play Again!!";
    msg.style.backgroundColor = "rgb(18, 18, 25)";
}

const showWinner = (userWin, userChoice, compChoice) =>{
    if(userWin){
        userScore++;
        userScorePara.innerText = userScore;
        msg.innerText = `You Win !! your choice= ${userChoice},computer choice= ${compChoice}`;
        msg.style.backgroundColor = "green";
    }else{
        compScore++;
        compScorePara.innerText = compScore;
        msg.innerText = `Comp Win ! computer choice= ${compChoice},your choice= ${userChoice}`;
        msg.style.backgroundColor = "red";
    }
}

const genCompChoice = () => {
    const options = ["rock","paper","scissors"];
    const ranIdx = Math.floor(Math.random() * 3);
    return options[ranIdx];
}

const playGame = (userChoice)=>{
    const compChoice = genCompChoice();
    if (userChoice === compChoice){
        drawGame();
    }else{
        let userWin = true;
        if (userChoice === "rock"){
            // comp- scissor , paper
            userWin = compChoice === "paper" ? false : true;
        }else if (userChoice === "paper"){
            // comp- rock , scissor
            userWin = compChoice === "scissor" ? false : true;
        }else if (userChoice === "scissor"){
            // comp- rock , paper
            userWin = compChoice === "rock" ? false : true;
        }
        showWinner(userWin,userChoice,compChoice);
    }
}

choices.forEach((choice) =>{
    choice.addEventListener("click", () =>{
        const userChoice = choice.getAttribute("id");
        playGame(userChoice);
    })
})

