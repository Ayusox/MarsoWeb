// ===== MARSO DISTRIBUCIONES - JAVASCRIPT =====
// Este archivo controla los pequeños efectos y la interacción de la web.

// ===== Animaciones al hacer scroll (AOS) =====
// Activa las animaciones de entrada cuando el usuario baja por la página.
AOS.init({
    duration: 800, // Duración de la animación (ms)
    easing: 'ease-out-cubic', // Tipo de movimiento
    once: true, // Solo anima una vez
    offset: 100 // Distancia antes de activar la animación
});

// ===== Barra de navegación al hacer scroll =====
// Añade un fondo a la navbar cuando se baja un poco.
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    // Cambia el fondo de la navbar al hacer scroll
    if (navbar) {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    // Marca el enlace activo según la sección visible
    let current = '';
    const sections = document.querySelectorAll('section[id]');

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// ===== Menú móvil =====
// Abre y cierra el menú cuando se pulsa el botón hamburguesa.
const menuToggle = document.getElementById('menuToggle');
const navLinksContainer = document.getElementById('navLinks');

if (menuToggle && navLinksContainer) {
    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        navLinksContainer.classList.toggle('active');
    });
}

// Cierra el menú móvil al pulsar un enlace
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (menuToggle && navLinksContainer) {
            menuToggle.classList.remove('active');
            navLinksContainer.classList.remove('active');
        }
    });
});

// Cierra el menú si se cambia a escritorio
window.addEventListener('resize', () => {
    if (window.innerWidth > 768 && menuToggle && navLinksContainer) {
        menuToggle.classList.remove('active');
        navLinksContainer.classList.remove('active');
    }
});

// ===== Scroll suave =====
// Hace que los enlaces internos se desplacen con suavidad.
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80; // Ajuste por la navbar fija
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ===== Botón de llamada =====
// Aparece cuando el usuario baja del hero.
const callButton = document.getElementById('callButton');
const heroSection = document.querySelector('.hero');

window.addEventListener('scroll', () => {
    if (callButton && heroSection) {
        const heroHeight = heroSection.offsetHeight;
        if (window.scrollY > heroHeight - 100) {
            callButton.classList.add('visible');
        } else {
            callButton.classList.remove('visible');
        }
    }
});

// ===== Formulario de contacto =====
// Evita el envío real y muestra un mensaje de confirmación.
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

    // Recoge los datos del formulario (por si luego se envían a un servidor)
    const formData = {
        nombre: document.getElementById('nombre').value,
        email: document.getElementById('email').value,
        telefono: document.getElementById('telefono').value,
        mensaje: document.getElementById('mensaje').value
    };

    // Por ahora solo mostramos un aviso
    alert('¡Gracias por contactarnos! Te responderemos lo antes posible.');

    // Limpia el formulario
        contactForm.reset();

    // Aquí se enviaría a un servidor si fuera necesario
    // fetch('/api/contact', { ... })
    });
}

// ===== Tarjetas del catálogo =====
// Detecta clics en las tarjetas (por ahora solo lo muestra en consola).
const catalogCards = document.querySelectorAll('.catalog-card');

catalogCards.forEach(card => {
    card.addEventListener('click', function() {
        const title = this.querySelector('.catalog-title').textContent;
        console.log(`Clicked on: ${title}`);
    });
});

// ===== Carga diferida de imágenes (lazy loading) =====
// Carga las imágenes solo cuando aparecen en pantalla.
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img').forEach(img => imageObserver.observe(img));
}

// ===== Carga diferida de videos (lazy loading) =====
// Carga los videos solo cuando están cerca del viewport para mejorar el rendimiento inicial.
if ('IntersectionObserver' in window) {
    const videoObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const video = entry.target;
            if (entry.isIntersecting) {
                // Cuando el video es visible, cargarlo y reproducirlo
                if (video.readyState === 0) { // Si no ha empezado a cargar
                    // Cargar video en modo progresivo
                    video.preload = 'auto';
                    video.load();
                }
                
                // Forzar atributos necesarios para iOS
                video.setAttribute('autoplay', '');
                video.setAttribute('muted', '');
                video.setAttribute('playsinline', '');
                video.muted = true;
                video.playsInline = true;
                
                // Reproducir múltiples veces para asegurar inicio en iOS
                const attemptPlay = () => {
                    const playPromise = video.play();
                    if (playPromise !== undefined) {
                        playPromise.then(() => {
                            // Video reproducido exitosamente
                        }).catch(() => {
                            // Si falla, intentar de nuevo después de un breve delay
                            setTimeout(() => {
                                video.play().catch(() => {});
                            }, 100);
                        });
                    }
                };
                
                // Intentar reproducir inmediatamente
                attemptPlay();
                
                // También intentar cuando el video tenga suficientes datos
                video.addEventListener('loadeddata', attemptPlay, { once: true });
                video.addEventListener('canplay', attemptPlay, { once: true });
                
            } else {
                // Cuando el video sale del viewport, pausarlo y detener la carga para ahorrar datos
                video.pause();
                // No establecer a null, solo pausar
            }
        });
    }, {
        rootMargin: '300px', // Empieza a cargar 300px antes de que sea visible
        threshold: [0, 0.25] // Detectar cuando entra y cuando está parcialmente visible
    });

    // Observar todos los videos con clase lazy-video
    document.querySelectorAll('.lazy-video').forEach(video => {
        // Asegurar que los videos tengan los atributos correctos desde el inicio
        video.setAttribute('autoplay', '');
        video.setAttribute('muted', '');
        video.setAttribute('playsinline', '');
        video.muted = true;
        video.playsInline = true;
        
        videoObserver.observe(video);
    });
}

// ===== Forzar reproducción al hacer scroll o tocar la pantalla (para iOS) =====
// iOS requiere interacción del usuario para algunos videos, este código lo maneja
const forceVideoPlayback = () => {
    document.querySelectorAll('.lazy-video').forEach(video => {
        if (video.paused) {
            video.play().catch(() => {});
        }
    });
};

// Ejecutar cuando el usuario interactúe con la página
document.addEventListener('touchstart', forceVideoPlayback, { once: true, passive: true });
document.addEventListener('scroll', forceVideoPlayback, { once: true, passive: true });

// ===== Aviso de cookies =====
// Gestion profesional del consentimiento RGPD/LSSI-CE con preferencias granulares.
class CookieConsentManager {
    constructor() {
        this.cookieName = 'cookie_consent';
        this.cookieDays = 365;
        this.categories = {
            necessary: { required: true },
            analytics: { required: false },
            marketing: { required: false }
        };

        this.banner = document.getElementById('cookieBanner');
        this.btnAccept = document.getElementById('cookieAccept');
        this.btnReject = document.getElementById('cookieReject');
        this.btnConfigure = document.getElementById('cookieConfigure');
        this.settingsButton = document.getElementById('cookieSettings');
        this.modal = document.getElementById('cookieModal');
        this.btnClose = document.getElementById('cookieClose');
        this.btnSave = document.getElementById('cookieSave');
        this.btnAcceptAll = document.getElementById('cookieAcceptAll');
        this.toggleAnalytics = document.getElementById('cookieAnalytics');
        this.toggleMarketing = document.getElementById('cookieMarketing');

        this.init();
    }

    init() {
        if (!this.banner || !this.btnAccept || !this.btnReject || !this.btnConfigure || !this.modal || !this.btnSave) {
            return;
        }

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

        if (this.settingsButton) {
            this.settingsButton.addEventListener('click', () => this.openModal());
        }

        if (this.btnClose) {
            this.btnClose.addEventListener('click', () => this.closeModal());
        }

        this.modal.addEventListener('click', (event) => {
            if (event.target === this.modal) {
                this.closeModal();
            }
        });

        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape' && this.modal.classList.contains('open')) {
                this.closeModal();
            }
        });
    }

    getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) {
            return parts.pop().split(';').shift();
        }
        return '';
    }

    setCookie(name, value, days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        const expires = `expires=${date.toUTCString()}`;
        const secure = window.location.protocol === 'https:' ? '; Secure' : '';
        document.cookie = `${name}=${value}; ${expires}; path=/; SameSite=Lax${secure}`;
    }

    getConsent() {
        const raw = this.getCookie(this.cookieName);
        if (!raw) {
            return null;
        }
        try {
            return JSON.parse(decodeURIComponent(raw));
        } catch (error) {
            return null;
        }
    }

    createConsent(status, categories) {
        return {
            version: 1,
            date: new Date().toISOString(),
            status,
            categories
        };
    }

    setPendingConsent() {
        const consent = this.createConsent('pending', {
            necessary: true,
            analytics: false,
            marketing: false
        });
        this.setCookie(this.cookieName, encodeURIComponent(JSON.stringify(consent)), this.cookieDays);
    }

    saveConsent(status, categories) {
        const consent = this.createConsent(status, categories);
        this.setCookie(this.cookieName, encodeURIComponent(JSON.stringify(consent)), this.cookieDays);
        this.applyConsent(consent);
        this.hideBanner();
        this.showSettingsButton();
        this.closeModal();
    }

    acceptAll() {
        const categories = {
            necessary: true,
            analytics: true,
            marketing: true
        };
        this.saveConsent('accepted', categories);
    }

    rejectAll() {
        const categories = {
            necessary: true,
            analytics: false,
            marketing: false
        };
        this.saveConsent('rejected', categories);
    }

    savePreferences() {
        const categories = {
            necessary: true,
            analytics: !!(this.toggleAnalytics && this.toggleAnalytics.checked),
            marketing: !!(this.toggleMarketing && this.toggleMarketing.checked)
        };
        this.saveConsent('custom', categories);
    }

    showBanner() {
        this.banner.classList.add('visible');
    }

    showBannerWithDelay() {
        setTimeout(() => {
            this.showBanner();
        }, 5000);
    }

    hideBanner() {
        this.banner.classList.remove('visible');
    }

    showSettingsButton() {
        if (this.settingsButton) {
            this.settingsButton.classList.add('visible');
        }
    }

    openModal() {
        this.modal.classList.add('open');
        this.modal.setAttribute('aria-hidden', 'false');
        const consent = this.getConsent();
        this.syncToggles(consent || { categories: { analytics: false, marketing: false } });
    }

    closeModal() {
        this.modal.classList.remove('open');
        this.modal.setAttribute('aria-hidden', 'true');
    }

    syncToggles(consent) {
        if (this.toggleAnalytics && consent && consent.categories) {
            this.toggleAnalytics.checked = !!consent.categories.analytics;
        }
        if (this.toggleMarketing && consent && consent.categories) {
            this.toggleMarketing.checked = !!consent.categories.marketing;
        }
    }

    applyConsent(consent) {
        if (!consent || consent.status === 'pending') {
            return;
        }
        // Bloquea scripts no esenciales hasta que exista consentimiento.
        document.querySelectorAll('script[data-cookie-category]').forEach((script) => {
            const category = script.dataset.cookieCategory;
            if (!consent.categories[category]) {
                return;
            }
            if (script.type !== 'text/plain') {
                return;
            }

            const newScript = document.createElement('script');
            Array.from(script.attributes).forEach((attr) => {
                if (attr.name === 'type' || attr.name === 'data-cookie-category') {
                    return;
                }
                newScript.setAttribute(attr.name, attr.value);
            });
            newScript.text = script.textContent;
            script.parentNode.replaceChild(newScript, script);
        });
    }
}

new CookieConsentManager();

// ===== Animación de entrada del hero =====
// Asegura que el hero aparezca de forma suave al cargar la página.
window.addEventListener('load', () => {
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.opacity = '1';
    }
});
