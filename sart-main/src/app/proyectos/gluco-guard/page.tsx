import Link from 'next/link';

export default function GlucoGuard() {
  return (
    <main className="container" style={{ paddingTop: '6rem', paddingBottom: '6rem' }}>
      <div className="animate-fade-in">
        <Link href="/proyectos" style={{ color: 'var(--primary-blue)', marginBottom: '2rem', display: 'inline-block', fontWeight: 'bold' }}>
          &larr; Volver a Proyectos
        </Link>
        <h1 style={{ marginBottom: '1rem', fontSize: '3rem' }}>Gluco Guard</h1>
        <p className="text-muted" style={{ marginBottom: '3rem', fontSize: '1.2rem', maxWidth: '800px' }}>
          Aplicación móvil de monitoreo de glucosa en tiempo real con integración de sensores. Proyecto de título desarrollado de 03/2025 a 11/2025.
        </p>
        <div className="glass-card">
          <h2>Detalles Técnicos</h2>
          <ul style={{ paddingLeft: '1.2rem', color: 'var(--text-muted)', marginTop: '1rem', lineHeight: '1.8' }}>
            <li><strong>Frontend:</strong> React para la visualización de datos generados por los sensores.</li>
            <li><strong>Backend:</strong> Express (Node.js) para procesar la información de los sensores FreeStyle de manera eficiente.</li>
            <li><strong>Base de Datos:</strong> Firebase (NoSQL) para alertas en tiempo real y sincronización; MySQL para el almacenamiento seguro del historial médico.</li>
            <li><strong>Infraestructura:</strong> Entorno y despliegue configurados utilizando Google Cloud Platform (GCP).</li>
          </ul>
        </div>
      </div>
    </main>
  );
}
