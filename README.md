# RETROTERM.AI

Proyecto web desarrollado para la asignatura de Desarrollo Web en el ciclo ASIR (Administración de Sistemas Informáticos en Red) del CDM FP, curso 2025/26.

La idea surgió de querer hacer algo diferente al típico portfolio. Me gustan las interfaces antiguas de terminal y quise combinar esa estética con lo que íbamos aprendiendo en clase.

---

## ¿Qué es?

Una plataforma web con estética de terminal retro que funciona como HUB central con varias secciones:

- **Modo Desarrollo** — editor de código integrado (HTML, CSS y JS con preview en tiempo real)
- **Asistente IA** — chat conversacional con inteligencia artificial (ARIA)
- **Gaming** — sección personal de 43 videojuegos con fichas, trailers y sistema de valoraciones
- **DeFi** — terminal de criptomonedas con datos en tiempo real desde CoinGecko
- **Artículos** — publicaciones técnicas sobre Linux, redes, SQL, hardware, SEO y el propio proyecto
- **Red de Proyectos** — enlaces a los proyectos de compañeros de clase
- **Portal** — acceso interno con navegación SILO de cuatro niveles
- **Turco Mecánico** — tablero de ajedrez interactivo con navegación ARIA completa

---

## Tecnologías usadas

- HTML5 semántico
- CSS3 (Flexbox, animaciones, media queries, `prefers-reduced-motion`, `forced-colors`)
- JavaScript vanilla (sin frameworks)
- API pública de CoinGecko
- Cloudflare Workers (intermediario para el asistente IA)
- GitHub Pages (hosting)
- Google Search Console (indexación y seguimiento)
- Schema.org JSON-LD (datos estructurados)

---

## Accesibilidad

La web cumple las **Directrices de Accesibilidad para el Contenido Web (WCAG) 2.1 nivel AA**, verificado con Google Lighthouse, WAVE, axe DevTools y WebAIM Contrast Checker.

Las correcciones de accesibilidad están centralizadas en dos archivos dedicados:

- **`accesibilidad.css`** — foco visible, skip link, contraste mínimo, tamaño de toque (44×44px), movimiento reducido y modo alto contraste de Windows.
- **`accesibilidad.js`** — correcciones en tiempo de ejecución: inyección de landmarks `<main>`, sincronización de `aria-expanded` en el menú hamburguesa, exclusión de canvas decorativos del árbol de accesibilidad, etiquetado automático de inputs sin label y actualización de `alt` en imágenes dinámicas.

Resultados destacados:

| Página | Lighthouse Accesibilidad |
|--------|--------------------------|
| index.html | 100 / 100 |
| articulos.html | 100 / 100 |
| editor.html | 100 / 100 |
| portal.html | 98 / 100 |
| defi.html | 97 / 100 |
| turco.html | 97 / 100 |
| index.html (móvil) | 97 / 100 |
| gaming.html | 96 / 100 |

Ratio de contraste del color principal (#00FF66 sobre #000000): **15.31:1** — supera el nivel AAA.

---

## Estructura de archivos

```
/
├── index.html                        → HUB principal
├── portal.html                       → Portal interno (SILO propio)
├── articulos.html                    → Listado de artículos
├── articulo-retroterm.html           → Artículo: sobre el proyecto
├── articulo-linux.html               → Artículo: comandos Linux
├── articulo-seo.html                 → Artículo: SEO técnico
├── articulo-redes.html               → Artículo: subnetting y redes
├── articulo-hardware.html            → Artículo: hardware y virtualización
├── articulo-sql.html                 → Artículo: guía de SQL
├── articulo-sql-ejercicios.html      → Artículo: ejercicios de SQL
├── articulo-sql-plantillas.html      → Artículo: plantillas de SQL
├── gaming.html                       → Sección gaming (43 títulos)
├── gaming-ficha.html                 → Ficha individual de juego
├── defi.html                         → Terminal DeFi
├── red.html                          → Red de proyectos
├── editor.html                       → Editor de código CODE_CRT
├── asistente.html                    → Asistente IA (ARIA)
├── turco.html                        → Turco Mecánico (ajedrez)
├── estilos.css                       → Hoja de estilos principal
├── accesibilidad.css                 → Estilos de accesibilidad WCAG AA
├── accesibilidad.js                  → Correcciones ARIA en tiempo de ejecución
├── editor.css                        → Estilos del editor
├── sitemap.xml                       → Mapa del sitio
├── robots.txt                        → Instrucciones para buscadores
└── /Imagenes/                        → Recursos visuales
```

---

## Futuras mejoras

- Backend real con base de datos para artículos y usuarios
- Sistema de perfiles para la red de proyectos
- Modo claro alternativo para usuarios con baja visión
- Mejora del soporte de NVDA en la sección de noticias de defi.html
- Panel descriptivo de posición en turco.html para usuarios de lector de pantalla

---

## Autor

**Iván Brihuega Crespo**  
1º ASIR — CDM FP 2025/26  
[ivanchux.github.io](https://ivanchux.github.io)
