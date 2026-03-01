# Marso Distribuciones

Landing page corporativa para **Marso Distribuciones**, distribuidor mayorista de bebidas en Hinojosa del Duque (Cordoba). El sitio esta construido con HTML5, CSS3 y JavaScript vanilla, con enfoque en diseno premium, rendimiento y experiencia de usuario.

## Que incluye la web
- Secciones completas: Hero, Catalogo, Como funciona, Sobre nosotros, Encuentranos, Contacto y footer.
- Catalogo con videos de productos en bucle y boton de "Ver Catalogo".
- Bloque "Compromiso" con video de fondo y poster para carga rapida.
- Banner y modal de cookies con preferencias granulares (RGPD/LSSI-CE).
- Navegacion responsive con menu hamburguesa.
- Animaciones suaves con AOS.
- Carrusel infinito de marcas en el footer.
- Meta tags para compartir en redes (Open Graph y Twitter Card).

## Rendimiento y carga rapida
- Imagen del hero en JPG ligero para evitar cargas progresivas visibles.
- Preload de recursos criticos (logo, fondo del hero, marcas, poster de Compromiso).
- Lazy loading de videos con IntersectionObserver.
- Posters estaticos para los videos del catalogo y Compromiso.
- Videos optimizados para iniciar mas rapido.

## Tecnologias
- HTML5
- CSS3 (Flexbox, Grid, variables CSS)
- JavaScript (Vanilla)
- AOS (animaciones)

## Estructura del proyecto
```
MarsoWeb/
├── index.html
├── styles.css
├── script.js
├── images/
│   ├── logo_marso_invert_transparent.png
│   ├── logo_redesSociales.jpg
│   ├── logo_redesSociales_og.jpg
│   ├── brands-white.png
│   ├── frame_video.jpg
│   ├── Contacta.jpg
│   ├── Contacta2.jpg
│   ├── Compromiso.mp4
│   ├── Compromiso-poster.jpg
│   └── catalogo/
│       ├── Cerveza.mp4
│       ├── Vino.mp4
│       ├── Refresco.mp4
│       ├── Agua.mp4
│       ├── Cerveza-poster.jpg
│       ├── Vino-poster.jpg
│       ├── Refresco-poster.jpg
│       └── Agua-poster.jpg
```

## Uso
Abre `index.html` en tu navegador o sirve el proyecto con un servidor local.

## Personalizacion rapida
- Cambia imagenes y videos en `images/` e `images/catalogo/`.
- Ajusta colores, espaciados y tipografias en `styles.css`.
- Modifica textos y enlaces en `index.html`.

## Notas
- El formulario actualmente muestra un mensaje de confirmacion y no envia datos a un servidor.
- El numero de WhatsApp es un placeholder y debe reemplazarse.

---

© 2026 Marso Distribuciones. Todos los derechos reservados.
