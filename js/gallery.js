// js/gallery.js
// Photo gallery: category filtering + lightbox viewer + full-album mode

(function initGallery() {
  const grid = document.getElementById('gallery-grid');
  const filters = document.querySelectorAll('.gallery-filter');
  const lightbox = document.getElementById('gallery-lightbox');
  const lightboxImg = document.getElementById('gallery-lightbox-img');
  const lightboxCaption = document.getElementById('gallery-lightbox-caption');
  const closeBtn = document.getElementById('gallery-lightbox-close');
  const fullBtn = document.getElementById('gallery-open-full');
  const prevBtn = document.getElementById('gallery-lightbox-prev');
  const nextBtn = document.getElementById('gallery-lightbox-next');

  if (prevBtn) prevBtn.addEventListener('click', prevSlide);
  if (nextBtn) nextBtn.addEventListener('click', nextSlide);

  if (!grid) return;

  // ---------- Collect all gallery items ----------
  function getAllItems() {
    return Array.from(grid.querySelectorAll('.gallery-item')).map((el) => ({
      el,
      src: el.getAttribute('data-full') || el.querySelector('img').src,
      caption: (el.querySelector('.gallery-caption') || {}).textContent?.trim() || '',
      category: el.getAttribute('data-category') || ''
    }));
  }

  // ---------- Filtering ----------
  filters.forEach((btn) => {
    btn.addEventListener('click', () => {
      const filter = btn.getAttribute('data-filter');

      filters.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      grid.querySelectorAll('.gallery-item').forEach((item) => {
        const cat = item.getAttribute('data-category');
        item.classList.toggle('is-hidden', !(filter === 'all' || cat === filter));
      });
    });
  });

  // ---------- Lightbox ----------
  let album = [];       // the current array being viewed
  let currentIndex = 0; // index inside album

  function renderSlide() {
    const item = album[currentIndex];
    if (!item) return;
    lightboxImg.src = item.src;
    lightboxImg.alt = item.caption || '';
    if (lightboxCaption) {
      lightboxCaption.textContent =
        `${item.caption || ''}  (${currentIndex + 1} / ${album.length})`;
    }
  }

  function openLightbox(items, startIndex = 0) {
    if (!lightbox || !lightboxImg || !items || !items.length) return;
    album = items;
    currentIndex = Math.max(0, Math.min(startIndex, items.length - 1));
    renderSlide();
    lightbox.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    if (!lightbox) return;
    lightbox.classList.remove('is-open');
    lightboxImg.src = '';
    document.body.style.overflow = '';
  }

  function nextSlide() {
    if (!album.length) return;
    currentIndex = (currentIndex + 1) % album.length;
    renderSlide();
  }

  function prevSlide() {
    if (!album.length) return;
    currentIndex = (currentIndex - 1 + album.length) % album.length;
    renderSlide();
  }

  // Click any gallery item → open lightbox with ONLY the currently visible items
  grid.querySelectorAll('.gallery-item').forEach((item) => {
    item.addEventListener('click', (e) => {
      e.preventDefault();

      const visible = getAllItems().filter((it) => !it.el.classList.contains('is-hidden'));
      const clicked = getAllItems().find((it) => it.el === item);
      const startIndex = visible.findIndex((it) => it.src === clicked.src);

      openLightbox(visible, startIndex >= 0 ? startIndex : 0);
    });
  });

  // "Ver Todas as Fotos" → open lightbox with ALL items
  if (fullBtn) {
    fullBtn.addEventListener('click', () => {
      openLightbox(getAllItems(), 0);
    });
  }

  // Close
  if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
  if (lightbox) {
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closeLightbox();
    });
  }

  // Keyboard: Esc to close, arrows to navigate
  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('is-open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') nextSlide();
    if (e.key === 'ArrowLeft') prevSlide();
  });
})();