(() => {
  const header = document.querySelector('.zs-header');
  const burger = document.querySelector('.zs-burger');
  const nav = document.querySelector('#zs-nav');

  if (header && burger && nav) {
    burger.addEventListener('click', () => {
      const on = header.classList.toggle('is-open');
      burger.setAttribute('aria-expanded', on ? 'true' : 'false');
    });

    nav.addEventListener('click', (e) => {
      if (e.target.tagName === 'A') {
        header.classList.remove('is-open');
        burger.setAttribute('aria-expanded', 'false');
      }
    });
  }

  const filters = [...document.querySelectorAll('[data-zs-filter]')];
  const games = [...document.querySelectorAll('[data-zs-cat]')];

  const applyFilter = (key) => {
    games.forEach((card) => {
      const cat = card.getAttribute('data-zs-cat');
      card.hidden = !(key === 'all' || cat === key);
    });
    filters.forEach((btn) => {
      const f = btn.getAttribute('data-zs-filter');
      btn.setAttribute('aria-pressed', f === key ? 'true' : 'false');
    });
  };

  filters.forEach((btn) =>
    btn.addEventListener('click', () => applyFilter(btn.getAttribute('data-zs-filter')))
  );

  const hash = String(location.hash || '').replace(/^#/, '').toLowerCase();
  const valid = new Set(['slots', 'roulette', 'blackjack', 'poker', 'wheel']);
  if (filters.length && games.length) applyFilter(valid.has(hash) ? hash : 'all');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add('is-visible');
      });
    },
    { threshold: 0.08, rootMargin: '0px 0px -24px 0px' }
  );
  document.querySelectorAll('.zs-reveal').forEach((el) => observer.observe(el));

  document.querySelectorAll('.js-year').forEach((el) => {
    el.textContent = String(new Date().getFullYear());
  });
})();
