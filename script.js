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
  