# Requirements — Catálogo Interactivo de Vinos

## Contexto
Marso Distribuciones necesita un catálogo de vinos interactivo que oriente al cliente por **ocasión o uso**, en lugar de una lista estática de productos. El objetivo es que el cliente encuentre el vino adecuado para su situación concreta y genere una solicitud de pedido.

---

## Fase 1 — Portafolio Comercial Visual (en desarrollo)

### Funcionalidades requeridas

| ID | Requisito | Prioridad |
|----|-----------|-----------|
| F1-01 | Página standalone `catalogo-vinos.html` accessible desde la landing principal | Alta |
| F1-02 | Navegación por ocasión: 7 categorías + vista "Todos" | Alta |
| F1-03 | Carrusel con 14 vinos representativos del portafolio Marso | Alta |
| F1-04 | CTA por vino: abre WhatsApp con mensaje prefill (nombre + D.O. del vino) | Alta |
| F1-05 | Responsive: 3 tarjetas en escritorio, 2 en tablet, 1 en móvil | Alta |
| F1-06 | Navegación por teclado (flechas) y swipe táctil | Media |
| F1-07 | Dots de paginación sincronizados | Media |
| F1-08 | Navbar opaca desde la carga (sin fase transparente) | Alta |
| F1-09 | Reutiliza estilos y componentes del sitio principal | Alta |
| F1-10 | Banner de cookies RGPD consistente con el resto del sitio | Alta |

### Ocasiones (7 categorías)

| ID | Etiqueta | Descripción |
|----|----------|-------------|
| `aperitivo` | Aperitivo | Vinos ligeros para antes de comer |
| `cena-romantica` | Cena Romántica | Vinos elegantes para momentos especiales |
| `celebracion` | Celebración | Espumosos y vinos de fiesta |
| `maridaje-carnes` | Maridaje Carnes | Tintos potentes para carne roja |
| `maridaje-pescado` | Maridaje Pescado | Blancos y rosados para pescado/marisco |
| `sobremesa` | Sobremesa & Postres | Vinos dulces y digestivos |
| `regalo` | Regalo | Selecciones premium para regalar |

### Catálogo de vinos (14 referencias)

| ID | Nombre | D.O. | Tipo | Ocasiones |
|----|--------|------|------|-----------|
| 1 | Protos Reserva | Ribera del Duero | Tinto | cena-romantica, maridaje-carnes, regalo |
| 2 | Marqués de Riscal Reserva | Rioja | Tinto | celebracion, maridaje-carnes, regalo |
| 3 | Albariño Martín Códax | Rías Baixas | Blanco | aperitivo, maridaje-pescado |
| 4 | Tío Pepe Fino | Montilla-Moriles | Blanco | aperitivo, maridaje-pescado |
| 5 | Freixenet Cordon Negro | Cava | Espumoso | celebracion, aperitivo, regalo |
| 6 | Vegamar Verdejo | Rueda | Blanco | aperitivo, maridaje-pescado, sobremesa |
| 7 | Osborne Solaz Rosado | Castilla | Rosado | aperitivo, cena-romantica, maridaje-pescado |
| 8 | Pago de los Capellanes | Ribera del Duero | Tinto | maridaje-carnes, sobremesa |
| 9 | González Byass Nectar | Jerez | Blanco | sobremesa, regalo |
| 10 | Cava Anna de Codorníu | Cava | Espumoso | celebracion, cena-romantica, regalo |
| 11 | Rioja Vega Crianza | Rioja | Tinto | maridaje-carnes, cena-romantica |
| 12 | Príncipe de Viana Chardonnay | Navarra | Blanco | maridaje-pescado, cena-romantica, sobremesa |
| 13 | Estuche Selección Marso | Multi-D.O. | Tinto | regalo, celebracion |
| 14 | Moriles-Montilla Superior | Montilla-Moriles | Blanco | aperitivo, maridaje-pescado, sobremesa |

### Métricas de éxito (Fase 1)
- Tasa de click en CTA "Solicitar por WhatsApp" por tarjeta
- Ocasión más consultada
- Tiempo medio en la página

---

## Fase 2 — Analytics (roadmap)

| ID | Requisito |
|----|-----------|
| F2-01 | Tracking de click por vino y por ocasión (evento GA4 o equivalente) |
| F2-02 | Datos de recorrido del usuario (tab → tarjeta → CTA) |
| F2-03 | Dashboard interno: vinos más solicitados, ocasión top, conversión WhatsApp |

---

## Restricciones técnicas
- Sin dependencias de terceros (no jQuery, no frameworks JS)
- Sin imágenes nuevas — las tarjetas usan degradados CSS + emoji
- Reutiliza `styles.css` (variables, componentes existentes)
- Compatible con los navegadores modernos (últimas 2 versiones)
