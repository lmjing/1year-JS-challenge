const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');

function getVideo() {
    navigator.mediaDevices.getUserMedia({video: true, audio: false})
        .then(localMediaStream => {
            // localMediaStream Type : MediaStream
            // console.log(localMediaStream);
            /* 강의는 구버전으로 update되었다.
            https://stackoverflow.com/questions/27120757/failed-to-execute-createobjecturl-on-url
             */
            // video.srcObject = window.URL.createObjectURL(localMediaStream);
            video.srcObject = localMediaStream;
            video.play();
        })
        .catch(err => {
            console.log(`[error] : ${err}`);
        });
}

function paintToCanvas() {
    const width = video.videoWidth;
    const height = video.videoHeight;
    canvas.width = width;
    canvas.height = height;

    return setInterval(() => {
        ctx.drawImage(video, 0, 0, width, height);
        // take the pixels out
        let pixels = ctx.getImageData(0, 0, width, height);
        // mess with them
        // pixels = redEffect(pixels);

        // pixels = rgbSplit(pixels);
        // ctx.globalAlpha = 0.1;

        pixels = greenScreen(pixels);

        // puth them back
        ctx.putImageData(pixels, 0, 0);
    }, 16);
}

function takePhoto() {
    // played the sound
    snap.currentTime = 0;
    snap.play();

    // take the data out of the canvas
    const data = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = data;
    link.setAttribute('download', 'capture');
    link.innerHTML = `<img src="${data}" alt="captures" />`;
    // link.textContent = 'Download Image';
    strip.insertBefore(link, strip.firstChild);
}

// data 조회해보면 차례대로 r,g,b의 값을 나타냄
function redEffect(pixels) {
    for (let i = 0; i < pixels.data.length; i += 4) {
        pixels.data[i + 0] = pixels.data[i + 0] + 100; // RED
        pixels.data[i + 1] = pixels.data[i + 1] - 50; // GREEN
        pixels.data[i + 2] = pixels.data[i + 2] * 0.5; // BLUE
    }
    return pixels;
}

function rgbSplit(pixels) {
    for (let i = 0; i < pixels.data.length; i += 4) {
        pixels.data[i - 150] = pixels.data[i + 0]; // RED
        pixels.data[i + 500] = pixels.data[i + 1]; // GREEN
        pixels.data[i - 150] = pixels.data[i + 2]; // BLUE
    }
    return pixels;
}

function greenScreen(pixels) {
    const levels = {};

    document.querySelectorAll('.rgb input').forEach((input) => {
        levels[input.name] = input.value;
    });

    for (let i = 0; i < pixels.data.length; i += 4) {
        let red = pixels.data[i + 0];
        let green = pixels.data[i + 1];
        let blue = pixels.data[i + 2];
        let alpha = pixels.data[i + 3];

        if (red >= levels.rmin
            && green >= levels.gmin
            && blue >= levels.bmin
            && red <= levels.rmax
            && green >= levels.gmax
            && blue >= levels.bmax) {
            // take it out!
            pixels.data[i + 3] = 0;
        }
    }

    return pixels;
}

getVideo();

video.addEventListener('canplay', paintToCanvas);
