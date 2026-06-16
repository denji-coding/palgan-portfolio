/* ==========================================================================
   Portfolio – Main Script
   ========================================================================== */

/* --------------------------------------------------------------------------
   Particles background
   -------------------------------------------------------------------------- */
const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

const COLORS = ['#FF4D4D', '#FF8A00', '#FFD500', '#00D26A', '#00A3FF', '#5B5BFF', '#B84DFF'];
const particles = [];

for (let i = 0; i < 70; i++) {
  particles.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 2 + 0.5,
    vx: (Math.random() - 0.5) * 0.4,
    vy: (Math.random() - 0.5) * 0.4,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    alpha: Math.random() * 0.5 + 0.1,
  });
}

function animParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particles.forEach((p) => {
    p.x += p.vx;
    p.y += p.vy;
    if (p.x < 0) p.x = canvas.width;
    if (p.x > canvas.width) p.x = 0;
    if (p.y < 0) p.y = canvas.height;
    if (p.y > canvas.height) p.y = 0;

    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = p.color;
    ctx.globalAlpha = p.alpha;
    ctx.fill();
  });

  ctx.globalAlpha = 1;
  requestAnimationFrame(animParticles);
}

animParticles();

/* --------------------------------------------------------------------------
   Hero typing animation
   -------------------------------------------------------------------------- */
const phrases = [
  'BS Information Systems Student',
  'Digital Marketing Intern',
  'Automation Enthusiast',
  'System Analyst',
];
let pIdx = 0;
let cIdx = 0;
let deleting = false;
const typingEl = document.getElementById('typingText');

function typeLoop() {
  const cur = phrases[pIdx];

  if (!deleting) {
    typingEl.textContent = cur.slice(0, cIdx + 1);
    cIdx++;
    if (cIdx === cur.length) {
      deleting = true;
      setTimeout(typeLoop, 1800);
      return;
    }
  } else {
    typingEl.textContent = cur.slice(0, cIdx - 1);
    cIdx--;
    if (cIdx === 0) {
      deleting = false;
      pIdx = (pIdx + 1) % phrases.length;
    }
  }

  setTimeout(typeLoop, deleting ? 50 : 90);
}

typeLoop();

/* --------------------------------------------------------------------------
   Skills – filter tabs & progress bars
   -------------------------------------------------------------------------- */
function filterSkills(cat, btn) {
  document.querySelectorAll('.skill-tab').forEach((t) => t.classList.remove('active'));
  btn.classList.add('active');

  document.querySelectorAll('.skill-bar-item').forEach((item) => {
    const show = cat === 'all' || item.dataset.cat === cat;
    item.style.display = show ? '' : 'none';

    if (show) {
      const fill = item.querySelector('.skill-bar-fill');
      fill.style.width = '0';
      item.classList.remove('animated');
      setTimeout(() => {
        fill.style.width = fill.dataset.pct + '%';
        item.classList.add('animated');
      }, 80);
    }
  });
}

function animateBars() {
  document.querySelectorAll('.skill-bar-item').forEach((item, i) => {
    const fill = item.querySelector('.skill-bar-fill');
    setTimeout(() => {
      fill.style.width = fill.dataset.pct + '%';
      item.classList.add('animated');
    }, i * 80);
  });
}

const skillsSection = document.querySelector('#skills');
const skillsObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        animateBars();
        skillsObserver.disconnect();
      }
    });
  },
  { threshold: 0.2 }
);

if (skillsSection) skillsObserver.observe(skillsSection);

/* --------------------------------------------------------------------------
   Achievement certificate lightbox
   -------------------------------------------------------------------------- */
const certLightbox = document.getElementById('cert-lightbox');
const certLightboxImg = document.getElementById('cert-lightbox-img');

function viewCert(holder) {
  const img = holder.querySelector('img');
  if (!img?.src) return;

  certLightboxImg.src = img.src;
  certLightboxImg.alt = img.alt;
  certLightbox.hidden = false;
  certLightbox.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeCertLightbox() {
  if (certLightbox.hidden) return;

  certLightbox.hidden = true;
  certLightbox.setAttribute('aria-hidden', 'true');
  certLightboxImg.src = '';
  document.body.style.overflow = '';
}

certLightbox?.addEventListener('click', (e) => {
  if (e.target === certLightbox) closeCertLightbox();
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeCertLightbox();
});

/* --------------------------------------------------------------------------
   Scroll fade-in
   -------------------------------------------------------------------------- */
const fadeObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) e.target.classList.add('visible');
    });
  },
  { threshold: 0.1 }
);

document.querySelectorAll('.fade-up').forEach((el) => fadeObserver.observe(el));

/* --------------------------------------------------------------------------
   Back to top button
   -------------------------------------------------------------------------- */
const backTop = document.getElementById('back-top');

window.addEventListener('scroll', () => {
  backTop.classList.toggle('visible', window.scrollY > 400);
});

/* --------------------------------------------------------------------------
   Mobile navigation
   -------------------------------------------------------------------------- */
function toggleNav() {
  document.getElementById('navLinks').classList.toggle('open');
}

document.querySelectorAll('.nav-links a').forEach((a) => {
  a.addEventListener('click', () => {
    document.getElementById('navLinks').classList.remove('open');
  });
});

/* --------------------------------------------------------------------------
   Mouse-driven aurora parallax
   -------------------------------------------------------------------------- */
document.addEventListener('mousemove', (e) => {
  const blobs = document.querySelectorAll('.aurora-blob');
  blobs[0].style.transform = `translate(${e.clientX * 0.02}px, ${e.clientY * 0.02}px)`;
  blobs[1].style.transform = `translate(${-e.clientX * 0.015}px, ${e.clientY * 0.015}px)`;
});
