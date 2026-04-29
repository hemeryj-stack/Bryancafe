async function loadBranches() {
  const target = document.getElementById('branches-content');
  if (!target) return;

  try {
    const response = await fetch('data/branches.xml');
    if (!response.ok) throw new Error('Unable to load branches.xml');
    const xmlText = await response.text();
    const xml = new DOMParser().parseFromString(xmlText, 'application/xml');

    if (xml.querySelector('parsererror')) {
      throw new Error('Invalid XML structure in branches.xml');
    }

    target.innerHTML = '';
    [...xml.querySelectorAll('branch')].forEach((branch) => {
      const address = branch.querySelector('address')?.textContent ?? '';
      const suburb = branch.querySelector('suburb')?.textContent ?? '';
      const phone = branch.querySelector('phone')?.textContent ?? '';
      const openingHours = [...branch.querySelectorAll('openingHours day')]
        .map((day) => `<p><strong>${day.getAttribute('name')}:</strong> ${day.textContent}</p>`)
        .join('');
      const mapLink = branch.querySelector('mapLink')?.textContent ?? '#';

      const card = document.createElement('article');
      card.className = 'branch-card';
      card.innerHTML = `
        <h3>${address}</h3>
        <p>${suburb}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        ${openingHours}
        <p><a href="${mapLink}" target="_blank" rel="noopener noreferrer">Open in Google Maps</a></p>
      `;
      target.appendChild(card);
    });
  } catch (error) {
    target.innerHTML = `<p class="loading">Unable to load branch data. Please run the site through Live Server or a local web server.</p>`;
    console.error(error);
  }
}

function setupEnquiryForm() {
  const form = document.getElementById('enquiry-form');
  const message = document.getElementById('form-message');
  if (!form || !message) return;

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!form.checkValidity()) {
      message.textContent = 'Please complete all required fields before submitting.';
      return;
    }

    message.textContent = 'Your message has been sent successfully.';
    form.reset();
  });
}

loadBranches();
setupEnquiryForm();
