(function initMobileMenu() {
  const toggleBtn = document.querySelector('[data-mobile-toggle]');
  const drawer = document.getElementById('mobile-drawer');
  const links = document.querySelectorAll('[data-mobile-link]');

  if (toggleBtn && drawer) {
    toggleBtn.addEventListener('click', () => {
      drawer.classList.toggle('hidden');
    });
  }

  links.forEach((link) => {
    link.addEventListener('click', () => {
      if (drawer) drawer.classList.add('hidden');
    });
  });
})();