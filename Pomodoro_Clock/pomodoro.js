// selecting class through queryselector
const timer = document.querySelector(".timer");
const title = document.querySelector(".title");
const startBtn = document.querySelector(".startBtn");
const pauseBtn = document.querySelector(".pauseBtn");
const resumeBtn = document.querySelector(".resumeBtn");
const resetBtn = document.querySelector(".resetBtn");
const pomoCountsDisplay = document.querySelector(".pomoCountsDisplay");

// Given work time and break time for 25 and 5 min respectively. For counting down we multiply by 60
const Work_time = 25 * 60;
const Break_time = 5 * 60;
let timerID = null;
let oneCycleComplete = false; //work+breaktime i.e 30min
let totalCount = 0;
let paused = false;

//Function to update title
const updateTitle = (msg) =>{
    title.textContent = msg;
}
//Function to Save Pomo Cycles to Local Storage
const saveLocalCounts = () =>{
    let counts = JSON.parse(localStorage.getItem("pomocounts"));
    counts != null ? counts++ : counts = 1; 
    localStorage.setItem("pomocounts",JSON.stringify(counts));
}

//Function to countdown
const countDown = (time) =>{
    return () => {
        const minutes = Math.floor(time/60).toString().padStart(2,"0");
        const seconds = Math.floor(time % 60).toString().padStart(2,"0");

        timer.textContent = `${minutes}:${seconds}`;
        time--;
        if (time < 0){
            stopTimer();
            if(oneCycleComplete == false){
                timerID = startTimer(Break_time);
                oneCycleComplete = true;
                updateTitle("It's Break Time");
            }
            else{
                updateTitle("Completed One Round of Cycle");
                setTimeout(() => updateTitle("Start Timer Again"), 2000);
                totalCount++;
                saveLocalCounts(); 
                showPomoCounts();           
            }
        }
    }
}
// Using an Arrow Function to start timer 
const startTimer = (startTime) =>{
    if(timerID !== null){
        stopTimer();
    }
    return setInterval(countDown(startTime), 1000);
}
// Using an Arrow Function to Stop timer 
const stopTimer = (stopTime) =>{
    clearInterval(timerID);
    timerID = null;
}

const getTimeInSeconds = (timeString) =>{
    const[min, sec] = timeString.split(":");
    return min * 60 + sec;
}
// adding even listener to start button for custom responses
startBtn.addEventListener("click", () =>{
    timerID = startTimer(Work_time);
    updateTitle("It's Working Time !!");
});

// adding even listener to Reset button for custom responses
resetBtn.addEventListener("click",()=>{
    stopTimer();
    timer.textContent = "25:00";
});

// adding even listener to Pause button for custom responses
pauseBtn.addEventListener("click",()=>{
    stopTimer();
    paused = true;
    updateTitle("Timer Paused")
});

// adding even listener to Resume button for custom responses
resumeBtn.addEventListener("click",()=>{  
   if( paused = true){
    const currentTime = getTimeInSeconds(timer.textContent);
    timerID = startTimer(currentTime);
    paused = false;
    (!oneCycleComplete) ? updateTitle("It's Work Time!") : updateTitle("It's Break Time");
   }
});

//Function for displaying completed cycles from local storage
const showPomoCounts = () =>{
    const counts = JSON.parse(localStorage.getItem("pomocounts"));
    if (counts > 0){
        pomoCountsDisplay.style.display = "flex";
    }
    pomoCountsDisplay.firstElementChild.textContent = counts;
}
showPomoCounts();