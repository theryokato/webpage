  const nameEl = document.querySelector('.profile-name');
  const originalName = nameEl.textContent;

  function swapName(newName) {
    nameEl.classList.add('fading');
    setTimeout(() => {
      nameEl.textContent = newName;
      nameEl.classList.remove('fading');
    }, 150);
  }

  document.querySelectorAll('.social-row a[data-name]').forEach(link => {
    link.addEventListener('mouseenter', () => swapName(link.dataset.name));
    link.addEventListener('mouseleave', () => swapName(originalName));
  });