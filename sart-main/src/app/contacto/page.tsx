export default function Contacto() {
  return (
    <main className="container" style={{ paddingTop: '6rem', paddingBottom: '6rem' }}>
      <div className="animate-fade-in" style={{ maxWidth: '600px', margin: '0 auto' }}>
        <h1 style={{ marginBottom: '1rem', textAlign: 'center' }}>Ponte en Contacto</h1>
        <p className="text-muted" style={{ marginBottom: '3rem', fontSize: '1.2rem', textAlign: 'center' }}>
          ¿Tienes un proyecto en mente? Escríbeme y hagámoslo realidad.
        </p>

        <div className="glass-card">
          <form style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label htmlFor="name" style={{ fontWeight: '600', fontSize: '0.95rem' }}>Nombre</label>
              <input type="text" id="name" placeholder="Tu nombre" style={{ padding: '0.85rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.2)', color: 'white', fontFamily: 'inherit', outline: 'none' }} />
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label htmlFor="email" style={{ fontWeight: '600', fontSize: '0.95rem' }}>Correo Electrónico</label>
              <input type="email" id="email" placeholder="tu@email.com" style={{ padding: '0.85rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.2)', color: 'white', fontFamily: 'inherit', outline: 'none' }} />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label htmlFor="message" style={{ fontWeight: '600', fontSize: '0.95rem' }}>Mensaje</label>
              <textarea id="message" rows={5} placeholder="Cuéntame sobre tu proyecto..." style={{ padding: '0.85rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.2)', color: 'white', fontFamily: 'inherit', resize: 'vertical', outline: 'none' }}></textarea>
            </div>

            <button type="button" className="btn-primary" style={{ marginTop: '1rem', width: '100%' }}>Enviar Mensaje</button>
          </form>
        </div>
      </div>
    </main>
  );
}
