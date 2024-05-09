const inputBox = document.querySelector("#input-box");
const listContainer = document.querySelector("#list-container");

// Adding Input value to List
function addTask(){
    if(inputBox.value === ""){
        alert("You should write something !!!")
        // inputBox.value = "You should write something !!!";
        // inputBox.style.color = "red";
    }else{
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;
        listContainer.appendChild(li);
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);
    }
    inputBox.value = "";
    saveData();
}

// Check/UnCheck and Deleting the Task

listContainer.addEventListener("click", function(e){
    if(e.target.tagName === "LI"){
        e.target.classList.toggle("checked");
        saveData()
    }
    else if(e.target.tagName === "SPAN"){
        e.target.parentElement.remove();
        saveData()
    }
},false);

// Saving Data to localStorage
function saveData(){
    localStorage.setItem("data", listContainer.innerHTML);
}

// Displaying Data to which is stored in localStorage
function showTask(){
    listContainer.innerHTML = localStorage.getItem("data");
}
showTask();