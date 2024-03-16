// to get element by id
let input = document.getElementById("inputbox");
// to select all the buttons using queryselectall
let buttons = document.querySelectorAll("button");

let string = "";
// we need all the buttons so , we are using an array for all the buttons
let arr = Array.from(buttons);
// three conditions are required to perform calculator operations
arr.forEach(button => {
    button.addEventListener('click', (e) =>{
        /* 1. If user clicks = then it should display an answer 
        that is perfomed with respect to the operator Hence we are using 
        an inbuilt operator called "eval" */
        if (e.target.innerHTML == "="){
            // assigning the eval answer to the string Later assigning string to the input value
            string = eval(string);
            input.value = string;
        }
        // 2. If User clicks AC then it has to remove all the numbers which means it shoud be empty Hence we are assigning string value to an empty string
        else if (e.target.innerHTML == "AC"){
            string = "";
            //assigning string to the input value
            input.value = string;
        }
        else if (e.target.innerHTML == "DEL"){
             /* 3. If User clicks DEL then it has to remove the last digit from the input numbers
             so, we are using a substring function. we are removing the last digit from the sting. we can */
            string = string.substring(0,string.length-1);
             //assigning string to the input value
            input.value = string;
        }
        else{
            /* If the given number is other than any of the above 
            operators then it is going to add the numbers to placeholder*/
            string += e.target.innerHTML;
            input.value = string;
        }
    })
} )
