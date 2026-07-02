/* ===== NAVIGATION TOGGLE ===== */
const navToggle = document.querySelector('.nav-toggle');
const siteNav = document.querySelector('.site-nav');
if (navToggle && siteNav) {
  navToggle.addEventListener('click', () => {
    siteNav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', siteNav.classList.contains('open'));
  });
}

/* ===== STICKY CTA BAR ===== */
const stickyBar = document.querySelector('.sticky-cta-bar');
if (stickyBar) {
  const showAfterPx = 600;
  window.addEventListener('scroll', () => {
    if (window.scrollY > showAfterPx) {
      stickyBar.classList.add('visible');
    } else {
      stickyBar.classList.remove('visible');
    }
  }, { passive: true });
}

/* ===== SCROLL-TRIGGERED ANIMATIONS ===== */
const animElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right');
if (animElements.length) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -50px 0px' });
  animElements.forEach(el => observer.observe(el));
}

/* ===== COUNTER ANIMATION ===== */
function animateCounter(el) {
  const target = parseInt(el.dataset.target, 10);
  const duration = 2000;
  const step = target / (duration / 16);
  let current = 0;
  const timer = setInterval(() => {
    current += step;
    if (current >= target) { current = target; clearInterval(timer); }
    const formatted = current >= 1000 ? Math.floor(current).toLocaleString() : Math.floor(current);
    el.textContent = formatted + (el.dataset.suffix || '');
  }, 16);
}

const counterEls = document.querySelectorAll('.counter-number[data-target]');
if (counterEls.length) {
  const counterObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  counterEls.forEach(el => counterObs.observe(el));
}

/* ===== FAQ ACCORDION ===== */
const faqBtns = document.querySelectorAll('.faq-q');
faqBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const answer = btn.nextElementSibling;
    const isOpen = btn.classList.contains('open');
    faqBtns.forEach(b => {
      b.classList.remove('open');
      b.nextElementSibling.classList.remove('open');
    });
    if (!isOpen) {
      btn.classList.add('open');
      answer.classList.add('open');
    }
  });
});

/* ===== COUNTDOWN TIMER ===== */
function startCountdown() {
  const countdowns = document.querySelectorAll('.countdown');
  if (!countdowns.length) return;
  const END_KEY = 'tw_countdown_end';
  let endTime = parseInt(localStorage.getItem(END_KEY) || '0', 10);
  if (!endTime || endTime < Date.now()) {
    endTime = Date.now() + (23 * 3600 + 47 * 60 + 59) * 1000;
    localStorage.setItem(END_KEY, endTime);
  }
  function update() {
    const diff = Math.max(0, endTime - Date.now());
    const h = Math.floor(diff / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    const s = Math.floor((diff % 60000) / 1000);
    const fmt = (n) => String(n).padStart(2, '0');
    countdowns.forEach(cd => {
      cd.innerHTML = `<span class="countdown-unit">${fmt(h)}</span><span class="countdown-sep">:</span><span class="countdown-unit">${fmt(m)}</span><span class="countdown-sep">:</span><span class="countdown-unit">${fmt(s)}</span>`;
    });
    if (diff > 0) requestAnimationFrame(update);
  }
  update();
}
startCountdown();

/* ===== SMOOTH SCROLL FOR CTA BUTTONS ===== */
document.querySelectorAll('a[href="#order"]').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const target = document.getElementById('order');
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

/* ===== VIDEO PLACEHOLDER CLICK ===== */
const videoContainer = document.querySelector('.video-container');
if (videoContainer) {
  videoContainer.addEventListener('click', () => {
    alert('Video would play here. Add your video embed URL to activate.');
  });
}

/* ===== HEADER SCROLL EFFECT ===== */
const header = document.querySelector('.site-header');
if (header) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
      header.style.boxShadow = '0 4px 24px rgba(0,0,0,0.18)';
    } else {
      header.style.boxShadow = '0 2px 12px rgba(0,0,0,0.1)';
    }
  }, { passive: true });
}
