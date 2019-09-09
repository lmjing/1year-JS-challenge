let timeToAngle = (type, time) => {
    return type === "hour" ?  (time % 12) * 30 : time * 6;
};

let moveHand = (type, time) => {
    let el = document.querySelector(`.${type}`);
    let angle = timeToAngle(type, time);
    el.style.transform = `rotate(${angle}deg)`;

    el = null; angle = null;
};

let setInitTime = () => {
    let now = new Date();
    moveHand('hour', now.getHours());
    moveHand('minute', now.getMinutes());
    moveHand('second', now.getSeconds());
};

// 다음 시간을 향해 트랜지션 적용
let setNextTime = (type, now) => {

    // 일자 더하기 (지금 그냥 셋팅 해버림)
    let nextTime = type === 'minute' ? now.setMinutes(1) : now.setHours(1);
    console.log(nextTime.toString());
    moveHand(type, type === 'minute' ? nextTime.getMinutes() : nextTime.getHours());
    setTransition(type, type === 'minute' ? 60 : 3600);
};

let timeUpdate = () => {
    let now = new Date();
    // 초는 바로 현재 시간 가르킴
    moveHand('second', now.getSeconds());
    // 분, 시는 다음 시간 가르키며, 트랜지션 적용
    setNextTime('minute', now);
    setNextTime('hour', now);
    //  삭제하기
    let timeEl = document.getElementById('time');
    timeEl.innerText = now;
};

let setTransition = (type, time) => {
    let el = document.querySelector(`.${type}`);
    el.style.transition = `transform ${time}s`;
    el.style.webkitTransition = `transform ${time}s`;
};
// 맨 처음 시간 셋팅(해당 값 기준으로 서서히 트랜지션 적용해 이동될 예정)
setInitTime();
// 여기 남은 시간 계산해서 해당 시간만큼 transition 적용해야함.
setTimeout(setTransition, 1000, 'minute', 60);
setTimeout(setTransition, 1000, 'hour', 3600);
setInterval(timeUpdate, 1000);
