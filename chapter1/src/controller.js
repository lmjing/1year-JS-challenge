// data.json으로 따로 빼서 import 하려 했지만 잘 안됨
var data = [
    {
        "key": "A",
        "sound": "clap"
    },
    {
        "key": "S",
        "sound": "hihat"
    },
    {
        "key": "D",
        "sound": "kick"
    },
    {
        "key": "F",
        "sound": "openhat"
    },
    {
        "key": "G",
        "sound": "boom"
    },
    {
        "key": "H",
        "sound": "ride"
    },
    {
        "key": "J",
        "sound": "snare"
    },
    {
        "key": "K",
        "sound": "tom"
    },
    {
        "key": "L",
        "sound": "tink"
    }
];

let contents = (data) => {
    let template = '';
    for (let i=0; i<data.length; i++) {
        template += `
        <div class="box">
            <div class="box--key">${data[i].key}</div>
            <div class="box--sound">${data[i].sound}</div>
        </div>
        `;
    }
    return template;
};

// https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent
let setKeyboardEvent = () => {
    document.addEventListener("keydown", event => {
        let keyName = event.key.toUpperCase();
        let item = data.find(item => {
            return item.key === keyName;
        });
        let audio = new Audio(`../asset/sound/${item.sound}.wav`);
        audio.play();
    });
};

let content = document.getElementById("content");
content.innerHTML = contents(data);

setKeyboardEvent();

content = null;
