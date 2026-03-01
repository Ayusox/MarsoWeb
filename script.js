// ===== MARSO DISTRIBUCIONES - JAVASCRIPT =====
// Este archivo controla los pequeños efectos y la interacción de la web.

// ===== Animaciones al hacer scroll (AOS) =====
// Activa las animaciones de entrada cuando el usuario baja por la página.
if (window.AOS) {
    AOS.init({
        duration: 800, // Duración de la animación (ms)
        easing: 'ease-out-cubic', // Tipo de movimiento
        once: true, // Solo anima una vez
        offset: 100 // Distancia antes de activar la animación
    });
}

// ===== Barra de navegación al hacer scroll =====
// Añade un fondo a la navbar cuando se baja un poco.
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
        // Cambia el fondo de la navbar al hacer scroll
        if (navbar) {
            if (window.scrollY > 100) {
                // Agrega la clase 'scrolled' cuando se desplaza más de 100px
                navbar.classList.add('scrolled');
            } else {
                // Elimina la clase cuando se vuelve a la parte superior
                navbar.classList.remove('scrolled');
            }
        }

        // Marca el enlace activo según la sección visible
        // Recorre todas las secciones de la página que tengan un atributo id
        let current = '';
        const sections = document.querySelectorAll('section[id]');
        // Determina cuál es la sección actual basándose en la posición del scroll
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            // Detecta la sección 200px antes de que llegue al inicio de la ventana
            if (scrollY >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        // Actualiza los enlaces de navegación para marcar el activo
        navLinks.forEach(link => {
            link.classList.remove('active');
            // Compara el href del enlace con el id de la sección actual
            // slice(1) elimina el '#' del principio del href
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
});

// ===== Menú móvil =====
// Abre y cierra el menú cuando se pulsa el botón hamburguesa.
const menuToggle = document.getElementById('menuToggle');
const navLinksContainer = document.getElementById('navLinks');

// Agrega funcionalidad al botón hamburguesa si ambos elementos existen
if (menuToggle && navLinksContainer) {
    menuToggle.addEventListener('click', () => {
        // Toggle activa/desactiva la clase 'active' alternadamente
        menuToggle.classList.toggle('active');
        navLinksContainer.classList.toggle('active');
    });
}

// Cierra el menú móvil al pulsar un enlace (mejora UX en móviles)
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        // Cuando el usuario hace clic en un enlace, cierra el menú automáticamente
        if (menuToggle && navLinksContainer) {
            menuToggle.classList.remove('active');
            navLinksContainer.classList.remove('active');
        }
    });
});

// Cierra el menú si se cambia a escritorio (responsive)
window.addEventListener('resize', () => {
    // Si la ventana se agranda a más de 768px (escritorio), elimina las clases del menú móvil
    if (window.innerWidth > 768 && menuToggle && navLinksContainer) {
        menuToggle.classList.remove('active');
        navLinksContainer.classList.remove('active');
    }
});

// ===== Scroll suave =====
// Hace que los enlaces internos se desplacen con suavidad.
// Selecciona todos los enlaces que apunten a un ID (href comienza con #)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        // Previene el salto instantáneo predeterminado del navegador
        e.preventDefault();
        // Obtiene el elemento destino usando el href del enlace
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            // Calcula la posición, restando 80px para que no quede debajo de la navbar fija
            const offsetTop = target.offsetTop - 80;
            // Realiza el scroll suave hacia la posición calculada
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ===== Botón de llamada =====
// Aparece cuando el usuario baja del hero (sección principal).
const callButton = document.getElementById('callButton');
const heroSection = document.querySelector('.hero');

window.addEventListener('scroll', () => {
    // Solo ejecuta si el botón y el hero existen en la página
    if (callButton && heroSection) {
        // Obtiene la altura total del hero
        const heroHeight = heroSection.offsetHeight;
        // Muestra el botón cuando se ha pasado casi toda la altura del hero
        if (window.scrollY > heroHeight - 100) {
            callButton.classList.add('visible');
        } else {
            callButton.classList.remove('visible');
        }
    }
});

// ===== Formulario de contacto =====
// Gestiona el envío del formulario (actualmente sin backend, solo confirmación al usuario)
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        // Previene que el navegador intente enviar el formulario de forma tradicional
        e.preventDefault();

        // Recoge los datos del formulario (estructura lista para envío futuro a servidor)
        const formData = {
            nombre: document.getElementById('nombre').value,
            email: document.getElementById('email').value,
            telefono: document.getElementById('telefono').value,
            mensaje: document.getElementById('mensaje').value
        };

        // Muestra un mensaje de agradecimiento al usuario
        alert('¡Gracias por contactarnos! Te responderemos lo antes posible.');

        // Limpia todos los campos del formulario
        contactForm.reset();

        // Aquí iría la lógica para enviar los datos a un servidor (ej: fetch)
        // fetch('/api/contact', { method: 'POST', body: JSON.stringify(formData) })
    });
}

// ===== Tarjetas del catálogo =====
// Detecta los clics en las tarjetas de productos (actualmente log en consola, ampliable)
const catalogCards = document.querySelectorAll('.catalog-card');

catalogCards.forEach(card => {
    card.addEventListener('click', function() {
        // Obtiene el nombre del producto de la tarjeta clickeada
        const title = this.querySelector('.catalog-title').textContent;
        // Registra el clic en la consola (útil para debugging)
        console.log(`Clicked on: ${title}`);
        // Aquí se podría añadir lógica: abrir modal, navegar a producto, etc.
    });
});

// ===== Carga diferida de imágenes (lazy loading) =====
// Carga las imágenes solo cuando aparecen en la pantalla (mejora rendimiento)
if ('IntersectionObserver' in window) {
    // Crea un observador que detecta cuándo una imagen entra en el viewport
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            // Si la imagen está visible en pantalla
            if (entry.isIntersecting) {
                const img = entry.target;
                // Establece la fuente real (data-src) en lugar del placeholder
                img.src = img.dataset.src || img.src;
                // Agrega clase para animaciones de carga
                img.classList.add('loaded');
                // Deja de observar la imagen (ya está cargada)
                observer.unobserve(img);
            }
        });
    });

    // Observa todas las imágenes de la página
    document.querySelectorAll('img').forEach(img => imageObserver.observe(img));
}

// ===== Carga diferida de videos (lazy loading) =====
// Carga los videos solo cuando están cerca del viewport para mejorar el rendimiento inicial
// Usa IntersectionObserver para detectar cuándo los videos son visibles
if ('IntersectionObserver' in window) {
    const videoObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const video = entry.target;
            // Si el video entra en el área visible
            if (entry.isIntersecting) {
                // Cuando el video es visible, cargarlo y reproducirlo
                // readyState === 0 significa que no ha comenzado la carga
                if (video.readyState === 0) {
                    // Establece precarga automática para cargar el video progresivamente
                    video.preload = 'auto';
                    // Inicia la carga del video
                    video.load();
                }
                
                // Establece atributos necesarios para reproducción en iOS
                // iOS requiere estos atributos específicos para permitir reproducción automática
                video.setAttribute('autoplay', '');
                video.setAttribute('muted', '');
                video.setAttribute('playsinline', ''); // Reproduce en pantalla completa en iOS
                // También asigna propiedades JS para mayor compatibilidad
                video.muted = true;
                video.playsInline = true;
                
                // Función para intentar reproducir el video con reintentos
                // Necesario para iOS que es más restrictivo con reproducción automática
                const attemptPlay = () => {
                    const playPromise = video.play();
                    // Comprueba si play() devuelve una Promise (navegadores modernos)
                    if (playPromise !== undefined) {
                        playPromise.then(() => {
                            // Video reproducido exitosamente
                        }).catch(() => {
                            // Si falla por restricciones del navegador, reintenta después de esperar
                            setTimeout(() => {
                                video.play().catch(() => {});
                            }, 100);
                        });
                    }
                };
                
                // Intenta reproducir inmediatamente cuando se detecta
                attemptPlay();
                
                // También intenta reproducir cuando el video tenga suficientes datos
                // loadeddata: primer fotograma disponible
                video.addEventListener('loadeddata', attemptPlay, { once: true });
                // canplay: suficientes datos para reproducción fluida
                video.addEventListener('canplay', attemptPlay, { once: true });
                
            } else {
                // Cuando el video sale del viewport, pausarlo para ahorrar datos y recursos
                video.pause();
                // Mantiene el video en memoria pero no consume ancho de banda
            }
        });
    }, {
        // rootMargin: carga el video 300px antes de que sea visible en pantalla
        // Esto da tiempo para que comience la descarga antes de que el usuario lo vea
        rootMargin: '300px',
        // threshold: detecta varios puntos de intersección
        // 0: cuando comienza a entrar, 0.25: cuando está 25% visible
        threshold: [0, 0.25]
    });

    // Selecciona todos los videos con clase 'lazy-video' e inicia su observación
    document.querySelectorAll('.lazy-video').forEach(video => {
        // Pre-configura atributos necesarios para reproducción automática
        // Esto asegura compatibilidad multiplataforma desde el inicio
        video.setAttribute('autoplay', '');
        video.setAttribute('muted', '');
        video.setAttribute('playsinline', '');
        // Establece también las propiedades JavaScript
        video.muted = true;
        video.playsInline = true;
        
        // Comienza a observar este video para detectar cuándo entra en viewport
        videoObserver.observe(video);
    });
}

// ===== Forzar reproducción al hacer scroll o tocar la pantalla (para iOS) =====
// iOS requiere interacción explícita del usuario para reproducción automática de videos
// Esta función se ejecuta con la primera interacción del usuario
const forceVideoPlayback = () => {
    // Recorre todos los videos y los reproduce si están pausados
    document.querySelectorAll('.lazy-video').forEach(video => {
        if (video.paused) {
            // Intenta reproducir el video (catch previene errores silenciosos)
            video.play().catch(() => {});
        }
    });
};

// Ejecuta la función de reproducción cuando el usuario interactúa por primera vez
// on touchstart: detecta toque en dispositivos móviles
document.addEventListener('touchstart', forceVideoPlayback, { once: true, passive: true });
// on scroll: detecta desplazamiento en cualquier dispositivo
document.addEventListener('scroll', forceVideoPlayback, { once: true, passive: true });

// ===== Aviso de cookies =====
// Gestion profesional del consentimiento RGPD/LSSI-CE con preferencias granulares.
// Clase que gestiona el consentimiento de cookies conforme a RGPD/LSSI-CE
// Implementa preferencias granulares: necesarias, analíticas y marketing
class CookieConsentManager {
    constructor() {
        // Configuración de la cookie de consentimiento
        this.cookieName = 'cookie_consent'; // Nombre identificador de la cookie
        this.cookieDays = 365; // Duración del consentimiento en días
        
        // Define las categorías de cookies con sus requisitos
        this.categories = {
            necessary: { required: true }, // Esenciales para funcionamiento
            analytics: { required: false }, // Para analítica del sitio
            marketing: { required: false } // Para publicidad dirigida
        };

        // Elementos del DOM para el banner de consentimiento
        this.banner = document.getElementById('cookieBanner');
        this.btnAccept = document.getElementById('cookieAccept');
        this.btnReject = document.getElementById('cookieReject');
        this.btnConfigure = document.getElementById('cookieConfigure');
        
        // Elementos para la interfaz de gestión de cookies
        this.settingsButton = document.getElementById('cookieSettings');
        this.modal = document.getElementById('cookieModal'); // Ventana modal de preferencias
        this.btnClose = document.getElementById('cookieClose');
        this.btnSave = document.getElementById('cookieSave');
        this.btnAcceptAll = document.getElementById('cookieAcceptAll');
        
        // Selectores para las preferencias de cookies (checkboxes)
        this.toggleAnalytics = document.getElementById('cookieAnalytics');
        this.toggleMarketing = document.getElementById('cookieMarketing');

        // Inicia la gestión de consentimiento
        this.init();
    }

    // Inicializa el gestor de consentimiento de cookies
    init() {
        // Verifica que todos los elementos del DOM existan
        if (!this.banner || !this.btnAccept || !this.btnReject || !this.btnConfigure || !this.modal || !this.btnSave) {
            return;
        }

        // Obtiene el consentimiento guardado del usuario (si existe)
        const consent = this.getConsent();
        
        // Determina qué hacer según el estado del consentimiento
        if (!consent) {
            // Si no hay consentimiento previo, establece pendiente y muestra banner
            this.setPendingConsent();
            this.showBannerWithDelay();
        } else if (consent.status === 'pending') {
            // Si el estado es pendiente, muestra el banner
            this.showBannerWithDelay();
        } else {
            // Si ya hay consentimiento, lo aplica y muestra el botón de configuración
            this.applyConsent(consent);
            this.showSettingsButton();
            this.syncToggles(consent);
        }

        // Asigna eventos click a los botones del banner
        this.btnAccept.addEventListener('click', () => this.acceptAll());
        this.btnReject.addEventListener('click', () => this.rejectAll());
        this.btnConfigure.addEventListener('click', () => this.openModal());
        this.btnSave.addEventListener('click', () => this.savePreferences());
        this.btnAcceptAll.addEventListener('click', () => this.acceptAll());

        // Botón flotante para abrir preferencias (mostrado después de aceptar)
        if (this.settingsButton) {
            this.settingsButton.addEventListener('click', () => this.openModal());
        }

        // Botón para cerrar el modal de preferencias
        if (this.btnClose) {
            this.btnClose.addEventListener('click', () => this.closeModal());
        }

        // Cierra el modal si se hace clic fuera del contenido (en el backdrop)
        this.modal.addEventListener('click', (event) => {
            if (event.target === this.modal) {
                this.closeModal();
            }
        });

        // Cierra el modal al pulsar la tecla Escape (accesibilidad)
        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape' && this.modal.classList.contains('open')) {
                this.closeModal();
            }
        });
    }

    // Obtiene el valor de una cookie por su nombre
    getCookie(name) {
        // Añade un punto y coma para facilitar el parseo
        const value = `; ${document.cookie}`;
        // Busca la cookie por su nombre
        const parts = value.split(`; ${name}=`);
        // Si la encontró, extrae el valor
        if (parts.length === 2) {
            return parts.pop().split(';').shift();
        }
        return '';
    }

    // Establece una cookie con nombre, valor y duración
    setCookie(name, value, days) {
        // Calcula la fecha de expiración
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000)); // Convierte días a milisegundos
        const expires = `expires=${date.toUTCString()}`;
        // Añade seguridad en conexiones HTTPS
        const secure = window.location.protocol === 'https:' ? '; Secure' : '';
        // Construye y guarda la cookie con atributos de seguridad
        document.cookie = `${name}=${value}; ${expires}; path=/; SameSite=Lax${secure}`;
    }

    // Obtiene el consentimiento guardado del usuario
    getConsent() {
        // Recupera la cookie encodada
        const raw = this.getCookie(this.cookieName);
        if (!raw) {
            return null;
        }
        try {
            // Decodifica y parsea el JSON
            return JSON.parse(decodeURIComponent(raw));
        } catch (error) {
            // Si hay error al parsear, devuelve null
            return null;
        }
    }

    // Crea un objeto de consentimiento con metadatos
    createConsent(status, categories) {
        return {
            version: 1, // Versión del formato de consentimiento
            date: new Date().toISOString(), // Fecha y hora actual
            status, // Estado: 'pending', 'accepted', 'rejected' o 'custom'
            categories // Objeto con las preferencias de cada categoría
        };
    }

    // Establece el consentimiento inicial como pendiente
    setPendingConsent() {
        // Crea consentimiento pendiente (usuario no ha decidido aún)
        const consent = this.createConsent('pending', {
            necessary: true, // Necesarias siempre activas
            analytics: false,
            marketing: false
        });
        // Codifica el JSON y lo guarda en cookie
        this.setCookie(this.cookieName, encodeURIComponent(JSON.stringify(consent)), this.cookieDays);
    }

    // Guarda el consentimiento del usuario en cookie y aplica los cambios
    saveConsent(status, categories) {
        // Crea el objeto de consentimiento con el estado y categorías
        const consent = this.createConsent(status, categories);
        // Guarda en cookies
        this.setCookie(this.cookieName, encodeURIComponent(JSON.stringify(consent)), this.cookieDays);
        // Aplica el consentimiento (habilita/deshabilita scripts)
        this.applyConsent(consent);
        // Actualiza la UI
        this.hideBanner();
        this.showSettingsButton();
        this.closeModal();
    }

    // Acepta todas las categorías de cookies
    acceptAll() {
        const categories = {
            necessary: true,
            analytics: true, // Habilita analítica
            marketing: true // Habilita marketing
        };
        this.saveConsent('accepted', categories);
    }

    // Rechaza todas las cookies excepto las necesarias (cumple RGPD)
    rejectAll() {
        const categories = {
            necessary: true, // Siempre necesario
            analytics: false, // Rechaza analítica
            marketing: false // Rechaza marketing
        };
        this.saveConsent('rejected', categories);
    }

    // Guarda preferencias personalizadas del usuario
    savePreferences() {
        // Lee el estado de los toggles (checkboxes)
        const categories = {
            necessary: true, // Siempre activo
            // !! convierte el valor a booleano (true/false)
            analytics: !!(this.toggleAnalytics && this.toggleAnalytics.checked),
            marketing: !!(this.toggleMarketing && this.toggleMarketing.checked)
        };
        this.saveConsent('custom', categories);
    }

    // Muestra el banner de consentimiento añadiendo clase CSS
    showBanner() {
        this.banner.classList.add('visible');
    }

    // Muestra el banner con un retraso de 5 segundos (permite que cargue todo)
    showBannerWithDelay() {
        setTimeout(() => {
            this.showBanner();
        }, 5000); // 5 segundos
    }

    // Oculta el banner eliminando la clase visible
    hideBanner() {
        this.banner.classList.remove('visible');
    }

    // Muestra el botón flotante de configuración de cookies
    showSettingsButton() {
        if (this.settingsButton) {
            this.settingsButton.classList.add('visible');
        }
    }

    // Abre el modal de preferencias de cookies
    openModal() {
        this.modal.classList.add('open');
        // aria-hidden: atributo de accesibilidad para lectores de pantalla
        this.modal.setAttribute('aria-hidden', 'false');
        // Obtiene el consentimiento actual y sincroniza los toggles
        const consent = this.getConsent();
        this.syncToggles(consent || { categories: { analytics: false, marketing: false } });
    }

    // Cierra el modal de preferencias
    closeModal() {
        this.modal.classList.remove('open');
        // Marca el modal como oculto para lectores de pantalla
        this.modal.setAttribute('aria-hidden', 'true');
    }

    // Sincroniza los checkboxes del modal con las preferencias guardadas
    syncToggles(consent) {
        // Actualiza el toggle de analítica
        if (this.toggleAnalytics && consent && consent.categories) {
            // !! asegura que sea verdadero/falso
            this.toggleAnalytics.checked = !!consent.categories.analytics;
        }
        // Actualiza el toggle de marketing
        if (this.toggleMarketing && consent && consent.categories) {
            this.toggleMarketing.checked = !!consent.categories.marketing;
        }
    }

    // Aplica el consentimiento activando scripts permitidos
    applyConsent(consent) {
        // Si no hay consentimiento o está pendiente, no ejecuta nada
        if (!consent || consent.status === 'pending') {
            return;
        }
        // Busca scripts bloqueados por consentimiento (data-cookie-category)
        // Estos scripts están inicialmente deshabilitados como type="text/plain"
        document.querySelectorAll('script[data-cookie-category]').forEach((script) => {
            // Obtiene la categoría del script (ej: 'analytics', 'marketing')
            const category = script.dataset.cookieCategory;
            // Si el usuario no consintió esta categoría, salta el script
            if (!consent.categories[category]) {
                return;
            }
            // Si el script ya es de tipo script (no bloqueado), salta
            if (script.type !== 'text/plain') {
                return;
            }

            // Crea un nuevo script ejecutable
            const newScript = document.createElement('script');
            // Copia todos los atributos excepto type y data-cookie-category
            Array.from(script.attributes).forEach((attr) => {
                if (attr.name === 'type' || attr.name === 'data-cookie-category') {
                    return; // Omite estos atributos
                }
                newScript.setAttribute(attr.name, attr.value);
            });
            // Copia el contenido del script
            newScript.text = script.textContent;
            // Reemplaza el script original (tipo text/plain) por el ejecutable
            script.parentNode.replaceChild(newScript, script);
        });
    }
}

// Instancia el gestor de consentimiento al cargar la página
new CookieConsentManager();

// ===== Animación de entrada del hero =====
// Asegura que el hero aparezca de forma suave al cargar la página
window.addEventListener('load', () => {
    // Espera a que todos los recursos (imágenes, etc.) estén cargados
    const hero = document.querySelector('.hero');
    if (hero) {
        // Establece la opacidad a 1 para mostrar el hero (transición suave en CSS)
        hero.style.opacity = '1';
    }
});
