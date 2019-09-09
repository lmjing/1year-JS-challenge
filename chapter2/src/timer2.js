let beforeTime = null;

let moveHourHand = (hour) => {
    let hourHand = document.querySelector('.hour');
    let angle = (hour % 12) * 30;
    hourHand.style.transform = `rotate(${angle}deg)`;

    hourHand = null; angle = null;
};

let moveSecondHand = () => {
    let secondHand = document.querySelector('.second');
    let angle = now().second * 6;
    secondHand.style.transform = `rotate(${angle}deg)`;

    let el = document.getElementById('time');
    el.innerText = now().second;

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


let setTransition = (el, time) => {
  el.style.transition = `transform ${time}s`;
  el.style.webkitTransition = `transform ${time}s`;
};
///////////
let now = () => {
    let now = new Date();
    return {
        hour: now.getHours(),
        minute: now.getMinutes(),
        second: now.getSeconds()
    }
};

let setInitTime = () => {
    moveHourHand(now().hour);
    moveMinuteHand(now().minute);
    moveSecondHand();
};

// TODO: 나중에 지우기
let setNowTime = () => {
    let el = document.getElementById('time');
    el.innerText = `${now().hour} : ${now().minute} : ${now().second}`;
};

let moveMinute = () => {
    console.log(`현재 : ${now().minute}분 => `)
    // 1분 뒤를 향해 트랜지션
    moveMinuteHand(now().minute + 1);
    setTransition(60);
};
let moveMinuteHand = (minute) => {
    let minuteHand = document.querySelector('.minute');
    let angle = minute * 6;
    minuteHand.style.transform = `rotate(${angle}deg)`;

    minuteHand = null; angle = null;
};

let startClock = () => {
    setInitTime();
    setInterval(setNowTime, 1000);
    setInterval(moveSecondHand, 1000);
    setInterval(moveMinute, 600000);
    // moveMinuteCheck(53);
    // setInterval(moveMinute, 60000);
};

startClock();


////

let setMinute = (minute) => {
    let minuteHand = document.querySelector('.minute');
    let angle = minute * 6;
    minuteHand.style.transform = `rotate(${angle}deg)`;

    minuteHand = null; angle = null;
};
