Actúa como un desarrollador experto. Tengo un archivo `AGENTS.md` que dicta el diseño visual (UI/CSS), pero necesito que programes toda la lógica de negocio (JavaScript) y la estructura del DOM en base a las siguientes especificaciones y DATA ESTÁTICA que debe ir incrustada en el código.

### 1. DATA INICIAL (Inyectar en el código como estado base o JSON)
Debes crear un estado global en JS (`localStorage`) que contenga exactamente estos cursos, links y estimaciones de Pomodoros. Si el localStorage está vacío, usa esto por defecto:

**Ruta IA Engineer (Array de objetos):**
1. id: "mod1", titulo: "Módulo 1: Python y RAG", meta: "Endpoint FastAPI + ChromaDB", estimado_pomodoros: 12, completados: 0, links: ["https://softtek.udemy.com/course/fastapi-the-complete-course/", "https://softtek.udemy.com/course/basic-to-advanced-retreival-augmented-generation-rag-course/"]
2. id: "mod2", titulo: "Módulo 2: Tool Calling y Agentes", meta: "LLM devuelve JSON para funciones locales", estimado_pomodoros: 16, completados: 0, links: ["https://softtek.udemy.com/course/rag-agents-build-apps-gpts-with-apismcp-langchain-n8n/"]
3. id: "mod3", titulo: "Módulo 3: MCP y Servidores Locales", meta: "Servidor MCP local para BD", estimado_pomodoros: 10, completados: 0, links: ["https://softtek.udemy.com/course/model-context-protocol/"]
4. id: "mod4", titulo: "Módulo 4: Orquestación Multi-Agente", meta: "Grafo cíclico con LangGraph", estimado_pomodoros: 10, completados: 0, links: ["https://softtek.udemy.com/course/complete-agentic-ai-bootcamp-with-langgraph-and-langchain/"]
5. id: "mod5", titulo: "Módulo 5: Fine-Tuning y Modelos Locales", meta: "Entrenar modelo LoRA con GPU local", estimado_pomodoros: 14, completados: 0, links: ["https://softtek.udemy.com/course/fine-tuning-llm-with-hugging-face-transformers/"]
6. id: "mod6", titulo: "Módulo 6: LLMOps y Despliegue", meta: "API en Docker y monitoreo", estimado_pomodoros: 16, completados: 0, links: ["https://softtek.udemy.com/course/machine-learning-deep-learning-model-deployment/", "https://softtek.udemy.com/course/mastering-mlops-from-model-development-to-deployment/"]

**Ruta Inglés (Array de objetos):**
1. id: "eng1", titulo: "EF Corporate - Nivel 5", meta: "Unidad 2: Tomar decisiones", estimado_pomodoros: 20, completados: 0, links: []

### 2. COMPONENTE: Motor Pomodoro (Focus Engine)
- Menú Select: Debe iterar sobre la data anterior y mostrar solo los cursos/módulos que NO estén al 100% (completados < estimados). El usuario DEBE elegir uno antes de dar "Play". Si intenta dar Play sin elegir, lanza alerta de error.
- Temporizador: Dos modos -> "Trabajo" (25 min) y "Pausa" (5 min). Botones de Iniciar, Pausar y Reiniciar.
- Evento On-Complete (Lógica core): Cuando "Trabajo" llegue a 00:00, el sistema debe automáticamente:
  1. Sumar +1 aritméticamente al objeto seleccionado en la base de datos.
  2. Guardar en `localStorage`.
  3. Re-renderizar las barras de progreso.
  4. Pasar a modo "Pausa".

### 3. COMPONENTE: Tracker de Progreso
- Recorre los arreglos de IA e Inglés y pinta "Tarjetas de Curso".
- Cada tarjeta debe mostrar el título, la meta, y enlaces clickeables a Udemy (`target="_blank"`).
- Calcula el progreso matemático: `(completados / estimados) * 100`. Construye una barra visual (div dentro de un div) que se llene dinámicamente con ese porcentaje.
- Muestra el texto: "X / Y Pomodoros completados".

### 4. COMPONENTE: Integración Gemini (Modal Tech Lead)
- Lógica: Justo después de sumar un Pomodoro (+1), el código debe validar: `if (modulo_seleccionado.completados >= modulo_seleccionado.estimado_pomodoros)`.
- Gatillo: Si es verdadero, el reloj se detiene y aparece un Modal superpuesto (Overlay) que cubre el 100% de la pantalla.
- Contenido del Modal: "✨ TECH LEAD GEMINI INFORMA: Has completado todas las horas de vuelo para [Nombre_del_Modulo]. Cierra esto, ve al chat de Gemini, y escribe el comando 'Terminé' para recibir tu reto de código y cuestionario técnico."
- El botón de cierre del modal debe devolver al usuario al dashboard, pero ese curso ya no debe ser seleccionable en el temporizador.

### 5. COMPONENTE: Botón Anti-Distracción
- Crea un botón visual al final de la página que diga "Añadir Nueva Especialización".
- Estado: Debe estar permanentemente desactivado (`disabled` visualmente o controlado por JS).
- Comportamiento: Al hacer clic, lanza un Modal o Alerta que diga: "⛔ ACCESO DENEGADO POR EL TECH LEAD: Tienes rutas críticas en progreso. Debes llegar al 100% en la Ruta de IA Engineer y finalizar EF Corporate Nivel 5 antes de diversificar tu aprendizaje."

Aplica el diseño de `design.md` a esta lógica. Escribe el HTML,CSS y JS necesario para que funcione perfectamente como una SPA (Single Page Application) sin recargar la página.


AMBAS RUTAS DEBEN ESTAR POR SEPARAADSA,
AL ENTRAR LO INICIAL DEBE SER UN RESUMEN POR RUTA, Y DEBE DEJARME SELECCIONAR UNA RUT AY ENTRAR A VER EN QUE VOY DE APRENDIZAJE, TMB EN DONDE ESTA ESTA SELECCION DE RUTA DEBE ETSAR EL BOTON DE AGREGAR RUTA CON UN BLOQEO DE PROXIMAMENTE, LAS RUTAS DEBEN TENER LOS MODULOS CON SUS VIDEOS, ETC. 