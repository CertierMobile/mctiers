const tooltip = document.getElementById('tooltip');
const cards = document.querySelectorAll('.player-card');

cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        tooltip.style.left = e.pageX + 15 + 'px';
        tooltip.style.top = e.pageY + 15 + 'px';
        tooltip.innerHTML = `
            <strong>${card.dataset.player}</strong><br>
            Player details here
        `;
        tooltip.style.opacity = 1;
    });

    card.addEventListener('mouseleave', () => {
        tooltip.style.opacity = 0;
    });
});
