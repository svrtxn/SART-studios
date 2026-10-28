@echo off
setlocal EnableExtensions EnableDelayedExpansion
set "APP_DIR=C:\Users\ryser\Desktop\SART edu"
set "APP_PORT=3000"
set "SERVER_STATUS=OFFLINE"
set "APP_URL=http://127.0.0.1:%APP_PORT%"

if not exist "%APP_DIR%\server.js" (
  echo No se encontro el sistema en:
  echo %APP_DIR%
  echo.
  pause
  exit /b 1
)

where node.exe >nul 2>nul
if errorlevel 1 (
  echo Node.js no esta instalado o no esta disponible en PATH.
  echo Instala Node.js 18 o posterior y vuelve a abrir este archivo.
  echo https://nodejs.org/
  echo.
  pause
  exit /b 1
)

for /f "delims=" %%S in ('powershell.exe -NoProfile -Command "try { $r = Invoke-RestMethod -TimeoutSec 2 '%APP_URL%/api/status'; if ($r.configured) { 'READY' } else { 'NO_KEY' } } catch { 'OFFLINE' }"') do set "SERVER_STATUS=%%S"

if "%SERVER_STATUS%"=="READY" goto app_ready
if "%SERVER_STATUS%"=="NO_KEY" if not defined GEMINI_API_KEY goto app_ready

if "%SERVER_STATUS%"=="NO_KEY" goto find_port

:find_port
powershell.exe -NoProfile -Command "if (Get-NetTCPConnection -LocalPort %APP_PORT% -State Listen -ErrorAction SilentlyContinue) { exit 1 } else { exit 0 }" >nul 2>nul
if errorlevel 1 (
  set /a APP_PORT+=1
  if !APP_PORT! GTR 3010 (
    echo No se encontro un puerto disponible para SART STUDIOS.
    echo Cierra los procesos que usan los puertos 3000 a 3010 e intenta de nuevo.
    pause
    exit /b 1
  )
  set "APP_URL=http://127.0.0.1:!APP_PORT!"
  goto find_port
)

echo Iniciando SART STUDIOS en %APP_URL%...
start "SART - Aprende - Servidor" cmd.exe /k "cd /d ""%APP_DIR%"" && set ""PORT=%APP_PORT%"" && node server.js"

echo Esperando a que el sistema este listo...
for /l %%i in (1,1,20) do (
  powershell.exe -NoProfile -Command "try { $r = Invoke-WebRequest -UseBasicParsing -TimeoutSec 2 '%APP_URL%/api/status'; if ($r.StatusCode -eq 200) { exit 0 } else { exit 1 } } catch { exit 1 }" >nul 2>nul
  if not errorlevel 1 goto app_ready
  timeout /t 1 /nobreak >nul
)

echo No se pudo iniciar el sistema en %APP_URL%.
echo Revisa la ventana del servidor para ver el error.
echo Si el puerto 3000 esta ocupado por otra aplicacion, cierrala e intenta de nuevo.
pause
exit /b 1

:app_ready
if "%SERVER_STATUS%"=="NO_KEY" if not defined GEMINI_API_KEY (
  echo Gemini no esta configurado en la instancia activa; el chat no respondera hasta configurar GEMINI_API_KEY.
)
start "" "%APP_URL%"
echo SART STUDIOS esta abierto en tu navegador.
exit /b 0
