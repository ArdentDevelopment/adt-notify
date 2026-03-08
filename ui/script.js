const container = document.getElementById('notify-container');

const icons = {
    success: `<svg fill="none" viewBox="0 0 24 24" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" /></svg>`,
    error: `<svg fill="none" viewBox="0 0 24 24" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>`,
    warning: `<svg fill="none" viewBox="0 0 24 24" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>`,
    info: `<svg fill="none" viewBox="0 0 24 24" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>`
};

window.addEventListener('message', (event) => {
    if (event.data.action === 'notify') {
        const { type, title, message, duration, position } = event.data;
        createNotification(type, title, message, duration, position);
    }
});

function playSound(type) {
    let soundFile = type;
    if (!icons[type]) {
        soundFile = 'information'; 
    } else if (type === 'info') {
        soundFile = 'information';
    }

    const audio = new Audio(`sounds/${soundFile}.mp3`);
    audio.volume = 0.5;
    audio.play().catch(e => console.log("Sound Effect Error:", e));
}

let currentPosition = 'top-right';

function createNotification(type = 'info', title = 'Notification', message = '', duration = 5000, position = 'top-right') {
    playSound(type);

    if (currentPosition !== position) {
        container.className = position;
        currentPosition = position;
    } else if (!container.className) {
        container.className = position;
    }

    const el = document.createElement('div');
    el.classList.add('notify-card', type);

    el.innerHTML = `
        <div class="icon-box">
            ${icons[type] || icons['info']}
        </div>
        <div class="content-box">
            <div class="title">${title}</div>
            <div class="message">${message}</div>
        </div>
        <div class="progress-container">
            <div class="progress-bar"></div>
        </div>
    `;

    if (position.includes('bottom')) {
        container.prepend(el);
    } else {
        container.appendChild(el);
    }

    const progressBar = el.querySelector('.progress-bar');

    progressBar.animate([
        { transform: 'scaleX(1)' },
        { transform: 'scaleX(0)' }
    ], {
        duration: duration,
        easing: 'linear',
        fill: 'forwards'
    });

    setTimeout(() => {
        el.classList.add('hide');
        setTimeout(() => {
            el.remove();
        }, 600);
    }, duration);
}
