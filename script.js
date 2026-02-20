// ===== BEBIDAS GERMÁN - JAVASCRIPT =====
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
// El botón de llamada está siempre visible en la esquina inferior derecha.
// No requiere JavaScript adicional ya que funciona como enlace directo.

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
                    video.preload = 'metadata';
                    video.load();
                }
                // Reproducir solo cuando sea completamente visible
                const playPromise = video.play();
                if (playPromise !== undefined) {
                    playPromise.catch(() => {
                        // Silenciar errores de autoplay
                    });
                }
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
        videoObserver.observe(video);
    });
}

// ===== Animación de entrada del hero =====
// Asegura que el hero aparezca de forma suave al cargar la página.
window.addEventListener('load', () => {
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.opacity = '1';
    }
});
