import Image from "next/image";
import Link from "next/link";

const products = [
  {
    id: "product-01",
    name: "SART Aprende",
    category: "01 · APRENDIZAJE & ENFOQUE",
    originNote: "Nació de mi necesidad de estudiar IA e inglés con disciplina y seguimiento por módulos.",
    logo: "/sart-aprende.png",
    description:
      "Organiza tus rutas de estudio, gestiona módulos y mantén sesiones de enfoque con técnica Pomodoro sin dispersión.",
    status: "Disponible",
    available: true,
    link: "http://127.0.0.1:3001/",
  },
  {
    id: "product-02",
    name: "SART Transcrip",
    category: "02 · AUDIO & PRODUCTIVIDAD",
    originNote: "Nació de la necesidad de capturar notas de voz y reuniones a texto estructurado al instante.",
    logo: "/sart-transcrip.png",
    description:
      "Convierte audios y notas de voz en texto legible, facilitando la revisión y extracción de puntos clave sin fricción.",
    status: "Próximamente",
    available: false,
    link: null,
  },
  {
    id: "product-03",
    name: "SART Finanzas",
    category: "03 · CONTROL FINANCIERO",
    originNote: "Nació para ordenar gastos y presupuestos personales con claridad absoluta y sin planillas complejas.",
    logo: "/sart-finanzas.png",
    description:
      "Una visión transparente para categorizar gastos, proyectar presupuestos y tomar decisiones financieras con datos claros.",
    status: "Próximamente",
    available: false,
    link: null,
  },
  {
    id: "product-04",
    name: "SART Comida",
    category: "04 · HOGAR & DESPENSA",
    originNote: "Nació para optimizar compras y saber qué cocinar aprovechando los ingredientes disponibles.",
    logo: "/sart-comida.png",
    description:
      "Control de despensa e ideas de preparaciones inteligentes según los ingredientes que ya tienes en casa para evitar desperdicios.",
    status: "Próximamente",
    available: false,
    link: null,
  },
];

const originPillars = [
  {
    index: "01",
    tag: "LA NECESIDAD",
    title: "Herramientas que yo misma necesitaba",
    description:
      "SART Studios no comenzó con planes de negocio abstractos, sino con una libreta llena de problemas propios sin resolver: la necesidad de estudiar IA e inglés con ritmo constante (SART Aprende), de transcribir audios de voz sin perder datos (SART Transcrip), de entender mis finanzas con rapidez (SART Finanzas) y de no botar comida en la cocina (SART Comida).",
  },
  {
    index: "02",
    tag: "LA INGENIERÍA",
    title: "Software artesanal con rigor técnico",
    description:
      "Cada solución se programa desde cero con estándares de ingeniería modernos: arquitectura limpia, 60 FPS reales, diseño tipográfico estricto y cero código cosmético innecesario. Si no aporta valor a la tarea del usuario, simplemente no está.",
  },
  {
    index: "03",
    tag: "LA COMPILACIÓN",
    title: "Un ecosistema que crece conmigo",
    description:
      "SART Studios reúne todos estos proyectos personales bajo una sola casa y un mismo lenguaje visual. Es un laboratorio continuo en el que cada desafío cotidiano se convierte en una herramienta utilizable y duradera.",
  },
];

export default function Home() {
  return (
    <main className="main-content">
      {/* Background ambient lighting orbs */}
      <div aria-hidden="true" className="ambient-lights">
        <div className="ambient-light-orb orb-primary" />
        <div className="ambient-light-orb orb-secondary" />
        <div className="ambient-light-orb orb-tertiary" />
        <div className="ambient-grid-overlay" />
      </div>

      {/* Hero Section */}
      <section aria-labelledby="hero-title" className="hero container">
        <div className="hero-copy-block">
          <div className="eyebrow">
            <span aria-hidden="true" className="eyebrow-dot" />
            <span>SUITE PERSONAL DE INGENIERÍA · STEFFI RYSER</span>
          </div>

          <h1 id="hero-title">
            Software nacido
            <span className="hero-title-accent">de necesidades reales.</span>
          </h1>

          <p className="hero-copy">
            SART Studios compila los softwares y herramientas que he ido desarrollando
            para resolver mis propias necesidades: dominar habilidades con foco disciplinado,
            transcribir notas al instante, controlar finanzas y organizar el día a día.
          </p>

          <div className="hero-actions">
            <a
              className="button button-primary button-directional"
              href="#productos"
            >
              <span>Explorar herramientas</span>
              <span aria-hidden="true" className="button-arrow">
                ↓
              </span>
            </a>
            <a
              className="button button-secondary button-directional"
              href="#sobre-mi"
            >
              <span>El origen de SART</span>
              <span aria-hidden="true" className="button-arrow">
                →
              </span>
            </a>
          </div>

          <div className="hero-footnote">
            <span aria-hidden="true" className="hero-footnote-line" />
            <span>Aprendizaje · Transcripción · Finanzas · Despensa diaria</span>
          </div>
        </div>

        {/* Hero Spotlight Card */}
        <a
          aria-label="Ver SART Aprende en el ecosistema"
          className="hero-spotlight interactive-spotlight"
          href="#product-01"
        >
          <div className="spotlight-header">
            <span>SUITE PERSONAL / 01 DISPONIBLE</span>
            <span className="spotlight-status">
              <span aria-hidden="true" className="eyebrow-dot" />
              SART Aprende
            </span>
          </div>

          <div className="spotlight-logo-frame">
            <Image
              alt="SART Aprende"
              className="spotlight-logo"
              fill
              priority
              sizes="(max-width: 680px) 100vw, 40vw"
              src="/sart-aprende.png"
            />
          </div>

          <div className="spotlight-footer">
            <span>MOTOR POMODORO · RUTAS DE IA E INGLÉS</span>
            <span aria-hidden="true" className="spotlight-arrow">
              ↘
            </span>
          </div>
        </a>
      </section>

      {/* Sobre Mí / Origen Section */}
      <section aria-labelledby="about-title" className="about-section container" id="sobre-mi">
        <div className="section-heading">
          <div>
            <span className="section-index">SART / 01 · ORIGEN & MANIFIESTO</span>
            <h2 id="about-title">Por qué nace SART Studios.</h2>
          </div>
          <p>
            No surge como un producto corporativo genérico. Es mi compilación personal
            de respuestas de software a retos reales que enfrento en el estudio,
            la productividad y la organización diaria.
          </p>
        </div>

        {/* Origin 3 Pillars */}
        <div className="origin-grid">
          {originPillars.map((pillar) => (
            <article
              className="origin-card interactive-spotlight"
              key={pillar.index}
            >
              <div className="origin-card-header">
                <span className="origin-index">{pillar.index}</span>
                <span className="origin-tag">{pillar.tag}</span>
              </div>
              <h3 className="origin-title">{pillar.title}</h3>
              <p className="origin-description">{pillar.description}</p>
            </article>
          ))}
        </div>

        {/* Creator Highlight Box */}
        <div className="creator-banner interactive-spotlight">
          <div className="creator-badge">
            <span aria-hidden="true" className="eyebrow-dot" />
            <span>DESARROLLO & AUTORÍA</span>
          </div>

          <div className="creator-content">
            <div className="creator-info">
              <h3 className="creator-name">Steffi Ryser Troncoso</h3>
              <p className="creator-role">
                Ingeniera en Informática · Desarrolladora Full Stack
              </p>
              <p className="creator-bio">
                Desarrollo cada software con la premisa de que las mejores herramientas son
                aquellas que resuelven una fricción real sin añadir complejidad innecesaria.
                En SART Studios junto mi experiencia técnica construyendo sistemas robustos
                con el placer de programar utilidades que uso día a día.
              </p>
            </div>

            <div className="creator-actions">
              <Link
                className="button button-primary button-directional"
                href="/cv"
              >
                <span>Ver CV / Trayectoria</span>
                <span aria-hidden="true" className="button-arrow">
                  ↗
                </span>
              </Link>
              <Link
                className="button button-secondary button-directional"
                href="/contacto"
              >
                <span>Contactar</span>
                <span aria-hidden="true" className="button-arrow">
                  →
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Ecosistema de Productos Section */}
      <section aria-labelledby="products-title" className="products-section container" id="productos">
        <div className="section-heading">
          <div>
            <span className="section-index">SART / 02 · CATÁLOGO DE PROYECTOS</span>
            <h2 id="products-title">Las herramientas compiladas.</h2>
          </div>
          <p>
            Cada herramienta aborda un área crítica: aprendizaje enfocado, captura y transcripción
            de información, control presupuestario y administración de despensa.
          </p>
        </div>

        <div className="products-grid">
          {products.map((product, index) => (
            <article
              className={`product-card interactive-spotlight${
                index === 0 || index === products.length - 1 ? " product-card-wide" : ""
              }${index === 0 ? " product-card-featured" : ""}`}
              id={product.id}
              key={product.name}
            >
              <div className="product-logo-frame">
                <Image
                  alt={`Logo de ${product.name}`}
                  className="product-logo-image"
                  fill
                  sizes="(max-width: 680px) 100vw, (max-width: 1024px) 50vw, 600px"
                  src={product.logo}
                />
              </div>

              <div className="product-card-content">
                <div className="product-meta">
                  <span aria-hidden="true" className="product-index">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span
                    className={`status${product.available ? " status-ready" : ""}`}
                  >
                    {product.available && (
                      <span className="eyebrow-dot" aria-hidden="true" />
                    )}
                    {product.status}
                  </span>
                </div>

                <span className="product-category">{product.category}</span>
                <h3>{product.name}</h3>
                <p className="product-origin-note">{product.originNote}</p>
                <p className="product-description">{product.description}</p>

                {product.available ? (
                  <a
                    className="button button-primary button-directional"
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
                  <div className="product-card-footer-disabled">
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
            </article>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="site-footer">
        <div className="container footer-inner">
          <div className="footer-left">
            <span className="footer-brand">SART STUDIOS</span>
            <p className="footer-note">
              Laboratorio y suite personal de software. Desarrollado por Steffi Ryser.
            </p>
          </div>
          <div className="footer-nav">
            <Link className="footer-link" href="#sobre-mi">
              Sobre mí
            </Link>
            <Link className="footer-link" href="#productos">
              Productos
            </Link>
            <Link className="footer-link" href="/cv">
              CV
            </Link>
            <Link className="footer-link" href="/contacto">
              Contacto
            </Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
