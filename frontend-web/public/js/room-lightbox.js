(function () {
  const overlay = document.createElement('div');
  overlay.className = 'room-lightbox';
  overlay.innerHTML =
    '<div class="room-lightbox-inner">' +
      '<button class="room-lightbox-close" aria-label="Schließen">&times;</button>' +
      '<button class="room-lightbox-prev" aria-label="Zurück">&#8249;</button>' +
      '<img class="room-lightbox-img" src="" alt="">' +
      '<button class="room-lightbox-next" aria-label="Weiter">&#8250;</button>' +
      '<p class="room-lightbox-label"></p>' +
    '</div>';
  document.body.appendChild(overlay);

  const lbImg   = overlay.querySelector('.room-lightbox-img');
  const lbLabel = overlay.querySelector('.room-lightbox-label');
  const lbPrev  = overlay.querySelector('.room-lightbox-prev');
  const lbNext  = overlay.querySelector('.room-lightbox-next');

  let currentImages = [];
  let currentIndex  = 0;

  function show(index) {
    const img = currentImages[index];
    lbImg.src = img.src;
    lbImg.alt = img.dataset.label || img.alt;
    lbLabel.textContent = img.dataset.label || img.alt;
    lbPrev.hidden = currentImages.length < 2;
    lbNext.hidden = currentImages.length < 2;
  }

  function open(imgs, index) {
    currentImages = imgs;
    currentIndex  = index;
    show(currentIndex);
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
    lbNext.focus();
  }

  function close() {
    overlay.classList.remove('active');
    document.body.style.overflow = '';
    lbImg.src = '';
  }

  lbPrev.addEventListener('click', function (e) {
    e.stopPropagation();
    currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
    show(currentIndex);
  });

  lbNext.addEventListener('click', function (e) {
    e.stopPropagation();
    currentIndex = (currentIndex + 1) % currentImages.length;
    show(currentIndex);
  });

  overlay.addEventListener('click', function (e) {
    if (e.target === overlay || e.target.closest('.room-lightbox-close')) close();
  });

  document.addEventListener('keydown', function (e) {
    if (!overlay.classList.contains('active')) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
      e.preventDefault();
      if (e.key === 'ArrowLeft')  currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
      if (e.key === 'ArrowRight') currentIndex = (currentIndex + 1) % currentImages.length;
      show(currentIndex);
    }
  });

  document.querySelectorAll('.room-images').forEach(function (container) {
    const imgs = Array.from(container.querySelectorAll('img'));
    imgs.forEach(function (img, i) {
      img.addEventListener('click', function () {
        open(imgs, i);
      });
    });
  });
})();
