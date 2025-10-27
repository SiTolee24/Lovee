// Confetti-like simple hearts animation on click
document.querySelector('.message-box').addEventListener('click', function(e) {
  for (let i = 0; i < 8; i++) {
    createHeart(e.clientX, e.clientY);
  }
});

function createHeart(x, y) {
  const heart = document.createElement('span');
  heart.className = 'flying-heart';
  heart.textContent = '💖';
  heart.style.left = (x || window.innerWidth/2) + 'px';
  heart.style.top = (y || window.innerHeight/2) + 'px';
  heart.style.setProperty('--x', (Math.random() - 0.5) * 200);
  heart.style.setProperty('--y', -Math.random() * 150 - 100);
  document.body.appendChild(heart);
  setTimeout(() => { heart.remove(); }, 1400);
}

// Modal Heart Logic
function showHeartModal() {
  document.getElementById('heartModal').classList.add('active');
}
function hideHeartModal(event, forceClose=false) {
  if (forceClose || event.target === document.getElementById('heartModal')) {
    document.getElementById('heartModal').classList.remove('active');
  }
}

// Music logic
const bgMusic = document.getElementById('bgMusic');
const musicBtn = document.getElementById('musicBtn');
const musicIcon = document.getElementById('musicIcon');

function playMusic() {
  bgMusic.volume = 0.7;
  bgMusic.play().then(() => {
    musicIcon.textContent = "🔊";
  }).catch(() => {
    // Autoplay might be blocked
    musicIcon.textContent = "🔈";
  });
}

function toggleMusic() {
  if (bgMusic.paused) {
    bgMusic.play();
    musicIcon.textContent = "🔊";
  } else {
    bgMusic.pause();
    musicIcon.textContent = "🔈";
  }
}

// Optional: update icon if user pauses/plays from system control
bgMusic.addEventListener('play', () => { musicIcon.textContent = "🔊"; });
bgMusic.addEventListener('pause', () => { musicIcon.textContent = "🔈"; });

// Splash/Overlay Logic + music
function hideSplash() {
  const overlay = document.getElementById('splashOverlay');
  overlay.classList.add('hide');
  setTimeout(() => {
    overlay.style.display = 'none';
    playMusic(); // Musik mulai setelah splash hilang (user submit)
  }, 500);
}

// Optional: Enter key submits splash
document.getElementById('answerInput').addEventListener('keydown', function(e) {
  if (e.key === "Enter") {
    hideSplash();
  }
});