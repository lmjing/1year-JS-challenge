let setSecondHand = (second) => {
    let secondHand = document.querySelector('.second');
    let angle = second * 6;
    console.log(`${second}초의 각도는 ${angle}`);
    secondHand.style.transform = `rotate(${angle}deg)`;
};

let setTime = () => {
    let now = new Date();
    let el = document.getElementById('time');
    el.innerText = now;

    setSecondHand(now.getSeconds());

    now = null; el = null;
};

let startClock = () => {
    setTime();
    setInterval(setTime, 1000);
};

startClock();
