# SART STUDIOS Learning Dashboard

SART - Aprende ayuda a organizar cursos y construir rutinas de aprendizaje en distintas áreas. Las sesiones Pomodoro y el seguimiento de rutas mantienen el avance; Gemini es opcional y solo potencia el chat de apoyo de la ruta IA Engineer.

## Iniciar la aplicación

Requiere Node.js 18 o posterior. Para usar el chat de apoyo de IA Engineer, configura una clave de Gemini API desde Google AI Studio. No la envíes por chat ni la guardes en el repositorio.

Desde PowerShell, en la carpeta del proyecto, puedes configurar la clave de forma oculta solo para la sesión actual e iniciar el servidor:

```powershell
$secureKey = Read-Host "Pega tu clave Gemini API (entrada oculta)" -AsSecureString
$env:GEMINI_API_KEY = [System.Net.NetworkCredential]::new("", $secureKey).Password
node .\server.js
```

Abre <http://127.0.0.1:3000>. Mantén esa ventana de PowerShell abierta mientras usas la app. Para detener el servidor, presiona `Ctrl+C`. La clave se utiliza solo en el servidor y no se envía al navegador. No la compartas por chat ni la guardes en `app.js`, en el HTML, en `README.md` ni en un archivo versionado.

Si omites `GEMINI_API_KEY`, la aplicación y las rutas siguen funcionando; el chat muestra cómo configurar Gemini y no enviará solicitudes a la API.

El servidor sirve los archivos estáticos del proyecto y expone `/api/chat` para enviar las conversaciones a Gemini. El progreso y la aprobación manual de módulos se guardan en el almacenamiento local del navegador.

## Abrir sin el IDE

Abre `Iniciar SART - Aprende.bat` desde el escritorio. El lanzador inicia el servidor local si todavía no está activo, espera a que responda y abre el dashboard en el navegador. La ventana del servidor debe permanecer abierta mientras usas la aplicación; ciérrala para detenerlo.

Si Gemini aún no está configurado, crea una clave en Google AI Studio y guárdala en Windows desde **Editar las variables de entorno de tu cuenta → Variables de usuario → Nueva**:

- Nombre: `GEMINI_API_KEY`
- Valor: tu clave API

Cierra y vuelve a abrir el `.bat` después de guardarla. Windows entrega esa variable al servidor, que la conserva en el lado servidor; el navegador nunca recibe la clave. Si otra instancia sin clave ya está abierta, el lanzador inicia la nueva en el siguiente puerto libre.

## Progreso y desbloqueos

- En IA Engineer se completa el objetivo de Pomodoros de un módulo, se realiza el reto técnico con Gemini y se marca la aprobación para desbloquear el siguiente.
- EF Corporate comienza en Nivel 5, Unidad 2, Lección 2. Completa las lecciones en orden; el examen final se habilita al terminar las 24 lecciones y el Nivel 6 se desbloquea con una puntuación registrada de 70% o más.
- Al desbloquear el Nivel 6, la app abre un diálogo para solicitar sus unidades y lecciones en el mismo formato.
- El proyecto final de IA está descrito en la ruta y enlaza la guía PDF adjunta.
