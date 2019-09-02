document.body.innerHTML = `<div id="content"></div>`;

test('test snapshots - contents result', function () {
    let { contents, data} = require("../src/controller");

    let content = document.getElementById("content");
    content.innerHTML = contents(data);
    expect(document.body).toMatchSnapshot();
});

test("test snapshots - test", () => {
    expect('<ul><li><a href="#">My HTML</a></li></ul>').toMatchSnapshot();
});

// test("test keydown event", () => {
//     import { setKeyboardEvent } from "../src/controller";
// });
