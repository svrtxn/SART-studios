export default function CV() {
  return (
    <main className="container" style={{ paddingTop: '6rem', paddingBottom: '6rem' }}>
      <div className="animate-fade-in">
        <h1 style={{ marginBottom: '0.5rem' }}>Steffi Ryser Troncoso</h1>
        <h2 style={{ color: 'var(--primary-blue)', marginBottom: '1.5rem', fontSize: '1.5rem' }}>Desarrolladora Full Stack</h2>
        <p className="text-muted" style={{ marginBottom: '3rem', fontSize: '1.1rem', maxWidth: '900px', lineHeight: '1.8' }}>
          Ingeniera en Informática y Desarrolladora Full Stack especializada en la construcción de aplicaciones empresariales y móviles end-to-end. Sólida experiencia comercial en el ecosistema Java (Spring Boot), complementada con la creación de interfaces interactivas de alto rendimiento utilizando React y Angular. Capacidad comprobada para diseñar bases de datos híbridas e integrar despliegues en la nube (GCP), aportando valor en todo el ciclo de vida del software bajo metodologías ágiles.
        </p>

        <div className="glass-card" style={{ marginBottom: '2rem' }}>
          <h3 style={{ fontSize: '1.5rem', marginBottom: '2rem' }}>Experiencia Profesional</h3>
          
          <div style={{ marginBottom: '2rem' }}>
            <h4 style={{ color: 'var(--primary-blue)', fontSize: '1.2rem' }}>Ingeniera de Software Full Stack - Softtek</h4>
            <p className="text-muted" style={{ marginBottom: '1rem', fontSize: '0.9rem' }}>02/2026 - Actualidad</p>
            <ul style={{ paddingLeft: '1.2rem', color: 'var(--text-muted)' }}>
              <li style={{ marginBottom: '0.5rem' }}>Desarrollo y mantenimiento de servicios backend para el sector bancario (Banco Santander) utilizando Java y Spring Boot bajo Arquitectura Hexagonal.</li>
              <li style={{ marginBottom: '0.5rem' }}>Creación y exposición de APIs REST seguras para la comunicación eficiente entre microservicios y sistemas frontend.</li>
              <li style={{ marginBottom: '0.5rem' }}>Participación activa en el despliegue y automatización de ambientes utilizando contenedores en OpenShift, colaborando en GitLab/GitHub.</li>
              <li>Aseguramiento de la calidad, seguridad y rendimiento del código mediante pruebas unitarias y de estrés (JMeter).</li>
            </ul>
          </div>
          
          <div style={{ marginBottom: '2rem' }}>
            <h4 style={{ color: 'var(--primary-blue)', fontSize: '1.2rem' }}>Practicante Full Stack - Softtek</h4>
            <p className="text-muted" style={{ marginBottom: '1rem', fontSize: '0.9rem' }}>12/2025 - 01/2026</p>
            <ul style={{ paddingLeft: '1.2rem', color: 'var(--text-muted)' }}>
              <li style={{ marginBottom: '0.5rem' }}>Liderazgo técnico en la creación de un sistema de gestión de personal (RRHH), abarcando desde el diseño de la arquitectura hasta la codificación final.</li>
              <li style={{ marginBottom: '0.5rem' }}>Construcción del backend integral utilizando Java (Spring Boot) y desarrollo del Front-End en Angular (migración v12 a v18).</li>
              <li>Ejecución de pruebas unitarias exhaustivas en los entornos de Java y Angular.</li>
            </ul>
          </div>

          <div style={{ marginBottom: '2rem' }}>
            <h4 style={{ color: 'var(--primary-blue)', fontSize: '1.2rem' }}>Practicante QA Testing - Banco Falabella</h4>
            <p className="text-muted" style={{ marginBottom: '0.5rem', fontSize: '0.9rem' }}>01/2025 - 03/2025</p>
            <p style={{ color: 'var(--text-muted)' }}>Aseguramiento de la calidad en entornos ágiles, validando flujos de usuario y analizando grandes volúmenes de datos relacionales mediante SQL Developer.</p>
          </div>

          <div>
            <h4 style={{ color: 'var(--primary-blue)', fontSize: '1.2rem' }}>Encargada de Marketing - LYC Consultores</h4>
            <p className="text-muted" style={{ marginBottom: '0.5rem', fontSize: '0.9rem' }}>03/2024 - 08/2024</p>
            <p style={{ color: 'var(--text-muted)' }}>Responsable de la optimización SEO de la plataforma web corporativa.</p>
          </div>
        </div>

        <div className="glass-card" style={{ marginBottom: '2rem' }}>
          <h3 style={{ fontSize: '1.5rem', marginBottom: '2rem' }}>Educación</h3>
          
          <div>
            <h4 style={{ color: 'var(--primary-blue)', fontSize: '1.2rem' }}>Ingeniería en Informática</h4>
            <p className="text-muted" style={{ marginBottom: '0.5rem' }}>Duoc UC • 2022 - 2025</p>
            <ul style={{ paddingLeft: '1.2rem', color: 'var(--text-muted)' }}>
              <li>Especialización: Gestión de Proyectos TI.</li>
              <li>Reconocimiento Espíritu Duoc 2023</li>
            </ul>
          </div>
        </div>

        <div className="glass-card">
          <h3 style={{ fontSize: '1.5rem', marginBottom: '2rem' }}>Habilidades Técnicas</h3>
          <p style={{ color: 'var(--text-muted)', lineHeight: '1.8' }}>
            React, Angular, Node.js / Express, Java, Spring Boot, APIs RESTful, Inteligencia Artificial (Gemini, Claude, Devin), Google Cloud Platform (GCP), PostgreSQL / MySQL, MongoDB / Firebase (NoSQL), Integraciones IoT, Docker / OpenShift, Git / GitLab / GitHub, Pruebas Unitarias / JMeter.
          </p>
        </div>
      </div>
    </main>
  );
}
