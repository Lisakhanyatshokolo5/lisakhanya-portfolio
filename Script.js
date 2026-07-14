// =====================================================
// LOADER
// =====================================================
window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    setTimeout(() => loader.classList.add('hidden'), 500);
});

// =====================================================
// TYPING EFFECT — cycles through roles
// =====================================================
const roles = [
    'Aspiring Software Engineer',
    'Java Developer',
    'Full-Stack Web Developer',
    'Laravel & Spring Boot Enthusiast'
];

const typedEl = document.getElementById('typedRole');
let roleIndex = 0;
let charIndex = 0;
let deleting = false;

function typeLoop() {
    if (!typedEl) return;
    const current = roles[roleIndex];

    if (!deleting) {
        typedEl.textContent = current.slice(0, charIndex + 1);
        charIndex++;
        if (charIndex === current.length) {
            deleting = true;
            setTimeout(typeLoop, 1400);
            return;
        }
    } else {
        typedEl.textContent = current.slice(0, charIndex - 1);
        charIndex--;
        if (charIndex === 0) {
            deleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
        }
    }
    setTimeout(typeLoop, deleting ? 35 : 65);
}
typeLoop();

// =====================================================
// MOBILE NAV TOGGLE
// =====================================================
const toggleBtn = document.getElementById('tooglebtn');
const navLinksEl = document.querySelector('.navlinks');

if (toggleBtn && navLinksEl) {
    toggleBtn.addEventListener('click', () => {
        toggleBtn.classList.toggle('open');
        navLinksEl.classList.toggle('open');
    });

    navLinksEl.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            toggleBtn.classList.remove('open');
            navLinksEl.classList.remove('open');
        });
    });
}

// =====================================================
// SCROLL REVEAL (IntersectionObserver)
// =====================================================
const revealTargets = document.querySelectorAll('.reveal-left, .reveal-right, .reveal-up');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.15 });

revealTargets.forEach(el => revealObserver.observe(el));

// stagger project cards slightly
document.querySelectorAll('.project-card.reveal-up').forEach((card, i) => {
    card.style.transitionDelay = `${i * 0.08}s`;
});

// =====================================================
// ACTIVE NAV LINK ON SCROLL
// =====================================================
const sections = document.querySelectorAll('section[id], .container[id]');
const navAnchors = document.querySelectorAll('.navlinks a');

const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            navAnchors.forEach(a => {
                a.classList.toggle('active', a.getAttribute('href') === `#${id}`);
            });
        }
    });
}, { threshold: 0.4 });

sections.forEach(sec => navObserver.observe(sec));

// =====================================================
// CURSOR-FOLLOW AMBIENT GLOW (desktop only)
// =====================================================
const glow = document.getElementById('cursorGlow');
if (glow && window.matchMedia('(hover: hover)').matches) {
    window.addEventListener('mousemove', (e) => {
        glow.style.left = `${e.clientX}px`;
        glow.style.top = `${e.clientY}px`;
    });
} else if (glow) {
    glow.style.display = 'none';
}

// =====================================================
// CONTACT FORM (placeholder submit)
// =====================================================
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = contactForm.querySelector('button');
        const original = btn.innerHTML;
        btn.innerHTML = '<i class="fa-solid fa-check"></i> Message Sent!';
        btn.disabled = true;
        setTimeout(() => {
            btn.innerHTML = original;
            btn.disabled = false;
            contactForm.reset();
        }, 2200);
    });
}