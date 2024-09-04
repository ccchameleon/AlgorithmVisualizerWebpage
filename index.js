//File driving logic for buttons, functions, etc.

let unsortedArr = new Array(numOfBars);
//used to scale multiple functions in program
let numOfBars = 20; 

//range of random vals corresponding to arr elems
let minRange = 1;   
let maxRange = 10;  

let barScale = 25; //default bar height scale
let speedScale = 100; //default sorting speed

//Button flags
let stopClicked = false;
let sortBtnClicked = false;
let newArrBtnClicked = false;

//  vars used to resume sorting at same position as when stopped
let currI = 0;
let currJ = 0;
let currK = 0;

//                                          ----------------- USER PROMPTS -----------------

function changeNumBars(){
    numOfBars = prompt("Enter number of bars (2-40)");
    if(numOfBars > 40){
        new Notification("Too many bars!")
        return;
    } else if (numOfBars < 2){
        new Notification("Not enough bars!")
        return;
    }
    barContainer.innerHTML="";
    unsortedArr = new Array(numOfBars);
    createNewArray();
    renderBar(unsortedArr);
}

//                                          ----------------- HELPER FUNCTS -----------------

function randomInt(min,max){
    return Math.floor(Math.random()*(max - min + 1)) + min;
};

function createNewArray(){
        for(let i=0; i<numOfBars; ++i){
            unsortedArr[i] = randomInt(minRange,maxRange);
        }
};

function deleteBars(){
    const bars = document.getElementById("bar");
    while(bars.hasChildNodes()){
        bars.removeChild(bars.firstChild);
    }
}

//create bar upon clicking button
function renderBar(arr){
    for(let i = 0; i < arr.length;++i){
        let bar = document.createElement("div");
        bar.classList.add("bar");
        bar.style.position = "relative";
        bar.style.alignItems = "baseline";
        bar.style.height = arr[i] * barScale +"px";
        barContainer.appendChild(bar);
    }
};

//  -----------------SPEED INPUT-----------------
function changeSpeed(){
    speedScale = prompt("Enter speed (Fastest 0 - 500 Slowest)");
    speedScale = Number(speedScale);
     if (speedScale < 0|| speedScale > 500){
        new Notification("Please choose valid number.")
    }
    if(!Number.isInteger(speedScale)){
        new Notification("Invalid input!")
    }
}



//  -----------------SLEEP FUNCT-----------------
function sleep(ms){
    return new Promise((resolve) => setTimeout(resolve, ms));
};

//  -----------------STOP FUNCT-----------------
function stopRunning(){
    stopClicked = true;
}

//  -----------------RESUME FUNCT-----------------
function resumeRunning(){
    stopClicked = false;
    bubbleSort(unsortedArr, currI, currJ, currK);
}

//  -----------------BUBBLE SORT-----------------
async function bubbleSort(arr, currI, currJ, currK){
    let bars = document.getElementsByClassName("bar");
    for(let i = currI; i < arr.length; ++i){
        for(let j = currJ; j < arr.length-i-1; ++j){
            if(!newArrBtnClicked){
                if(!stopClicked){
                if(arr[j]>arr[j+1]){
                    for(let k = currK; k < bars.length;++k){
                        if(k != j && k != j+1){
                            bars[k].style.backgroundColor = "lightskyblue";
                        }
                    }
                    let temp = arr[j];
                    arr[j] = arr[j+1];
                    arr[j+1] = temp;
                    bars[j].style.height = arr[j] * barScale + "px";
                    bars[j].style.backgroundColor = "blue";
                    bars[j+1].style.height = arr[j+1] * barScale + "px";
                    bars[j+1].style.backgroundColor = "blue";
                    await sleep(speedScale);
                    barPosition = j;
                }
                bars[j].style.backgroundColor = "lightskyblue";
                bars[j+1].style.backgroundColor = "lightskyblue";
            }
        }
    }
    await sleep(speedScale);
}
console.log(barPosition);
    return arr;
};

//  -----------------LOAD DEFAULT ARRAY & BARS-----------------
document.addEventListener("DOMContentLoaded", function(){
    createNewArray();
    renderBar(unsortedArr);
    console.log(sortBtnClicked)
});

//                                          ----------------- BUTTONS -----------------

//  -----------------NEW ARRAY-----------------
document.addEventListener("DOMContentLoaded", function(){
    const newArray_btn = document.getElementById("randomizeBtn");
        newArray_btn.addEventListener("click", function(){
            barContainer.innerHTML="";
            createNewArray();
            renderBar(unsortedArr);
            newArrBtnClicked = true;
        })
});


//  -----------------STOP-----------------
document.addEventListener("DOMContentLoaded", function(){
    const stop_btn = document.getElementById("stopBtn");
    stop_btn.addEventListener("click", function(){
        stopRunning();
    })
})

//  -----------------SORT-----------------
document.addEventListener("DOMContentLoaded", function(){
    const sort_btn = document.getElementById("sortBtn");
    sort_btn.addEventListener("click", function(){
        sortBtnClicked = true;
        renderBar(bubbleSort(unsortedArr, currI, currJ));
    });
})

//  -----------------SPEED-----------------
document.addEventListener("DOMContentLoaded", function(){
    const speed_btn = document.getElementById("speedBtn");
    speed_btn.addEventListener("click", function(){
        changeSpeed();
    })
})

//  -----------------BAR COUNT-----------------
document.addEventListener("DOMContentLoaded", function(){
    const bars_btn = document.getElementById("barsBtn");
    bars_btn.addEventListener("click", function(){
        changeNumBars();
    })
})

//  -----------------RESUME-----------------
document.addEventListener("DOMContentLoaded", function(){
    const resume_btn = document.getElementById("resumeBtn");
    resume_btn.addEventListener("click", function(){
        resumeRunning();
    })
})