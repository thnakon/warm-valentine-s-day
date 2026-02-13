// ===== Valentine's Day Surprise Website =====

document.addEventListener('DOMContentLoaded', () => {
    // Start floating hearts background
    createFloatingHearts();

    // Screen 1: Question
    setupQuestionScreen();

    // Screen 2: Bouquet
    setupBouquetScreen();

    // Screen 3: Card
    setupCardScreen();
});

// ===== FLOATING HEARTS BACKGROUND =====
function createFloatingHearts() {
    const container = document.getElementById('hearts-container');
    const symbols = ['♥', '♡', '✧', '✨', '❤', '🌸'];

    function spawnHeart() {
        const heart = document.createElement('span');
        heart.classList.add('floating-heart');
        heart.textContent = symbols[Math.floor(Math.random() * symbols.length)];
        heart.style.color = '#ffb6c1';

        // Start from top or right (top-right corner area)
        const startFromTop = Math.random() > 0.5;
        if (startFromTop) {
            heart.style.top = '-5vh';
            heart.style.left = (50 + Math.random() * 60) + 'vw';
        } else {
            heart.style.top = (Math.random() * 50) + 'vh';
            heart.style.left = '105vw';
        }

        heart.style.fontSize = (Math.random() * 1.2 + 0.6) + 'rem';
        // Slow down speed: 10s to 18s duration
        heart.style.animationDuration = (Math.random() * 8 + 10) + 's';
        heart.style.animationDelay = '0s';
        container.appendChild(heart);

        // Remove after animation (matches max duration)
        setTimeout(() => heart.remove(), 20000);
    }

    // Spawn hearts slower
    setInterval(spawnHeart, 1500);
    // Initial batch
    for (let i = 0; i < 5; i++) {
        setTimeout(spawnHeart, i * 600);
    }
}

// ===== SCREEN 1: QUESTION =====
function setupQuestionScreen() {
    const btnYes = document.getElementById('btn-yes');
    const btnNo = document.getElementById('btn-no');

    // YES button → heart explosion + transition
    btnYes.addEventListener('click', () => {
        heartExplosion(btnYes);
        setTimeout(() => {
            transitionToScreen('screen-bouquet');
        }, 1200);
    });

    // NO button → dodge cursor playfully
    let dodgeCount = 0;
    const maxDodges = 5;
    const messages = [
        'Not today',
        "Can't catch me!",
        'Are you sure?',
        'Try again~',
        'Nice try!',
        'Click the other one!'
    ];

    function dodgeButton() {
        dodgeCount++;
        btnNo.querySelector('span').textContent = messages[dodgeCount % messages.length];

        if (dodgeCount >= maxDodges) {
            // After several dodges, auto-click Yes
            btnNo.querySelector('span').textContent = 'Okay, you win';
            btnNo.style.pointerEvents = 'none';
            setTimeout(() => {
                btnYes.click();
            }, 800);
            return;
        }

        const parent = btnNo.closest('.button-group');
        const parentRect = parent.getBoundingClientRect();
        const btnRect = btnNo.getBoundingClientRect();

        // Random position within reasonable bounds
        const maxX = parentRect.width - btnRect.width;
        const maxY = 100;
        const randomX = Math.random() * maxX - maxX / 2;
        const randomY = Math.random() * maxY - maxY / 2;

        btnNo.style.transform = `translate(${randomX}px, ${randomY}px)`;
    }

    // Dodge on both hover and touch
    btnNo.addEventListener('mouseenter', dodgeButton);
    btnNo.addEventListener('touchstart', (e) => {
        e.preventDefault();
        dodgeButton();
    });
}

// ===== HEART EXPLOSION EFFECT =====
function heartExplosion(origin) {
    const rect = origin.getBoundingClientRect();
    const container = document.createElement('div');
    container.classList.add('heart-explosion');
    container.style.left = rect.left + rect.width / 2 + 'px';
    container.style.top = rect.top + rect.height / 2 + 'px';
    document.body.appendChild(container);

    const symbols = ['♥', '♡', '✨', '🌸', '✧', '❤'];

    for (let i = 0; i < 20; i++) {
        const heart = document.createElement('span');
        heart.classList.add('explosion-heart');
        heart.textContent = symbols[Math.floor(Math.random() * symbols.length)];
        heart.style.color = '#ff4081';
        const angle = (Math.PI * 2 * i) / 20;
        const distance = 80 + Math.random() * 120;
        heart.style.setProperty('--tx', Math.cos(angle) * distance + 'px');
        heart.style.setProperty('--ty', Math.sin(angle) * distance + 'px');
        heart.style.fontSize = (Math.random() * 1.5 + 1) + 'rem';
        heart.style.animationDelay = Math.random() * 0.3 + 's';
        container.appendChild(heart);
    }

    setTimeout(() => container.remove(), 2000);
}

// ===== SCREEN TRANSITIONS =====
function transitionToScreen(targetId) {
    const screens = document.querySelectorAll('.screen');

    // Create transition overlay
    const overlay = document.createElement('div');
    overlay.classList.add('transition-overlay');
    document.body.appendChild(overlay);

    // Fade in overlay
    requestAnimationFrame(() => {
        overlay.classList.add('active');
    });

    setTimeout(() => {
        // Hide all screens
        screens.forEach(s => s.classList.remove('active'));
        // Show target
        document.getElementById(targetId).classList.add('active');

        // Fade out overlay
        setTimeout(() => {
            overlay.classList.remove('active');
            setTimeout(() => overlay.remove(), 600);
        }, 300);
    }, 500);
}

// ===== SCREEN 2: BOUQUET =====
function setupBouquetScreen() {
    const bouquet = document.getElementById('bouquet-click');

    bouquet.addEventListener('click', () => {
        // Scatter petals
        scatterPetals();

        // Add a little shake
        bouquet.style.animation = 'none';
        bouquet.offsetHeight; // trigger reflow
        bouquet.style.animation = 'shake 0.5s ease';

        // Transition to card after petals
        setTimeout(() => {
            transitionToScreen('screen-card');
        }, 1800);
    });
}

function scatterPetals() {
    const container = document.getElementById('petals-container');
    const petalColors = ['#ffb6c1', '#ff69b4', '#ff85a2', '#ffc0cb', '#ffe4ec', '#fff0f5'];

    for (let i = 0; i < 30; i++) {
        const petal = document.createElement('div');
        petal.classList.add('petal');
        petal.style.left = Math.random() * 100 + 'vw';
        petal.style.top = -20 + Math.random() * 20 + 'px';
        petal.style.width = (Math.random() * 15 + 10) + 'px';
        petal.style.height = (Math.random() * 15 + 10) + 'px';
        petal.style.background = petalColors[Math.floor(Math.random() * petalColors.length)];
        petal.style.setProperty('--drift', (Math.random() * 200 - 100) + 'px');
        petal.style.animationDuration = (Math.random() * 3 + 2) + 's';
        petal.style.animationDelay = Math.random() * 1 + 's';
        container.appendChild(petal);
    }

    // Clean up petals after animation
    setTimeout(() => {
        container.innerHTML = '';
    }, 5000);
}

// ===== SCREEN 3: LOVE CARD =====
function setupCardScreen() {
    const card = document.getElementById('love-card');
    const finalMessage = document.getElementById('final-message');
    let isFlipped = false;

    card.addEventListener('click', () => {
        if (!isFlipped) {
            card.classList.add('flipped');
            isFlipped = true;

            // Create sparkles inside card
            createSparkles();

            // Show final message
            setTimeout(() => {
                finalMessage.classList.add('visible');
                // Create a final burst of floating hearts
                celebrationBurst();
            }, 1200);
        }
    });
}

function createSparkles() {
    const container = document.getElementById('card-sparkles');
    const colors = ['#ff4081', '#ff69b4', '#ffb6c1', '#ffc107', '#fff'];

    for (let i = 0; i < 15; i++) {
        const sparkle = document.createElement('div');
        sparkle.classList.add('sparkle');
        sparkle.style.left = Math.random() * 100 + '%';
        sparkle.style.top = Math.random() * 100 + '%';
        sparkle.style.width = (Math.random() * 6 + 3) + 'px';
        sparkle.style.height = sparkle.style.width;
        sparkle.style.background = colors[Math.floor(Math.random() * colors.length)];
        sparkle.style.animationDelay = Math.random() * 2 + 's';
        sparkle.style.animationDuration = (Math.random() * 1.5 + 1) + 's';
        container.appendChild(sparkle);
    }
}

function celebrationBurst() {
    const symbols = ['♥', '♡', '✧', '✨', '❤', '🌸'];
    const container = document.getElementById('hearts-container');

    for (let i = 0; i < 15; i++) {
        setTimeout(() => {
            const heart = document.createElement('span');
            heart.classList.add('floating-heart');
            heart.textContent = symbols[Math.floor(Math.random() * symbols.length)];
            heart.style.color = '#ff4081';
            heart.style.left = Math.random() * 100 + 'vw';
            heart.style.fontSize = (Math.random() * 2 + 1) + 'rem';
            heart.style.animationDuration = (Math.random() * 5 + 4) + 's';
            heart.style.animationDelay = '0s';
            container.appendChild(heart);
            setTimeout(() => heart.remove(), 10000);
        }, i * 200);
    }
}

// ===== SHAKE ANIMATION (Added dynamically) =====
const shakeStyle = document.createElement('style');
shakeStyle.textContent = `
  @keyframes shake {
    0%, 100% { transform: translateX(0) rotate(0deg); }
    20% { transform: translateX(-8px) rotate(-3deg); }
    40% { transform: translateX(8px) rotate(3deg); }
    60% { transform: translateX(-5px) rotate(-2deg); }
    80% { transform: translateX(5px) rotate(2deg); }
  }
`;
document.head.appendChild(shakeStyle);
