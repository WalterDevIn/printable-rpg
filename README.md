# Printable RPG

Editor visual para componer hojas imprimibles de rol sobre un lienzo A4.

## Estado actual

La app es frontend puro: HTML, CSS y JavaScript ESM. No requiere build ni dependencias.

## Uso

Abrí `index.html` en el navegador.

## Funciones incluidas

- Lienzo A4 vertical.
- Grilla visual de 5 mm × 5 mm, activable y desactivable desde la barra superior.
- Bloques posicionables y dimensionables con snap a 5 mm.
- Líneas divisorias con snap fino de 2.5 mm para ubicarlas entre grillas.
- Menú lateral tipo explorador con todos los elementos de la hoja.
- Inspector para editar nombre, posición, tamaño, texto, color y propiedades específicas.
- Elementos disponibles:
  - Texto centrado: texto centrado horizontal y verticalmente dentro de una caja.
  - Texto común: texto con línea de 5 mm y quiebre automático según el ancho.
  - Línea divisoria: horizontal o vertical.
  - Cuadrado: caja vacía o con texto, con color de texto/borde configurable.
  - Cuadrado con grilla: grilla imprimible con color configurable y borde opcional.
- Duplicar, eliminar, limpiar hoja y zoom.
- Estilos de impresión A4; la grilla visual del lienzo no se imprime, pero el cuadrado con grilla sí.
