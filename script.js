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
        // Random pose from mcskins.top avatar-maker
        const randomPose = Math.floor(Math.random() * 10); // 0-9 poses
        modalAvatar.src = `https://mcskins.top/avatar-maker?pose=${randomPose}&player=${card.dataset.player}`;

        modalName.textContent = card.dataset.player;
        modalTitle.textContent = card.dataset.title;
        modalRegion.textContent = card.dataset.region;
        modalPosition.textContent = `${card.dataset.position}. OVERALL (${card.dataset.points} points)`;

        // Tiers
        modalTiers.innerHTML = '';
        const tiers = card.dataset.tiers.split(',');
        tiers.forEach(name => {
            const div = document.createElement('div');
            div.classList.add('tier');
            div.textContent = name.trim();
            modalTiers.appendChild(div);
        });

        modal.style.display = 'flex';
    });
});

// Close modal
closeBtn.addEventListener('click', () => { modal.style.display = 'none'; });
window.addEventListener('click', (e) => { if(e.target===modal) modal.style.display='none'; });
