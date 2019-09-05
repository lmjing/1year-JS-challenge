let setTime = () => {
    let now = Date();
    let el = document.getElementById('time');
    el.innerText = now;

    now = null; el = null;
};

let startClock = () => {
    setTime();
    setInterval(setTime, 1000);
};

startClock();
