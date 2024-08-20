const playBtn = document.querySelector("#play")
const nextBtn = document.querySelector("#next")
const backBtn = document.querySelector("#back")
const progress = document.querySelector(".progress")
const currentTime = document.querySelector(".currentTime")
const musicDuration = document.querySelector(".musicDuration")
const songName = document.querySelector(".songName")
const artistName = document.querySelector(".artistName")
const image = document.querySelector(".image")

let audio = null
let isPlaying = false
let totalDuration = null
let currentTimeSong = null
let currentSongIndex = 0
let currentSong = songs[0]
let automativallyStopAudio = false

audio = new Audio()

audio.src = currentSong.song
image.src = currentSong.cover
artistName.textContent = currentSong.artistName
songName.textContent = currentSong.songName


function setMusic () {

    audio.addEventListener("timeupdate", ()=> {
        currentTime.textContent = formatTime(audio.currentTime)
       
    })
        
    audio.addEventListener("loadedmetadata",()=> {
        musicDuration.textContent = formatTime(audio.duration)
        // progress.max = 100
    })
        
}

setMusic()




playBtn.addEventListener("click", ()=> {
    if(audio.paused) {
        audio.play()
        isPlaying = true
        playBtn.classList.remove("fa-play")
        playBtn.classList.add("fa-pause")
        
        
    } else {
        audio.pause()
        isPlaying = false
        playBtn.classList.remove("fa-pause")
        playBtn.classList.add("fa-play")
    }

    
}) 

function formatTime (time) {
    let min = Math.floor(time / 60)
    if (min < 10) {
        min = `0${min}`
    }
    let sec = Math.floor(time % 60)
    if (sec < 10) {
        sec = `0${sec}`
    }

    return `${min}:${sec}`

}

// audio.ontimeupdate = ()=> {
//     if(!audio.currentTime) {
//         progress.value = audio.currentTime
//         progress.max = audio.duration     
//     }
//     console.log(progress)
// }


audio.addEventListener("timeupdate", ()=> {
    const percent = audio.currentTime / audio.duration * 100
    progress.value = percent
  
})

// audio.addEventListener("timeupdate", ()=>{
//     if(!audio.paused){
//     const percent = (audio.currentTime / audio.duration) * 100
//     progress.value = percent
//     console.log(value) 
//     }
// })

progress.addEventListener("input", ()=> {
    const time = (progress.value / 100) * audio.duration
    audio.currentTime = time
    automativallyStopAudio = false
    // progress.value = 0
})

audio.addEventListener("ended", ()=> {
    currentSongIndex++;

    if (currentSongIndex < songs.length) {
        currentSong = songs[currentSongIndex];
        audio.src = currentSong.song;
        image.src = currentSong.cover;
        songName.textContent = currentSong.songName;
        artistName.textContent = currentSong.artistName;
        
        
        progress.value = 0; // Reset the progress bar
        audio.load();
        audio.play(); // Automatically play the next song
    } else {
        currentSongIndex = 0; // Optionally loop back to the first song
        audio.src = songs[currentSongIndex].song;
        image.src = songs[currentSongIndex].cover;
        songName.textContent = songs[currentSongIndex].songName;
        artistName.textContent = songs[currentSongIndex].artistName;
        progress.value = 0;
        audio.load();
        playBtn.classList.remove("fa-pause")
        playBtn.classList.add("fa-play")
    }

    
});


nextBtn.addEventListener("click", ()=> {
    if(currentSongIndex < songs.length - 1) {
        currentSongIndex++
    } else {
        currentSongIndex = 0
    }

    console.log(currentSongIndex)
    currentSong = songs[currentSongIndex]
    
    progress.value = 0
    audio.currentTime = 0
    progress.max = 100

    console.log(progress.value)
    console.log(audio.currentTime)

    audio.src = currentSong.song
    image.src = currentSong.cover
    songName.textContent = currentSong.songName
    artistName.textContent = currentSong.artistName

    if(isPlaying){
        audio.play()
    } else {
        audio.pause()
    }

    setTimeout(()=> {
        musicDuration.textContent = formatTime(audio.duration)
    }, 300)
    

})

backBtn.addEventListener("click", ()=> {
    if(currentSongIndex > 0) {
        currentSongIndex--
    } else {
        currentSongIndex > songs.length - 1
    }
    
    console.log(currentSongIndex)
    currentSong = songs[currentSongIndex]
    audio.src = currentSong.song
    image.src = currentSong.cover
    songName.textContent = currentSong.songName
    artistName.textContent = currentSong.artistName

    if(isPlaying){
        audio.play()
    } else {
        audio.pause()
    }

    setTimeout(()=> {
        musicDuration.textContent = formatTime(audio.duration)
    }, 300)


})



