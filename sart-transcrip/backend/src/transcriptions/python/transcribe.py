import sys
import json
import whisper
import warnings

# Ignore FP16 warnings on CPU
warnings.filterwarnings("ignore")

def main():
    if len(sys.argv) < 2:
        print(json.dumps({"error": "No file provided"}))
        sys.exit(1)

    audio_file = sys.argv[1]

    try:
        # 1. Cargar el modelo
        model = whisper.load_model("base")
        
        # 2. Transcribir el archivo
        result = model.transcribe(audio_file)
        
        # 3. Formatear la salida como JSON
        output = {
            "text": result["text"],
            "segments": []
        }
        
        for segment in result["segments"]:
            output["segments"].append({
                "id": segment["id"],
                "start": segment["start"],
                "end": segment["end"],
                "text": segment["text"].strip()
            })
            
        print(json.dumps(output))
    except Exception as e:
        print(json.dumps({"error": str(e)}))
        sys.exit(1)

if __name__ == "__main__":
    main()
