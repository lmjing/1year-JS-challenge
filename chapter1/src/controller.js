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

let setKeyboardEvent = () => {
    document.addEventListener("keydown", event => {
        let keyName = event.key.toUpperCase();
        switch (keyName) {
            case "A": console.log("A"); break;
            case "S": console.log("S"); break;
            case "D": console.log("D"); break;
            case "F": console.log("F"); break;
            case "G": console.log("G"); break;
            case "H": console.log("H"); break;
            case "J": console.log("J"); break;
            case "K": console.log("K"); break;
            case "L": console.log("L"); break;
            default: console.log('no'); break;
        }
    });
};

let content = document.getElementById("content");
content.innerHTML = contents(data);

setKeyboardEvent();

content = null;
