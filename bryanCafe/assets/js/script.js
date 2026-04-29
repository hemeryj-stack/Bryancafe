const copyright = document.getElementById('copyright');
if (copyright) {
  copyright.textContent = `©${new Date().getFullYear()} Bryan’s Café`;
}

const toggleButton = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
if (toggleButton && navLinks) {
  toggleButton.addEventListener('click', () => {
    const expanded = toggleButton.getAttribute('aria-expanded') === 'true';
    toggleButton.setAttribute('aria-expanded', String(!expanded));
    navLinks.classList.toggle('open');
  });
}
