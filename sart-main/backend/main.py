import os
from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
import whisper
import shutil

app = FastAPI()

# Configurar CORS para permitir que el frontend de Next.js (puerto 3000) acceda
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:3001"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Cargar el modelo en memoria globalmente
modelo = None

@app.on_event("startup")
async def startup_event():
    global modelo
    print("Cargando el modelo de transcripción de Whisper (base)...")
    # Cargar el modelo puede tardar unos segundos la primera vez
    modelo = whisper.load_model("base")
    print("Modelo cargado exitosamente.")

@app.post("/transcribe")
async def transcribe_audio(file: UploadFile = File(...)):
    global modelo
    
    # Crear carpeta temporal para guardar el audio recibido
    os.makedirs("temp", exist_ok=True)
    file_path = f"temp/{file.filename}"
    
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
    
    print(f"Transcribiendo el archivo: {file.filename}...")
    
    try:
        # Ejecutar la transcripción con Whisper
        resultado = modelo.transcribe(file_path)
        texto_completo = "\n".join([segmento["text"].strip() for segmento in resultado["segments"]])
        
        # Eliminar archivo de audio temporal
        os.remove(file_path)
        
        return {"filename": file.filename, "text": texto_completo}
    except Exception as e:
        if os.path.exists(file_path):
            os.remove(file_path)
        return {"error": str(e)}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
