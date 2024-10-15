//used to scale multiple functions in program
let numOfBars = 10; //default number of bars
let minRange = 1;   //range of random ints to use
let maxRange = 10;  
let unsortedArr = new Array(numOfBars);
let barScale = 25; //default bar height scale
let speedScale = 50; //default sorting speed
let stopClicked = false;
// let sortingOption = bubbleSort(unsortedArr); //default sorting option


//helper for generating random array
function randomInt(min,max){
    return Math.floor(Math.random()*(max - min + 1)) + min;
};

function createRandomArray(){
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
         bars.appendChild(bar);
    }
};

function barCount(){
    numOfBars = prompt("Enter number of bars (2-40)");
    if(numOfBars > 40){
        new Notification("Too many bars!")
        return;
    } else if (numOfBars < 2){
        new Notification("Not enough bars!")
        return;
    }
     bars.innerHTML="";
    unsortedArr = new Array(numOfBars);
    createRandomArray();
    renderBar(unsortedArr);
}

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


function sleep(ms){
    return new Promise((resolve) => setTimeout(resolve, ms));
};

function stopRunning(){
    stopClicked = true;
}

function resume(){
    stopClicked = false;
    bubbleSort(unsortedArr);
}

async function bubbleSort(arr){
    let bars = document.getElementsByClassName("bar");
    for(let i =0; i < arr.length; ++i){
        for(let j = 0; j < arr.length-i-1; ++j){
            if(arr[j]>arr[j+1]){
                //
                for(let k=0; k<bars.length;++k){
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
                if(stopClicked == true){
                    return;
                }
                await sleep(speedScale);
            }
            bars[j].style.backgroundColor = "lightskyblue";
            bars[j+1].style.backgroundColor = "lightskyblue";
        }
    await sleep(speedScale);
    }
    return arr;
};

document.addEventListener("DOMContentLoaded", function(){
    createRandomArray();
    renderBar(unsortedArr);
});

document.addEventListener("DOMContentLoaded", function(){
    const randomize_btn = document.getElementById("randomizeBtn");
    randomize_btn.addEventListener("click", function(){
         bars.innerHTML="";
        createRandomArray();
        renderBar(unsortedArr);
    })
});

document.addEventListener("DOMContentLoaded", function(){
    const stop_btn = document.getElementById("stopBtn");
    stop_btn.addEventListener("click", function(){
        stopRunning();
    })
})

document.addEventListener("DOMContentLoaded", function(){
    const sort_btn = document.getElementById("sortBtn");
    sort_btn.addEventListener("click", function(){
        renderBar(bubbleSort(unsortedArr));
    });
})

document.addEventListener("DOMContentLoaded", function(){
    const speed_btn = document.getElementById("speedBtn");
    speed_btn.addEventListener("click", function(){
        changeSpeed();
    })
})

document.addEventListener("DOMContentLoaded", function(){
    const bars_btn = document.getElementById("barsBtn");
    bars_btn.addEventListener("click", function(){
        barCount();
    })
})

document.addEventListener("DOMContentLoaded", function(){
    const resume_btn = document.getElementById("resumeBtn");
    resume_btn.addEventListener("click", function(){
        resume();
    })
})