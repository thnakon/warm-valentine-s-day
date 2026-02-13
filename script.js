document.addEventListener('DOMContentLoaded', () => {
    const envelope = document.getElementById('envelope');
    const card = document.getElementById('card');
    const heartContainer = document.getElementById('heartContainer');
    const gardenOverlay = document.getElementById('gardenOverlay');
    const closeGarden = document.getElementById('closeGarden');

    // Create background floating hearts
    function createFloatingHeart() {
        const heart = document.createElement('div');
        heart.classList.add('floating-heart');
        heart.innerHTML = '❤️';
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.fontSize = (Math.random() * 20 + 10) + 'px';
        heart.style.animationDuration = (Math.random() * 5 + 5) + 's';
        heartContainer.appendChild(heart);

        setTimeout(() => {
            heart.remove();
        }, 10000);
    }

    setInterval(createFloatingHeart, 500);

    // Envelope click to open
    envelope.addEventListener('click', (e) => {
        if (!envelope.classList.contains('open')) {
            envelope.classList.add('open');
        }
    });

    // Card click to open garden surprise
    card.addEventListener('click', (e) => {
        if (envelope.classList.contains('open')) {
            e.stopPropagation(); // Don't trigger envelope closing if added later
            gardenOverlay.style.display = 'flex';
        }
    });

    // Garden bloom logic
    gardenOverlay.addEventListener('click', (e) => {
        if (e.target === closeGarden) return;

        const flowers = ['🌸', '🌹', '🌺', '🌻', '🌷', '✨', '❤️'];
        const flower = document.createElement('div');
        flower.classList.add('flower');
        flower.innerHTML = flowers[Math.floor(Math.random() * flowers.length)];
        flower.style.left = (e.clientX - 20) + 'px';
        flower.style.top = (e.clientY - 20) + 'px';
        
        gardenOverlay.appendChild(flower);

        // Optional: Remove after animation to keep DOM clean
        setTimeout(() => {
            flower.style.opacity = '0';
            flower.style.transition = 'opacity 1s ease';
            setTimeout(() => flower.remove(), 1000);
        }, 2000);
    });

    closeGarden.addEventListener('click', () => {
        gardenOverlay.style.display = 'none';
        // Clear all flowers when closing
        const activeFlowers = gardenOverlay.querySelectorAll('.flower');
        activeFlowers.forEach(f => f.remove());
    });
});
