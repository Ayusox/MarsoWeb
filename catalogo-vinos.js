// ===== CATÁLOGO DE VINOS — INTERACTIVE CAROUSEL =====

// ── Wine data ────────────────────────────────────────────────────────────────
const WINES = [
    {
        id: 1,
        nombre: 'Protos Reserva',
        do: 'Ribera del Duero',
        tipo: 'Tinto',
        ocasiones: ['cena-romantica', 'maridaje-carnes', 'regalo'],
        gradient: 'linear-gradient(135deg, #4A0E1A 0%, #7B1D2E 100%)',
        emoji: '🍷',
    },
    {
        id: 2,
        nombre: 'Marqués de Riscal Reserva',
        do: 'Rioja',
        tipo: 'Tinto',
        ocasiones: ['celebracion', 'maridaje-carnes', 'regalo'],
        gradient: 'linear-gradient(135deg, #6B1020 0%, #9B2335 100%)',
        emoji: '🍷',
    },
    {
        id: 3,
        nombre: 'Albariño Martín Códax',
        do: 'Rías Baixas',
        tipo: 'Blanco',
        ocasiones: ['aperitivo', 'maridaje-pescado'],
        gradient: 'linear-gradient(135deg, #B8860B 0%, #DAA520 100%)',
        emoji: '🥂',
    },
    {
        id: 4,
        nombre: 'Tío Pepe Fino',
        do: 'Montilla-Moriles',
        tipo: 'Blanco',
        ocasiones: ['aperitivo', 'maridaje-pescado'],
        gradient: 'linear-gradient(135deg, #8B7536 0%, #C9A84C 100%)',
        emoji: '🥂',
    },
    {
        id: 5,
        nombre: 'Freixenet Cordon Negro',
        do: 'Cava',
        tipo: 'Espumoso',
        ocasiones: ['celebracion', 'aperitivo', 'regalo'],
        gradient: 'linear-gradient(135deg, #1A3A5C 0%, #2E6DA4 100%)',
        emoji: '🍾',
    },
    {
        id: 6,
        nombre: 'Vegamar Verdejo',
        do: 'Rueda',
        tipo: 'Blanco',
        ocasiones: ['aperitivo', 'maridaje-pescado', 'sobremesa'],
        gradient: 'linear-gradient(135deg, #556B2F 0%, #8FBC8F 100%)',
        emoji: '🥂',
    },
    {
        id: 7,
        nombre: 'Osborne Solaz Rosado',
        do: 'Castilla',
        tipo: 'Rosado',
        ocasiones: ['aperitivo', 'cena-romantica', 'maridaje-pescado'],
        gradient: 'linear-gradient(135deg, #B03060 0%, #D4829A 100%)',
        emoji: '🌸',
    },
    {
        id: 8,
        nombre: 'Pago de los Capellanes',
        do: 'Ribera del Duero',
        tipo: 'Tinto',
        ocasiones: ['maridaje-carnes', 'sobremesa'],
        gradient: 'linear-gradient(135deg, #3D0C1A 0%, #6B1228 100%)',
        emoji: '🍷',
    },
    {
        id: 9,
        nombre: 'González Byass Nectar',
        do: 'Jerez',
        tipo: 'Blanco',
        ocasiones: ['sobremesa', 'regalo'],
        gradient: 'linear-gradient(135deg, #7B5900 0%, #C49A00 100%)',
        emoji: '🍯',
    },
    {
        id: 10,
        nombre: 'Cava Anna de Codorníu',
        do: 'Cava',
        tipo: 'Espumoso',
        ocasiones: ['celebracion', 'cena-romantica', 'regalo'],
        gradient: 'linear-gradient(135deg, #0D2B4B 0%, #1A5276 100%)',
        emoji: '🍾',
    },
    {
        id: 11,
        nombre: 'Rioja Vega Crianza',
        do: 'Rioja',
        tipo: 'Tinto',
        ocasiones: ['maridaje-carnes', 'cena-romantica'],
        gradient: 'linear-gradient(135deg, #5A1020 0%, #8B1A2C 100%)',
        emoji: '🍷',
    },
    {
        id: 12,
        nombre: 'Príncipe de Viana Chardonnay',
        do: 'Navarra',
        tipo: 'Blanco',
        ocasiones: ['maridaje-pescado', 'cena-romantica', 'sobremesa'],
        gradient: 'linear-gradient(135deg, #6B6B00 0%, #A8A800 100%)',
        emoji: '🥂',
    },
    {
        id: 13,
        nombre: 'Estuche Selección Marso',
        do: 'Multi-D.O.',
        tipo: 'Tinto',
        ocasiones: ['regalo', 'celebracion'],
        gradient: 'linear-gradient(135deg, #0A2540 0%, #1A3A5C 100%)',
        emoji: '🎁',
    },
    {
        id: 14,
        nombre: 'Moriles-Montilla Superior',
        do: 'Montilla-Moriles',
        tipo: 'Blanco',
        ocasiones: ['aperitivo', 'maridaje-pescado', 'sobremesa'],
        gradient: 'linear-gradient(135deg, #8B6914 0%, #C4992E 100%)',
        emoji: '🥂',
    },
];

const OCCASIONS = [
    { id: 'todos',          label: 'Todos' },
    { id: 'aperitivo',      label: 'Aperitivo' },
    { id: 'cena-romantica', label: 'Cena Romántica' },
    { id: 'celebracion',    label: 'Celebración' },
    { id: 'maridaje-carnes',  label: 'Maridaje Carnes' },
    { id: 'maridaje-pescado', label: 'Maridaje Pescado' },
    { id: 'sobremesa',      label: 'Sobremesa & Postres' },
    { id: 'regalo',         label: 'Regalo' },
];

const OCCASION_LABELS = Object.fromEntries(OCCASIONS.map(o => [o.id, o.label]));

// ── State ─────────────────────────────────────────────────────────────────────
let activeOccasion = 'todos';
let currentIndex   = 0;
let visibleWines   = [...WINES];
let cardsPerView   = 3;

// ── DOM refs ──────────────────────────────────────────────────────────────────
const tabsEl      = document.getElementById('ocasionTabs');
const trackEl     = document.getElementById('vinoTrack');
const dotsEl      = document.getElementById('vinoDots');
const countEl     = document.getElementById('catalogoCount');
const emptyEl     = document.getElementById('catalogoEmpty');
const prevBtn     = document.getElementById('prevBtn');
const nextBtn     = document.getElementById('nextBtn');

// ── Init ──────────────────────────────────────────────────────────────────────
function init() {
    updateCardsPerView();
    renderTabs();
    applyFilter('todos');
    attachArrows();
    attachTouch();
    attachKeyboard();
    attachResize();
}

// ── Tabs ──────────────────────────────────────────────────────────────────────
function renderTabs() {
    tabsEl.innerHTML = '';
    OCCASIONS.forEach(occ => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'ocasion-tab' + (occ.id === activeOccasion ? ' ocasion-tab--active' : '');
        btn.textContent = occ.label;
        btn.dataset.occasion = occ.id;
        btn.setAttribute('role', 'tab');
        btn.setAttribute('aria-selected', occ.id === activeOccasion ? 'true' : 'false');
        btn.addEventListener('click', () => applyFilter(occ.id));
        tabsEl.appendChild(btn);
    });
}

// ── Filter ────────────────────────────────────────────────────────────────────
function applyFilter(occasionId) {
    activeOccasion = occasionId;

    // Update tab styles
    tabsEl.querySelectorAll('.ocasion-tab').forEach(btn => {
        const active = btn.dataset.occasion === occasionId;
        btn.classList.toggle('ocasion-tab--active', active);
        btn.setAttribute('aria-selected', active ? 'true' : 'false');
    });

    // Filter wines
    visibleWines = occasionId === 'todos'
        ? [...WINES]
        : WINES.filter(w => w.ocasiones.includes(occasionId));

    renderCards();
    renderDots();
    slideTo(0);
    updateCount();
}

// ── Cards ─────────────────────────────────────────────────────────────────────
function renderCards() {
    const isEmpty = visibleWines.length === 0;
    emptyEl.classList.toggle('hidden', !isEmpty);
    trackEl.innerHTML = '';

    if (isEmpty) return;

    visibleWines.forEach((wine, i) => {
        const article = document.createElement('article');
        article.className = 'vino-card';
        article.style.animationDelay = `${i * 60}ms`;

        const badgeClass = `badge--${wine.tipo.toLowerCase()}`;
        const tagHtml = wine.ocasiones
            .map(id => `<span class="vino-tag">${OCCASION_LABELS[id] || id}</span>`)
            .join('');
        const waUrl = `https://wa.me/34635190975?text=${encodeURIComponent(
            `Hola, me interesa el vino "${wine.nombre}" (${wine.do}). ¿Podéis informarme sobre disponibilidad y precio?`
        )}`;

        article.innerHTML = `
            <div class="vino-card__visual" style="background: ${wine.gradient};">
                <span class="vino-card__tipo-badge ${badgeClass}">${wine.tipo}</span>
                <span aria-hidden="true">${wine.emoji}</span>
            </div>
            <div class="vino-card__body">
                <div class="vino-card__do">${wine.do}</div>
                <h3 class="vino-card__nombre">${wine.nombre}</h3>
                <div class="vino-card__tags">${tagHtml}</div>
                <a href="${waUrl}" target="_blank" rel="noopener" class="vino-card__cta">
                    <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                    Solicitar
                </a>
            </div>
        `;
        trackEl.appendChild(article);
    });
}

// ── Slide ─────────────────────────────────────────────────────────────────────
function slideTo(index) {
    if (visibleWines.length === 0) return;

    const maxIndex = Math.max(0, Math.ceil(visibleWines.length / cardsPerView) - 1);
    currentIndex   = Math.max(0, Math.min(index, maxIndex));

    const cardEl   = trackEl.querySelector('.vino-card');
    if (!cardEl) return;

    const cardW    = cardEl.offsetWidth;
    const gap      = 24; // 1.5rem gap
    const offset   = currentIndex * cardsPerView * (cardW + gap);
    trackEl.style.transform = `translateX(-${offset}px)`;

    updateArrows();
    updateDots();
}

// ── Arrows ────────────────────────────────────────────────────────────────────
function attachArrows() {
    prevBtn.addEventListener('click', () => slideTo(currentIndex - 1));
    nextBtn.addEventListener('click', () => slideTo(currentIndex + 1));
}

function updateArrows() {
    const maxIndex = Math.max(0, Math.ceil(visibleWines.length / cardsPerView) - 1);
    prevBtn.disabled = currentIndex <= 0;
    nextBtn.disabled = currentIndex >= maxIndex;
}

// ── Dots ──────────────────────────────────────────────────────────────────────
function renderDots() {
    const pageCount = Math.ceil(visibleWines.length / cardsPerView);
    dotsEl.innerHTML = '';

    if (pageCount <= 1) return;

    for (let i = 0; i < pageCount; i++) {
        const dot = document.createElement('button');
        dot.type = 'button';
        dot.className = 'vino-dot' + (i === currentIndex ? ' vino-dot--active' : '');
        dot.setAttribute('aria-label', `Página ${i + 1}`);
        dot.addEventListener('click', () => slideTo(i));
        dotsEl.appendChild(dot);
    }
}

function updateDots() {
    dotsEl.querySelectorAll('.vino-dot').forEach((dot, i) => {
        dot.classList.toggle('vino-dot--active', i === currentIndex);
    });
}

// ── Count ─────────────────────────────────────────────────────────────────────
function updateCount() {
    const n = visibleWines.length;
    if (n === 0) {
        countEl.textContent = '';
        return;
    }
    const label = activeOccasion === 'todos'
        ? 'todo el catálogo'
        : OCCASION_LABELS[activeOccasion] || activeOccasion;
    countEl.innerHTML = `Mostrando <strong>${n}</strong> vino${n !== 1 ? 's' : ''} para <strong>${label}</strong>`;
}

// ── Responsive cards per view ─────────────────────────────────────────────────
function updateCardsPerView() {
    const w = window.innerWidth;
    if (w >= 1024)      cardsPerView = 3;
    else if (w >= 640)  cardsPerView = 2;
    else                cardsPerView = 1;
}

function attachResize() {
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            updateCardsPerView();
            renderDots();
            slideTo(0);
        }, 200);
    }, { passive: true });
}

// ── Touch / swipe ─────────────────────────────────────────────────────────────
function attachTouch() {
    let startX = 0;
    trackEl.addEventListener('touchstart', e => {
        startX = e.touches[0].clientX;
    }, { passive: true });

    trackEl.addEventListener('touchend', e => {
        const diff = startX - e.changedTouches[0].clientX;
        if (Math.abs(diff) > 50) {
            slideTo(diff > 0 ? currentIndex + 1 : currentIndex - 1);
        }
    }, { passive: true });
}

// ── Keyboard ──────────────────────────────────────────────────────────────────
function attachKeyboard() {
    document.addEventListener('keydown', e => {
        if (e.key === 'ArrowLeft')  slideTo(currentIndex - 1);
        if (e.key === 'ArrowRight') slideTo(currentIndex + 1);
    });
}

// ── Navbar scroll ─────────────────────────────────────────────────────────────
(function () {
    const navbar = document.getElementById('navbar');
    const menuToggle = document.getElementById('menuToggle');
    const navLinksContainer = document.getElementById('navLinks');
    const navLinkEls = document.querySelectorAll('.nav-link');

    if (menuToggle && navLinksContainer) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navLinksContainer.classList.toggle('active');
        });
    }

    navLinkEls.forEach(link => {
        link.addEventListener('click', () => {
            if (menuToggle && navLinksContainer) {
                menuToggle.classList.remove('active');
                navLinksContainer.classList.remove('active');
            }
        });
    });

    window.addEventListener('resize', () => {
        if (window.innerWidth > 768 && menuToggle && navLinksContainer) {
            menuToggle.classList.remove('active');
            navLinksContainer.classList.remove('active');
        }
    });
})();

// ── Call button ───────────────────────────────────────────────────────────────
(function () {
    const callButton = document.getElementById('callButton');
    if (!callButton) return;

    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                if (window.scrollY > 300) {
                    callButton.classList.add('visible');
                } else {
                    callButton.classList.remove('visible');
                }
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });
})();

// ── AOS observer ─────────────────────────────────────────────────────────────
(function () {
    const animatedEls = document.querySelectorAll('[data-aos]');
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('aos-visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
    animatedEls.forEach(el => observer.observe(el));
})();

// ── Cookie consent ────────────────────────────────────────────────────────────
class CookieConsentManager {
    constructor() {
        this.cookieName = 'cookie_consent';
        this.cookieDays = 365;
        this.categories = {
            necessary: { required: true },
            analytics:  { required: false },
            marketing:  { required: false },
        };

        this.banner       = document.getElementById('cookieBanner');
        this.btnAccept    = document.getElementById('cookieAccept');
        this.btnReject    = document.getElementById('cookieReject');
        this.btnConfigure = document.getElementById('cookieConfigure');
        this.settingsButton = document.getElementById('cookieSettings');
        this.modal        = document.getElementById('cookieModal');
        this.btnClose     = document.getElementById('cookieClose');
        this.btnSave      = document.getElementById('cookieSave');
        this.btnAcceptAll = document.getElementById('cookieAcceptAll');
        this.toggleAnalytics = document.getElementById('cookieAnalytics');
        this.toggleMarketing = document.getElementById('cookieMarketing');

        this.init();
    }

    init() {
        if (!this.banner || !this.btnAccept || !this.btnReject || !this.btnConfigure || !this.modal || !this.btnSave) return;

        const consent = this.getConsent();
        if (!consent) {
            this.setPendingConsent();
            this.showBannerWithDelay();
        } else if (consent.status === 'pending') {
            this.showBannerWithDelay();
        } else {
            this.applyConsent(consent);
            this.showSettingsButton();
            this.syncToggles(consent);
        }

        this.btnAccept.addEventListener('click', () => this.acceptAll());
        this.btnReject.addEventListener('click', () => this.rejectAll());
        this.btnConfigure.addEventListener('click', () => this.openModal());
        this.btnSave.addEventListener('click', () => this.savePreferences());
        this.btnAcceptAll.addEventListener('click', () => this.acceptAll());
        if (this.settingsButton) this.settingsButton.addEventListener('click', () => this.openModal());
        if (this.btnClose) this.btnClose.addEventListener('click', () => this.closeModal());

        this.modal.addEventListener('click', e => { if (e.target === this.modal) this.closeModal(); });
        document.addEventListener('keydown', e => { if (e.key === 'Escape' && this.modal.classList.contains('open')) this.closeModal(); });
    }

    getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
        return '';
    }

    setCookie(name, value, days) {
        const date = new Date();
        date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
        const secure = window.location.protocol === 'https:' ? '; Secure' : '';
        document.cookie = `${name}=${value}; expires=${date.toUTCString()}; path=/; SameSite=Lax${secure}`;
    }

    getConsent() {
        const raw = this.getCookie(this.cookieName);
        if (!raw) return null;
        try { return JSON.parse(decodeURIComponent(raw)); } catch { return null; }
    }

    createConsent(status, categories) {
        return { version: 1, date: new Date().toISOString(), status, categories };
    }

    setPendingConsent() {
        const c = this.createConsent('pending', { necessary: true, analytics: false, marketing: false });
        this.setCookie(this.cookieName, encodeURIComponent(JSON.stringify(c)), this.cookieDays);
    }

    saveConsent(status, categories) {
        const c = this.createConsent(status, categories);
        this.setCookie(this.cookieName, encodeURIComponent(JSON.stringify(c)), this.cookieDays);
        this.applyConsent(c);
        this.hideBanner();
        this.showSettingsButton();
        this.closeModal();
    }

    acceptAll()  { this.saveConsent('accepted', { necessary: true, analytics: true, marketing: true }); }
    rejectAll()  { this.saveConsent('rejected', { necessary: true, analytics: false, marketing: false }); }

    savePreferences() {
        this.saveConsent('custom', {
            necessary: true,
            analytics: !!(this.toggleAnalytics && this.toggleAnalytics.checked),
            marketing: !!(this.toggleMarketing && this.toggleMarketing.checked),
        });
    }

    showBanner()            { this.banner.classList.add('visible'); }
    showBannerWithDelay()   { setTimeout(() => this.showBanner(), 5000); }
    hideBanner()            { this.banner.classList.remove('visible'); }
    showSettingsButton()    { if (this.settingsButton) this.settingsButton.classList.add('visible'); }

    openModal() {
        this.modal.classList.add('open');
        this.modal.setAttribute('aria-hidden', 'false');
        const c = this.getConsent();
        this.syncToggles(c || { categories: { analytics: false, marketing: false } });
    }

    closeModal() {
        this.modal.classList.remove('open');
        this.modal.setAttribute('aria-hidden', 'true');
    }

    syncToggles(consent) {
        if (this.toggleAnalytics && consent && consent.categories) this.toggleAnalytics.checked = !!consent.categories.analytics;
        if (this.toggleMarketing && consent && consent.categories) this.toggleMarketing.checked = !!consent.categories.marketing;
    }

    applyConsent(consent) {
        if (!consent || consent.status === 'pending') return;
        document.querySelectorAll('script[data-cookie-category]').forEach(script => {
            const category = script.dataset.cookieCategory;
            if (!consent.categories[category] || script.type !== 'text/plain') return;
            const newScript = document.createElement('script');
            Array.from(script.attributes).forEach(attr => {
                if (attr.name !== 'type' && attr.name !== 'data-cookie-category') newScript.setAttribute(attr.name, attr.value);
            });
            newScript.text = script.textContent;
            script.parentNode.replaceChild(newScript, script);
        });
    }
}

// ── Boot ──────────────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
    init();
    new CookieConsentManager();
});
