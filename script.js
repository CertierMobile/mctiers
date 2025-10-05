const modal = document.getElementById('playerModal');
const modalAvatar = document.getElementById('modalAvatar');
const modalName = document.getElementById('modalName');
const modalTitle = document.getElementById('modalTitle');
const modalRegion = document.getElementById('modalRegion');
const modalPosition = document.getElementById('modalPosition');
const modalTiers = document.getElementById('modalTiers');
const closeBtn = document.querySelector('.close');

const cards = document.querySelectorAll('.player-card');

cards.forEach(card => {
    card.addEventListener('click', () => {
        modalAvatar.src = card.querySelector('.avatar').src;
        modalName.textContent = card.dataset.player;
        modalTitle.textContent = card.dataset.title;
        modalRegion.textContent = card.dataset.region;
        modalPosition.textContent = `${card.dataset.position}. OVERALL (${card.dataset.points} points)`;

        // Clear previous tiers
        modalTiers.innerHTML = '';
        const tiers = card.dataset.tiers.split(',');
        tiers.forEach(color => {
            const div = document.createElement('div');
            div.classList.add('tier', color.trim());
            div.textContent = color.trim().toUpperCase();
            modalTiers.appendChild(div);
        });

        modal.style.display = 'flex';
    });
});

// Close modal
closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
});

window.addEventListener('click', (e) => {
    if (e.target === modal) modal.style.display = 'none';
});
