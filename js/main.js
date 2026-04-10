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
        this.innerHTML = `Play video <i class="bi bi-play"></i>`;
      } else {
        // Play action
        this.dataset.action = 'pause';
        this.innerHTML = `Pause video <i class="bi bi-pause"></i>`;
      }
      
      // TODO: Implémenter la vraie vidéo avec <video> tag plus tard
      console.log(isPlaying ? 'Video paused' : 'Video playing');
    });
  });

  // Header: cache au scroll vers le bas, réapparaît au scroll vers le haut
  const header = document.querySelector('.header');
  if (!header) return;

  const collapse = header.querySelector('.navbar-collapse');
  const MIN_DELTA = 6;
  let lastY = window.scrollY || 0;
  const root = document.documentElement;

  const syncHeaderHeight = () => {
    const h = header.getBoundingClientRect().height;
    root.style.setProperty('--header-height', `${Math.round(h)}px`);
  };

  const onScroll = () => {
    const currentY = window.scrollY || 0;
    const delta = currentY - lastY;
    const isMenuOpen = collapse?.classList.contains('show');

    if (currentY > 8) {
      header.classList.add('header--scrolled');
    } else {
      header.classList.remove('header--scrolled');
    }

    if (!isMenuOpen && Math.abs(delta) > MIN_DELTA) {
      if (delta > 0 && currentY > 80) {
        header.classList.add('header--hidden');
      } else if (delta < 0) {
        header.classList.remove('header--hidden');
      }
      lastY = currentY;
    } else {
      lastY = currentY;
    }
  };

  // Si le menu mobile est ouvert, on force le header visible
  if (collapse) {
    collapse.addEventListener('show.bs.collapse', () => {
      header.classList.remove('header--hidden');
      syncHeaderHeight();
    });
    collapse.addEventListener('hidden.bs.collapse', syncHeaderHeight);
  }

  syncHeaderHeight();
  onScroll();
  window.addEventListener('resize', syncHeaderHeight);
  window.addEventListener('scroll', onScroll, { passive: true });
});
