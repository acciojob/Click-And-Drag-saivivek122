
(() => {
  const slider = document.querySelector('.items');

  // If you previously set absolute positions on .item, undo it
  document.querySelectorAll('.item').forEach(i => (i.style.position = ''));

  let isDown = false;
  let startX = 0;
  let startScroll = 0;

  // robust X extractor (works with mouse & touch)
  const getX = (e) =>
    e.touches?.[0]?.pageX ?? e.pageX ?? (e.clientX + window.scrollX);

  // prevent native drag ghost image / selection
  slider.addEventListener('dragstart', (e) => e.preventDefault());

  // MOUSE
  slider.addEventListener('mousedown', (e) => {
    isDown = true;
    slider.classList.add('active');
    startX = getX(e);
    startScroll = slider.scrollLeft;
    e.preventDefault(); // important for Cypress consistency
  });

  document.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    const delta = getX(e) - startX;      // right drag -> positive
    slider.scrollLeft = startScroll - delta; // scroll opposite to drag
  });

  document.addEventListener('mouseup', () => {
    if (!isDown) return;
    isDown = false;
    slider.classList.remove('active');
  });

  // TOUCH (optional)
  slider.addEventListener('touchstart', (e) => {
    isDown = true;
    startX = getX(e);
    startScroll = slider.scrollLeft;
  }, { passive: true });

  slider.addEventListener('touchmove', (e) => {
    if (!isDown) return;
    const delta = getX(e) - startX;
    slider.scrollLeft = startScroll - delta;
  }, { passive: true });

  slider.addEventListener('touchend', () => { isDown = false; });
})();

