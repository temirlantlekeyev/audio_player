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
        progress.max = 100; // Set the max value for the progress bar
    });

    audio.addEventListener("timeupdate", () => {
        const percent = (audio.currentTime / audio.duration) * 100;
        progress.value = percent;
        currentTime.textContent = formatTime(audio.currentTime);
    });

    audio.addEventListener("ended", () => {
        handleNextTrack(); // Move to the next track when the current one ends
    });
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

function formatTime(time) {
    let min = Math.floor(time / 60);
    if (min < 10) min = `0${min}`;
    let sec = Math.floor(time % 60);
    if (sec < 10) sec = `0${sec}`;
    return `${min}:${sec}`;
}

progress.addEventListener("input", () => {
    const time = (progress.value / 100) * audio.duration;
    audio.currentTime = time;
});

function handleNextTrack() {
    currentSongIndex++;
    if (currentSongIndex < songs.length) {
        loadTrack();
    } else {
        currentSongIndex = 0; // Optionally loop back to the first song
        loadTrack();
        playBtn.classList.remove("fa-pause");
        playBtn.classList.add("fa-play");
    }
}

nextBtn.addEventListener("click", () => {
    if (currentSongIndex < songs.length - 1) {
        currentSongIndex++;
    } else {
        currentSongIndex = 0;
    }
    loadTrack();
});

backBtn.addEventListener("click", () => {
    if (currentSongIndex > 0) {
        currentSongIndex--;
    } else {
        currentSongIndex = songs.length - 1;
    }
    loadTrack();
});

function loadTrack() {
    currentSong = songs[currentSongIndex];
    audio.src = currentSong.song;
    image.src = currentSong.cover;
    songName.textContent = currentSong.songName;
    artistName.textContent = currentSong.artistName;
    audio.load();

    // Reset progress bar and play button
    progress.value = 0;
    currentTime.textContent = "00:00";
    musicDuration.textContent = "00:00";

    audio.addEventListener("loadedmetadata", () => {
        musicDuration.textContent = formatTime(audio.duration);
    });

    if (isPlaying) {
        audio.play();
    }
}
