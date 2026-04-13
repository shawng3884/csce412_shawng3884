// main.js — small interactions: theme toggle, hamburger, project modal, contact form demo

document.addEventListener('DOMContentLoaded', ()=> {
  // Elements
  const colorToggle = document.getElementById('colorToggle');
  const page = document.documentElement;
  const yearEl = document.getElementById('year');
  const menuBtn = document.getElementById('menuBtn');
  const navLinks = document.getElementById('navLinks');
  const projectModal = document.getElementById('projectModal');
  const projectBtns = document.querySelectorAll('.js-open-project');
  const contactForm = document.getElementById('contactForm');
  const formMsg = document.getElementById('formMsg');

  // Year
  yearEl.textContent = new Date().getFullYear();

  // Theme toggle (simple: toggle data-theme)
  const THEME_KEY = 'pref-theme';
  const setTheme = (dark) => {
    if (dark) {
      page.style.setProperty('--bg','#020617');
      page.style.setProperty('--panel','#071026');
      colorToggle.textContent = '☀️';
      localStorage.setItem(THEME_KEY, 'dark');
    } else {
      page.style.setProperty('--bg','#f7f9fc');
      page.style.setProperty('--panel','#ffffff');
      page.style.setProperty('--text','#081827');
      colorToggle.textContent = '🌙';
      localStorage.setItem(THEME_KEY, 'light');
    }
  };
  // load pref
  const saved = localStorage.getItem(THEME_KEY);
  setTheme(saved !== 'light');

  colorToggle.addEventListener('click', ()=> {
    const isDark = localStorage.getItem(THEME_KEY) !== 'light';
    setTheme(!isDark);
  });

  // Hamburger
  menuBtn.addEventListener('click', ()=> {
    const open = menuBtn.getAttribute('aria-expanded') === 'true';
    menuBtn.setAttribute('aria-expanded', String(!open));
    navLinks.style.display = open ? '' : 'flex';
  });

  // Projects modal
  function openProject(data){
    try {
      const parsed = typeof data === 'string' ? JSON.parse(data) : data;
      projectModal.innerHTML = `
        <h3>${parsed.title}</h3>
        <p class="muted">${parsed.desc}</p>
        <div style="margin-top:12px"><strong>Tags:</strong> ${parsed.tags ? parsed.tags.join(', ') : ''}</div>
        <div style="margin-top:18px;display:flex;gap:12px;justify-content:flex-end">
          <a class="btn-outline" href="${parsed.link || '#'}" target="_blank">Open</a>
          <button class="btn-primary" id="closeModalBtn">Close</button>
        </div>
      `;
      projectModal.showModal();
      projectModal.setAttribute('aria-hidden','false');

      document.getElementById('closeModalBtn').addEventListener('click', ()=> {
        projectModal.close();
      });

    } catch (err) {
      console.error('Invalid project data', err);
    }
  }

  projectBtns.forEach(btn => {
    btn.addEventListener('click', (e)=> {
      const card = e.target.closest('.project-card');
      const data = card.getAttribute('data-project');
      openProject(data);
    });
  });

  // close modal on ESC
  window.addEventListener('keydown', (e)=> {
    if (e.key === 'Escape' && projectModal.open) projectModal.close();
  });

  // Contact form demo behaviour
  contactForm.addEventListener('submit', (e)=> {
    e.preventDefault();
    const form = new FormData(contactForm);
    const name = form.get('name') || 'there';
    // simulate submission
    formMsg.textContent = `Thanks, ${name}! This demo doesn't send messages — connect your backend or a service like Formspree / Netlify forms.`;
    contactForm.reset();
  });

  // Small reveal on scroll
  const revealEls = document.querySelectorAll('.project-card, .card-profile, .skill, .contact-card');
  const obs = new IntersectionObserver(entries => {
    entries.forEach(ent => {
      if (ent.isIntersecting) {
        ent.target.style.transition = 'opacity .6s ease, transform .6s cubic-bezier(.2,.9,.2,1)';
        ent.target.style.opacity = 1;
        ent.target.style.transform = 'translateY(0)';
        obs.unobserve(ent.target);
      }
    });
  }, {threshold: 0.12});

  revealEls.forEach(el => {
    el.style.opacity = 0;
    el.style.transform = 'translateY(14px)';
    obs.observe(el);
  });

});
