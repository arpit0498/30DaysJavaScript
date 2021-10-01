let countdown;
const timerDisplay = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('[data-time]');

function timer(seconds) {
    // clear any existing timers
    clearInterval(countdown);

    const now = Date.now();
    const then = now + seconds * 1000;
    displayTimeLeft(seconds);
    displayEndTime(then);

    countdown = setInterval(() => {
        const secondsLeft = Math.round((then - Date.now()) / 1000);
        // check if we should stop it!
        if (secondsLeft < 0) {
            clearInterval(countdown);
            return;
        }
        // display it
        displayTimeLeft(secondsLeft);
    }, 1000);
}

function displayTimeLeft(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainderSeconds = seconds % 60;
    const display = `${minutes}:${remainderSeconds < 10 ? '0' : '' }${remainderSeconds}`; // if seconds less than 10 append it with padding 0
    document.title = display;
    timerDisplay.textContent = display;
}

function displayEndTime(timestamp) {
    const end = new Date(timestamp);
    const hour = end.getHours();
    const adjustedHour = hour > 12 ? hour - 12 : hour; // show in 12hr format
    const minutes = end.getMinutes();
    endTime.textContent = `Be Back At ${adjustedHour}:${minutes < 10 ? '0' : ''}${minutes}`; // concat 0 if less than 10
}

function startTimer() {
    const seconds = parseInt(this.dataset.time);
    timer(seconds);
}

buttons.forEach(button => button.addEventListener('click', startTimer));
document.customForm.addEventListener('submit', function (e) {
    e.preventDefault(); // doesn't add minutes in url
    const mins = this.minutes.value;
    console.log(mins);
    timer(mins * 60);
    this.reset(); //resets to 0
});