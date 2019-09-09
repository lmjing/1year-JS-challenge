

let moveHourHand = (hour) => {
    let hourHand = document.querySelector('.hour');
    let angle = (hour % 12) * 30;
    hourHand.style.transform = `rotate(${angle}deg)`;

    hourHand = null; angle = null;
};



let controllMinuteHand = (el, ) => {
  // case1. 그냥 곧바로 현재시간으로 설정
};

let toMoveMinuteHand = (minute) => {
    let minuteHand = document.querySelector('.minute');
    let angle = minute * 6;
    moveHand(minuteHand, angle);

    minuteHand = null; angle = null;
};

let moveSecondHand = (second) => {
    let secondHand = document.querySelector('.second');
    let angle = second * 6;
    secondHand.style.transform = `rotate(${angle}deg)`;

    secondHand = null; angle = null;
};

/////
let moveHand = (el, angle) => {
    el.style.transform = `rotate(${angle}deg)`;
    el = null; angle = null;
};

let angleController = {
    getHourAngle(hour) {
        return (hour % 12) * 30;
    },
    getMinSecAngle(time) {
        return time * 6;
    }
};

let setInitTime = (timeHands) => {
    let now = new Date();
    let angle = {
        hourAngle : angleController.getHourAngle(now.getHours()),
        minuteAngle : angleController.getMinSecAngle(now.getMinutes()),
        secondAngle : angleController.getMinSecAngle(now.getSeconds()),
    };
    moveHand(timeHands.hourHand, angle.hourAngle);
    moveHand(timeHands.minuteHand, angle.minuteAngle);
    moveHand(timeHands.secondHand, angle.secondAngle);
};


// class UpdateTimeController {
//     constructor(timeHands) {
//         this._timeHands = timeHands;
//     }
//
//     timeUpdate() {
//         this.now = new Date();
//         //  삭제하기
//         let timeEl = document.getElementById('time');
//         timeEl.innerText = now;
//
//     }
//     _changeSecondHand() {
//         let secondAngle = angleController.getMinSecAngle(this.now.getSeconds());
//         console.log(secondAngle);
//         // moveHand(this._timeHands.secondHand, secondAngle);
//     };
// }
function UpdateTimeController (timeHands) {
    this.timeHands = timeHands;
    this.changeSecondHand = function () {
        let secondAngle = angleController.getMinSecAngle(this.now.getSeconds());
        moveHand(this.timeHands.secondHand, secondAngle);
    };
    this.timeUpdate = function () {
        this.now = new Date();
        this.changeSecondHand();
        //  삭제하기
        let timeEl = document.getElementById('time');
        timeEl.innerText = now;
    };
};

let hourHand = document.querySelector('.hour');
let minuteHand = document.querySelector('.minute');
let secondHand = document.querySelector('.second');
let timeHands = {
    hourHand,
    minuteHand,
    secondHand,
};
// 맨 처음 시간 셋팅(해당 값 기준으로 서서히 트랜지션 적용해 이동될 예정)
setInitTime(timeHands);
let controller = new UpdateTimeController(timeHands);
setInterval(controller.timeUpdate, 1000);
