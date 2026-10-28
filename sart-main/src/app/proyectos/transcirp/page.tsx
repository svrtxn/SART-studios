"use client";
import { useState } from 'react';
import Link from 'next/link';

export default function Transcirp() {
  const [files, setFiles] = useState<File[]>([]);
  const [status, setStatus] = useState<'idle' | 'loading_model' | 'transcribing' | 'done'>('idle');
  const [currentFileIndex, setCurrentFileIndex] = useState(0);
  const [results, setResults] = useState<{ filename: string, text: string }[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files));
      setStatus('idle');
      setResults([]);
    }
  };

  const startTranscription = () => {
    if (files.length === 0) return;
    setStatus('loading_model');
    
    // Simular carga de modelo
    setTimeout(() => {
      setStatus('transcribing');
      processFiles(0);
    }, 2000);
  };

  const processFiles = async (index: number) => {
    if (index >= files.length) {
      setStatus('done');
      return;
    }
    setCurrentFileIndex(index);
    
    try {
      const formData = new FormData();
      formData.append("file", files[index]);

      const response = await fetch("http://localhost:8000/transcribe", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Error del servidor: ${response.status}`);
      }

      const data = await response.json();
      
      setResults(prev => [...prev, { 
        filename: data.filename || files[index].name, 
        text: data.text || (data.error ? `Error en Whisper: ${data.error}` : "Transcripción vacía.")
      }]);
    } catch (error: any) {
      setResults(prev => [...prev, { 
        filename: files[index].name, 
        text: `Error de conexión: ${error.message}. Verifica que el servidor Python (puerto 8000) esté encendido y que FFmpeg esté instalado en tu sistema.`
      }]);
    }

    processFiles(index + 1);
  };

  return (
    <main className="container" style={{ paddingTop: '6rem', paddingBottom: '6rem' }}>
      <div className="animate-fade-in">
        <Link href="/proyectos" style={{ color: 'var(--primary-blue)', marginBottom: '2rem', display: 'inline-block', fontWeight: 'bold' }}>
          &larr; Volver a Proyectos
        </Link>
        <h1 style={{ marginBottom: '1rem', fontSize: '3rem' }}>Transcirp - Herramienta</h1>
        <p className="text-muted" style={{ marginBottom: '3rem', fontSize: '1.2rem', maxWidth: '800px' }}>
          Sube tus archivos de audio y transcríbelos automáticamente con la interfaz web.
        </p>

        <div className="glass-card" style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div style={{ marginBottom: '2rem' }}>
            <h3 style={{ marginBottom: '1rem' }}>1. Subir archivos de audio</h3>
            <input 
              type="file" 
              multiple 
              accept="audio/*" 
              onChange={handleFileChange}
              style={{ 
                width: '100%', padding: '1rem', background: 'rgba(0,0,0,0.2)', 
                border: '1px dashed rgba(255,255,255,0.2)', borderRadius: '8px',
                color: 'var(--text-primary)'
              }} 
            />
            {files.length > 0 && (
              <p style={{ marginTop: '1rem', color: 'var(--primary-blue)' }}>
                Se subieron {files.length} archivo(s).
              </p>
            )}
          </div>

          <button 
            className="btn-primary" 
            onClick={startTranscription}
            disabled={files.length === 0 || status === 'loading_model' || status === 'transcribing'}
            style={{ width: '100%', opacity: files.length === 0 ? 0.5 : 1 }}
          >
            {status === 'idle' || status === 'done' ? 'Iniciar Transcripción' : 'Procesando...'}
          </button>

          {status !== 'idle' && (
            <div style={{ marginTop: '2rem', padding: '1.5rem', background: '#0d1117', borderRadius: '8px', overflowX: 'auto', border: '1px solid rgba(255,255,255,0.1)' }}>
              <pre style={{ margin: 0, fontFamily: 'monospace', color: '#c9d1d9', whiteSpace: 'pre-wrap', fontSize: '0.9rem' }}>
                {status === 'loading_model' && "Cargando el modelo de transcripción...\n"}
                {(status === 'transcribing' || status === 'done') && "Cargando el modelo de transcripción... OK\n\n"}
                
                {files.slice(0, status === 'done' ? files.length : currentFileIndex + 1).map((f, i) => (
                  <div key={i}>
                    {"============================================================\n"}
                    {`AUDIO ${i + 1}: ${f.name}\n`}
                    {"============================================================\n"}
                    {i === currentFileIndex && status === 'transcribing' ? (
                      <span style={{ color: 'var(--primary-blue)' }}>Transcribiendo... esto puede tomar unos segundos.{"\n"}</span>
                    ) : (
                      <>
                        <span style={{ color: 'var(--text-muted)' }}>Transcribiendo... OK{"\n\n"}</span>
                        <span style={{ color: 'white', fontWeight: 'bold' }}>TEXTO EXTRAÍDO:{"\n\n"}</span>
                        <span style={{ color: '#4ade80' }}>{results[i]?.text}{"\n\n"}</span>
                      </>
                    )}
                  </div>
                ))}

                {status === 'done' && (
                  <span style={{ color: 'var(--primary-blue)', fontWeight: 'bold' }}>{"\n"}¡Proceso finalizado!</span>
                )}
              </pre>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
