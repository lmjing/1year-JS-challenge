let timeToAngle = (type, time, gone = 0) => {
    let originAngle = type === "hour" ?  (time % 12) * 30 : time * 6;
    let goneAngle =  (type === "hour" ? 0.2 : 0.1) * gone;
    return originAngle + goneAngle;
};

let moveHand = (type, angle) => {
    let el = document.querySelector(`.${type}`);
    el.style.transform = `rotate(${angle}deg)`;

    el = null; angle = null;
};

let setInitTime = () => {
    let now = new Date();
    let hour = now.getHours();
    let minute = now.getMinutes();
    let second = now.getSeconds();
    moveHand('hour', timeToAngle('hour', hour, minute));
    moveHand('minute', timeToAngle('minute', minute, second));
    moveHand('second', timeToAngle('seconde', second));
};

// 다음 시간을 향해 트랜지션 적용
let setNextTime = (type, now) => {
    // 일자 더하기 (지금 그냥 셋팅 해버림)
    let nextTime = new Date();
    if (type === 'minute') nextTime.setMinutes(now.getMinutes() + 1);
    else nextTime.setHours(now.getHours() + 1);

    let angle = timeToAngle(type, type === 'minute' ? nextTime.getMinutes() : nextTime.getHours());
    moveHand(type, angle);

    let time = type === 'minute' ? 60 - now.getSeconds() : 3600 - now.getMinutes() * 60;
    console.log(`${type} ${time}만큼 transition 적용`);
    setTransition(type, time);
};

let timeUpdate = () => {
    let now = new Date();
    // 초는 바로 현재 시간 가르킴
    moveHand('second', timeToAngle('second', now.getSeconds()));

    let time = document.querySelector(`.time`);
    time.innerText = now;

    // 분, 시는 다음 시간 가르키며, 트랜지션 적용
    if (init === null && now.getSeconds() !== 0)
        return;

    console.log('분 reset');
    setNextTime('minute', now);

    if (init !== null || now.getMinutes() == 0)
        setNextTime('hour', now);

    init = null;
};

let setTransition = (type, time) => {
    let el = document.querySelector(`.${type}`);
    el.style.transition = `transform ${time}s`;
    el.style.webkitTransition = `transform ${time}s`;
};

let init = new Date();
// 맨 처음 시간 셋팅(해당 값 기준으로 서서히 트랜지션 적용해 이동될 예정)

moveHand('check1', timeToAngle('minute', 8));
moveHand('check2', timeToAngle('minute', 9));

setInitTime();
setInterval(timeUpdate, 1000);
