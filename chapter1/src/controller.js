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
        <div class="box">
            <div class="box--key">${key}</div>
            <div class="box--sound">${data[key]}</div>
        </div>
        `;
    }
    return template;
};

// 참고 : https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent
let setKeyboardEvent = () => {
    document.addEventListener("keydown", event => {
        let keyName = event.key.toUpperCase();
        let audio = new Audio(`../asset/sound/${data[keyName]}.wav`);
        audio.play();

        keyName = null;
        audio = null;
    });
};

let content = document.getElementById("content");
content.innerHTML = contents(data);

setKeyboardEvent();

content = null;
contents = null;
setKeyboardEvent = null;
