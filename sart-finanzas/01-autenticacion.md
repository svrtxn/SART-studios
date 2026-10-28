# Módulo de autenticación, onboarding, perfil de usuario y dispositivos

La aplicación debe incorporar un sistema completo de **registro, inicio de sesión, recuperación de cuenta, configuración de usuario, onboarding y administración de dispositivos y conexiones externas**.

Este módulo debe ser considerado parte fundamental de la arquitectura, ya que todas las cuentas bancarias, movimientos, metas, presupuestos, automatizaciones y configuraciones deben estar asociadas a un usuario.

---

# 1. Registro de usuario

Crear una pantalla de registro moderna y sencilla.

Campos mínimos:

* Nombre.
* Apellido.
* Correo electrónico.
* Contraseña.
* Confirmación de contraseña.

Validar:

* Correo válido.
* Correo no registrado previamente.
* Contraseña segura.
* Coincidencia de contraseñas.
* Campos obligatorios.

Opcionalmente permitir posteriormente agregar:

* Teléfono.
* Foto de perfil.
* Moneda principal.
* País.
* Zona horaria.

Al finalizar correctamente el registro, el usuario debe quedar autenticado y comenzar el proceso de onboarding.

---

# 2. Inicio de sesión

Crear una pantalla de inicio de sesión con:

* Correo electrónico.
* Contraseña.
* Recordarme.
* Recuperar contraseña.
* Crear cuenta.

Opcionalmente preparar la arquitectura para:

* Google.
* Apple.
* Microsoft.

Las autenticaciones externas deben utilizar mecanismos oficiales como OAuth/OpenID Connect.

---

# 3. Recuperación de contraseña

Implementar:

> "¿Olvidaste tu contraseña?"

Flujo:

```text id="t0t1b"
Usuario ingresa correo
        ↓
Sistema valida que la cuenta exista
        ↓
Envía enlace/token de recuperación
        ↓
Usuario establece nueva contraseña
        ↓
Contraseña actualizada
        ↓
Puede iniciar sesión nuevamente
```

El token debe:

* Tener expiración.
* Ser de un solo uso.
* No almacenar la contraseña.
* Invalidarse después de utilizarse.

---

# 4. Onboarding / Tutorial inicial

Cuando un usuario se registre por primera vez o ingrese por primera vez a la aplicación, debe mostrarse automáticamente un **tutorial de bienvenida**.

IMPORTANTE:

El tutorial no debe aparecer cada vez que el usuario inicia sesión.

Debe mostrarse solamente cuando corresponda, por ejemplo:

* Usuario recién registrado.
* Usuario que todavía no ha completado el onboarding.
* Usuario que decide reiniciar el tutorial desde configuración.

Guardar el estado del onboarding en la base de datos.

Ejemplo:

```text id="5w4mcs"
onboardingCompleted: false
```

Una vez finalizado:

```text id="sm9v67"
onboardingCompleted: true
```

---

# 5. Tutorial inicial

El tutorial debe explicar de forma breve cómo funciona la aplicación.

### Paso 1 — Bienvenida

> 👋 Bienvenido a tu centro de finanzas personales.

Explicar que la aplicación permite:

* Controlar ingresos y gastos.
* Administrar cuentas bancarias.
* Importar movimientos.
* Controlar presupuestos.
* Crear metas de ahorro.
* Automatizar registros.

### Paso 2 — Configura tus cuentas

Explicar que puede agregar sus cuentas bancarias.

> Puedes comenzar agregando una o más cuentas para conocer tu saldo total.

### Paso 3 — Categoriza tus gastos

Explicar las categorías y reglas automáticas.

### Paso 4 — Define tus límites

Ejemplo:

> "No quiero gastar más de $500.000 al mes en restaurantes."

### Paso 5 — Agrega tus gastos fijos

Ejemplo:

> Arriendo, luz, agua, internet y suscripciones.

### Paso 6 — Automatiza tus registros

Explicar que posteriormente puede conectar:

* Correos.
* Fuentes de movimientos.
* Dispositivos.
* Integraciones compatibles.

### Paso 7 — Metas de ahorro

Permitir crear una primera meta opcional.

### Paso 8 — Dashboard

Mostrar dónde podrá visualizar toda su información financiera.

---

# 6. Tutorial interactivo

El tutorial debería ser preferentemente interactivo y no solamente una serie de textos.

Por ejemplo:

```text
Bienvenido 👋

Vamos a configurar tu espacio financiero.

[Comenzar]
```

Luego:

```text
1 de 7

🏦 Tus cuentas

Aquí podrás administrar todas tus cuentas bancarias.

[Anterior] [Siguiente]
```

Al finalizar:

```text
🎉 ¡Todo listo!

Ya puedes comenzar a organizar tus finanzas.

[Ir al Dashboard]
```

Permitir:

* Siguiente.
* Anterior.
* Omitir.
* Finalizar.
* Reiniciar posteriormente desde configuración.

---

# 7. Configuración inicial opcional

Durante el onboarding se puede ofrecer una configuración rápida.

Ejemplo:

### Paso 1

Nombre:

> ¿Cómo quieres que te llamemos?

### Paso 2

Moneda principal:

> CLP $ / USD / EUR / etc.

### Paso 3

Agregar cuenta:

> ¿Quieres agregar tu primera cuenta bancaria?

### Paso 4

Ingreso mensual aproximado:

> ¿Quieres registrar un ingreso recurrente?

### Paso 5

Gastos fijos:

> ¿Tienes gastos fijos que quieras registrar?

### Paso 6

Meta:

> ¿Quieres establecer una meta de ahorro?

Todos estos pasos deben poder omitirse.

El usuario no debe estar obligado a completar toda la configuración para utilizar la aplicación.

---

# 8. Perfil de usuario

Crear un apartado:

## "Mi perfil"

Permitir administrar la información personal.

Datos:

* Nombre.
* Apellido.
* Nombre para mostrar.
* Correo principal.
* Teléfono.
* Foto de perfil.
* País.
* Moneda principal.
* Zona horaria.

Permitir editar la información.

---

# 9. Seguridad de la cuenta

Dentro del perfil/configuración agregar:

## Seguridad

Permitir:

* Cambiar contraseña.
* Ver sesiones activas.
* Cerrar sesión en otros dispositivos.
* Cerrar todas las sesiones.
* Activar/desactivar autenticación de dos factores cuando esté implementada.
* Ver actividad reciente.

Ejemplo:

```text id="z7x7dc"
SEGURIDAD

Contraseña
Última modificación: hace 3 meses

Sesiones activas
💻 Windows — Chrome
📱 iPhone — Safari

[Administrar sesiones]
```

---

# 10. Dispositivos

Crear un módulo:

## "Mis dispositivos"

Permitir visualizar dispositivos que han iniciado sesión.

Mostrar:

* Nombre del dispositivo.
* Tipo.
* Sistema operativo.
* Navegador/app.
* Última actividad.
* Fecha de vinculación.
* Ubicación aproximada si corresponde y se puede obtener de forma segura.
* Estado.

Ejemplo:

```text id="s6h49a"
💻 PC Windows
Chrome
Última actividad: Ahora
✓ Dispositivo actual

📱 iPhone
Safari
Última actividad: Hoy

💻 Notebook
Chrome
Última actividad: hace 5 días
```

Permitir:

> Cerrar sesión en este dispositivo.

---

# 11. Asociar dispositivos

Preparar la arquitectura para asociar dispositivos a la cuenta.

Esto será especialmente importante si posteriormente se desarrolla una aplicación móvil.

Ejemplo:

```text id="8fz7p7"
Usuario
│
├── PC
├── Notebook
├── iPhone
└── Tablet
```

Los dispositivos deben utilizar tokens/sesiones independientes y revocables.

No almacenar información innecesaria del dispositivo.

---

# 12. Correos asociados

Crear un apartado:

## "Correos y conexiones"

El usuario debe poder asociar una o varias cuentas de correo a su perfil.

Ejemplo:

```text id="bhc4r7"
CORREOS ASOCIADOS

✓ correo.personal@gmail.com
  Gmail
  Conectado

✓ correo.trabajo@outlook.com
  Outlook
  Conectado

[+ Agregar correo]
```

Esto permitirá utilizar el módulo de automatización financiera descrito anteriormente.

---

# 13. Gestión de correos conectados

Cada correo asociado debe permitir:

* Conectar.
* Desconectar.
* Pausar sincronización.
* Reactivar sincronización.
* Configurar qué tipos de correos analizar.
* Ver última sincronización.
* Ver cantidad de movimientos detectados.

Ejemplo:

```text id="f7s1tc"
Gmail

Estado:
✓ Conectado

Sincronización:
Automática diaria

Última sincronización:
15/08/2026 22:00

Correos analizados:
245

Movimientos detectados:
18

[Configurar]
[Pausar]
[Desconectar]
```

---

# 14. Permisos de las conexiones

El usuario debe poder controlar qué puede hacer cada conexión.

Ejemplo:

```text id="0pv1dl"
Gmail personal

Permisos

☑ Analizar correos de compras
☑ Analizar comprobantes de pago
☑ Analizar transferencias
☐ Analizar promociones

[Guardar cambios]
```

Aplicar el principio de **mínimo privilegio**.

La aplicación debe solicitar únicamente los permisos necesarios para la funcionalidad seleccionada.

---

# 15. Otras conexiones

Crear una sección preparada para futuras integraciones:

## "Conexiones"

Ejemplo:

```text id="o4c1sa"
Gmail          ✓ Conectado
Outlook        ✓ Conectado
Apple          ○ Disponible próximamente
Banco          ○ Disponible próximamente
Open Banking   ○ Disponible próximamente
```

No mostrar una integración como disponible si técnicamente todavía no existe.

---

# 16. Preferencias financieras

Dentro de configuración permitir establecer:

* Moneda principal.
* Formato de moneda.
* Formato de fecha.
* Primer día del mes financiero.
* Zona horaria.
* Categorías predeterminadas.
* Cuenta predeterminada.
* Preferencias de dashboard.

Ejemplo:

```text id="0aj0jy"
PREFERENCIAS

Moneda:
CLP ($)

Zona horaria:
America/Santiago

Cuenta predeterminada:
Banco Santander

Primer día del período:
1
```

---

# 17. Preferencias de notificaciones

Integrar con el módulo de límites y gastos fijos.

Permitir configurar:

### Límites

* 80%.
* 100%.
* Exceso del límite.

### Gastos fijos

* 7 días antes.
* 3 días antes.
* 1 día antes.
* Día de vencimiento.
* Pago vencido.

### Automatizaciones

* Nueva transacción detectada.
* Movimiento pendiente de revisión.
* Error de sincronización.
* Nueva conexión.

### Seguridad

* Nuevo inicio de sesión.
* Nuevo dispositivo.
* Cambio de contraseña.
* Cambio de correo.

---

# 18. Dashboard personalizado

Preparar la posibilidad de que el usuario pueda configurar qué información quiere visualizar.

Por ejemplo:

```text id="7k2g08"
☑ Saldo total
☑ Ingresos
☑ Egresos
☑ Límites
☑ Gastos fijos
☑ Metas
☑ Últimos movimientos
☐ Proyecciones
☐ Estadísticas avanzadas
```

En el futuro se podría permitir ordenar las tarjetas del dashboard.

---

# 19. Eliminación de cuenta

Dentro de configuración debe existir:

## "Eliminar cuenta"

Debe ser una acción claramente diferenciada de las demás.

Antes de eliminar:

1. Solicitar confirmación.
2. Explicar qué información será eliminada.
3. Permitir exportar los datos.
4. Solicitar autenticación nuevamente cuando corresponda.
5. Ejecutar eliminación/anonymización según la política de datos.

Nunca eliminar una cuenta accidentalmente con un solo clic.

---

# 20. Exportación de datos personales

Permitir al usuario solicitar una copia de sus datos.

Exportar, cuando corresponda:

* Perfil.
* Cuentas.
* Movimientos.
* Categorías.
* Límites.
* Presupuestos.
* Metas.
* Gastos fijos.
* Configuraciones.

Formatos posibles:

* JSON.
* CSV.
* Excel.

---

# 21. Modelo de datos

Integrar este módulo con el modelo existente.

Considerar entidades:

* User.
* UserProfile.
* UserPreferences.
* UserSession.
* Device.
* EmailConnection.
* ExternalConnection.
* NotificationPreference.
* OnboardingProgress.

No crear entidades duplicadas si la arquitectura existente ya resuelve alguna de estas responsabilidades.

---

# 22. Relación con el resto de la aplicación

El usuario debe ser la entidad principal de la aplicación.

Conceptualmente:

```text id="g6n8h3"
                         USER
                          │
       ┌──────────────────┼──────────────────┐
       │                  │                  │
    PROFILE            SETTINGS           DEVICES
       │                  │                  │
       │                  └──────┐           │
       │                         │           │
       ↓                         ↓           ↓
   ACCOUNTS                  AUTOMATION   SESSIONS
       │                         │
       ↓                         ↓
 TRANSACTIONS ←────────────── EMAILS
       │
 ┌─────┼──────────┬───────────┐
 ↓     ↓          ↓           ↓
LIMITS BUDGETS  GOALS    RECURRING EXPENSES
```

Todos los datos financieros deben estar aislados por usuario.

Un usuario nunca debe poder acceder a información perteneciente a otro usuario.

---

# 23. Flujo completo de un usuario nuevo

El flujo inicial recomendado es:

```text id="7v2t80"
REGISTRO
   ↓
Crear cuenta
   ↓
Autenticar usuario
   ↓
ONBOARDING
   ↓
Tutorial
   ↓
Configuración inicial opcional
   ↓
Agregar primera cuenta (opcional)
   ↓
Dashboard
```

---

# 24. Flujo de un usuario existente

```text id="4v3r3x"
LOGIN
  ↓
Validar sesión
  ↓
¿Onboarding completado?
  │
  ├── NO → Mostrar onboarding
  │
  └── SÍ
       ↓
   DASHBOARD
```

El tutorial nunca debe aparecer nuevamente de forma automática una vez completado, salvo que el usuario decida reiniciarlo.

---

# 25. Arquitectura de autenticación

Implementar autenticación utilizando buenas prácticas.

Considerar:

* Access tokens de corta duración.
* Refresh tokens seguros.
* Hash seguro de contraseñas.
* Rotación/revocación de tokens cuando corresponda.
* Expiración de sesiones.
* Protección de endpoints.
* Middleware de autenticación.
* Autorización basada en usuario.
* Rate limiting para login.
* Protección contra ataques de fuerza bruta.
* Validación de inputs.

No almacenar contraseñas en texto plano.

---

# 26. Objetivo de experiencia

La experiencia debe ser:

### Primera vez

> "Bienvenido 👋
> Vamos a configurar tu espacio financiero."

### Uso habitual

> Login → Dashboard directamente.

### Nueva conexión

> "Conecta tu correo para detectar automáticamente tus gastos."

### Nueva sesión/dispositivo

> "Se inició sesión desde un nuevo dispositivo."

### Seguridad

> "Tu cuenta está protegida y puedes administrar tus sesiones y conexiones desde Configuración."

La aplicación debe sentirse como una **plataforma financiera personal completa**, no solamente como un registro de gastos.

---

# 27. Navegación principal

La navegación podría organizarse de esta manera:

```text id="9b0kwv"
🏠 Dashboard

💳 Movimientos

🏦 Cuentas

📊 Presupuestos y límites

🔁 Gastos fijos

🎯 Metas

📈 Estadísticas

🤖 Automatizaciones

🔔 Notificaciones

⚙️ Configuración
   ├── Mi perfil
   ├── Seguridad
   ├── Dispositivos
   ├── Correos y conexiones
   ├── Preferencias
   └── Notificaciones
```

La estructura debe mantenerse simple y evitar demasiadas opciones visibles simultáneamente.

---

# 28. Consideración importante sobre privacidad

Toda funcionalidad que permita conectar:

* Correos.
* Bancos.
* Dispositivos.
* Servicios externos.

debe tratarse como información sensible.

El diseño debe priorizar:

**Privacidad → Seguridad → Control del usuario → Automatización.**

La aplicación debe permitir al usuario saber:

* Qué está conectado.
* Qué datos se están utilizando.
* Para qué se utilizan.
* Cuándo se sincronizó por última vez.
* Cómo desconectarlo.
* Cómo eliminar los datos asociados.
