// Getting all the elements

const player = document.querySelector(".player");
const controls = document.querySelector(".player__controls");
const video = player.querySelector(".viewer");
const progress = player.querySelector(".progress");
const progressBar = player.querySelector(".progress__filled");
const toggle = player.querySelector(".toggle");
const skipButtons = player.querySelectorAll("[data-skip]");
const ranges = player.querySelectorAll(".player__slider");

// Function handlers

function handlePlay(e) {
  video.paused ? video.play() : video.pause();
}

function handleSkip(e) {
  video.currentTime += parseFloat(this.dataset.skip);
}

let mouseClicked = false;

function handleRanges(e) {
  if (mouseClicked) {
    //  if (this.name === "volume") {
    //    video.volume = this.value;
    //  }
    //  if (this.name === "playbackRate") {
    //    video.playbackRate = this.value;
    //  }
    video[this.name] = this.value; // this is the short way to write last commented portion of code, more readable
  }
}

function handleProgress(e) {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`; // flexBasis = flex-basis (on CSS), can be also accessed using progressBar.style['flex-basis'], bracket notation or dash notation are the way's we can access data of an element
}

function handleScrub(e) {
  // We need to get the current cursor position in our progress element, that's possible with e.offsetX, then we need to divide that against the width of the element with this.offsetWidth, finally we can multiply the result against the video.duration because that's our 100% of our equation here
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  console.log(this === progress); // Strange behaviour, this is for sure equals to progress, but when that happens on the mousemove event that changes, and appears as false, but on the click event, that's true, that's whi I need to use progress on the math operation abobe, using this will return always undefined on the mousemove.

  video.currentTime = scrubTime;
}

function handleMouseClicked(e) {
  if (e.type === "mousedown") {
    mouseClicked = true;
  }
  if (e.type === "mouseup") {
    mouseClicked = false;
  }
}

// Event listeners

toggle.addEventListener("click", handlePlay);
video.addEventListener("click", handlePlay);
video.addEventListener("pause", () => (toggle.innerHTML = "►"));
video.addEventListener("play", () => (toggle.innerHTML = "||"));
video.addEventListener("timeupdate", handleProgress); // The time indicated by the currentTime attribute has been updated.

skipButtons.forEach(element => {
  element.addEventListener("click", handleSkip);
});

ranges.forEach(element => {
  element.addEventListener("change", handleRanges);
});
ranges.forEach(element => {
  element.addEventListener("mousemove", handleRanges);
});
ranges.forEach(element => {
  element.addEventListener("mousedown", () => (mouseClicked = true));
});
ranges.forEach(element => {
  element.addEventListener("mouseup", () => (mouseClicked = false));
});
progress.addEventListener("click", handleScrub);
progress.addEventListener("mousemove", e => {
  if (mouseClicked) {
    handleScrub(e);
  }
});
// Next line is the short way to write above code, handleScrub(e) will not run unless mouseClicked is true, evaluates from left to right
// progress.addEventListener("mousemove", e => mouseClicked && handleScrub(e));
progress.addEventListener("mouseup", () => (mouseClicked = false));
progress.addEventListener("mousedown", () => (mouseClicked = true));
