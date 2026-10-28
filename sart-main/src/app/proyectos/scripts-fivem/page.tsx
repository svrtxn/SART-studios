import Link from 'next/link';

export default function ScriptsFivem() {
  return (
    <main className="container" style={{ paddingTop: '6rem', paddingBottom: '6rem' }}>
      <div className="animate-fade-in">
        <Link href="/proyectos" style={{ color: 'var(--primary-blue)', marginBottom: '2rem', display: 'inline-block', fontWeight: 'bold' }}>
          &larr; Volver a Proyectos
        </Link>
        <h1 style={{ marginBottom: '1rem', fontSize: '3rem' }}>Scripts FiveM</h1>
        <p className="text-muted" style={{ marginBottom: '3rem', fontSize: '1.2rem', maxWidth: '800px' }}>
          Creación y optimización de scripts personalizados para servidores de rol en FiveM (GTA V).
        </p>
        <div className="glass-card">
          <h2>Detalles Técnicos</h2>
          <ul style={{ paddingLeft: '1.2rem', color: 'var(--text-muted)', marginTop: '1rem', lineHeight: '1.8' }}>
            <li><strong>Lenguajes:</strong> Programación avanzada utilizando Lua y JavaScript.</li>
            <li><strong>Optimización:</strong> Rigurosa revisión de rendimiento (resmon) para asegurar la fluidez constante del servidor.</li>
            <li><strong>Sistemas Creados:</strong> Desarrollo de inventarios complejos, economía virtual y trabajos personalizados para los jugadores.</li>
            <li><strong>Base de Datos:</strong> Integración robusta con bases de datos relacionales para mantener el progreso del juego.</li>
          </ul>
        </div>
      </div>
    </main>
  );
}
