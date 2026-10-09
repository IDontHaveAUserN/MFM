// Audio Player Progress Interaction + Prayer Form handling
(function initSermonPlayer() {
  const playBtn = document.getElementById('sermon-play-btn');
  const progressBar = document.getElementById('audio-progress-bar');
  let isPlaying = false;

  if (playBtn) {
    playBtn.addEventListener('click', () => {
      isPlaying = !isPlaying;
      const icon = playBtn.querySelector('.material-symbols-outlined');
      if (icon) {
        icon.textContent = isPlaying ? 'pause' : 'play_arrow';
      }
    });
  }

  if (progressBar) {
    progressBar.addEventListener('click', (e) => {
      const rect = progressBar.getBoundingClientRect();
      const clickPos = (e.clientX - rect.left) / rect.width;
      const fill = progressBar.firstElementChild;
      if (fill) {
        fill.style.width = `${Math.min(100, Math.max(0, clickPos * 100))}%`;
      }
    });
  }
})();

// Prayer form submission
(function initPrayerForm() {
  const form = document.querySelector('[data-prayer-form]');
  const success = document.getElementById('prayer-success');

  if (form && success) {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      success.classList.remove('hidden');
      form.reset();
    });
  }
})();