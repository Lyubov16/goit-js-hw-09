const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
let colorChange = null;
stopBtn.disabled = true;

function onBtnStart() {
    document.body.style.backgroundColor = getRandomHexColor();
    startBtn.disabled = true;
    if ((stopBtn.disabled = true)) {
        stopBtn.disabled = false;
    }
    colorChange = setInterval(() => {
        document.body.style.backgroundColor = getRandomHexColor();
    }, 1000);
}

function onBtnStop() {
    startBtn.disabled = false;
    stopBtn.disabled = true;
    clearInterval(colorChange);
}

startBtn.addEventListener('click', onBtnStart);
stopBtn.addEventListener('click', onBtnStop);
