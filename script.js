// Player data
const playersData = [
    {
        id: 1,
        name: "Marlowww",
        rank: "Combat Grandmaster",
        points: 405,
        region: "NA",
        avatar: "https://mc-heads.net/avatar/Marlowww/100",
        tiers: [
            { mode: "vanilla", name: "Vanilla", high: 0, low: 0 },
            { mode: "sword", name: "Sword", high: 60, low: 0 },
            { mode: "smp", name: "SMP", high: 0, low: 10 },
            { mode: "nethop", name: "NetHOP", high: 60, low: 0 },
            { mode: "sword", name: "Sword", high: 0, low: 20 },
        ]
    },
    {
        id: 6,
        name: "BlvckWlf",
        rank: "Combat Ace",
        points: 206,
        region: "EU",
        avatar: "https://mc-heads.net/avatar/BlvckWlf/100",
        tiers: [
            { mode: "pot", name: "Pot", high: 0, low: 6 },
            { mode: "sword", name: "Sword", high: 10, low: 0 },
            { mode: "sword", name: "Sword", high: 10, low: 0 },
            { mode: "nethop", name: "NetHOP", high: 0, low: 10 },
            { mode: "vanilla", name: "Vanilla", high: 0, low: 10 },
            { mode: "smp", name: "SMP", high: 60, low: 0 },
            { mode: "sword", name: "Sword", high: 30, low: 0 },
            { mode: "sword", name: "Sword", high: 0, low: 20 },
        ]
    }
];

// Tier icons mapping
const tierIcons = {
    vanilla: 'https://mctiers.com/tier_icons/vanilla.svg',
    uhc: 'https://mctiers.com/tier_icons/uhc.svg',
    pot: 'https://mctiers.com/tier_icons/pot.svg',
    nethop: 'https://mctiers.com/tier_icons/nethop.svg',
    smp: 'https://mctiers.com/tier_icons/smp.svg',
    sword: 'https://mctiers.com/tier_icons/sword.svg',
    axe: 'https://mctiers.com/tier_icons/axe.svg',
    mace: 'https://mctiers.com/tier_icons/mace.svg',
    ltms: 'https://mctiers.com/tier_icons/2v2.svg',
    overall: 'https://mctiers.com/tier_icons/overall.svg'
};

// Tier level calculation
function getTierLevel(highPoints, lowPoints) {
    const total = highPoints + lowPoints;
    
    if (total >= 60) return { tier: 1, type: highPoints >= 60 ? 'HT' : 'LT' };
    if (total >= 30) return { tier: 2, type: highPoints >= 30 ? 'HT' : 'LT' };
    if (total >= 10) return { tier: 3, type: highPoints >= 10 ? 'HT' : 'LT' };
    if (total >= 4) return { tier: 4, type: highPoints >= 4 ? 'HT' : 'LT' };
    if (total >= 2) return { tier: 5, type: highPoints >= 2 ? 'HT' : 'LT' };
    
    return null;
}

// Render rankings
function renderRankings() {
    const container = document.getElementById('rankingsList');
    container.innerHTML = '';
    
    playersData.forEach((player, index) => {
        const rankClass = index === 0 ? 'rank-1' : index === 1 ? 'rank-2' : index === 2 ? 'rank-3' : 'rank-other';
        
        const tierHTML = player.tiers.map(tier => {
            const level = getTierLevel(tier.high, tier.low);
            if (!level) return '';
            
            return `
                <div class="tier-badge tier-${level.type.toLowerCase()}${level.tier}">
                    ${level.type}${level.tier}
                </div>
            `;
        }).join('');
        
        const tierIconsHTML = player.tiers.slice(0, 8).map(tier => `
            <div class="tier-icon">
                <img src="${tierIcons[tier.mode]}" alt="${tier.name}">
            </div>
        `).join('');
        
        const item = document.createElement('div');
        item.className = 'ranking-item';
        item.onclick = () => openPlayerModal(player);
        item.innerHTML = `
            <div class="rank">
                <div class="rank-number ${rankClass}">${index + 1}.</div>
                <div class="player-avatar">
                    <img src="${player.avatar}" alt="${player.name}">
                </div>
            </div>
            <div class="player-info">
                <div class="player-name">${player.name}</div>
                <div class="player-rank">
                    <span class="rank-badge">⚔️</span>
                    ${player.rank} <span style="color: #4a5568">(${player.points} points)</span>
                </div>
            </div>
            <div>
                <span class="region region-${player.region.toLowerCase()}">${player.region}</span>
            </div>
            <div class="tiers">
                ${tierIconsHTML}
                ${tierHTML}
            </div>
        `;
        
        container.appendChild(item);
    });
}

// Open player modal
function openPlayerModal(player) {
    const modal = document.getElementById('playerModal');
    const rankIndex = playersData.findIndex(p => p.id === player.id);
    const rankClass = rankIndex === 0 ? 'rank-1' : rankIndex === 1 ? 'rank-2' : rankIndex === 2 ? 'rank-3' : 'rank-other';
    
    document.getElementById('modalAvatar').src = player.avatar;
    document.getElementById('modalName').textContent = player.name;
    document.getElementById('modalRank').innerHTML = `⚔️ ${player.rank}`;
    document.getElementById('modalRegion').innerHTML = `<span class="region region-${player.region.toLowerCase()}">${player.region}</span>`;
    document.getElementById('nameMCLink').href = `https://namemc.com/profile/${player.name}`;
    
    const positionRank = document.getElementById('modalPosition');
    positionRank.textContent = `${rankIndex + 1}.`;
    positionRank.className = `position-rank ${rankClass}`;
    
    document.getElementById('modalPoints').textContent = `(${player.points} points)`;
    
    // Group tiers by mode
    const tiersByMode = {};
    player.tiers.forEach(tier => {
        if (!tiersByMode[tier.mode]) {
            tiersByMode[tier.mode] = { name: tier.name, mode: tier.mode, high: 0, low: 0 };
        }
        tiersByMode[tier.mode].high += tier.high;
        tiersByMode[tier.mode].low += tier.low;
    });
    
    const tiersHTML = Object.values(tiersByMode).map(tier => {
        const level = getTierLevel(tier.high, tier.low);
        if (!level) return '';
        
        return `
            <div class="tier-item">
                <div class="tier-item-icon">
                    <img src="${tierIcons[tier.mode]}" alt="${tier.name}">
                </div>
                <div class="tier-item-info">
                    <div class="tier-name">${tier.name}</div>
                    <div class="tier-item-badges">
                        ${tier.high > 0 ? `
                            <div class="tier-item-badge tier-${level.type.toLowerCase()}${level.tier}">
                                <svg viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M7 14l5-5 5 5H7z"/>
                                    <path d="M7 9l5-5 5 5H7z"/>
                                </svg>
                                ${tier.high} Points
                            </div>
                        ` : ''}
                        ${tier.low > 0 ? `
                            <div class="tier-item-badge tier-${level.type.toLowerCase()}${level.tier}">
                                <svg viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M7 10l5 5 5-5H7z"/>
                                </svg>
                                ${tier.low} Points
                            </div>
                        ` : ''}
                    </div>
                </div>
            </div>
        `;
    }).join('');
    
    document.getElementById('modalTiers').innerHTML = tiersHTML;
    
    modal.classList.add('active');
}

// Close modal
document.getElementById('closeModal').addEventListener('click', () => {
    document.getElementById('playerModal').classList.remove('active');
});

// Close modal on outside click
document.getElementById('playerModal').addEventListener('click', (e) => {
    if (e.target.id === 'playerModal') {
        document.getElementById('playerModal').classList.remove('active');
    }
});

// Copy server IP
document.getElementById('copyBtn').addEventListener('click', async () => {
    const ip = 'mcpvp.club';
    try {
        await navigator.clipboard.writeText(ip);
        const btn = document.getElementById('copyBtn');
        btn.style.background = '#10b981';
        setTimeout(() => {
            btn.style.background = '#3b82f6';
        }, 1000);
    } catch (err) {
        alert('Server IP: ' + ip);
    }
});

// Search functionality
document.getElementById('searchInput').addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase().trim();
    
    if (!query) {
        const items = document.querySelectorAll('.ranking-item');
        items.forEach(item => {
            item.style.display = 'grid';
        });
        return;
    }
    
    // Filter visible items as user types
    const items = document.querySelectorAll('.ranking-item');
    items.forEach(item => {
        const name = item.querySelector('.player-name').textContent.toLowerCase();
        if (name.includes(query)) {
            item.style.display = 'grid';
        } else {
            item.style.display = 'none';
        }
    });
});

// Search on Enter key
document.getElementById('searchInput').addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        const query = e.target.value.toLowerCase().trim();
        
        if (!query) return;
        
        // Find matching player
        const matchingPlayer = playersData.find(player => 
            player.name.toLowerCase().includes(query)
        );
        
        if (matchingPlayer) {
            // Open modal for the matching player
            openPlayerModal(matchingPlayer);
            // Clear search
            e.target.value = '';
            e.target.blur();
            
            // Reset all items to visible
            const items = document.querySelectorAll('.ranking-item');
            items.forEach(item => {
                item.style.display = 'grid';
            });
        }
    }
});

// Tab switching
document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', () => {
        const mode = tab.dataset.mode;
        
        document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        
        const rankingsList = document.getElementById('rankingsList');
        const rankingHeader = document.querySelector('.ranking-header');
        
        if (mode === 'overall') {
            rankingHeader.style.display = 'grid';
            renderRankings();
        } else {
            rankingHeader.style.display = 'none';
            rankingsList.innerHTML = `
                <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 400px; text-align: center; padding: 40px;">
                    <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="#8b95a5" stroke-width="1.5" style="margin-bottom: 30px;">
                        <path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z"></path>
                        <line x1="16" y1="8" x2="2" y2="22"></line>
                        <line x1="17.5" y1="15" x2="9" y2="15"></line>
                    </svg>
                    <h2 style="font-size: 32px; margin-bottom: 20px; color: #fff;">This isn't operational yet!</h2>
                    <p style="font-size: 16px; color: #8b95a5; max-width: 600px; line-height: 1.6;">
                        We're currently working on implementing this ranking system, which will include individual leaderboards for various game modes. However, a few other features will take priority first.
                    </p>
                </div>
            `;
        }
    });
});

// Keyboard shortcut for search
document.addEventListener('keydown', (e) => {
    if (e.key === '/' && !e.ctrlKey && !e.metaKey) {
        e.preventDefault();
        document.getElementById('searchInput').focus();
    }
    if (e.key === 'Escape') {
        document.getElementById('playerModal').classList.remove('active');
    }
});

// Initialize
renderRankings();", name: "SMP", high: 60, low: 0 },
            { mode: "sword", name: "Sword", high: 60, low: 0 },
            { mode: "sword", name: "Sword", high: 60, low: 0 },
            { mode: "nethop", name: "NetHOP", high: 0, low: 6 },
            { mode: "uhc", name: "UHC", high: 0, low: 6 },
            { mode: "pot", name: "Pot", high: 0, low: 6 },
        ]
    },
    {
        id: 2,
        name: "ItzRealMe",
        rank: "Combat Master",
        points: 330,
        region: "NA",
        avatar: "https://mc-heads.net/avatar/ItzRealMe/100",
        tiers: [
            { mode: "pot", name: "Pot", high: 60, low: 0 },
            { mode: "nethop", name: "NetHOP", high: 60, low: 0 },
            { mode: "smp", name: "SMP", high: 60, low: 0 },
            { mode: "vanilla", name: "Vanilla", high: 60, low: 0 },
            { mode: "sword", name: "Sword", high: 30, low: 0 },
            { mode: "sword", name: "Sword", high: 0, low: 20 },
            { mode: "sword", name: "Sword", high: 0, low: 20 },
            { mode: "sword", name: "Sword", high: 0, low: 20 },
        ]
    },
    {
        id: 3,
        name: "Swight",
        rank: "Combat Master",
        points: 260,
        region: "NA",
        avatar: "https://mc-heads.net/avatar/Swight/100",
        tiers: [
            { mode: "pot", name: "Pot", high: 60, low: 0 },
            { mode: "sword", name: "Sword", high: 0, low: 6 },
            { mode: "vanilla", name: "Vanilla", high: 0, low: 20 },
            { mode: "sword", name: "Sword", high: 0, low: 20 },
            { mode: "nethop", name: "NetHOP", high: 10, low: 0 },
            { mode: "uhc", name: "UHC", high: 10, low: 0 },
            { mode: "smp", name: "SMP", high: 60, low: 0 },
            { mode: "sword", name: "Sword", high: 0, low: 20 },
        ]
    },
    {
        id: 4,
        name: "Coldfied",
        rank: "Combat Ace",
        points: 235,
        region: "EU",
        avatar: "https://mc-heads.net/avatar/Coldfied/100",
        tiers: [
            { mode: "sword", name: "Sword", high: 30, low: 0 },
            { mode: "nethop", name: "NetHOP", high: 0, low: 20 },
            { mode: "uhc", name: "UHC", high: 0, low: 20 },
            { mode: "sword", name: "Sword", high: 0, low: 20 },
            { mode: "vanilla", name: "Vanilla", high: 0, low: 10 },
            { mode: "pot", name: "Pot", high: 60, low: 0 },
            { mode: "smp", name: "SMP", high: 60, low: 0 },
            { mode: "sword", name: "Sword", high: 0, low: 20 },
        ]
    },
    {
        id: 5,
        name: "Kylaz",
        rank: "Combat Ace",
        points: 222,
        region: "NA",
        avatar: "https://mc-heads.net/avatar/Kylaz/100",
        tiers: [
            { mode: "sword", name: "Sword", high: 60, low: 0 },
            { mode: "uhc", name: "UHC", high: 10, low: 0 },
            { mode: "pot", name: "Pot", high: 0, low: 10 },
            { mode: "vanilla", name: "Vanilla", high: 0, low: 10 },
            { mode: "smp", name: "SMP", high: 0, low: 10 },
