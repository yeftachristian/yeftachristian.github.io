
const menuBtn = document.querySelector('.menu-btn');
const nav = document.querySelector('.nav-links');
menuBtn?.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
});
document.querySelectorAll('.nav-links a').forEach(a => a.addEventListener('click', () => nav?.classList.remove('open')));

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, {threshold:.12});
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

const glow = document.querySelector('.cursor-glow');
window.addEventListener('pointermove', e => {
  if (glow) {
    glow.style.left = e.clientX + 'px';
    glow.style.top = e.clientY + 'px';
  }
});

const cfg = window.WHYSTILL_CONFIG || {};
const instagram = document.getElementById('instagramLink');
const email = document.getElementById('emailLink');
if (instagram) {
  if (cfg.instagram) instagram.href = cfg.instagram;
  else instagram.style.opacity = '.4';
}
if (email) {
  if (cfg.email) email.href = 'mailto:' + cfg.email;
  else email.style.opacity = '.4';
}

const form = document.getElementById('contactForm');
form?.addEventListener('submit', (e) => {
  e.preventDefault();
  const fd = new FormData(form);
  if (!cfg.email) {
    alert('Add your business email in site-config.js first.');
    return;
  }
  const name = fd.get('name') || '';
  const company = fd.get('company') || '';
  const sender = fd.get('email') || '';
  const message = fd.get('message') || '';
  const subject = encodeURIComponent(`Why Still Project Inquiry — ${company || name}`);
  const body = encodeURIComponent(
    `Name: ${name}\nCompany: ${company}\nEmail: ${sender}\n\nProject / challenge:\n${message}`
  );
  window.location.href = `mailto:${cfg.email}?subject=${subject}&body=${body}`;
});
