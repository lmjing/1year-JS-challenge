let moveHourHand = (hour) => {
    let hourtHand = document.querySelector('.hour');
    let angle = (hour % 12) * 30;
    hourtHand.style.transform = `rotate(${angle}deg)`;

    hourtHand = null; angle = null;
};

let moveMinuteHand = (minute) => {
    let minuteHand = document.querySelector('.minute');
    let angle = minute * 6;
    minuteHand.style.transform = `rotate(${angle}deg)`;

    minuteHand = null; angle = null;
};

let moveSecondHand = (second) => {
    let secondHand = document.querySelector('.second');
    let angle = second * 6;
    secondHand.style.transform = `rotate(${angle}deg)`;

    secondHand = null; angle = null;
};

let setTime = () => {
    let now = new Date();
    moveHourHand(9);
    // moveHourHand(now.getHours());
    moveMinuteHand(55);
    // moveMinuteHand(now.getMinutes());
    moveSecondHand(now.getSeconds());

    now = null;
};

let startClock = () => {
    setTime();
    setInterval(setTime, 1000);
};

startClock();
