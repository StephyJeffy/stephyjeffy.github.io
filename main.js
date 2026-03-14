/* ============================================================
   STEPHY JEFFY — PORTFOLIO SCRIPTS
   main.js
   ============================================================ */


/* ============================================================
   THEME TOGGLE (light / dark)
   Called by the button in the nav: onclick="toggleTheme()"
   ============================================================ */
function toggleTheme() {
  const html = document.documentElement;
  const isDark = html.getAttribute('data-theme') === 'dark';
  html.setAttribute('data-theme', isDark ? 'light' : 'dark');

  // Swap sun / moon icon
  document.getElementById('icon-sun').style.display  = isDark ? 'block' : 'none';
  document.getElementById('icon-moon').style.display = isDark ? 'none'  : 'block';
}


/* ============================================================
   VIDEO MODAL
   Any element with data-video="https://..." opens the modal.
   This covers hero preview cards AND the main grid cards.
   ============================================================ */
document.querySelectorAll('[data-video]').forEach(el => {
  el.addEventListener('click', () => {
    document.getElementById('mframe').src = el.dataset.video + '?autoplay=1';
    document.getElementById('modal').classList.add('open');
    document.body.style.overflow = 'hidden';
  });
});

function closeModal(e) {
  // Only close if clicking the dark backdrop or the ✕ button
  if (
    e &&
    e.target !== document.getElementById('modal') &&
    !e.target.classList.contains('modal-x')
  ) return;

  document.getElementById('modal').classList.remove('open');
  document.getElementById('mframe').src = '';   // stop video playing
  document.body.style.overflow = '';
}

// Close modal with Escape key
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeModal();
});


/* ============================================================
   FILTER BAR
   Filters video cards by data-cat attribute.
   ============================================================ */
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    // Update active button
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.filter;
    let visibleCount = 0;

    document.querySelectorAll('.vcard').forEach(card => {
      const show = filter === 'all' || card.dataset.cat === filter;
      card.classList.toggle('hidden', !show);
      if (show) visibleCount++;
    });

    // Update counter text
    document.getElementById('vcount').textContent =
      visibleCount + ' video' + (visibleCount !== 1 ? 's' : '');
  });
});


/* ============================================================
   SCROLL REVEAL
   Uses a CSS class (.reveal → .visible) instead of inline
   styles so it never blocks theme transitions.
   ============================================================ */
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      entry.target.style.transitionDelay = '0s'; // reset after reveal
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.07 });

document.querySelectorAll('.vcard, .svc, .contact-item, .about-img-wrap')
  .forEach((el, i) => {
    el.classList.add('reveal');
    el.style.transitionDelay = (i % 5) * 0.07 + 's';
    revealObserver.observe(el);
  });
