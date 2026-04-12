import '../scss/main.scss';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

if (import.meta.env.DEV) {
  console.log('[dev] Odoo mockup — build OK');
}

function setVideoPreviewButtonState(button, videoIsPlaying) {
  button.dataset.action = videoIsPlaying ? 'pause' : 'play';
  button.setAttribute('aria-pressed', String(videoIsPlaying));
  button.setAttribute(
    'aria-label',
    videoIsPlaying ? 'Mettre la vidéo en pause' : 'Lire la vidéo'
  );

  const label = videoIsPlaying ? 'Pause video' : 'Play video';
  const icon = document.createElement('i');
  icon.className = videoIsPlaying ? 'bi bi-pause' : 'bi bi-play';
  icon.setAttribute('aria-hidden', 'true');

  button.replaceChildren();
  button.append(document.createTextNode(`${label} `), icon);
}

document.addEventListener('DOMContentLoaded', () => {
  const videoButtons = document.querySelectorAll('.video-preview__btn');

  videoButtons.forEach((btn) => {
    btn.setAttribute('aria-pressed', 'false');
    btn.setAttribute('aria-label', 'Lire la vidéo');

    btn.addEventListener('click', () => {
      const willStartPlaying = btn.dataset.action === 'play';
      setVideoPreviewButtonState(btn, willStartPlaying);
    });
  });

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
