document.addEventListener('DOMContentLoaded', () => {
    const songs = [
      {
        title: "Fall Apart",
        artist: "Kali Uchis",
        src: "music/Fall Apart.mp3",
        cover: "https://t2.genius.com/unsafe/202x202/https%3A%2F%2Fimages.genius.com%2F8642dc3f58c90b87c6d0a908cebaa723.1000x1000x1.png"
      },
      {
        title: "Kitchen",
        artist: "SZA",
        src: "music/Kitchen.mp3",
        cover: "https://t2.genius.com/unsafe/202x202/https%3A%2F%2Fimages.genius.com%2F1ec6707691f2cbe2715f37e92f3456f0.1000x1000x1.png"
      },
      {
        title: "Xscape",
        artist: "Don Toliver",
        src: "music/Xscape.mp3",
        cover: "https://t2.genius.com/unsafe/202x202/https%3A%2F%2Fimages.genius.com%2Ff5c0e2cfc40e6ef43b1632c8747b2293.1000x1000x1.png"
      }
    ];
  
    const audio = document.getElementById('audio-element');
    const playBtn = document.querySelector('.play-btn');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const progressBar = document.querySelector('.progress-bar');
    const progressContainer = document.querySelector('.progress-container');
    const currentTimeEl = document.querySelector('.current-time');
    const durationEl = document.querySelector('.duration');
    const songTitle = document.querySelector('.song-title');
    const artistEl = document.querySelector('.artist');
    const albumCover = document.querySelector('.album-cover');
  
    let isPlaying = false;
    let currentSongIndex = 0;
  
    function formatTime(seconds) {
      const mins = Math.floor(seconds / 60);
      const secs = Math.floor(seconds % 60);
      return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    }
  
    function loadSong(song) {
      songTitle.textContent = song.title;
      artistEl.textContent = song.artist;
      audio.src = song.src;
      albumCover.src = song.cover;
  
      audio.addEventListener('loadedmetadata', () => {
        durationEl.textContent = formatTime(audio.duration);
      });
    }
  
    function playSong() {
      isPlaying = true;
      playBtn.innerHTML = '<i class="fas fa-pause"></i>';
      albumCover.classList.add('playing');
      audio.play();
    }
  
    function pauseSong() {
      isPlaying = false;
      playBtn.innerHTML = '<i class="fas fa-play"></i>';
      albumCover.classList.remove('playing');
      audio.pause();
    }
  
    function togglePlay() {
      isPlaying ? pauseSong() : playSong();
    }
  
    function changeSong(direction) {
      currentSongIndex = (currentSongIndex + direction + songs.length) % songs.length;
      loadSong(songs[currentSongIndex]);
      if (isPlaying) playSong();
    }
  
    function updateProgress() {
      const { duration, currentTime } = audio;
      const progressPercent = (currentTime / duration) * 100;
      progressBar.style.width = `${progressPercent}%`;
      currentTimeEl.textContent = formatTime(currentTime);
    }
  
    function setProgress(e) {
      const width = this.clientWidth;
      const clickX = e.offsetX;
      const duration = audio.duration;
      audio.currentTime = (clickX / width) * duration;
    }
  
    playBtn.addEventListener('click', togglePlay);
    prevBtn.addEventListener('click', () => changeSong(-1));
    nextBtn.addEventListener('click', () => changeSong(1));
    audio.addEventListener('timeupdate', updateProgress);
    progressContainer.addEventListener('click', setProgress);
    audio.addEventListener('ended', () => changeSong(1));
  
    loadSong(songs[currentSongIndex]);
  });
  