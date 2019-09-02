/**
 * @author 이미정
 * @file controller.js
 * @description 데이터 설정 및 이벤트 컨트롤러
 */
// data.json으로 따로 빼서 import 하려 했지만 잘 안됨
const data = {
    "A": "clap",
    "S": "hihat",
    "D": "kick",
    "F": "openhat",
    "G": "boom",
    "H": "ride",
    "J": "snare",
    "K": "tom",
    "L": "tink",
};

let contents = (data) => {
    let template = '';
    for (let key in data) {
        template += `
        <div class="box" data-key="${key}">
            <kbd class="box--key">${key}</kbd>
            <div class="box--sound">${data[key]}</div>
        </div>
        `;
    }
    return template;
};

/*
 참고
 1) 키보드 이벤트 - https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent
 2) 오디오 재생 - https://hashcode.co.kr/questions/1479/%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8%EC%97%90%EC%84%9C-%EC%9D%8C%EC%95%85-%EC%9E%AC%EC%83%9D%ED%95%98%EB%8A%94%EB%B2%95
 3) class 추가 - http://blim.co.kr/archives/160
 4) transition - https://developer.mozilla.org/ko/docs/Web/CSS/CSS_Transitions/Using_CSS_transitions
 5) data- 찾기 - https://intu.io/blog/dont-use-data-attributes-to-find-html-elements-with-js/
  */

let keyDownEvent = event => {
    let keyName = event.key.toUpperCase();
    let audio = new Audio(`../asset/sound/${data[keyName]}.wav`);
    let findBox = `[data-key="${keyName}"]`;

    audio.play()
        .then(() => {
            // Question : 왜 여기서 keyName에 접근하면 null이 뜨는지??
            let box = document.querySelector(findBox);
            box.classList.add("box--press");
        })
        .catch((error) => {
            console.log(error);
        });

    keyName = null;
    audio = null;
};

let setKeyboardEvent = () => {
    document.addEventListener("keydown", keyDownEvent);
    // document.addEventListener("keydown", event => {
    //     let keyName = event.key.toUpperCase();
    //     let audio = new Audio(`../asset/sound/${data[keyName]}.wav`);
    //     let findBox = `[data-key="${keyName}"]`;
    //
    //     audio.play()
    //         .then(() => {
    //             // Question : 왜 여기서 keyName에 접근하면 null이 뜨는지??
    //             let box = document.querySelector(findBox);
    //             box.classList.add("box--press");
    //         })
    //         .catch((error) => {
    //             console.log(error);
    //         });
    //
    //     keyName = null;
    //     audio = null;
    // });

    // document.addEventListener("keyup", event => {
    //     let keyName = event.key.toUpperCase();
    //     let box = document.querySelector(`[data-key="${keyName}"]`);
    //     box.classList.remove("box--press");
    //
    //     keyName = null;
    //     box = null;
    // });

    document.addEventListener("transitionend", (event) => {
        event.target.classList.remove("box--press");
    });
};

let content = document.getElementById("content");
content.innerHTML = contents(data);

setKeyboardEvent();

// exports.contents = contents;
// exports.data = data;
// exports.setKeyboardEvent = setKeyboardEvent;

module.exports = {
  contents,
  data,
    keyDownEvent,
    setKeyboardEvent,
};

content = null;
contents = null;
setKeyboardEvent = null;
