async function loadMenu() {
  const target = document.getElementById('menu-content');
  if (!target) return;

  try {
    const response = await fetch('data/menu.xml');
    if (!response.ok) throw new Error('Unable to load menu.xml');
    const xmlText = await response.text();
    const xml = new DOMParser().parseFromString(xmlText, 'application/xml');

    if (xml.querySelector('parsererror')) {
      throw new Error('Invalid XML structure in menu.xml');
    }

    const sections = [...xml.querySelectorAll('category')];
    target.innerHTML = '';

    sections.forEach((section) => {
      const title = section.getAttribute('title');
      const wrapper = document.createElement('section');
      wrapper.className = 'menu-section';
      wrapper.innerHTML = `<h2>${title}</h2><div class="menu-grid"></div>`;

      const grid = wrapper.querySelector('.menu-grid');
      [...section.querySelectorAll('item')].forEach((item) => {
        const name = item.querySelector('name')?.textContent ?? '';
        const price = item.querySelector('price')?.textContent ?? '';
        const description = item.querySelector('description')?.textContent ?? '';
        const image = item.querySelector('image')?.textContent ?? '';
        const alt = item.querySelector('alt')?.textContent ?? name;

        const card = document.createElement('article');
        card.className = 'menu-card';
        card.innerHTML = `
          <img src="assets/images/${image}" alt="${alt}">
          <div class="menu-card-content">
            <h3>${name}</h3>
            <div class="menu-meta">${price}</div>
            <p>${description}</p>
          </div>
        `;
        grid.appendChild(card);
      });

      target.appendChild(wrapper);
    });
  } catch (error) {
    target.innerHTML = `<p class="loading">Unable to load the menu. Please run the site through Live Server or a local web server.</p>`;
    console.error(error);
  }
}

loadMenu();
