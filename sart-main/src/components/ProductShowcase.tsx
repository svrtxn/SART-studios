"use client";

import Image from "next/image";
import { useState } from "react";

const products = [
  {
    id: "product-01",
    index: "01",
    name: "SART Aprende",
    category: "APRENDIZAJE & FOCO",
    origin:
      "Nació de mi necesidad de estudiar IA e inglés con ritmo constante, técnica Pomodoro y seguimiento estricto por módulos.",
    description:
      "Panel de autoaprendizaje con motor Pomodoro, rutas críticas y módulos interactivos diseñados para avanzar sin dispersión.",
    status: "Disponible",
    available: true,
    logo: "/sart-aprende.png",
    invertLogo: true,
    link: "http://127.0.0.1:3001/",
    tags: ["Técnica Pomodoro", "Ruta IA Engineer", "Inglés EF"],
  },
  {
    id: "product-02",
    index: "02",
    name: "SART Transcrip",
    category: "AUDIO A TEXTO",
    origin:
      "Nació de la necesidad de capturar notas de voz y reuniones a texto estructurado al instante sin pagar suscripciones abusivas.",
    description:
      "Motor de audio a texto para transcribir ideas al vuelo, reuniones y notas de voz con extracción automática de puntos clave.",
    status: "Próximamente",
    available: false,
    logo: "/sart-transcrip.png",
    invertLogo: true,
    link: null,
    tags: ["Transcripción", "Resúmenes", "Notas de voz"],
  },
  {
    id: "product-03",
    index: "03",
    name: "SART Finanzas",
    category: "FINANZAS PERSONALES",
    origin:
      "Nació para ordenar gastos y presupuestos personales con claridad absoluta y sin planillas complejas de Excel.",
    description:
      "Control presupuestario inteligente, categorización de gastos y métricas visuales para tomar decisiones con certeza.",
    status: "Próximamente",
    available: false,
    logo: "/sart-finanzas.png",
    invertLogo: false,
    link: null,
    tags: ["Presupuestos", "Control de gastos", "Métricas"],
  },
  {
    id: "product-04",
    index: "04",
    name: "SART Comida",
    category: "DESPENSA & COCINA",
    origin:
      "Nació para optimizar compras y saber qué cocinar aprovechando los ingredientes que ya tenía disponibles en casa.",
    description:
      "Gestor de despensa con sugerencias culinarias según tus ingredientes actuales para evitar el desperdicio de comida.",
    status: "Próximamente",
    available: false,
    logo: "/sart-comida.png",
    invertLogo: false,
    link: null,
    tags: ["Inventario despensa", "Cero desperdicio", "Recetas"],
  },
];

export default function ProductShowcase() {
  const [activeId, setActiveId] = useState("product-01");

  return (
    <div className="showcase-wrapper">
      <div className="showcase-pillars">
        {products.map((product) => {
          const isActive = activeId === product.id;

          return (
            <div
              className={`pillar-card ${isActive ? "pillar-active" : "pillar-collapsed"}`}
              key={product.id}
              onClick={() => setActiveId(product.id)}
              onMouseEnter={() => setActiveId(product.id)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  setActiveId(product.id);
                }
              }}
            >
              {/* Pillar Ambient Glow */}
              <div className="pillar-glow" />

              {/* Collapsed State View */}
              <div className="pillar-collapsed-content" aria-hidden={isActive}>
                <span className="pillar-vertical-index">{product.index}</span>
                <div className="pillar-vertical-title-wrap">
                  <span className="pillar-vertical-title">{product.name}</span>
                </div>
                <div className="pillar-collapsed-footer">
                  <span
                    className={`pillar-collapsed-dot ${product.available ? "dot-available" : ""}`}
                  />
                  <span className="pillar-collapsed-arrow">→</span>
                </div>
              </div>

              {/* Expanded State View */}
              <div className="pillar-expanded-content" aria-hidden={!isActive}>
                <div className="pillar-header">
                  <div className="pillar-meta">
                    <span className="pillar-index-badge">{product.index}</span>
                    <span className="pillar-category">{product.category}</span>
                  </div>
                  <span
                    className={`status ${product.available ? "status-ready" : "status-pending"}`}
                  >
                    {product.available && (
                      <span className="eyebrow-dot" aria-hidden="true" />
                    )}
                    {product.status}
                  </span>
                </div>

                {/* Seamless Floating Logo (NO white boxes!) */}
                <div className="pillar-logo-stage">
                  <div className="pillar-logo-aura" />
                  <div className="pillar-logo-wrap">
                    <Image
                      alt={`Logo de ${product.name}`}
                      className={`pillar-logo-img ${product.invertLogo ? "logo-invert" : ""}`}
                      fill
                      priority={product.id === "product-01"}
                      sizes="(max-width: 768px) 100vw, 420px"
                      src={product.logo}
                    />
                  </div>
                </div>

                <div className="pillar-info">
                  <h3 className="pillar-title">{product.name}</h3>

                  <p className="pillar-origin-quote">
                    <span className="quote-mark">“</span>
                    {product.origin}
                    <span className="quote-mark">”</span>
                  </p>

                  <p className="pillar-description">{product.description}</p>

                  <div className="pillar-tags">
                    {product.tags.map((tag) => (
                      <span className="pillar-tag-pill" key={tag}>
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="pillar-actions">
                    {product.available ? (
                      <a
                        className="button button-primary button-directional button-glow"
                        href={product.link || "#"}
                        rel="noreferrer"
                        target="_blank"
                      >
                        <span>Abrir {product.name}</span>
                        <span aria-hidden="true" className="button-arrow">
                          ↗
                        </span>
                      </a>
                    ) : (
                      <div className="pillar-btn-disabled">
                        <button
                          className="button button-disabled"
                          disabled
                          type="button"
                        >
                          En desarrollo activo
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
