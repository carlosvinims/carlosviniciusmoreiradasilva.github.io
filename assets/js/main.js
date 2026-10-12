/* ==========================================================================
   main.js — interações do portfólio
   Sem dependências externas. Cada módulo verifica se os elementos existem
   antes de manipulá-los, para evitar erros no console.
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  initYear();
  initMobileMenu();
  initHeaderState();
  initActiveLinks();
  initReveal(prefersReducedMotion);
  initProjectFilter();
  initBackToTop(prefersReducedMotion);
  initCopyEmail();
  initBackground(prefersReducedMotion);
});

/* --------------------------------------------------------------------------
   Ano atual no rodapé
   -------------------------------------------------------------------------- */
function initYear() {
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
}

/* --------------------------------------------------------------------------
   Menu mobile (abre/fecha, ESC, clique em link e fora do menu)
   -------------------------------------------------------------------------- */
function initMobileMenu() {
  const toggle = document.getElementById('menu-toggle');
  const menu = document.getElementById('mobile-menu');
  const iconMenu = document.getElementById('icon-menu');
  const iconClose = document.getElementById('icon-close');
  if (!toggle || !menu) return;

  const setOpen = (open) => {
    menu.classList.toggle('hidden', !open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
    if (iconMenu) iconMenu.classList.toggle('hidden', open);
    if (iconClose) iconClose.classList.toggle('hidden', !open);
  };

  toggle.addEventListener('click', () => {
    setOpen(toggle.getAttribute('aria-expanded') !== 'true');
  });

  // Fecha ao escolher um link
  menu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => setOpen(false));
  });

  // Fecha com ESC e devolve o foco ao botão
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
      setOpen(false);
      toggle.focus();
    }
  });

  // Fecha ao clicar fora
  document.addEventListener('click', (event) => {
    const open = toggle.getAttribute('aria-expanded') === 'true';
    if (open && !menu.contains(event.target) && !toggle.contains(event.target)) setOpen(false);
  });

  // Fecha ao voltar para telas grandes
  window.matchMedia('(min-width: 768px)').addEventListener('change', (e) => {
    if (e.matches) setOpen(false);
  });
}

/* --------------------------------------------------------------------------
   Header: reforça o fundo depois que a página rola
   -------------------------------------------------------------------------- */
function initHeaderState() {
  const nav = document.getElementById('site-nav');
  if (!nav) return;

  const update = () => nav.classList.toggle('is-scrolled', window.scrollY > 20);
  update();
  window.addEventListener('scroll', update, { passive: true });
}

/* --------------------------------------------------------------------------
   Link ativo na navegação conforme a seção visível
   -------------------------------------------------------------------------- */
function initActiveLinks() {
  const links = document.querySelectorAll('.nav-link, .mobile-link');
  const sections = document.querySelectorAll('main section[id]');
  if (!links.length || !sections.length || !('IntersectionObserver' in window)) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const id = entry.target.id;
        links.forEach((link) => {
          const active = link.getAttribute('href') === `#${id}`;
          link.classList.toggle('is-active', active);
          if (active) link.setAttribute('aria-current', 'true');
          else link.removeAttribute('aria-current');
        });
      });
    },
    { rootMargin: '-45% 0px -50% 0px' }
  );

  sections.forEach((section) => observer.observe(section));
}

/* --------------------------------------------------------------------------
   Animações de entrada ao rolar
   Depois que a animação termina, remove as classes para que o hover do card
   funcione normalmente.
   -------------------------------------------------------------------------- */
function initReveal(reduced) {
  const items = document.querySelectorAll('.reveal');
  if (!items.length) return;

  // Sem suporte ou com movimento reduzido: mostra tudo de imediato
  if (reduced || !('IntersectionObserver' in window)) {
    items.forEach((el) => el.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        el.classList.add('is-visible');
        obs.unobserve(el);

        // Libera o elemento das regras de "reveal" após a transição
        const delay = parseInt(el.style.getPropertyValue('--d'), 10) || 0;
        window.setTimeout(() => el.classList.remove('reveal', 'is-visible'), delay + 1300);
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  items.forEach((el) => observer.observe(el));
}

/* --------------------------------------------------------------------------
   Filtro de projetos (Todos / Hackathon / Laravel)
   -------------------------------------------------------------------------- */
function initProjectFilter() {
  const buttons = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('#project-grid [data-category]');
  if (!buttons.length || !cards.length) return;

  buttons.forEach((button) => {
    button.addEventListener('click', () => {
      const filter = button.dataset.filter;

      buttons.forEach((b) => {
        const active = b === button;
        b.classList.toggle('is-active', active);
        b.setAttribute('aria-pressed', String(active));
      });

      cards.forEach((card) => {
        const show = filter === 'all' || card.dataset.category === filter;
        card.hidden = !show;
      });
    });
  });
}

/* --------------------------------------------------------------------------
   Botão voltar ao topo
   -------------------------------------------------------------------------- */
function initBackToTop(reduced) {
  const button = document.getElementById('back-to-top');
  if (!button) return;

  const update = () => {
    button.hidden = window.scrollY < 600;
  };
  update();
  window.addEventListener('scroll', update, { passive: true });

  button.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' });
  });
}

/* --------------------------------------------------------------------------
   Copiar e-mail para a área de transferência
   -------------------------------------------------------------------------- */
function initCopyEmail() {
  const button = document.getElementById('copy-email');
  const feedback = document.getElementById('copy-feedback');
  if (!button) return;

  const email = button.dataset.email || '';
  let timer;

  const show = (message) => {
    if (!feedback) return;
    feedback.textContent = message;
    window.clearTimeout(timer);
    timer = window.setTimeout(() => (feedback.textContent = ''), 2500);
  };

  button.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(email);
      show('E-mail copiado.');
    } catch (error) {
      // Fallback: seleciona um campo temporário (contextos sem Clipboard API)
      const field = document.createElement('textarea');
      field.value = email;
      field.setAttribute('readonly', '');
      field.style.position = 'fixed';
      field.style.opacity = '0';
      document.body.appendChild(field);
      field.select();
      let ok = false;
      try {
        ok = document.execCommand('copy');
      } catch (e) {
        ok = false;
      }
      document.body.removeChild(field);
      show(ok ? 'E-mail copiado.' : `Copie manualmente: ${email}`);
    }
  });
}

/* --------------------------------------------------------------------------
   Fundo animado: poucos pontos creme/cinza ligados por linhas finas.
   - Quantidade proporcional à área da tela (máx. 60)
   - Pausa quando a aba está oculta
   - Com "reduzir movimento", desenha apenas um quadro estático
   -------------------------------------------------------------------------- */
function initBackground(reduced) {
  const canvas = document.getElementById('bg-canvas');
  if (!canvas || !canvas.getContext) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const LINK_DISTANCE = 130;
  let width = 0;
  let height = 0;
  let dpr = 1;
  let particles = [];
  let frameId = null;

  const createParticles = () => {
    const count = Math.min(60, Math.round((width * height) / 26000));
    particles = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.18,
      vy: (Math.random() - 0.5) * 0.18,
      r: Math.random() * 1.2 + 0.6,
    }));
  };

  const resize = () => {
    dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    createParticles();
    draw();
  };

  const draw = () => {
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];

      // Linhas entre pontos próximos (malha de conexões)
      for (let j = i + 1; j < particles.length; j++) {
        const q = particles[j];
        const dx = p.x - q.x;
        const dy = p.y - q.y;
        const dist = Math.hypot(dx, dy);
        if (dist < LINK_DISTANCE) {
          const alpha = (1 - dist / LINK_DISTANCE) * 0.18;
          ctx.strokeStyle = `rgba(133, 134, 123, ${alpha})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(q.x, q.y);
          ctx.stroke();
        }
      }

      ctx.fillStyle = 'rgba(232, 232, 198, 0.55)';
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
    }
  };

  const step = () => {
    particles.forEach((p) => {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < -10) p.x = width + 10;
      if (p.x > width + 10) p.x = -10;
      if (p.y < -10) p.y = height + 10;
      if (p.y > height + 10) p.y = -10;
    });
    draw();
    frameId = window.requestAnimationFrame(step);
  };

  const start = () => {
    if (reduced || frameId !== null) return;
    frameId = window.requestAnimationFrame(step);
  };
  const stop = () => {
    if (frameId !== null) window.cancelAnimationFrame(frameId);
    frameId = null;
  };

  let resizeTimer;
  window.addEventListener('resize', () => {
    window.clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(resize, 150);
  });

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) stop();
    else start();
  });

  resize();
  start();
}
