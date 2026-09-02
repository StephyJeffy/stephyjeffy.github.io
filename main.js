/* ============================================================
   STEPHAUN MARTIN — PORTFOLIO SCRIPTS
   main.js
   ============================================================ */

'use strict';

/* ── STATE ── */
let currentPage = 'landing';
let lightboxItems = [];
let lightboxIndex = 0;

/* ── DOM REFS ── */
const landing      = document.getElementById('landing');
const photoPage    = document.getElementById('photo-page');
const videoPage    = document.getElementById('video-page');
const siteNav      = document.getElementById('site-nav');
const photoBtn     = document.getElementById('nav-photo-btn');
const videoBtn     = document.getElementById('nav-video-btn');
const modal        = document.getElementById('modal');
const mframe       = document.getElementById('mframe');
const lightbox     = document.getElementById('lightbox');
const lbImg        = document.getElementById('lightbox-img');
const lbCounter    = document.getElementById('lb-counter');
const menuBtn      = document.getElementById('nav-menu-btn');
const drawer       = document.getElementById('mobile-drawer');
const drawerClose  = document.getElementById('mobile-drawer-close');
const navHoverZone = document.getElementById('nav-hover-zone');
const mobilePhotoBtn = document.getElementById('mobile-photo-btn');
const mobileVideoBtn = document.getElementById('mobile-video-btn');
const vcountEl     = document.getElementById('vcount');
const photoCountEl = document.getElementById('photo-count');


/* ============================================================
   NAV
   ============================================================ */
function showNav() {
  siteNav.classList.remove('hidden');
}

function hideNav() {
  siteNav.classList.add('hidden');
}

function updateNavMode(mode) {
  photoBtn.className = 'mode-btn' + (mode === 'photo' ? ' active-photo' : '');
  videoBtn.className = 'mode-btn' + (mode === 'video' ? ' active-video' : '');
  if (mobilePhotoBtn) mobilePhotoBtn.className = mode === 'photo' ? 'active-photo' : '';
  if (mobileVideoBtn) mobileVideoBtn.className = mode === 'video' ? 'active-video' : '';
}


/* ============================================================
   PAGE TRANSITIONS
   ============================================================ */
function goHome() {
  closeModal();
  closeLightbox();

  [photoPage, videoPage].forEach(p => {
    p.classList.remove('visible');
    setTimeout(() => p.classList.remove('active'), 450);
  });

  landing.style.transition = 'opacity 0.4s ease';
  landing.style.opacity    = '0';
  landing.style.display    = 'flex';

  setTimeout(() => {
    landing.style.opacity = '1';
  }, 20);

  window.scrollTo({ top: 0, behavior: 'smooth' });
  setTimeout(hideNav, 300);
  currentPage = 'landing';
}

function showPhoto() {
  if (currentPage === 'photo') return;

  const prev = currentPage;
  currentPage = 'photo';

  _transitionTo(photoPage, prev === 'landing');
  updateNavMode('photo');
}

function showVideo() {
  if (currentPage === 'video') return;

  const prev = currentPage;
  currentPage = 'video';

  _transitionTo(videoPage, prev === 'landing');
  updateNavMode('video');
}

function _transitionTo(targetPage, fromLanding) {
  const hidePage = targetPage === photoPage ? videoPage : photoPage;

  const doShow = () => {
    hidePage.classList.remove('visible');
    setTimeout(() => hidePage.classList.remove('active'), 450);

    targetPage.classList.add('active');
    window.scrollTo(0, 0);

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        targetPage.classList.add('visible');
        showNav();
        if (!isTouchNav()) setTimeout(hideNav, 900);
        initReveal();
        buildLightboxItems();
      });
    });
  };

  if (fromLanding) {
    landing.style.transition = 'opacity 0.42s ease';
    landing.style.opacity    = '0';
    setTimeout(() => {
      landing.style.display  = 'none';
      landing.style.opacity  = '1';
      doShow();
    }, 380);
  } else {
    doShow();
  }
}


/* ============================================================
   SCROLL HELPERS
   ============================================================ */
function scrollToWork() {
  const id = currentPage === 'photo' ? 'photo-work' : 'video-work';
  _scrollTo(id);
}

function scrollToAbout() {
  const id = currentPage === 'photo' ? 'about' : 'video-about';
  _scrollTo(id);
}

function scrollToContact() {
  const id = currentPage === 'photo' ? 'photo-contact' : 'video-contact';
  _scrollTo(id);
}

function scrollToPhotoContact() {
  _scrollTo('photo-contact');
}

function _scrollTo(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}


/* ============================================================
   VIDEO MODAL
   ============================================================ */
function openModal(card) {
  if (!card.dataset.video) return;
  mframe.src = card.dataset.video + '?autoplay=1';
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal(e) {
  if (e && e.target !== modal && !e.target.classList.contains('modal-close')) return;
  modal.classList.remove('open');
  mframe.src = '';
  document.body.style.overflow = '';
}

// Delegate click on video cards
document.addEventListener('click', function (e) {
  const card = e.target.closest('.vcard[data-video]');
  if (card) openModal(card);
});


/* ============================================================
   PHOTO LIGHTBOX
   ============================================================ */
function buildLightboxItems() {
  lightboxItems = Array.from(document.querySelectorAll('.photo-item:not(.hidden)'));
}

function openLightbox(el) {
  buildLightboxItems();
  lightboxIndex = lightboxItems.indexOf(el);
  if (lightboxIndex === -1) lightboxIndex = 0;
  _showLightboxFrame();
  lightbox.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeLightbox(e) {
  if (
    e &&
    e.target !== lightbox &&
    !e.target.classList.contains('lightbox-close')
  ) return;
  lightbox.classList.remove('open');
  lbImg.src = '';
  document.body.style.overflow = '';
}

function lightboxNav(dir) {
  lightboxIndex = (lightboxIndex + dir + lightboxItems.length) % lightboxItems.length;
  _showLightboxFrame();
}

function _showLightboxFrame() {
  const item = lightboxItems[lightboxIndex];
  if (!item) return;
  const img = item.querySelector('img');
  // Prefer a larger "full" image (data-full) when available, so the grid
  // can stay on lightweight web-sized images while the lightbox shows a
  // sharper version. Falls back to the grid image if no data-full is set.
  const fullSrc = item.dataset.full || (img ? img.src : '');
  lbImg.src = fullSrc;
  lbImg.alt = img ? img.alt : '';
  if (lbCounter) {
    lbCounter.textContent = (lightboxIndex + 1) + ' / ' + lightboxItems.length;
  }
}


/* ============================================================
   PHOTO FILTER (SIDEBAR)
   "All Work" is a curated 25-photo selection. Category filters still
   show every image in that category, including supporting work.
   ============================================================ */
function applyPhotoFilter(filter) {
  let count = 0;

  document.querySelectorAll('.photo-item').forEach(item => {
    const show = filter === 'all'
      ? item.dataset.featured === 'true'
      : item.dataset.cat === filter;

    item.classList.toggle('hidden', !show);
    if (show) count++;
  });

  const grid = document.getElementById('photo-grid');
  if (grid) {
    grid.style.display = 'none';
    grid.offsetHeight;
    grid.style.display = 'grid';
  }

  if (photoCountEl) {
    photoCountEl.textContent = count + ' photo' + (count !== 1 ? 's' : '');
  }

  buildLightboxItems();
}

document.addEventListener('click', function (e) {
  const btn = e.target.closest('.sidebar-link');
  if (!btn) return;

  document.querySelectorAll('.sidebar-link')
    .forEach(b => b.classList.remove('active'));

  btn.classList.add('active');
  applyPhotoFilter(btn.dataset.filter);
});


/* ============================================================
   VIDEO FILTER
   ============================================================ */
document.addEventListener('click', function (e) {
  const btn = e.target.closest('.filter-btn');
  if (!btn) return;

  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');

  const filter = btn.dataset.filter;
  let count = 0;

  document.querySelectorAll('.vcard').forEach(card => {
    const show = filter === 'all' || card.dataset.cat === filter;
    card.classList.toggle('hidden', !show);
    if (show) count++;
  });

  if (vcountEl) {
    vcountEl.textContent = count + ' video' + (count !== 1 ? 's' : '');
  }
});


/* ============================================================
   MOBILE MENU
   ============================================================ */
function openMobileMenu() {
  drawer.classList.add('open');
  drawer.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
  if (menuBtn) menuBtn.setAttribute('aria-expanded', 'true');
}

function closeMobileMenu() {
  drawer.classList.remove('open');
  drawer.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
  if (menuBtn) menuBtn.setAttribute('aria-expanded', 'false');
}

if (menuBtn) menuBtn.addEventListener('click', openMobileMenu);
if (drawerClose) drawerClose.addEventListener('click', closeMobileMenu);
if (drawer) {
  drawer.addEventListener('click', function (e) {
    if (e.target === drawer) closeMobileMenu();
  });
}


/* ============================================================
   KEYBOARD — ESC + LIGHTBOX ARROWS
   ============================================================ */
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') {
    if (modal.classList.contains('open')) closeModal();
    if (lightbox.classList.contains('open')) closeLightbox();
    if (drawer.classList.contains('open')) closeMobileMenu();
  }
  if (lightbox.classList.contains('open')) {
    if (e.key === 'ArrowLeft')  lightboxNav(-1);
    if (e.key === 'ArrowRight') lightboxNav(1);
  }
});


/* ============================================================
   SCROLL REVEAL
   ============================================================ */
function initReveal() {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.06, rootMargin: '0px 0px -30px 0px' });

  document.querySelectorAll('.reveal:not(.visible)').forEach((el, i) => {
    el.style.transitionDelay = (i % 8) * 0.055 + 's';
    observer.observe(el);
  });
}


/* ============================================================
   INIT
   ============================================================ */
applyPhotoFilter('all');

const isTouchNav = () => window.matchMedia('(max-width: 768px)').matches;

function syncNavForViewport() {
  if (currentPage === 'landing') return;
  if (isTouchNav()) showNav();
  else hideNav();
}

// Desktop: keep the top navigation out of the way until the cursor reaches
// the very top edge. It remains open while the user is interacting with it.
if (navHoverZone) {
  navHoverZone.addEventListener('mouseenter', () => {
    if (currentPage !== 'landing' && !isTouchNav()) showNav();
  });
}

if (siteNav) {
  siteNav.addEventListener('mouseleave', () => {
    if (currentPage !== 'landing' && !isTouchNav()) hideNav();
  });
  siteNav.addEventListener('focusin', () => {
    if (currentPage !== 'landing') showNav();
  });
  siteNav.addEventListener('focusout', () => {
    if (currentPage !== 'landing' && !isTouchNav()) {
      setTimeout(() => {
        if (!siteNav.contains(document.activeElement)) hideNav();
      }, 0);
    }
  });
}

window.addEventListener('resize', syncNavForViewport);
window.addEventListener('scroll', () => {
  if (currentPage !== 'landing' && isTouchNav()) showNav();
});
