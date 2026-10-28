# SART STUDIOS

Portada del ecosistema SART y acceso a sus productos. Actualmente, **SART
Aprende** es el único producto disponible; SART Comida, SART Finanzas y SART
Transcrip se muestran como próximamente.

## Iniciar el proyecto en Windows

Abre `Iniciar SART Studios.bat` desde el Explorador de archivos. El lanzador:

1. Inicia la web principal en <http://127.0.0.1:3000>.
2. Inicia SART Aprende en <http://127.0.0.1:3001>.
3. Espera a que ambos servidores respondan y abre la portada en el navegador.

Se requiere Node.js y npm. Si las dependencias de Next.js todavía no están
instaladas, el lanzador ejecuta `npm install` en `sart-main` antes de iniciar la
web. Mantén abiertas las ventanas de servidor mientras uses los productos;
ciérralas para detenerlos.

El lanzador no inicia SART Comida, SART Finanzas ni SART Transcrip, porque esos
productos todavía no están disponibles.

## Estructura

- `sart-main/`: portada del ecosistema SART (Next.js).
- `sart-aprende/`: producto disponible, servido con Node.js.
- `sart-comida/`, `sart-finanzas/`, `sart-transcrip/`: productos en desarrollo.
- `design-system/`: sistema visual de SART STUDIOS.
# SART-studios
