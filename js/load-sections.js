(async function loadSections() {
  const placeholders = document.querySelectorAll('[data-include]');

  async function loadOne(el) {
    const url = el.getAttribute('data-include');
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`Failed to load ${url}: ${res.status}`);
      el.innerHTML = await res.text();
    } catch (err) {
      console.error(err);
      el.innerHTML = `<!-- failed to load ${url} -->`;
    }
  }

  await Promise.all(Array.from(placeholders).map(loadOne));

  // Feature scripts must run AFTER sections are injected
  /*const scripts = [
    'js/mobile-menu.js',
    'js/countdown.js',
    'js/sermon-player.js',
    'js/kinetic-cube.js',
    'js/gallery.js',
    'js/forms-data.js',
    'js/modal.js'
  ];*/

  const scripts = [
    'js/forms-data.js',   
    'js/prayer-form.js',  
    'js/modal.js',        
    'js/mobile-menu.js',
    'js/countdown.js',
    'js/sermon-player.js',
    'js/kinetic-cube.js',
    'js/gallery.js'
  ];

  for (const src of scripts) {
    await new Promise((resolve, reject) => {
      const s = document.createElement('script');
      s.src = src;
      s.onload = resolve;
      s.onerror = () => reject(new Error('Failed to load ' + src));
      document.body.appendChild(s);
    });
  }
})();