let beforeTime = null;

let moveHourHand = (hour) => {
    let hourHand = document.querySelector('.hour');
    let angle = (hour % 12) * 30;
    hourHand.style.transform = `rotate(${angle}deg)`;
    if (beforeTime !== null)
        setTransition(hourHand, 3600);

    hourHand = null; angle = null;
};

let moveMinuteHand = (minute) => {
    let minuteHand = document.querySelector('.minute');
    let angle = minute * 6;
    minuteHand.style.transform = `rotate(${angle}deg)`;
    if (beforeTime !== null)
        setTransition(minuteHand, 60);

    minuteHand = null; angle = null;
};

let moveSecondHand = (second) => {
    let secondHand = document.querySelector('.second');
    let angle = second * 6;
    secondHand.style.transform = `rotate(${angle}deg)`;

    secondHand = null; angle = null;
};

let moveMinuteCheck = (minute) => {
    let minuteHand = document.querySelector('.minute-check');
    let test = document.getElementById('test');
    let angle = minute * 6;
    minuteHand.style.transform = `rotate(${angle}deg)`;
    test.style.transform = `rotate(${angle + 6}deg)`;

    minuteHand = null; angle = null;
};
let moveHourCheck = (hour) => {
    let hourHand = document.querySelector('.hour-check');
    let angle = (hour % 12) * 30;
    hourHand.style.transform = `rotate(${angle}deg)`;

    hourHand = null; angle = null;
};
let setTime = () => {
    let now = new Date();
    let hour = now.getHours();
    let minute = now.getMinutes();

    moveMinuteCheck(30);

    let timeEl = document.getElementById('time');
    timeEl.innerText = now;

    moveSecondHand(now.getSeconds());
    if (beforeTime === null) {
        moveHourHand(hour);
        moveMinuteHand(minute);
        beforeTime = now;
        return;
    }

    if (beforeTime.getHours() !== hour) {
        moveHourHand(hour);
    }
    if (beforeTime.getMinutes() !== minute) {
        console.log(`분이 달라졌어요! ${beforeTime.getMinutes()} => ${minute}`);
        moveMinuteHand(minute);
    }

    beforeTime = now;
    now = null;
};

let setTransition = (el, time) => {
  el.style.transition = `transform ${time}s`;
  el.style.webkitTransition = `transform ${time}s`;
};
let startClock = () => {
    setTime();
    setInterval(setTime, 1000);
};

startClock();
