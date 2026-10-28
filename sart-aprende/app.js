"use strict";

const STORAGE_KEY = "sart-studios-learning-state";
const THEME_STORAGE_KEY = "sart-studios-theme";
const CHAT_STORAGE_KEY = "sart-studios-gemini-chat";
const WORK_SECONDS = 25 * 60;
const BREAK_SECONDS = 5 * 60;
const MAX_CHAT_MESSAGE_LENGTH = 3000;
const ROUTES = {
  aiEngineer: {
    title: "IA Engineer",
    label: "Ruta IA Engineer",
    description: "Construye una base sólida para diseñar, orquestar y desplegar soluciones con inteligencia artificial.",
    courseIds: ["mod1", "mod2", "mod3", "mod4", "mod5", "mod6"],
  },
  english: {
    title: "Inglés",
    label: "Ruta Inglés",
    description: "Avanza de forma constante en EF Corporate y fortalece tu comunicación profesional.",
    courseIds: ["eng1"],
  },
};

const DEFAULT_COURSES = {
  aiEngineer: [
    {
      id: "mod1",
      titulo: "Módulo 1: Python y RAG",
      meta: "Endpoint FastAPI + ChromaDB",
      estimado_pomodoros: 12,
      completados: 0,
      links: [
        "https://softtek.udemy.com/course/fastapi-the-complete-course/",
        "https://softtek.udemy.com/course/basic-to-advanced-retreival-augmented-generation-rag-course/",
      ],
    },
    {
      id: "mod2",
      titulo: "Módulo 2: Tool Calling y Agentes",
      meta: "LLM devuelve JSON para funciones locales",
      estimado_pomodoros: 16,
      completados: 0,
      links: [
        "https://softtek.udemy.com/course/rag-agents-build-apps-gpts-with-apismcp-langchain-n8n/",
      ],
    },
    {
      id: "mod3",
      titulo: "Módulo 3: MCP y Servidores Locales",
      meta: "Servidor MCP local para BD",
      estimado_pomodoros: 10,
      completados: 0,
      links: ["https://softtek.udemy.com/course/model-context-protocol/"],
    },
    {
      id: "mod4",
      titulo: "Módulo 4: Orquestación Multi-Agente",
      meta: "Grafo cíclico con LangGraph",
      estimado_pomodoros: 10,
      completados: 0,
      links: [
        "https://softtek.udemy.com/course/complete-agentic-ai-bootcamp-with-langgraph-and-langchain/",
      ],
    },
    {
      id: "mod5",
      titulo: "Módulo 5: Fine-Tuning y Modelos Locales",
      meta: "Entrenar modelo LoRA con GPU local",
      estimado_pomodoros: 14,
      completados: 0,
      links: ["https://softtek.udemy.com/course/fine-tuning-llm-with-hugging-face-transformers/"],
    },
    {
      id: "mod6",
      titulo: "Módulo 6: LLMOps y Proyecto Final",
      meta: "Equipo de Agentes de IA con Interfaz Propia",
      estimado_pomodoros: 16,
      completados: 0,
      links: [
        "https://softtek.udemy.com/course/machine-learning-deep-learning-model-deployment/",
        "https://softtek.udemy.com/course/mastering-mlops-from-model-development-to-deployment/",
      ],
      proyecto_final: true,
    },
  ],
  english: [
    {
      id: "eng1",
      titulo: "EF Corporate - Nivel 5",
      meta: "Unidad 2: Tomar decisiones",
      estimado_pomodoros: 20,
      completados: 0,
      links: [],
      level: 5,
      completedLessons: ["u1l1", "u1l2", "u1l3", "u1l4", "u2l1"],
      examScore: null,
      level6Unlocked: false,
      units: [
        {
          id: "u1",
          title: "Unidad 1 · Viajar",
          lessons: [
            "Hablando de arreglos de vuelos",
            "Documentar para tomar un vuelo",
            "Llegar al hotel",
            "Avisar a alguien de que has llegado",
          ],
        },
        {
          id: "u2",
          title: "Unidad 2 · Tomar decisiones",
          lessons: [
            "Comparar opciones",
            "Tomar decisiones",
            "Hablar de detalles",
            "Resumir decisiones",
          ],
        },
        {
          id: "u3",
          title: "Unidad 3 · Contar historias",
          lessons: [
            "Explicar cómo conociste a alguien",
            "Hablar sobre una relación",
            "Hablar sobre una buena experiencia",
            "Contar una historia sobre una mala experiencia",
          ],
        },
        {
          id: "u4",
          title: "Unidad 4 · Ir a un restaurante",
          lessons: [
            "Hacer una reservación de restaurante",
            "Llegar a un restaurante",
            "Ordenar comida en un restaurante",
            "Pedir y pagar la cuenta",
          ],
        },
        {
          id: "u5",
          title: "Unidad 5 · Películas",
          lessons: [
            "Hablar sobre una película que viste recientemente",
            "Describir tu película favorita",
            "Elegir una película para ver",
            "Escribir sobre una película",
          ],
        },
        {
          id: "u6",
          title: "Unidad 6 · Ropa y estilo",
          lessons: [
            "Comprar ropa",
            "Hablar de la ropa de la gente",
            "Discutir los requisitos al vestir",
            "Halagar a la gente por su ropa",
          ],
        },
      ],
    },
  ],
};

const app = document.querySelector("#app");
const modal = document.querySelector("#modal");
const modalTitle = document.querySelector("#modal-title");
const modalMessage = document.querySelector("#modal-message");
const toast = document.querySelector("#toast");

let learningState = loadLearningState();
let activeRouteId = null;
let selectedCourseId = "";
let timerMode = "work";
let remainingSeconds = WORK_SECONDS;
let timerInterval = null;
let modalCloseAction = null;
let previousFocus = null;
let toastTimeout = null;
let chatHistory = {};
let chatError = "";
let chatLoading = false;
let chatErrorRouteId = null;
let chatLoadingRouteId = null;
let geminiConfigured = false;
let activeTheme = loadTheme();

const ICONS = {
  book: '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2Z"></path><path d="M8 7h8M8 11h7"></path>',
  brain: '<path d="M12 18V5"></path><path d="M15 13a4.2 4.2 0 0 0 0-8 5 5 0 0 0-9.5 1.5 4 4 0 0 0 0 7.8A4.3 4.3 0 0 0 12 18"></path><path d="M12 8a3.5 3.5 0 0 1 3-3"></path><path d="M12 13a3.5 3.5 0 0 0-3-3"></path><path d="M12 18a4.3 4.3 0 0 0 6.5-3.7 4 4 0 0 0 0-7.8A5 5 0 0 0 9 5"></path>',
  check: '<path d="m5 12 4 4L19 6"></path>',
  lock: '<rect x="4" y="10" width="16" height="11" rx="2"></rect><path d="M8 10V7a4 4 0 0 1 8 0v3"></path>',
  message: '<path d="M21 11.5a8.4 8.4 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.4 8.4 0 0 1-3.8-.9L3 21l1.9-5.7a8.4 8.4 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.4 8.4 0 0 1 3.8-.9h.5a8.5 8.5 0 0 1 8 8v.5Z"></path>',
  moon: '<path d="M20.9 13A9 9 0 0 1 11 3.1 9 9 0 1 0 20.9 13Z"></path>',
  send: '<path d="m22 2-7 20-4-9-9-4Z"></path><path d="M22 2 11 13"></path>',
  sparkles: '<path d="m12 3 1.9 5.8L20 11l-6.1 2.2L12 19l-1.9-5.8L4 11l6.1-2.2L12 3Z"></path><path d="m19 16 .8 2.2L22 19l-2.2.8L19 22l-.8-2.2L16 19l2.2-.8L19 16Z"></path>',
  sun: '<circle cx="12" cy="12" r="4"></circle><path d="M12 2v2M12 20v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42"></path>',
};

function icon(name, className = "") {
  return `<svg class="${className}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[name]}</svg>`;
}

function cloneDefaults() {
  return JSON.parse(JSON.stringify(DEFAULT_COURSES));
}

function isValidState(value) {
  return Boolean(
    value &&
      value.routes &&
      ["aiEngineer", "english"].every(
        (routeId) =>
          Array.isArray(value.routes[routeId]) &&
          value.routes[routeId].length === DEFAULT_COURSES[routeId].length &&
          value.routes[routeId].every(
            (course) =>
              course &&
              typeof course.id === "string" &&
              typeof course.titulo === "string" &&
              typeof course.meta === "string" &&
              Number.isFinite(course.estimado_pomodoros) &&
              Number.isFinite(course.completados) &&
              Array.isArray(course.links),
          ),
      ),
  );
}

function loadLearningState() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      const initialState = { routes: cloneDefaults() };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(initialState));
      return initialState;
    }

    const parsed = JSON.parse(stored);
    if (!isValidState(parsed)) {
      throw new Error("Los datos guardados no tienen el formato esperado.");
    }
    const defaults = cloneDefaults();
    const routes = Object.fromEntries(
      Object.keys(defaults).map((routeId) => [
        routeId,
        defaults[routeId].map((defaultCourse) => {
          const savedCourse = parsed.routes[routeId].find((course) => course.id === defaultCourse.id);
          if (!savedCourse) {
            return defaultCourse;
          }
          const migratedCourse = {
            ...defaultCourse,
            ...savedCourse,
            approved: savedCourse.approved === true,
          };
          if (defaultCourse.id === "mod6") {
            migratedCourse.titulo = defaultCourse.titulo;
            migratedCourse.meta = defaultCourse.meta;
            migratedCourse.proyecto_final = true;
          }
          if (defaultCourse.id === "eng1") {
            migratedCourse.units = defaultCourse.units;
            migratedCourse.level = 5;
            migratedCourse.completedLessons = Array.isArray(savedCourse.completedLessons)
              ? savedCourse.completedLessons
              : defaultCourse.completedLessons;
            migratedCourse.examScore = Number.isFinite(savedCourse.examScore) ? savedCourse.examScore : null;
            migratedCourse.level6Unlocked = savedCourse.level6Unlocked === true;
          }
          return migratedCourse;
        }),
      ]),
    );
    return { routes };
  } catch (error) {
    window.setTimeout(() => {
      showToast(`No se pudieron leer tus datos guardados. Se cargarán los valores iniciales. ${error.message}`);
    }, 0);
    return { routes: cloneDefaults() };
  }
}

function loadTheme() {
  try {
    return localStorage.getItem(THEME_STORAGE_KEY) === "dark" ? "dark" : "light";
  } catch {
    return "light";
  }
}

function loadChatHistory() {
  try {
    const stored = JSON.parse(localStorage.getItem(CHAT_STORAGE_KEY) || "{}");
    if (!stored || typeof stored !== "object" || Array.isArray(stored)) {
      return {};
    }
    return Object.fromEntries(
      Object.entries(stored)
        .filter(([routeId, messages]) => ROUTES[routeId] && Array.isArray(messages))
        .map(([routeId, messages]) => [
          routeId,
          messages.filter(
            (message) =>
              message &&
              ["user", "model"].includes(message.role) &&
              typeof message.text === "string",
          ).slice(-40),
        ]),
    );
  } catch {
    return {};
  }
}

function saveChatHistory() {
  try {
    localStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(chatHistory));
    return true;
  } catch (error) {
    showToast(`No se pudo guardar la conversación en este navegador. ${error.message}`);
    return false;
  }
}

function applyTheme() {
  document.documentElement.dataset.theme = activeTheme;
  document.querySelector('meta[name="theme-color"]').content =
    activeTheme === "dark" ? "#06080d" : "#ffffff";
  const toggle = document.querySelector("#theme-toggle");
  if (!toggle) {
    return;
  }
  const nextTheme = activeTheme === "light" ? "dark" : "light";
  toggle.innerHTML = icon(activeTheme === "light" ? "moon" : "sun");
  toggle.setAttribute("aria-label", `Activar modo ${nextTheme === "dark" ? "oscuro" : "claro"}`);
  toggle.title = `Activar modo ${nextTheme === "dark" ? "oscuro" : "claro"}`;
}

function saveLearningState() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(learningState));
    return true;
  } catch (error) {
    showToast(`No se pudieron guardar los avances en este navegador. ${error.message}`);
    return false;
  }
}

function allCourses() {
  return [...learningState.routes.aiEngineer, ...learningState.routes.english];
}

function getCourse(courseId) {
  return allCourses().find((course) => course.id === courseId);
}

function getActiveCourse(routeId) {
  return getRouteCourses(routeId).find((course) => !course.approved) || null;
}

function getActiveCourseIndex(routeId) {
  const courses = getRouteCourses(routeId);
  const index = courses.findIndex((course) => !course.approved);
  return index < 0 ? courses.length : index;
}

function isCourseUnlocked(routeId, courseId) {
  const courses = getRouteCourses(routeId);
  const courseIndex = courses.findIndex((course) => course.id === courseId);
  return courseIndex >= 0 && courseIndex <= getActiveCourseIndex(routeId);
}

function getRouteCourses(routeId) {
  return learningState.routes[routeId];
}

function getRouteStats(routeId) {
  const courses = getRouteCourses(routeId);
  const total = courses.reduce((sum, course) => sum + course.estimado_pomodoros, 0);
  const completed = courses.reduce((sum, course) => sum + course.completados, 0);
  const lessonCount =
    routeId === "english"
      ? courses.reduce(
          (sum, course) =>
            sum + (course.units || []).reduce((unitSum, unit) => unitSum + unit.lessons.length, 0),
          0,
        )
      : 0;
  const completedLessons =
    routeId === "english"
      ? courses.reduce((sum, course) => sum + (course.completedLessons || []).length, 0)
      : 0;
  return {
    courses,
    total,
    completed,
    percent:
      routeId === "english"
        ? courses.every((course) => course.approved === true)
          ? 100
          : lessonCount > 0
            ? Math.min(100, Math.round((completedLessons / lessonCount) * 100))
            : 0
        : total > 0
          ? Math.min(100, Math.round((completed / total) * 100))
          : 0,
    completedCourses: courses.filter((course) => course.approved === true).length,
  };
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (character) => {
    const entities = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    };
    return entities[character];
  });
}

function render() {
  if (!activeRouteId) {
    renderHome();
    return;
  }
  renderRoute(activeRouteId);
}

function renderHome() {
  const routeCards = Object.entries(ROUTES)
    .map(([routeId, route]) => {
      const stats = getRouteStats(routeId);
      const isComplete = stats.completedCourses === stats.courses.length;
      return `
        <article class="route-card">
          <div class="route-card-top">
            <div class="route-icon" aria-hidden="true">${icon(routeId === "aiEngineer" ? "brain" : "book")}</div>
            <span class="badge ${isComplete ? "badge-success" : stats.percent > 0 || stats.completed > 0 ? "badge-progress" : ""}">
              ${isComplete ? "Completada" : stats.percent > 0 || stats.completed > 0 ? "En progreso" : "Por comenzar"}
            </span>
          </div>
          <h2>${escapeHtml(route.title)}</h2>
          <p>${escapeHtml(route.description)}</p>
          <div class="progress-meta">
            <span>Avance total</span>
            <strong>${stats.percent}%</strong>
          </div>
          <div
            class="progress-track"
            role="progressbar"
            aria-label="Avance de ${escapeHtml(route.label)}"
            aria-valuemin="0"
            aria-valuemax="100"
            aria-valuenow="${stats.percent}"
          >
            <div class="progress-fill" style="width: ${stats.percent}%"></div>
          </div>
          <div class="route-card-bottom">
            <span>${stats.completed} / ${stats.total} Pomodoros · ${stats.courses.length} ${stats.courses.length === 1 ? "curso" : "módulos"}</span>
            <button class="button button-primary" type="button" data-open-route="${routeId}">
              Ver mi ruta
              <span aria-hidden="true">→</span>
            </button>
          </div>
        </article>`;
    })
    .join("");

  app.innerHTML = `
    <section aria-labelledby="home-title">
      <div class="page-heading">
        <div>
          <h1 id="home-title">Mis rutas de aprendizaje</h1>
          <p class="page-subtitle">Organiza tus cursos, crea rutinas de estudio y avanza con constancia en distintas áreas de aprendizaje.</p>
        </div>
        <div>
          <button
            class="button button-blocked"
            type="button"
            aria-describedby="blocked-route-note-home"
            data-blocked-route
          >
            Añadir nueva ruta
          </button>
            <span class="blocked-note" id="blocked-route-note-home">Próximamente · bloqueado por Tech Lead</span>
        </div>
      </div>
      <div class="route-grid" aria-label="Resumen de rutas de aprendizaje">
        ${routeCards}
      </div>
    </section>
  `;
}

function renderCourseLinks(course) {
  if (!course.links.length) {
    return "";
  }
  return `
    <div class="course-links">
      <p class="course-links-heading">Cursos y videos</p>
      ${course.links
        .map(
          (url, index) => `
            <a class="course-link" href="${escapeHtml(url)}" target="_blank" rel="noopener noreferrer">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M14 3h7v7"></path>
                <path d="M10 14 21 3"></path>
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
              </svg>
              ${course.links.length > 1 ? `Curso ${index + 1} · Abrir en Udemy` : "Abrir curso en Udemy"}
            </a>`,
        )
        .join("")}
    </div>`;
}

function renderFinalProjectBrief(course) {
  if (!course.proyecto_final) {
    return "";
  }
  return `
    <details class="project-brief">
      <summary>${icon("sparkles")} Proyecto final · Tu equipo de agentes de IA</summary>
      <p class="project-brief-intro">Construye una aplicación propia para organizar y usar un equipo de agentes especializados, basada en la guía adjunta.</p>
      <ol>
        <li>Documenta el contexto de tu negocio para que los agentes compartan instrucciones comunes.</li>
        <li>Mapea tus procesos y clasifica cada tarea como agente, humano o agente con aprobación.</li>
        <li>Elige una tarea frecuente, repetible y fácil de revisar para crear el primer agente.</li>
        <li>Describe sus pasos, crea sus instrucciones, y prueba el agente con supervisión.</li>
        <li>Añade agentes especializados uno por proceso y define límites y aprobaciones.</li>
        <li>Crea una interfaz con un dashboard, conversación por agente, asignación de tareas y aprobaciones; evita duplicar una fuente de datos existente.</li>
      </ol>
      <a class="course-link" href="/assets/guia-equipo-agentes-ia.pdf" target="_blank" rel="noopener noreferrer">
        ${icon("book")} Abrir guía del proyecto (PDF)
      </a>
    </details>`;
}

function renderEnglishCurriculum(course) {
  if (!course.units) {
    return "";
  }
  const completed = new Set(course.completedLessons || []);
  const allLessons = course.units.flatMap((unit) =>
    unit.lessons.map((title, index) => ({ id: `${unit.id}l${index + 1}`, title, unit })),
  );
  const currentLessonIndex = allLessons.findIndex((lesson) => !completed.has(lesson.id));
  const currentLesson = currentLessonIndex >= 0 ? allLessons[currentLessonIndex] : null;
  const unitMarkup = course.units
    .map((unit) => {
      const lessons = unit.lessons
        .map((title, index) => {
          const lessonId = `${unit.id}l${index + 1}`;
          const globalIndex = allLessons.findIndex((lesson) => lesson.id === lessonId);
          const isComplete = completed.has(lessonId);
          const isCurrent = currentLesson?.id === lessonId;
          const isLocked = !isComplete && !isCurrent;
          return `
            <li class="english-lesson ${isComplete ? "lesson-complete" : ""} ${isCurrent ? "lesson-current" : ""} ${isLocked ? "lesson-locked" : ""}">
              <span class="lesson-status" aria-hidden="true">${isComplete ? icon("check") : isLocked ? icon("lock") : `${globalIndex + 1}`}</span>
              <span class="lesson-title">${escapeHtml(title)}</span>
              ${
                isCurrent
                  ? `<button class="button button-secondary lesson-complete-button" type="button" data-complete-lesson="${lessonId}">
                      Marcar completada
                    </button>`
                  : `<span class="lesson-state">${isComplete ? "Completada" : "Bloqueada"}</span>`
              }
            </li>`;
        })
        .join("");
      const unitLessons = unit.lessons.map((_, index) => `${unit.id}l${index + 1}`);
      const unitComplete = unitLessons.every((lessonId) => completed.has(lessonId));
      const unitUnlocked = unitLessons.some((lessonId) => !completed.has(lessonId)) &&
        unitLessons.find((lessonId) => !completed.has(lessonId)) === currentLesson?.id;
      return `
        <details class="english-unit" ${unitUnlocked || unitComplete ? "open" : ""}>
          <summary>
            <span class="unit-title">${escapeHtml(unit.title)}</span>
            <span class="badge ${unitComplete ? "badge-success" : unitUnlocked ? "badge-progress" : ""}">
              ${unitComplete ? "Completada" : unitUnlocked ? "En curso" : icon("lock")}
              ${unitComplete ? "" : unitUnlocked ? "" : "Bloqueada"}
            </span>
          </summary>
          <ol class="english-lesson-list">${lessons}</ol>
        </details>`;
    })
    .join("");
  const allLessonsComplete = completed.size >= allLessons.length;
  const examMarkup = allLessonsComplete
    ? `
      <section class="english-exam" aria-labelledby="english-exam-title">
        <div class="exam-heading">
          ${icon("check")}
          <div>
            <h4 id="english-exam-title">Examen final · Nivel 5</h4>
            <p>El examen final dura 30 minutos. Registra tu puntuación real de EF Corporate; necesitas al menos 70% para aprobar y desbloquear el Nivel 6.</p>
          </div>
        </div>
        ${
          course.approved
            ? `<p class="exam-result exam-passed">Nivel 5 aprobado con ${course.examScore}%. El Nivel 6 está desbloqueado.</p>
               <button class="button button-secondary" type="button" data-level6-info>${icon("message")} Ver cómo enviar los módulos</button>`
            : `
              ${Number.isFinite(course.examScore) ? `<p class="exam-result">Último resultado: ${course.examScore}%. Se requiere 70% para desbloquear el siguiente nivel.</p>` : ""}
              <form class="exam-form" id="exam-form">
                <label for="exam-score">Puntuación del examen (%)</label>
                <div class="exam-form-controls">
                  <input id="exam-score" name="score" type="number" min="0" max="100" step="1" required value="${Number.isFinite(course.examScore) ? course.examScore : ""}" placeholder="Ej. 70" />
                  <button class="button button-primary" type="submit">Registrar resultado</button>
                </div>
              </form>`
        }
      </section>`
    : `
      <p class="english-exam-locked">
        ${icon("lock")}
        <span>El examen final (30 min) se habilita al completar las 24 lecciones. Se aprueba con 70% o más.</span>
      </p>`;
  const level6Markup = course.level6Unlocked
    ? `<div class="level-unlocked">
        ${icon("check")}
        <span><strong>Nivel 6 desbloqueado.</strong> Envíame sus unidades y lecciones en el chat con el mismo formato de esta lista.</span>
        <button class="button button-secondary" type="button" data-level6-info>Ver formato para enviar módulos</button>
      </div>`
    : "";
  return `
    <section class="english-curriculum" aria-labelledby="english-curriculum-title">
      <div class="curriculum-heading">
        <div>
          <h4 id="english-curriculum-title">Programa EF Corporate · Nivel 5</h4>
          <p>Vas por ${currentLesson ? escapeHtml(currentLesson.unit.title.replace(/^Unidad \\d+ · /, "")) : "el examen final"}. ${completed.size} de ${allLessons.length} lecciones completadas.</p>
        </div>
        <span class="badge badge-progress">Nivel 5</span>
      </div>
      <div class="english-units">${unitMarkup}</div>
      ${examMarkup}
      ${level6Markup}
    </section>`;
}

function renderModuleCard(course, index, routeId) {
  const percent = Math.min(100, Math.round((course.completados / course.estimado_pomodoros) * 100));
  const isComplete = course.completados >= course.estimado_pomodoros;
  const isEnglish = course.id === "eng1";
  const activeIndex = getActiveCourseIndex(routeId);
  const isLocked = index > activeIndex;
  const isApproved = course.approved === true;
  const canApprove = !isEnglish && !isLocked && !isApproved && isComplete;
  const badgeLabel = isLocked
    ? "Bloqueado"
    : isApproved
      ? "Aprobado"
      : isEnglish && isComplete
        ? "Examen pendiente"
      : isComplete
        ? "Pendiente de aprobación"
        : course.completados > 0
          ? "En progreso"
          : "Pendiente";
  return `
    <article class="module-card ${isLocked ? "module-card-locked" : ""}">
      <div class="module-card-header">
        <div class="module-title-group">
          <div class="module-index" aria-hidden="true">${String(index + 1).padStart(2, "0")}</div>
          <div>
            <h3>${escapeHtml(course.titulo)}</h3>
            <p class="module-meta">${course.estimado_pomodoros} Pomodoros estimados</p>
          </div>
        </div>
        <span class="badge ${isLocked ? "" : isApproved ? "badge-success" : course.completados > 0 ? "badge-progress" : ""}">
          ${isLocked ? icon("lock") : isApproved ? icon("check") : ""}${badgeLabel}
        </span>
      </div>
      <p class="module-goal"><strong>Meta:</strong> ${escapeHtml(course.meta)}</p>
      <div class="progress-meta">
        <span>Progreso del módulo</span>
        <strong>${percent}%</strong>
      </div>
      <div
        class="progress-track"
        role="progressbar"
        aria-label="Progreso de ${escapeHtml(course.titulo)}"
        aria-valuemin="0"
        aria-valuemax="100"
        aria-valuenow="${percent}"
      >
        <div class="progress-fill" style="width: ${percent}%"></div>
      </div>
      <div class="module-footer">
        <span>${course.completados} / ${course.estimado_pomodoros} Pomodoros completados</span>
        <span>${isEnglish ? (isApproved ? "Examen aprobado" : isComplete ? "Pomodoros listos" : `${course.estimado_pomodoros - course.completados} restantes`) : isApproved ? "Reto aprobado" : isComplete ? "Meta alcanzada" : `${course.estimado_pomodoros - course.completados} restantes`}</span>
      </div>
      ${
        isLocked
          ? `<p class="module-lock-message">${icon("lock")}<span>Aprueba el módulo anterior para desbloquear este contenido y sus cursos.</span></p>`
          : `${renderCourseLinks(course)}
                  ${renderFinalProjectBrief(course)}
                  ${renderEnglishCurriculum(course)}
                  ${canApprove ? `
                <div class="module-approval">
                  <p>Completa el reto técnico en el chat de Gemini y luego confirma la aprobación para continuar.</p>
                  <button class="button button-secondary" type="button" data-approve-module="${escapeHtml(course.id)}">
                    ${icon("check")} Aprobar módulo tras el reto
                  </button>
                </div>` : ""}`
      }
    </article>`;
}

function timerCourseOptions(routeId) {
  const activeCourse = getActiveCourse(routeId);
  const availableCourse =
    activeCourse && activeCourse.completados < activeCourse.estimado_pomodoros
      ? activeCourse
      : null;
  if (selectedCourseId !== availableCourse?.id) {
    selectedCourseId = "";
  }

  if (!availableCourse) {
    const emptyLabel = activeCourse
      ? "Módulo completo · pendiente de aprobación"
      : "Todos los módulos están aprobados";
    return `<option value="">${emptyLabel}</option>`;
  }

  return [
    '<option value="">Selecciona un curso o módulo</option>',
    `<option value="${escapeHtml(availableCourse.id)}" ${availableCourse.id === selectedCourseId ? "selected" : ""}>${escapeHtml(availableCourse.titulo)}</option>`,
  ].join("");
}

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainder = seconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(remainder).padStart(2, "0")}`;
}

function updateTimerDisplay() {
  const display = document.querySelector(".timer-display");
  if (display) {
    display.textContent = formatTime(remainingSeconds);
    display.setAttribute("aria-label", `${formatTime(remainingSeconds)} restantes`);
  }
}

function renderChatMessages(routeId) {
  const messages = chatHistory[routeId] || [];
  if (messages.length === 0) {
    return `
      <div class="chat-welcome">
        <div class="assistant-avatar">${icon("sparkles")}</div>
        <div class="chat-bubble">
          <strong>Hola, soy Gemini.</strong>
          <p>Puedo ayudarte con el curso actual, preparar un reto de código o revisar tus respuestas técnicas.</p>
        </div>
      </div>`;
  }
  return messages
    .map(
      (message) => `
        <article class="chat-message chat-message-${message.role}">
          ${message.role === "model" ? `<span class="assistant-avatar">${icon("sparkles")}</span>` : ""}
          <div class="chat-bubble">${escapeHtml(message.text)}</div>
        </article>`,
    )
    .join("");
}

function renderGeminiChat(routeId, courseTitle) {
  const messages = chatHistory[routeId] || [];
  const isLoading = chatLoading && chatLoadingRouteId === routeId;
  const suggestion = messages.length
    ? ""
    : `<button class="chat-suggestion" type="button" data-chat-prompt="Prepara un reto práctico de código y un cuestionario técnico para el módulo ${escapeHtml(courseTitle)}.">
        ${icon("sparkles")} Crear reto y cuestionario
      </button>`;
  const projectSuggestion = messages.length
    ? ""
    : `<button class="chat-suggestion" type="button" data-chat-prompt="Ayúdame a planear el proyecto final del Módulo 6. Quiero crear un equipo de agentes de IA con una interfaz propia. Guíame desde el contexto compartido del negocio y el mapa de procesos hasta agentes especializados supervisados y un dashboard con conversaciones, asignación de tareas y aprobaciones. Propón el siguiente paso y pregúntame por la información que te falte.">
        ${icon("brain")} Planear proyecto final
      </button>`;
  return `
    <section class="gemini-chat" aria-labelledby="gemini-title">
      <div class="chat-heading">
        <div class="chat-title-group">
          <div class="assistant-avatar">${icon("sparkles")}</div>
          <div>
            <h3 id="gemini-title">Gemini AI</h3>
            <p>Mentor de tu ruta</p>
          </div>
        </div>
        <span class="chat-connection ${geminiConfigured ? "chat-connected" : ""}">
          <span class="status-dot" aria-hidden="true"></span>
          ${geminiConfigured ? "Configurado" : "API no configurada"}
        </span>
      </div>
      <div class="chat-messages" id="chat-messages" role="log" aria-live="polite" aria-relevant="additions text">
        ${renderChatMessages(routeId)}
        ${isLoading ? `
          <article class="chat-message chat-message-model" aria-label="Gemini está escribiendo">
            <span class="assistant-avatar">${icon("sparkles")}</span>
            <div class="chat-bubble chat-typing">Gemini está pensando…</div>
          </article>` : ""}
      </div>
      ${chatError && chatErrorRouteId === routeId ? `<p class="chat-error" role="alert">${escapeHtml(chatError)}</p>` : ""}
      ${suggestion}
      ${courseTitle.includes("Proyecto Final") ? projectSuggestion : ""}
      <form class="chat-form" id="chat-form">
        <label class="sr-only" for="chat-input">Escribe tu mensaje para Gemini</label>
        <textarea
          id="chat-input"
          name="message"
          rows="2"
          maxlength="${MAX_CHAT_MESSAGE_LENGTH}"
          placeholder="Pregunta sobre el módulo o pide tu reto…"
          required
          ${isLoading ? "disabled" : ""}
        ></textarea>
        <button
          class="icon-button chat-send"
          type="submit"
          aria-label="Enviar mensaje a Gemini"
          ${isLoading ? "disabled" : ""}
        >
          ${icon("send")}
        </button>
      </form>
      <p class="chat-privacy">${geminiConfigured ? "La clave de Gemini se mantiene en el servidor." : "Configura GEMINI_API_KEY al iniciar Node.js para habilitar las respuestas de Gemini."}</p>
    </section>`;
}

function renderRoute(routeId) {
  const route = ROUTES[routeId];
  const stats = getRouteStats(routeId);
  const modules = getRouteCourses(routeId)
    .map((course, index) => renderModuleCard(course, index, routeId))
    .join("");
  const activeCourse = getActiveCourse(routeId);
  const availableCourse = activeCourse && activeCourse.completados < activeCourse.estimado_pomodoros;
  const hasSelection = Boolean(
    selectedCourseId &&
      getCourse(selectedCourseId) &&
      isCourseUnlocked(routeId, selectedCourseId) &&
      getCourse(selectedCourseId).completados < getCourse(selectedCourseId).estimado_pomodoros,
  );
  const chatCourse = activeCourse || getRouteCourses(routeId).at(-1);
  const timerHint =
    timerMode === "work" && activeCourse && !availableCourse
      ? activeCourse.id === "eng1"
        ? "Completa las 24 lecciones y aprueba el examen final con 70% para desbloquear el Nivel 6."
        : "Completa el reto técnico en Gemini y aprueba este módulo para desbloquear el siguiente."
      : timerMode === "work" && !availableCourse
        ? "Todos los módulos de esta ruta ya están aprobados."
        : timerMode === "work" && !hasSelection
          ? "Elige el módulo desbloqueado para asociar esta sesión con tu progreso."
      : timerMode === "work" && hasSelection
        ? `Esta sesión sumará progreso a ${escapeHtml(getCourse(selectedCourseId).titulo)}.`
        : "Tómate unos minutos para descansar antes de volver a aprender.";

  app.innerHTML = `
    <section aria-labelledby="route-title">
      <nav class="route-nav" aria-label="Migas de pan">
        <a href="#" data-home>Mis rutas</a>
        <svg class="crumb-arrow" viewBox="0 0 24 24" aria-hidden="true">
          <path d="m9 18 6-6-6-6"></path>
        </svg>
        <span aria-current="page">${escapeHtml(route.title)}</span>
      </nav>
      <div class="route-detail-heading">
        <div class="page-heading">
          <div>
            <h1 id="route-title">${escapeHtml(route.title)}</h1>
            <p class="page-subtitle">${routeId === "english" ? "EF Corporate · Nivel 5" : "Cursos, progreso y proyecto final."}</p>
          </div>
          <button class="button button-ghost" type="button" data-home>
            <span aria-hidden="true">←</span>
            Todas las rutas
          </button>
        </div>
      </div>
      <div class="stats-row" aria-label="Resumen de progreso">
        <article class="stat-card">
          <span class="stat-label">Avance de la ruta</span>
          <span class="stat-value">${stats.percent}%</span>
        </article>
        <article class="stat-card">
          <span class="stat-label">Pomodoros completados</span>
          <span class="stat-value">${stats.completed} <span class="module-meta">/ ${stats.total}</span></span>
        </article>
        <article class="stat-card">
          <span class="stat-label">Cursos finalizados</span>
          <span class="stat-value">${stats.completedCourses} <span class="module-meta">/ ${stats.courses.length}</span></span>
        </article>
      </div>
      <div class="detail-layout">
        <section aria-labelledby="modules-title">
          <div class="section-heading">
            <h2 id="modules-title">Contenido de la ruta</h2>
            <span class="section-caption">${stats.courses.length} ${stats.courses.length === 1 ? "curso" : "módulos"}</span>
          </div>
          <div class="module-list">
            ${modules || '<div class="empty-state">No hay cursos disponibles en esta ruta todavía.</div>'}
          </div>
          <div class="route-footer">
            <button
              class="button button-blocked"
              type="button"
              aria-describedby="blocked-route-note-detail"
              data-blocked-route
            >
              Añadir nueva especialización
            </button>
            <span class="blocked-note" id="blocked-route-note-detail">Próximamente · mantén el foco en tus rutas actuales</span>
          </div>
        </section>
        <aside class="panel focus-panel" aria-labelledby="focus-title">
          <div class="timer-header">
            <h2 id="focus-title">Focus engine</h2>
            <span class="badge badge-progress">${timerMode === "work" ? "Enfoque" : "Descanso"}</span>
          </div>
          <div class="timer-tabs" role="group" aria-label="Modo del temporizador">
            <button class="timer-tab" type="button" data-mode="work" aria-pressed="${timerMode === "work"}">Trabajo</button>
            <button class="timer-tab" type="button" data-mode="break" aria-pressed="${timerMode === "break"}">Pausa</button>
          </div>
          <p class="timer-display" role="timer" aria-label="${formatTime(remainingSeconds)} restantes">${formatTime(remainingSeconds)}</p>
          <label class="timer-course-label" for="course-select">Curso o módulo</label>
          <div class="select-wrap">
            <select
              class="course-select"
              id="course-select"
              ${timerMode === "break" || !availableCourse ? "disabled" : ""}
              aria-describedby="timer-hint"
            >
              ${timerCourseOptions(routeId)}
            </select>
            <svg class="select-chevron" viewBox="0 0 24 24" aria-hidden="true">
              <path d="m6 9 6 6 6-6"></path>
            </svg>
          </div>
          <p class="timer-hint" id="timer-hint">${timerHint}</p>
          <div class="timer-controls">
            <button class="button button-primary" type="button" data-start>
              ${timerInterval ? "Pausar" : "Iniciar"}
            </button>
            <button class="icon-button" type="button" data-reset aria-label="Reiniciar temporizador">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M3 12a9 9 0 1 0 2.6-6.4L3 8"></path>
                <path d="M3 3v5h5"></path>
              </svg>
            </button>
          </div>
          <div class="focus-note">
            ${icon("sparkles")}
            <span><strong>Un bloque a la vez.</strong> Cada sesión de trabajo completa suma un Pomodoro a tu módulo.</span>
          </div>
          ${renderGeminiChat(routeId, chatCourse.titulo)}
        </aside>
      </div>
    </section>
  `;
}

function showToast(message) {
  toast.textContent = message;
  toast.hidden = false;
  window.clearTimeout(toastTimeout);
  toastTimeout = window.setTimeout(() => {
    toast.hidden = true;
  }, 8000);
}

function openModal(title, message, onClose = null) {
  previousFocus = document.activeElement;
  modalTitle.textContent = title;
  modalMessage.textContent = message;
  modalCloseAction = onClose;
  modal.hidden = false;
  document.body.style.overflow = "hidden";
  modal.querySelector("[data-close-modal]").focus();
}

function closeModal() {
  if (modal.hidden) {
    return;
  }
  modal.hidden = true;
  document.body.style.overflow = "";
  if (modalCloseAction) {
    modalCloseAction();
  } else if (previousFocus && document.contains(previousFocus)) {
    previousFocus.focus();
  }
  modalCloseAction = null;
}

function showBlockedRouteMessage() {
  openModal(
    "Acceso denegado por el Tech Lead",
    "⛔ ACCESO DENEGADO POR EL TECH LEAD: Tienes rutas críticas en progreso. Debes llegar al 100% en la Ruta de IA Engineer y finalizar EF Corporate Nivel 5 antes de diversificar tu aprendizaje.",
  );
}

function setTimerMode(mode) {
  if (timerInterval) {
    window.clearInterval(timerInterval);
    timerInterval = null;
  }
  timerMode = mode;
  remainingSeconds = mode === "work" ? WORK_SECONDS : BREAK_SECONDS;
  render();
}

function pauseTimer() {
  if (timerInterval) {
    window.clearInterval(timerInterval);
    timerInterval = null;
  }
}

function handleWorkComplete() {
  pauseTimer();
  const course = getCourse(selectedCourseId);
  if (!course || course.completados >= course.estimado_pomodoros) {
    showToast("Elige un módulo disponible antes de iniciar una sesión de trabajo.");
    remainingSeconds = WORK_SECONDS;
    render();
    return;
  }

  course.completados += 1;
  saveLearningState();
  remainingSeconds = BREAK_SECONDS;
  timerMode = "break";
  render();

  if (course.id === "eng1" && course.completados >= course.estimado_pomodoros) {
    showToast("Terminaste los Pomodoros estimados del Nivel 5. Completa sus 24 lecciones y aprueba el examen con 70% para desbloquear el Nivel 6.");
  } else if (course.id !== "eng1" && course.completados >= course.estimado_pomodoros) {
    pauseTimer();
    openModal(
      "Módulo completado",
      `✨ TECH LEAD GEMINI INFORMA: Has completado todas las horas de vuelo para ${course.titulo}. Usa el chat de Gemini debajo del Focus Engine para hacer el reto de código y cuestionario técnico. Después, marca el módulo como aprobado para desbloquear el siguiente.`,
      () => {
        document.querySelector("#chat-input")?.focus();
        document.querySelector(".gemini-chat")?.scrollIntoView({ behavior: "smooth", block: "center" });
      },
    );
  }
}

function startTimer() {
  if (timerInterval) {
    pauseTimer();
    render();
    return;
  }

  if (timerMode === "work" && !selectedCourseId) {
    showToast("Selecciona un curso o módulo antes de iniciar el temporizador.");
    document.querySelector("#course-select")?.focus();
    return;
  }
  if (
    timerMode === "work" &&
    (!getCourse(selectedCourseId) ||
      !isCourseUnlocked(activeRouteId, selectedCourseId) ||
      getCourse(selectedCourseId).approved ||
      getCourse(selectedCourseId).completados >= getCourse(selectedCourseId).estimado_pomodoros)
  ) {
    showToast("Este módulo no está disponible para estudiar. Aprueba el anterior o selecciona el módulo desbloqueado.");
    selectedCourseId = "";
    render();
    return;
  }
  timerInterval = window.setInterval(() => {
    remainingSeconds -= 1;
    if (remainingSeconds <= 0) {
      remainingSeconds = 0;
      if (timerMode === "work") {
        handleWorkComplete();
        return;
      }
      pauseTimer();
      timerMode = "work";
      remainingSeconds = WORK_SECONDS;
      render();
      return;
    }
    updateTimerDisplay();
  }, 1000);
  render();
}

function resetTimer() {
  pauseTimer();
  remainingSeconds = timerMode === "work" ? WORK_SECONDS : BREAK_SECONDS;
  render();
}

function approveModule(courseId) {
  const course = getCourse(courseId);
  if (
    !activeRouteId ||
    !course ||
    getActiveCourse(activeRouteId)?.id !== courseId ||
    course.completados < course.estimado_pomodoros
  ) {
    showToast("Completa los Pomodoros del módulo actual antes de aprobarlo.");
    return;
  }
  course.approved = true;
  selectedCourseId = "";
  pauseTimer();
  saveLearningState();
  render();
  showToast(`${course.titulo} aprobado. El siguiente módulo ya está desbloqueado.`);
}

function completeEnglishLesson(lessonId) {
  const course = getCourse("eng1");
  if (!course?.units) {
    showToast("No se encontró el programa del Nivel 5.");
    return;
  }
  const allLessons = course.units.flatMap((unit) =>
    unit.lessons.map((title, index) => ({ id: `${unit.id}l${index + 1}`, title })),
  );
  const currentLesson = allLessons.find(
    (lesson) => !(course.completedLessons || []).includes(lesson.id),
  );
  if (!currentLesson || currentLesson.id !== lessonId) {
    showToast("Completa las lecciones en orden para desbloquear la siguiente.");
    return;
  }

  course.completedLessons.push(lessonId);
  saveLearningState();
  render();
  showToast(
    course.completedLessons.length === allLessons.length
      ? "¡Nivel 5 listo! Ya puedes registrar el resultado de tu examen final."
      : "Lección completada. La siguiente lección ya está disponible.",
  );
}

function showLevel6Request() {
  openModal(
    "Nivel 6 desbloqueado",
    "¡Felicitaciones! Aprobaste el examen del Nivel 5 con al menos 70%. Envíame por este chat el programa del Nivel 6 con el mismo formato: nombre de cada unidad, sus lecciones numeradas, examen o meta final y los enlaces de estudio que tengas. Por ejemplo: “Unidad 1 · [tema]; Lección 1 · [nombre]; Lección 2 · [nombre]…”. Lo incorporaré a tu ruta para que puedas avanzar en orden.",
    () => {
      document.querySelector(".level-unlocked [data-level6-info]")?.focus();
    },
  );
}

function submitEnglishExam(score) {
  const course = getCourse("eng1");
  const lessonsCount = course?.units.reduce((total, unit) => total + unit.lessons.length, 0) || 0;
  if (!course || course.completedLessons.length < lessonsCount) {
    showToast("Completa las 24 lecciones del Nivel 5 antes de registrar el examen.");
    return;
  }
  if (!Number.isInteger(score) || score < 0 || score > 100) {
    showToast("Ingresa una puntuación válida entre 0 y 100.");
    return;
  }

  course.examScore = score;
  if (score >= 70) {
    course.approved = true;
    course.level6Unlocked = true;
  }
  saveLearningState();
  render();

  if (score >= 70) {
    showLevel6Request();
  } else {
    openModal(
      "Examen registrado",
      `Tu resultado fue ${score}%. Necesitas al menos 70% para aprobar el Nivel 5 y desbloquear el Nivel 6. Puedes volver a intentarlo después de repetir el examen en EF Corporate.`,
      () => {
        document.querySelector("#exam-score")?.focus();
      },
    );
  }
}

async function submitGeminiMessage(message) {
  const trimmedMessage = message.trim();
  const routeId = activeRouteId;
  if (!trimmedMessage || chatLoading || !routeId) {
    return;
  }

  chatError = "";
  chatErrorRouteId = null;
  const history = chatHistory[routeId] || [];
  history.push({ role: "user", text: trimmedMessage });
  chatHistory[routeId] = history.slice(-40);
  saveChatHistory();
  chatLoading = true;
  chatLoadingRouteId = routeId;
  renderRoute(routeId);

  try {
    const requestMessages = chatHistory[routeId]
      .slice(-10)
      .map((item) => ({ ...item, text: item.text.slice(-MAX_CHAT_MESSAGE_LENGTH) }));
    while (requestMessages.length && requestMessages[0].role !== "user") {
      requestMessages.shift();
    }
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        courseId: selectedCourseId || (getActiveCourse(routeId) || getRouteCourses(routeId).at(-1)).id,
        messages: requestMessages,
      }),
    });
    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.error || "Gemini no pudo procesar el mensaje.");
    }
    chatHistory[routeId].push({ role: "model", text: result.text });
    chatHistory[routeId] = chatHistory[routeId].slice(-40);
    saveChatHistory();
  } catch (error) {
    chatError =
      error instanceof TypeError
        ? "No se pudo conectar con el servidor. Inicia la aplicación con `node .\\server.js` y abre http://127.0.0.1:3000."
        : error.message;
    chatErrorRouteId = routeId;
  } finally {
    chatLoading = false;
    chatLoadingRouteId = null;
    if (activeRouteId === routeId) {
      renderRoute(routeId);
      document.querySelector("#chat-input")?.focus();
      const messages = document.querySelector("#chat-messages");
      if (messages) {
        messages.scrollTop = messages.scrollHeight;
      }
    }
  }
}

app.addEventListener("click", (event) => {
  const target = event.target.closest("button, a");
  if (!target) {
    return;
  }

  if (target.matches("[data-open-route]")) {
    pauseTimer();
    activeRouteId = target.dataset.openRoute;
    selectedCourseId = "";
    timerMode = "work";
    remainingSeconds = WORK_SECONDS;
    render();
  } else if (target.matches("[data-home]")) {
    event.preventDefault();
    pauseTimer();
    activeRouteId = null;
    selectedCourseId = "";
    render();
    app.focus();
  } else if (target.matches("[data-blocked-route]")) {
    showBlockedRouteMessage();
  } else if (target.matches("[data-mode]")) {
    setTimerMode(target.dataset.mode);
  } else if (target.matches("[data-start]")) {
    startTimer();
  } else if (target.matches("[data-reset]")) {
    resetTimer();
  } else if (target.matches("[data-approve-module]")) {
    approveModule(target.dataset.approveModule);
  } else if (target.matches("[data-chat-prompt]")) {
    const input = document.querySelector("#chat-input");
    if (input) {
      input.value = target.dataset.chatPrompt;
      input.focus();
    }
  } else if (target.matches("[data-complete-lesson]")) {
    completeEnglishLesson(target.dataset.completeLesson);
  } else if (target.matches("[data-level6-info]")) {
    showLevel6Request();
  }
});

app.addEventListener("submit", (event) => {
  if (event.target.matches("#chat-form")) {
    event.preventDefault();
    const input = event.target.elements.message;
    submitGeminiMessage(input.value);
  } else if (event.target.matches("#exam-form")) {
    event.preventDefault();
    const score = Number(event.target.elements.score.value);
    submitEnglishExam(score);
  }
});

app.addEventListener("change", (event) => {
  if (event.target.matches("#course-select")) {
    selectedCourseId = event.target.value;
    render();
    document.querySelector("#course-select")?.focus();
  }
});

document.querySelector("#theme-toggle").addEventListener("click", () => {
  activeTheme = activeTheme === "light" ? "dark" : "light";
  applyTheme();
  try {
    localStorage.setItem(THEME_STORAGE_KEY, activeTheme);
  } catch (error) {
    showToast(`No se pudo guardar la preferencia del tema. ${error.message}`);
  }
});

fetch("/api/status")
  .then((response) => {
    if (!response.ok) {
      throw new Error("No se pudo consultar la configuración del chat.");
    }
    return response.json();
  })
  .then((status) => {
    geminiConfigured = status.configured === true;
    if (activeRouteId) {
      renderRoute(activeRouteId);
    }
  })
  .catch(() => {
    geminiConfigured = false;
  });

modal.addEventListener("click", (event) => {
  if (event.target === modal || event.target.closest("[data-close-modal]")) {
    closeModal();
  }
});

document.addEventListener("keydown", (event) => {
  if (modal.hidden) {
    return;
  }
  if (event.key === "Escape") {
    closeModal();
    return;
  }
  if (event.key === "Tab") {
    const focusable = [...modal.querySelectorAll("button:not([disabled])")];
    if (focusable.length === 1) {
      event.preventDefault();
      focusable[0].focus();
      return;
    }
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }
});

chatHistory = loadChatHistory();
applyTheme();
document.querySelector("#home-link").addEventListener("click", (event) => {
  event.preventDefault();
  pauseTimer();
  activeRouteId = null;
  selectedCourseId = "";
  render();
  app.focus();
});

render();
