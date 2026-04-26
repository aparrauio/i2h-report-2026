(function () {
  const body = document.body;
  const themeButton = document.querySelector('[data-theme-toggle]');
  const menuButton = document.querySelector('[data-menu-toggle]');
  const mobileMenu = document.querySelector('[data-mobile-menu]');
  const navLinks = [...document.querySelectorAll('[data-nav-link]')];
  const sections = [...document.querySelectorAll('section[id]')];
  const year = document.querySelector('[data-year]');
  const currentPage = document.body.dataset.page;

  if (year) year.textContent = new Date().getFullYear();

  function syncThemeButton() {
    if (!themeButton) return;
    const isLight = body.classList.contains('light');
    themeButton.setAttribute('aria-label', isLight ? 'Cambiar a modo oscuro' : 'Cambiar a modo claro');
    themeButton.innerHTML = isLight
      ? '<span aria-hidden="true">☾</span><span class="hidden sm:inline">Modo oscuro</span>'
      : '<span aria-hidden="true">☼</span><span class="hidden sm:inline">Modo claro</span>';
  }

  syncThemeButton();

  themeButton?.addEventListener('click', () => {
    body.classList.toggle('light');
    syncThemeButton();
  });

  menuButton?.addEventListener('click', () => {
    const isOpen = mobileMenu?.classList.toggle('hidden') === false;
    menuButton.setAttribute('aria-expanded', String(isOpen));
  });

  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      mobileMenu?.classList.add('hidden');
      menuButton?.setAttribute('aria-expanded', 'false');
    });
  });

  if (currentPage === 'publicaciones') {
    navLinks.forEach((link) => {
      link.classList.toggle('is-active', link.getAttribute('href')?.includes('posts.html'));
    });
  }

  if (sections.length) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting || currentPage === 'publicaciones') return;
          const id = entry.target.getAttribute('id');
          navLinks.forEach((link) => {
            link.classList.toggle('is-active', link.getAttribute('href') === `#${id}`);
          });
        });
      },
      { rootMargin: '-22% 0px -62% 0px', threshold: 0.01 }
    );

    sections.forEach((section) => observer.observe(section));
  }

  document.querySelectorAll('[data-progress]').forEach((bar) => {
    const value = bar.getAttribute('data-progress');
    bar.style.width = `${value}%`;
  });
})();
