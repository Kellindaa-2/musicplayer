// Sample playlist with lyrics
const songs = [
    {
        title: "the songs fall apart",
        artist: "Kali Uchis",
        src: "song1.mp3", // Replace with your file
        cover: "https://i.imgur.com/JWbESBg.png",
        lyrics: `[Verse 1]\nI remember when we used to dance\nUnder neon lights, lost in a trance...\n\n[Chorus]\nNow the songs fall apart\nLike my broken heart...`
    },
    {
        title: "xscape",
        artist: "Don Toliver",
        src: "song2.mp3", // Replace with your file
        cover: "https://i.imgur.com/JWbESBg.png",
        lyrics: `[Intro]\nYeah, yeah...\n\n[Verse 1]\nShe wanna xscape with me\nTo a place where we can be free...`
    }
];

// DOM Elements
const audio = document.getElementById('audio');
const playBtn = document.getElementById('playBtn');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const vinyl = document.getElementById('vinyl');
const songTitle = document.getElementById('song-title');
const artist = document.getElementById('artist');
const progressBar = document.getElementById('progress');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const lyricsBox = document.getElementById('lyrics');

let currentSongIndex = 0;

// Load song
function loadSong(song) {
    songTitle.textContent = song.title;
    artist.textContent = song.artist;
    audio.src = song.src;
    vinyl.style.backgroundImage = `url(${song.cover})`;
    lyricsBox.innerHTML = song.lyrics.replace(/\n/g, '<br>');
}

// Play/pause
playBtn.addEventListener('click', () => {
    if (audio.paused) {
        audio.play();
        playBtn.innerHTML = '<i class="fas fa-pause"></i>';
        vinyl.style.animationPlayState = 'running';
    } else {
        audio.pause();
        playBtn.innerHTML = '<i class="fas fa-play"></i>';
        vinyl.style.animationPlayState = 'paused';
    }
});

// Next/prev
prevBtn.addEventListener('click', () => {
    currentSongIndex--;
    if (currentSongIndex < 0) currentSongIndex = songs.length - 1;
    loadSong(songs[currentSongIndex]);
    if (!audio.paused) audio.play();
});

nextBtn.addEventListener('click', () => {
    currentSongIndex++;
    if (currentSongIndex > songs.length - 1) currentSongIndex = 0;
    loadSong(songs[currentSongIndex]);
    if (!audio.paused) audio.play();
});

// Progress bar
audio.addEventListener('timeupdate', () => {
    const progressPercent = (audio.currentTime / audio.duration) * 100;
    progressBar.style.width = `${progressPercent}%`;
    currentTimeEl.textContent = formatTime(audio.currentTime);
});

// Click to seek
document.querySelector('.progress-container').addEventListener('click', (e) => {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    audio.currentTime = (clickX / width) * audio.duration;
});

// Time format
function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}

// Load first song
loadSong(songs[currentSongIndex]);

// Floating hearts
function createHearts() {
    for (let i = 0; i < 10; i++) {
        const heart = document.createElement('div');
        heart.classList.add('heart');
        heart.innerHTML = '<i class="fas fa-heart"></i>';
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.animationDuration = (Math.random() * 6 + 4) + 's';
        document.body.appendChild(heart);
    }
}

createHearts();