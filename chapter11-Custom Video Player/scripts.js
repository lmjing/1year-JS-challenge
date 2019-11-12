const player = document.querySelector('.player');
const video = document.querySelector('.viewer');
const progress = document.querySelector('.progress');
const progressBar = document.querySelector('.progress__filled');
const toggle = document.querySelector('.toggle');
const skipButtons = document.querySelectorAll('[data-skip]');
const ranges = document.querySelectorAll('.player__slider');

let mousedown = false;

function togglePlay() {
    let action = video.paused ? 'play' : 'pause';
    video[action]();
    action = null;
}
function updateButton() {
    let button = video.paused ? '▶' : '❚ ❚';
    toggle.innerText = button;
    button = null;
}
function updateSound() {
    video.volume = ranges[0].value;
}
function updateSpeed() {
    video.playbackRate = ranges[1].value;
}
function updateProgressBar(e) {
    let percent = 0;
    if (e.type === 'mousemove') { // 추가 기능 : 마우스 움직이는 곳까지 progressBar 채우기
        percent = (e.offsetX / progress.offsetWidth) * 100;
    } else { // 비디오 재생시간만큼 progressBar 채우기
        percent = (video.currentTime / video.duration) * 100;
    }
    progressBar.style.flexBasis = `${percent}%`;
    percent = null;
}
/*
 offset : offsetX는 상위 element의 시작점이 기준인 상태로 측젇되는 값이다.
 따라서, changePlayTime의 메소드에서 e.offsetX는 progress의 시작점부터 측정되는 X 값이다.
  */
function changePlayTime(e) {
    console.log(e);
    e.preventDefault();
    let playTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = playTime;  // chrome에서 몇몇 안되는 현상 발생
    console.log(playTime);

    playTime = null;
    mousedown = false;
}

function skip() {
    let playTime = video.currentTime + parseFloat(this.dataset.skip);
    video.currentTime = playTime; // chrome에서 몇몇 안되는 현상 발생
    console.log(playTime);
}

video.addEventListener('click', togglePlay);
video.addEventListener('click', updateButton);
video.addEventListener('timeupdate', updateProgressBar);

toggle.addEventListener('click', togglePlay);
toggle.addEventListener('click', updateButton);

ranges[0].addEventListener('input', updateSound);
ranges[1].addEventListener('input', updateSpeed);

progress.addEventListener('click', changePlayTime);
progress.addEventListener('mousemove', (e) => { mousedown && updateProgressBar(e)});
progress.addEventListener('mousedown', () => { mousedown = true });
progress.addEventListener('mouseup', changePlayTime);

// skipButtons.forEach(button => button.addEventListener('click', skip));
skipButtons[1].addEventListener('click', skip);
