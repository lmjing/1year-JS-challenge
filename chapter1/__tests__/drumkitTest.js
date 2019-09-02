document.body.innerHTML = `<div id="content"></div>`;

let controller = require("../src/controller");
// let {contents, data, setKeyboardEvent} = require("../src/controller");

let content = document.getElementById("content");
content.innerHTML = controller.contents(controller.data);

test('test snapshots - contents result', function () {
    expect(document.body).toMatchSnapshot();
});

test("test keydown event", () => {
    window.HTMLMediaElement.prototype.play = jest.fn().mockResolvedValue('music play');
    window.HTMLMediaElement.prototype.play.then = jest.fn().mockResolvedValue(true);


    let event = new KeyboardEvent('keydown', { key: 'a' });
    document.dispatchEvent(event);


    let spyFn = jest.spyOn(controller, "keyDownEvent");

    // controller.keyDownEvent 내부 코드 sound.play 실행됨을 확인
    expect(window.HTMLMediaElement.prototype.play).toBeCalled();

    expect(spyFn).toBeCalled();
});
