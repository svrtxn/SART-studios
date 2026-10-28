"use strict";

const http = require("node:http");
const path = require("node:path");
const fs = require("node:fs/promises");

const ROOT = __dirname;
const PORT = Number(process.env.PORT || 3000);
const MAX_BODY_BYTES = 32 * 1024;
const MAX_MESSAGES = 16;
const MAX_MESSAGE_LENGTH = 3000;
const GEMINI_MODEL = "gemini-2.5-flash";
const COURSE_TITLES = {
  mod1: "Módulo 1: Python y RAG",
  mod2: "Módulo 2: Tool Calling y Agentes",
  mod3: "Módulo 3: MCP y Servidores Locales",
  mod4: "Módulo 4: Orquestación Multi-Agente",
  mod5: "Módulo 5: Fine-Tuning y Modelos Locales",
  mod6: "Módulo 6: LLMOps y Proyecto Final",
  eng1: "EF Corporate - Nivel 5",
};
const STATIC_FILES = new Set([
  "index.html",
  "styles.css",
  "app.js",
  "SART STUDIOS.png",
  path.join("assets", "sart-aprende.png"),
  path.join("assets", "sart-aprende-dark.png"),
  path.join("assets", "guia-equipo-agentes-ia.pdf"),
]);
const MIME_TYPES = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".pdf": "application/pdf",
  ".png": "image/png",
};

function sendJson(response, status, data) {
  response.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store",
    "X-Content-Type-Options": "nosniff",
  });
  response.end(JSON.stringify(data));
}

async function readJsonBody(request) {
  let size = 0;
  const chunks = [];
  for await (const chunk of request) {
    size += chunk.length;
    if (size > MAX_BODY_BYTES) {
      const error = new Error("La conversación supera el tamaño permitido.");
      error.statusCode = 413;
      throw error;
    }
    chunks.push(chunk);
  }
  try {
    return JSON.parse(Buffer.concat(chunks).toString("utf8"));
  } catch {
    const error = new Error("La solicitud debe contener JSON válido.");
    error.statusCode = 400;
    throw error;
  }
}

function validateChatPayload(payload) {
  if (
    !payload ||
    typeof payload !== "object" ||
    !Array.isArray(payload.messages) ||
    payload.messages.length < 1 ||
    payload.messages.length > MAX_MESSAGES ||
    typeof payload.courseId !== "string" ||
    !Object.hasOwn(COURSE_TITLES, payload.courseId)
  ) {
    return false;
  }

  return payload.messages.every(
    (message) =>
      message &&
      ["user", "model"].includes(message.role) &&
      typeof message.text === "string" &&
      message.text.trim().length > 0 &&
      message.text.length <= MAX_MESSAGE_LENGTH,
  );
}

async function handleGeminiChat(request, response) {
  if (request.method !== "POST") {
    response.setHeader("Allow", "POST");
    sendJson(response, 405, { error: "Este endpoint solo acepta solicitudes POST." });
    return;
  }

  if (!process.env.GEMINI_API_KEY?.trim()) {
    sendJson(response, 503, {
      error: "Gemini aún no está configurado. Define GEMINI_API_KEY en el entorno del servidor y reinícialo.",
    });
    return;
  }

  let payload;
  try {
    payload = await readJsonBody(request);
  } catch (error) {
    sendJson(response, error.statusCode || 400, { error: error.message });
    return;
  }

  if (!validateChatPayload(payload)) {
    sendJson(response, 400, {
      error: "La conversación no es válida. Revisa el curso y los mensajes enviados.",
    });
    return;
  }

  const contents = payload.messages.map((message) => ({
    role: message.role,
    parts: [{ text: message.text }],
  }));
  const projectInstructions =
    payload.courseId === "mod6"
      ? "El proyecto final debe ayudar a construir una aplicación propia para un equipo de agentes de IA: documentar contexto compartido del negocio, mapear procesos con tareas de agente/humano/agente con aprobación, elegir una tarea frecuente y revisable, crear y probar un agente con supervisión, añadir especialistas por proceso con límites de aprobación y construir una interfaz con dashboard, chat separado por agente, asignación de tareas y aprobaciones. Evita duplicar la fuente de datos existente y prioriza seguridad para secretos y permisos. La guía de referencia propone seis pasos desde el contexto hasta la interfaz."
      : "";
  const systemInstruction = {
    parts: [
      {
        text: `Eres Gemini, mentor técnico de SART STUDIOS. Ayuda en español de forma clara, pedagógica y profesional. El curso actual es "${COURSE_TITLES[payload.courseId]}". Prioriza explicaciones prácticas, retos de código y cuestionarios técnicos. No afirmes que aprobaste un módulo; la aprobación la registra el estudiante después de completar su reto. ${projectInstructions}`,
      },
    ],
  };

  let geminiResponse;
  try {
    geminiResponse = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": process.env.GEMINI_API_KEY,
        },
        body: JSON.stringify({ systemInstruction, contents }),
        signal: AbortSignal.timeout(30000),
      },
    );
  } catch {
    sendJson(response, 502, {
      error: "No se pudo conectar con Gemini. Comprueba tu conexión e inténtalo de nuevo.",
    });
    return;
  }

  let result;
  try {
    result = await geminiResponse.json();
  } catch {
    sendJson(response, 502, { error: "Gemini devolvió una respuesta que no se pudo leer." });
    return;
  }

  if (!geminiResponse.ok) {
    const upstreamMessage = result.error?.message;
    const message =
      typeof upstreamMessage === "string"
        ? `Gemini no pudo responder: ${upstreamMessage}`
        : "Gemini no pudo responder. Inténtalo de nuevo en unos momentos.";
    sendJson(response, geminiResponse.status === 429 ? 429 : 502, { error: message });
    return;
  }

  const text = result.candidates?.[0]?.content?.parts
    ?.map((part) => part.text || "")
    .join("")
    .trim();
  if (!text) {
    sendJson(response, 502, { error: "Gemini no devolvió texto. Inténtalo de nuevo." });
    return;
  }
  sendJson(response, 200, { text });
}

async function handleStaticFile(urlPath, method, response) {
  let decodedPath;
  try {
    decodedPath = decodeURIComponent(urlPath);
  } catch {
    sendJson(response, 400, { error: "La ruta solicitada no es válida." });
    return;
  }

  const requestedPath = decodedPath === "/" ? "/index.html" : decodedPath;
  const filePath = path.resolve(ROOT, `.${requestedPath}`);
  const relativePath = path.relative(ROOT, filePath);
  if (
    relativePath.startsWith("..") ||
    path.isAbsolute(relativePath) ||
    !STATIC_FILES.has(relativePath)
  ) {
    sendJson(response, 403, { error: "No tienes permiso para acceder a este archivo." });
    return;
  }

  try {
    const file = await fs.readFile(filePath);
    const contentType = MIME_TYPES[path.extname(filePath).toLowerCase()];
    if (!contentType) {
      sendJson(response, 404, { error: "No se encontró el archivo solicitado." });
      return;
    }
    response.writeHead(200, {
      "Content-Type": contentType,
      "X-Content-Type-Options": "nosniff",
    });
    response.end(method === "HEAD" ? undefined : file);
  } catch (error) {
    if (error.code === "ENOENT" || error.code === "EISDIR") {
      sendJson(response, 404, { error: "No se encontró el archivo solicitado." });
      return;
    }
    sendJson(response, 500, { error: "No se pudo leer el archivo solicitado." });
  }
}

const server = http.createServer((request, response) => {
  const requestUrl = new URL(request.url, `http://${request.headers.host || "localhost"}`);
  if (requestUrl.pathname === "/api/status") {
    if (request.method !== "GET" && request.method !== "HEAD") {
      response.setHeader("Allow", "GET, HEAD");
      sendJson(response, 405, { error: "Método no permitido." });
      return;
    }
    sendJson(response, 200, { configured: Boolean(process.env.GEMINI_API_KEY?.trim()) });
    return;
  }
  if (requestUrl.pathname === "/api/chat") {
    handleGeminiChat(request, response);
    return;
  }
  if (request.method !== "GET" && request.method !== "HEAD") {
    response.setHeader("Allow", "GET, HEAD");
    sendJson(response, 405, { error: "Método no permitido." });
    return;
  }
  handleStaticFile(requestUrl.pathname, request.method, response);
});

server.listen(PORT, "127.0.0.1", () => {
  console.log(`SART STUDIOS Learning Dashboard disponible en http://127.0.0.1:${PORT}`);
  if (!process.env.GEMINI_API_KEY) {
    console.warn("Gemini está desactivado: configura GEMINI_API_KEY en el entorno del servidor.");
  }
});
