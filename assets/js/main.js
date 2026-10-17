(() => {
  const $ = (s, r = document) => r.querySelector(s);
  const header = $('#header'), btn = $('#menuBtn'), nav = $('#nav');
  const onScroll = () => header.classList.toggle('is-scrolled', scrollY > 40);
  onScroll(); addEventListener('scroll', onScroll, { passive: true });

  const setMenu = (o) => { nav.classList.toggle('open', o); btn.setAttribute('aria-expanded', o); btn.setAttribute('aria-label', o ? 'Fechar menu' : 'Abrir menu'); };
  btn.addEventListener('click', () => setMenu(!nav.classList.contains('open')));
  nav.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => setMenu(false)));
  addEventListener('keydown', (e) => e.key === 'Escape' && setMenu(false));

  const items = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: .12 });
    items.forEach((el) => io.observe(el));
  } else items.forEach((el) => el.classList.add('in'));

  // Filtros de projetos
  document.querySelectorAll('.fbtn').forEach((b) => b.addEventListener('click', () => {
    document.querySelectorAll('.fbtn').forEach((x) => { x.classList.toggle('on', x === b); x.setAttribute('aria-pressed', x === b); });
    document.querySelectorAll('#projGrid .card').forEach((c) => c.classList.toggle('is-hidden', b.dataset.filter !== 'all' && c.dataset.cat !== b.dataset.filter));
  }));

  // Copiar e-mail
  const cp = $('#copyEmail'), msg = $('#copyMsg');
  cp.addEventListener('click', async () => {
    try { await navigator.clipboard.writeText(cp.dataset.email); msg.textContent = 'E-mail copiado.'; }
    catch { msg.textContent = 'Não foi possível copiar. Use: ' + cp.dataset.email; }
    setTimeout(() => (msg.textContent = ''), 3000);
  });
  const b = new Date(1999, 5, 10), t = new Date();
  const age = t.getFullYear() - b.getFullYear() - (t < new Date(t.getFullYear(), 5, 10) ? 1 : 0);
  document.querySelectorAll('[data-age]').forEach((el) => (el.textContent = age));
  $('#year').textContent = new Date().getFullYear();
})();
