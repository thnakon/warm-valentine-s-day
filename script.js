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
        heart.innerHTML = '<i class="fa-solid fa-heart"></i>';
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.fontSize = (Math.random() * 20 + 10) + 'px';
        heart.style.animationDuration = (Math.random() * 10 + 15) + 's';
        heartContainer.appendChild(heart);

        setTimeout(() => {
            heart.remove();
        }, 25000);
    }

    setInterval(createFloatingHeart, 1500);

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

        const icons = [
            'fa-solid fa-spa',
            'fa-solid fa-leaf',
            'fa-solid fa-clover',
            'fa-solid fa-bahai',
            'fa-solid fa-seedling',
            'fa-solid fa-heart'
        ];
        const flower = document.createElement('div');
        flower.classList.add('flower');
        flower.innerHTML = `<i class="${icons[Math.floor(Math.random() * icons.length)]}"></i>`;
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
