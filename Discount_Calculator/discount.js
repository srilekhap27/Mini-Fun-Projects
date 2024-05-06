let originalPrice = document.getElementById("originalPrice");
let discount = document.getElementById("discount");
let amountSaved = document.getElementById("amountSaved");
let finalPrice = document.getElementById("finalPrice");
let resetBtn = document.getElementById("reset");
let symbol = document.getElementById("symbol");

originalPrice.addEventListener("input", calculate);
discount.addEventListener('input', calculate)
discount.addEventListener("input", percentSymbol);

function calculate(){
    let originalVal = originalPrice.value;
    let discountVal = discount.value;
    let savedVal = originalVal * discountVal/100;
    let finalVal = originalVal - savedVal;
    amountSaved.value = savedVal.toLocaleString("en-US");
    finalPrice.value = `$ ${finalVal.toLocaleString("en-US")}`;
}

function percentSymbol(e){
    if(e.target.value.trim() != 0){
        symbol.style.display = "block";
    }else{
        symbol.style.display = "none";
    }

    if(e.target.value < 10){
        symbol.style.right = "91px";
    }
    if (e.target.value > 9){
        symbol.style.right = "79.5px";
    }
    if (e.target.value == 100){
        symbol.style.right = "79px";
    }
    if(parseInt(e.target.value) > 100){
        e.target.value = 100;
        calculate();
        symbol.style.right = "79px";
    }
    if(parseInt(e.target.value < 1)){
        e.target.value = 1;
        calculate();
        symbol.style.right = "79.5px";
    }
}

resetBtn.addEventListener('click', ()=>{
    symbol.style.display = "none";
})