async function fetchXMRRate() {
  try {
    const res = await fetch("https://api.coingecko.com/api/v3/simple/price?ids=monero&vs_currencies=eur");
    const data = await res.json();
    return data.monero.eur; // prix 1 XMR en EUR
  } catch (err) {
    console.error("Erreur récupération du taux XMR:", err);
    return null;
  }
}

async function convertPricesToXMR() {
  const xmrRate = await fetchXMRRate();
  if (!xmrRate) return;

  const rows = document.querySelectorAll("#tarifTable tbody tr");
  rows.forEach(row => {
    const priceCell = row.cells[2];
    const xmrCell = row.cells[3];

    const priceText = priceCell.textContent.match(/[\d]+/g);
    if (priceText) {
      // Conversion d’une fourchette (ex: 25 – 50 €)
      const euros = priceText.map(Number);
      const xmrValues = euros.map(v => (v / xmrRate).toFixed(3));

      xmrCell.textContent = (xmrValues.length === 2)
        ? `${xmrValues[0]} – ${xmrValues[1]} XMR`
        : `${xmrValues[0]} XMR`;
    } else {
      xmrCell.textContent = "-";
    }
  });
}

document.addEventListener("DOMContentLoaded", convertPricesToXMR);


    document.querySelector('#contactForm').addEventListener('submit', async function(event) {
    event.preventDefault();
  
    const name = document.querySelector('#name').value.trim();
    const email = document.querySelector('#email').value.trim();
    const message = document.querySelector('#message').value.trim();
  
    // Validation simple de l'email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('❌ Adresse e-mail invalide.');
      return;
    }
  
    const webhookURL = 'https://discord.com/api/webhooks/1388894953136062595/LTv05AY2IU4DdFJptyAGjrto7FNEutbbfPVtgAs81HSEqXMJQf_URFC-POb9h5QmJ0T8'; // Remplace par ton vrai webhook
  
    const payload = {
      content: `📩 Nouveau message de contact :\n**Nom** : ${name}\n**Email** : ${email}\n**Message** : ${message}`
    };
  
    try {
      const response = await fetch(webhookURL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
  
      if (response.ok) {
        alert('✅ Message envoyé avec succès !');
        document.querySelector('#contactForm').reset();
      } else {
        alert('❌ Erreur lors de l’envoi du message. Vérifie le webhook.');
      }
    } catch (error) {
      alert('❗ Une erreur est survenue : ' + error.message);
    }
  });
  
