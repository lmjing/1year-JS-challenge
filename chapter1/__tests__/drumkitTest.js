document.body.innerHTML = `<div id="content"></div>`;

let controller = require("../src/controller");
// let {contents, data, setKeyboardEvent} = require("../src/controller");

let content = document.getElementById("content");
content.innerHTML = controller.contents(controller.data);

test('test snapshots - contents result', function () {
    expect(document.body).toMatchSnapshot();
});

test("test keydown event", async () => {
    window.HTMLMediaElement.prototype.play = jest.fn().mockResolvedValue('music play');
    window.HTMLMediaElement.prototype.play.then = jest.fn().mockResolvedValue(true);

    // 1. keyboard 이벤트 등록
    controller.setKeyboardEvent();

    // 2. 이벤트 호출되는지 확인하기 위해 spy설정
    let spyFn = jest.spyOn(controller, "keyDownEvent");

    // 3. keyboard 이벤트 임의 발생
    let event = new KeyboardEvent('keydown', { key: 'a' });
    await document.dispatchEvent(event);

    // 4. controller.keyDownEvent 내부 코드 sound.play 실행됨을 확인
    expect(window.HTMLMediaElement.prototype.play).toBeCalled();

    // 5. spy함수 호출되는지 확인 - fail
    expect(spyFn).toBeCalled();
});
