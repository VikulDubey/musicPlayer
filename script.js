const audioTrack = document.querySelector(".audioTrack");
const play = document.querySelector("#play");
const timeCounter = document.querySelector(".timeCounter");
const trackTimeLine = document.querySelector("#trackTimeLine");
const loopButton = document.querySelector(".loopButton");
let interValId;

// To Update the Progress Line
function timeLineUpdate() {
  trackTimeLine.max = audioTrack.duration;
  trackTimeLine.value = audioTrack.currentTime;
  timeCounter.lastElementChild.textContent = `${getMinSecForAudioTime.totalMin()}:${getMinSecForAudioTime.totalSec()}`;
  if (audioTrack.currentTime == audioTrack.duration) {
    play.classList.add("fa-play");
    play.classList.remove("fa-pause");
    audioTrack.currentTime;
    clearInterval(interValId);
  }
}

// Update the duration & current time in progress bar on first time.
audioTrack.addEventListener("loadedmetadata", timeLineUpdate);
// functions for getting minutes, seconds of total and current time
const getMinSecForAudioTime = {
  currentMin: () => {
    const minutes = Math.floor((audioTrack.currentTime / 60) % 60);
    return minutes;
  },
  currentSec: () => {
    const seconds = Math.floor(audioTrack.currentTime % 60);
    return seconds;
  },
  totalMin: () => {
    const min = Math.floor((audioTrack.duration / 60) % 60);
    return min;
  },
  totalSec: () => {
    const sec = Math.floor(audioTrack.duration % 60);
    return sec;
  },
};

// To play and pause the Music
function playPauseTrack() {
  if (play.classList.contains("fa-play")) {
    audioTrack.play();
    play.classList.remove("fa-play");
    play.classList.add("fa-pause");
  } else {
    audioTrack.pause();
    clearInterval(interValId);
    play.classList.remove("fa-pause");
    play.classList.add("fa-play");
  }
}

// If It is playing track the minutes & seconds in DOM
if (audioTrack.play) {
  interValId = setInterval(() => {
    timeCounter.firstElementChild.innerHTML = `${getMinSecForAudioTime.currentMin()}:${getMinSecForAudioTime.currentSec()}`;
    timeLineUpdate();
  }, 500);
}

// Listing Click Event on button and running the play pause function
play.addEventListener("click", () => {
  playPauseTrack();
});

// Handle click event on progress bar to shift any time on timeLine.
trackTimeLine.addEventListener("change", () => {
  audioTrack.play();
  play.classList.remove("fa-play");
  play.classList.add("fa-pause");
  audioTrack.currentTime = trackTimeLine.value;
  timeCounter.firstElementChild.innerHTML = `${getMinSecForAudioTime.currentMin()}:${getMinSecForAudioTime.currentSec()}`;
});

// To Restart the Audio
loopButton.addEventListener("click", () => {
  audioTrack.currentTime = 0;
  trackTimeLine.value = 0;
  timerCounter.firstElementChild.innerHTML = "0:0";
});

// at the end of the music;
