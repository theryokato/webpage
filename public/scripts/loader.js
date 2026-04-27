document.addEventListener("DOMContentLoaded", () => {
  function injectPartials(done) {
    let pending = 0;
    let ranCallback = false;
    document.querySelectorAll('[data-include]').forEach(async el => {
      pending++;
      const url = el.getAttribute('data-include');
      const res = await fetch(url);
      const html = await res.text();
      const temp = document.createElement('div');
      temp.innerHTML = html;
      while (temp.firstChild) {
        const node = temp.firstChild;
        if (node.tagName === 'SCRIPT') {
          const script = document.createElement('script');
          for (const attr of node.attributes) script.setAttribute(attr.name, attr.value);
          script.textContent = node.textContent;
          document.body.appendChild(script);
          temp.removeChild(node);
        } else {
          el.appendChild(node);
        }
      }
      pending--;
      if (pending === 0 && !ranCallback && typeof done === 'function') {
        ranCallback = true;
        done();
      }
    });
  }

  injectPartials(() => {
    const legalModal = document.getElementById('legalModal');
    const openBtn = document.getElementById('openLegalModalBtn');
    if (legalModal && openBtn) {
      openBtn.addEventListener('click', () => {
        legalModal.classList.remove('hidden');
      });
      window.addEventListener('click', (event) => {
        if (event.target === legalModal) {
          legalModal.classList.add('hidden');
        }
      });
    }

    const clock = document.getElementById('clock');
    if (clock) {
      function updateClock() {
        const now = new Date();
        const h = String(now.getHours()).padStart(2, '0');
        const m = String(now.getMinutes()).padStart(2, '0');
        clock.textContent = h + ':' + m;
      }
      updateClock();
      setInterval(updateClock, 1000);
    }
  });

  // Load scripts — FlyonUI gets an onload to auto-init components
  const scripts = [
    { src: "https://cdn.jsdelivr.net/npm/flyonui@1/flyonui.js", onload: () => {
      if (typeof HSStaticMethods !== 'undefined') {
        HSStaticMethods.autoInit();
      }
    }},
    { src: "/scripts/oneko.js" },
    { src: "https://cdn.jsdelivr.net/npm/theme-change@2.0.2/index.js" },
    { src: "/scripts/social-hover.js" },
  ];

  scripts.forEach(({ src, onload }) => {
    const s = document.createElement('script');
    s.src = src;
    if (onload) s.onload = onload;
    document.head.appendChild(s);
  });
});