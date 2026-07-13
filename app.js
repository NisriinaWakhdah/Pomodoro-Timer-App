const bells = new Audio("./sounds/bell.wav");
const startBtn = document.querySelector(".btn-start");
const pauseBtn = document.querySelector(".btn-pause");
const session = document.querySelector(".minutes");

let myInterval;
let totalSecond;
let state = true;
let isPaused = false;

const appTimer = () => {
    if (state) {
        state = false;

        const sessionAmount = Number.parseInt(session.textContent);
        totalSecond = sessionAmount * 60;

        myInterval = setInterval(updateSeconds, 1000);
    } else {
        alert("Session has already started");
    }
};

const updateSeconds = () => {
    const minuteDiv = document.querySelector(".minutes");
    const secondDiv = document.querySelector(".seconds");

    totalSecond--;

    let minutesLeft = Math.floor(totalSecond / 60);
    let secondsLeft = totalSecond % 60;

    if (secondsLeft < 10) {
        secondDiv.textContent = "0" + secondsLeft;
    } else {
        secondDiv.textContent = secondsLeft;
    }

    minuteDiv.textContent = `${minutesLeft}`;

    if (minutesLeft === 0 && secondsLeft === 0) {
        bells.play();
        clearInterval(myInterval);
        state = true;
    }
};

const pauseTimer = () => {
    if (!isPaused) {
        isPaused = true;
        clearInterval(myInterval);
        pauseBtn.textContent = "Resume";
    } else {
        myInterval = setInterval(updateSeconds, 1000);
        isPaused = false;
        pauseBtn.textContent = "Pause";
    }
}


startBtn.addEventListener("click", appTimer);
pauseBtn.addEventListener("click", pauseTimer);
