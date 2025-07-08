// Princess Playlist 👑
const songs = [
    {
        title: "the songs fall apart",
        artist: "Kali Uchis",
        src: "YOUR_SONG_URL_HERE", // Replace with actual song URL
        cover: "https://i.pinimg.com/564x/3e/6d/9a/3e6d9a9a8f8e8f8e8f8e8f8e8f8e8f8e.jpg"
    },
    {
        title: "xscape",
        artist: "Don Toliver",
        src: "YOUR_SONG_URL_HERE", // Replace with actual song URL
        cover: "https://i.pinimg.com/564x/3e/6d/9a/3e6d9a9a8f8e8f8e8f8e8f8e8f8e8f8e.jpg"
    },
    {
        title: "all night",
        artist: "Beyoncé",
        src: "YOUR_SONG_URL_HERE", // Replace with actual song URL
        cover: "https://i.pinimg.com/564x/3e/6d/9a/3e6d9a9a8f8e8f8e8f8e8f8e8f8e8f8e.jpg"
    },
    {
        title: "when U feel lonely",
        artist: "Mavado",
        src: "YOUR_SONG_URL_HERE", // Replace with actual song URL
        cover: "https://i.pinimg.com/564x/3e/6d/9a/3e6d9a9a8f8e8f8e8f8e8f8e8f8e8f8e.jpg"
    }
];

// DOM Elements
const audio = document.getElementById('audio');
const playBtn = document.getElementById('play-btn');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const shuffleBtn = document.getElementById('shuffle-btn');
const repeatBtn = document.getElementById('repeat-btn');
const progressBar = document.getElementById('progress-bar');
const progressContainer = document.getElementById('progress-container');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const songTitle = document.querySelector('.song-title');
const artist = document.querySelector('.artist');
const disc = document.querySelector('.disc');
const volumeSlider = document.getElementById('volume-slider');
const albumCover = document.querySelector('.album-cover');

// Player state
let isPlaying = false;
let currentSongIndex = 0;
let isShuffled = false;
let isRepeated = false;
let shuffledPlaylist = [...songs];

// Initialize player
function loadSong(song) {
    songTitle.textContent = song.title;
    artist.textContent = song.artist;
    audio.src = song.src;
    albumCover.src = song.cover;
    
    // Reset progress bar
    progressBar.style.width = '0%';
    currentTimeEl.textContent = '0:00';
    durationEl.textContent = '0:00';
    
    // When metadata is loaded, update duration
    audio.addEventListener('loadedmetadata', () => {
        durationEl.textContent = formatTime(audio.duration);
    });
}

// Play song
function playSong() {
    isPlaying = true;
    playBtn.innerHTML = '<i class="fas fa-pause"></i>';
    disc.classList.add('playing');
    audio.play();
}

// Pause song
function pauseSong() {
    isPlaying = false;
    playBtn.innerHTML = '<i class="fas fa-play"></i>';
    disc.classList.remove('playing');
    audio.pause();
}

// Toggle play/pause
function togglePlay() {
    if (isPlaying) {
        pauseSong();
    } else {
        playSong();
    }
}

// Previous song
function prevSong() {
    currentSongIndex--;
    if (currentSongIndex < 0) {
        currentSongIndex = songs.length - 1;
    }
    loadSong(isShuffled ? shuffledPlaylist[currentSongIndex] : songs[currentSongIndex]);
    if (isPlaying) {
        playSong();
    }
}

// Next song
function nextSong() {
    currentSongIndex++;
    if (currentSongIndex > songs.length - 1) {
        currentSongIndex = 0;
    }
    loadSong(isShuffled ? shuffledPlaylist[currentSongIndex] : songs[currentSongIndex]);
    if (isPlaying) {
        playSong();
    }
}

// Update progress bar
function updateProgress(e) {
    const { duration, currentTime } = e.srcElement;
    const progressPercent = (currentTime / duration) * 100;
    progressBar.style.width = `${progressPercent}%`;
    currentTimeEl.textContent = formatTime(currentTime);
}

// Set progress when clicking on progress bar
function setProgress(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;
    audio.currentTime = (clickX / width) * duration;
}

// Format time in mm:ss
function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}

// Toggle shuffle
function toggleShuffle() {
    isShuffled = !isShuffled;
    shuffleBtn.classList.toggle('active');
    
    if (isShuffled) {
        // Create shuffled playlist
        shuffledPlaylist = [...songs];
        for (let i = shuffledPlaylist.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledPlaylist[i], shuffledPlaylist[j]] = [shuffledPlaylist[j], shuffledPlaylist[i]];
        }
        // Find current song in shuffled playlist
        const currentSong = songs[currentSongIndex];
        currentSongIndex = shuffledPlaylist.findIndex(song => 
            song.title === currentSong.title && song.artist === currentSong.artist
        );
    }
}

// Toggle repeat
function toggleRepeat() {
    isRepeated = !isRepeated;
    repeatBtn.classList.toggle('active');
    audio.loop = isRepeated;
}

// Set volume
function setVolume() {
    audio.volume = this.value;
}

// Create floating hearts
function createHearts() {
    const heartsContainer = document.querySelector('.hearts');
    for (let i = 0; i < 10; i++) {
        const heart = document.createElement('div');
        heart.classList.add('heart');
        heart.innerHTML = '<i class="fas fa-heart"></i>';
        heart.style.left = Math.random() * 100 + '%';
        heart.style.top = Math.random() * 100 + '%';
        heart.style.fontSize = (Math.random() * 20 + 10) + 'px';
        heart.style.animationDuration = (Math.random() * 15 + 10) + 's';
        heart.style.animationDelay = (Math.random() * 10) + 's';
        heartsContainer.appendChild(heart);
    }
}

// Event listeners
playBtn.addEventListener('click', togglePlay);
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
shuffleBtn.addEventListener('click', toggleShuffle);
repeatBtn.addEventListener('click', toggleRepeat);
audio.addEventListener('timeupdate', updateProgress);
audio.addEventListener('ended', () => {
    if (!isRepeated) {
        nextSong();
    }
});
progressContainer.addEventListener('click', setProgress);
volumeSlider.addEventListener('input', setVolume);

// Create floating hearts
createHearts();

// Load first song
loadSong(songs[currentSongIndex]);