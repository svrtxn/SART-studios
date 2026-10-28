@echo off
setlocal EnableExtensions

set "ROOT_DIR=%~dp0"
set "MAIN_DIR=%ROOT_DIR%sart-main"
set "LEARN_DIR=%ROOT_DIR%sart-aprende"
set "MAIN_URL=http://127.0.0.1:3000"
set "LEARN_URL=http://127.0.0.1:3001"
set "START_MAIN=1"
set "START_LEARN=1"

if not exist "%MAIN_DIR%\package.json" (
  echo No se encontro la aplicacion principal en:
  echo %MAIN_DIR%
  goto error
)

if not exist "%LEARN_DIR%\server.js" (
  echo No se encontro SART Aprende en:
  echo %LEARN_DIR%
  goto error
)

where node.exe >nul 2>nul
if errorlevel 1 (
  echo Node.js no esta instalado o no esta disponible en PATH.
  echo Instala Node.js y vuelve a ejecutar este archivo.
  goto error
)

where npm >nul 2>nul
if errorlevel 1 (
  echo npm no esta disponible. Reinstala Node.js y vuelve a ejecutar este archivo.
  goto error
)

where curl.exe >nul 2>nul
if errorlevel 1 (
  echo curl.exe no esta disponible. Actualiza Windows y vuelve a ejecutar este archivo.
  goto error
)

if not exist "%MAIN_DIR%\node_modules\next\package.json" (
  echo Instalando dependencias de SART STUDIOS por primera vez...
  pushd "%MAIN_DIR%"
  call npm install
  if errorlevel 1 (
    popd
    echo No se pudieron instalar las dependencias de SART STUDIOS.
    goto error
  )
  popd
)

curl.exe --silent --fail --max-time 2 "%MAIN_URL%/api/health" >nul 2>nul
if not errorlevel 1 set "START_MAIN=0"

curl.exe --silent --fail --max-time 2 "%LEARN_URL%/api/status" >nul 2>nul
if not errorlevel 1 set "START_LEARN=0"

if "%START_MAIN%"=="1" (
  set "CHECK_PORT=3000"
  call :check_port
  if errorlevel 1 (
    echo El puerto 3000 ya esta ocupado por otra aplicacion.
    echo Cierra esa aplicacion e intenta ejecutar este archivo nuevamente.
    goto error
  )
)

if "%START_LEARN%"=="1" (
  set "CHECK_PORT=3001"
  call :check_port
  if errorlevel 1 (
    echo El puerto 3001 ya esta ocupado por otra aplicacion.
    echo Cierra esa aplicacion e intenta ejecutar este archivo nuevamente.
    goto error
  )
)

if "%START_MAIN%"=="1" (
  echo Iniciando la web principal en %MAIN_URL%...
  start "SART STUDIOS - Web" /min /D "%MAIN_DIR%" cmd.exe /k "npm.cmd run dev -- --hostname 127.0.0.1 --port 3000"
) else (
  echo La web principal ya esta en ejecucion.
)

if "%START_LEARN%"=="1" (
  echo Iniciando SART Aprende en %LEARN_URL%...
  start "SART Aprende - Servidor" /min /D "%LEARN_DIR%" cmd.exe /k "set PORT=3001 && node server.js"
) else (
  echo SART Aprende ya esta en ejecucion.
)

echo Esperando a que la web principal responda...
for /l %%i in (1,1,45) do (
  curl.exe --silent --fail --max-time 2 "%MAIN_URL%/api/health" >nul 2>nul
  if not errorlevel 1 goto main_ready
  timeout /t 2 /nobreak >nul
)
echo La web principal no respondio. Revisa la ventana del servidor.
goto error

:main_ready
echo Esperando a que SART Aprende responda...
for /l %%i in (1,1,45) do (
  curl.exe --silent --fail --max-time 2 "%LEARN_URL%/api/status" >nul 2>nul
  if not errorlevel 1 goto all_ready
  timeout /t 2 /nobreak >nul
)
echo SART Aprende no respondio. Revisa la ventana del servidor.
goto error

:all_ready
start "" "%MAIN_URL%"
echo SART STUDIOS esta abierto en tu navegador.
echo Productos en ejecucion: SART STUDIOS y SART Aprende.
echo Los demas productos permanecen como proximamente.
exit /b 0

:error
echo.
pause
exit /b 1

:check_port
node.exe -e "const net = require('node:net'); const server = net.createServer(); server.once('error', () => process.exit(1)); server.listen(%CHECK_PORT%, '127.0.0.1', () => server.close(() => process.exit(0)))" >nul 2>nul
exit /b %ERRORLEVEL%
