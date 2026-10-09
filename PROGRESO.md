# Cao Cao Cocina · estado del proyecto
## Estructura
- `index.html`: inicio (hero oscuro con marca "CAO CAO / cocina"), sección de menú, galería, reseñas + formulario, visítanos.
- `menu.html`: el PDF original mostrado página por página (`images/menu/p-01..16.jpg`) sobre fondo decorado, con chips para saltar de sección, zoom al tocar y botones para descargar/abrir `menu/menu-cao-cao.pdf`. Enlaces directos: `menu.html#tacos`, `#desayunos`, `#cafe`, etc.
- Menú de navegación: botón de tres rayas (hamburguesa) en todas las pantallas.
- `data/reviews.js`: reseñas base (3 de EJEMPLO). `data/archivo-menu-estructurado.json`: menú reconstruido en texto, ya no se usa.
- Para actualizar el menú: reemplazar el PDF y regenerar imágenes: `pdftoppm -jpeg -jpegopt quality=74 -scale-to-x 900 -scale-to-y -1 menu/menu-cao-cao.pdf images/menu/p` (si cambia el nº de páginas, ajustar `N` y `SEC` en `js/menu.js`).
## Correcciones recientes
- Ícono del logo recortado por transparencia real (antes tenía espacio sobrante y se veía descentrado).
- Chips del menú: salto controlado en `js/menu.js` (`goTo`). El bug venía de usar `scrollIntoView` en las pestañas, que cortaba el scroll suave. Probado con 5 saltos seguidos en 390 px y 1280 px.

- Luces animadas (dorada, verde y chile) restauradas en el hero (`.light` en `css/styles.css`).
- Favicon con el logo completo (`favicon.ico`, `images/favicon-*.png`, `apple-touch-icon.png`), generado del logo original sobre fondo negro.

## Reseñas y Google Maps
- Las reseñas del formulario se muestran en la página y se guardan solo en el navegador de quien escribe (localStorage).
- Google NO permite publicar reseñas desde un sitio externo. El botón "Copiar y abrir Google Maps" copia el texto y abre `search.google.com/local/writereview?placeid=ChIJ2ZNBfgxb04URwVCVzOPLg_w` (Place ID calculado desde la URL de Maps; probar el enlace una vez). La persona debe iniciar sesión en Google y pulsar Publicar.
## Probado (Chromium headless, 390 px y escritorio)
- Hamburguesa abre/cierra, menú con 16 páginas y 14 chips, salto por hash, sin scroll horizontal, formulario → caja de Google, sin errores JS.
## Pendiente
1. Reseñas reales (reemplazar las de ejemplo) y, si se quieren compartidas entre visitantes, una base de datos (Firebase/Supabase).
2. Fotos del local/ambiente (las actuales son de platillos, extraídas del PDF a baja resolución).
3. Publicar en el dominio caocaococina.com (hoy dice "Próximamente" en GoDaddy).
4. Carpeta `menu/`: el PDF pesa lo que pese el original; si es mucho, comprimirlo.
