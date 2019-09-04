document.body.innerHTML = `<div id="content"></div>`;

let controller = require("../src/controller");
// let {contents, data, setKeyboardEvent} = require("../src/controller");

let content = document.getElementById("content");
content.innerHTML = controller.contents(controller.data);

test('test snapshots - contents result', function () {
    expect(document.body).toMatchSnapshot();
});

test("test keydown event", async () => {
    let keyName = 'G';
    // JSdom이 접근할 수 있도록, mock 함수로 선언해둔다.
    window.HTMLMediaElement.prototype.play = jest.fn().mockResolvedValue(true);
    window.HTMLMediaElement.prototype.play.then = jest.fn().mockImplementation(() => {
        controller.pressBox(`[data-key="${keyName}"]`); // 실제 성공할 경우, 기존 코드와 동일한 함수를 호출하게 지정한다.
    });
    // 이벤트 호출되는지 확인하기 위해 spy설정
    let spyFn = jest.spyOn(controller, "pressBox");

    // keyboard 이벤트 등록
    controller.setKeyboardEvent();

    // keyboard 이벤트 임의 발생
    let event = new KeyboardEvent('keydown', { key: keyName });
    await document.dispatchEvent(event);

    // check1. controller.keyDownEvent 내부 코드 sound.play 실행됨을 확인
    await expect(window.HTMLMediaElement.prototype.play).resolves.toBeCalled();
    expect(spyFn).toBeCalled();

    // check2. pressBox 호출되어 UI 적용 제대로 되었는지 확인.
    let ele = document.querySelector(`[data-key="${keyName}"]`);
    expect(ele.classList.contains('box--press')).toBe(true);
});
