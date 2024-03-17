// selecting class through queryselector
const timer = document.querySelector(".timer");
const title = document.querySelector(".title");
const startBtn = document.querySelector(".startBtn");
const pauseBtn = document.querySelector(".pauseBtn");
const resumeBtn = document.querySelector(".resumeBtn");
const resetBtn = document.querySelector(".resetBtn");

// Given work time and break time for 25 and 5 min respectively. For counting down we multiply by 60
const Work_time = 0.2 * 60;
const Break_time = 0.1 * 60;
let timerID = null;
let oneCycleComplete = false; //work+breaktime i.e 30min
let totalCount = 0;

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
        timer.textContent = time;
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
                setTimeout(() => updateTitle("Staer Timer Again"), 2000);
                totalCount++;
                saveLocalCounts();            
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
// adding even listener to start button for custom responses
startBtn.addEventListener("click", () =>{
    timerID = startTimer(Work_time);
    updateTitle("It's Working Time !!");
})
