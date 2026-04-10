import '../scss/main.scss';

console.log('Project initialized');

// Video preview play/pause
document.addEventListener('DOMContentLoaded', () => {
  const videoButtons = document.querySelectorAll('.video-preview__btn');
  
  videoButtons.forEach(btn => {
    btn.addEventListener('click', function() {
      const isPlaying = this.dataset.action === 'pause';
      
      if (isPlaying) {
        // Pause action
        this.dataset.action = 'play';
        this.innerHTML = `Play video <i class="bi bi-play ms-2"></i>`;
      } else {
        // Play action
        this.dataset.action = 'pause';
        this.innerHTML = `Pause video <i class="bi bi-pause ms-2"></i>`;
      }
      
      // TODO: Implémenter la vraie vidéo avec <video> tag plus tard
      console.log(isPlaying ? 'Video paused' : 'Video playing');
    });
  });
});
