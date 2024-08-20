const playBtn = document.querySelector("#play");
const nextBtn = document.querySelector("#next");
const backBtn = document.querySelector("#back");
const progress = document.querySelector(".progress");
const currentTime = document.querySelector(".currentTime");
const musicDuration = document.querySelector(".musicDuration");
const songName = document.querySelector(".songName");
const artistName = document.querySelector(".artistName");
const image = document.querySelector(".image");

let audio = new Audio();
let isPlaying = false;
let currentSongIndex = 0;
let currentSong = songs[currentSongIndex];

audio.src = currentSong.song;
image.src = currentSong.cover;
artistName.textContent = currentSong.artistName;
songName.textContent = currentSong.songName;

function setMusic() {
    audio.addEventListener("loadedmetadata", () => {
        musicDuration.textContent = formatTime(audio.duration);
        progress.max = 100;
        updateProgress(); // Update progress once metadata is loaded
        console.log("hello")
    });

    audio.addEventListener("timeupdate", updateProgress);
}

setMusic();

playBtn.addEventListener("click", () => {
    if (audio.paused) {
        audio.play();
        isPlaying = true;
        playBtn.classList.remove("fa-play");
        playBtn.classList.add("fa-pause");
    } else {
        audio.pause();
        isPlaying = false;
        playBtn.classList.remove("fa-pause");
        playBtn.classList.add("fa-play");
    }
});

function updateProgress() {
    if (!isNaN(audio.duration)) {
        currentTime.textContent = formatTime(audio.currentTime);
        const percent = (audio.currentTime / audio.duration) * 100;
        progress.value = percent;
        // progress.style.setProperty("--progress", `${percent}%`)
    }
}

progress.addEventListener("input", () => {
    const time = (progress.value / 100) * audio.duration;
    audio.currentTime = time;
    // progress.style.setProperty("--progress", `${progress.value}%`)
    console.log(time)
});

audio.addEventListener("ended", () => {
    nextTrack();
    console.log("aaa")
});

nextBtn.addEventListener("click", nextTrack);

backBtn.addEventListener("click", () => {
    if (currentSongIndex > 0) {
        currentSongIndex--;
    } else {
        currentSongIndex = songs.length - 1;
    }
    loadTrack();
});

function nextTrack() {
    if (currentSongIndex < songs.length - 1) {
        currentSongIndex++;
    } else {
        currentSongIndex = 0;
    }
    loadTrack();
}

function loadTrack() {
    currentSong = songs[currentSongIndex];
    audio.src = currentSong.song;
    image.src = currentSong.cover;
    songName.textContent = currentSong.songName;
    artistName.textContent = currentSong.artistName;

    audio.load();
    if (isPlaying) {
        audio.play();
    }
    console.log("loooaaad")

    // Update the UI once the metadata is loaded
    audio.addEventListener("loadedmetadata", () => {
        musicDuration.textContent = formatTime(audio.duration);
        progress.value = 0; // Reset progress when track is loaded
    });
}

function formatTime(time) {
    let min = Math.floor(time / 60);
    if (min < 10) min = `0${min}`;
    let sec = Math.floor(time % 60);
    if (sec < 10) sec = `0${sec}`;
    return `${min}:${sec}`;
}
