# Módulo legal, términos, privacidad y políticas de seguridad

La aplicación debe contar con un módulo dedicado a la **gestión, visualización y aceptación de documentos legales y políticas relacionadas con el uso de la plataforma y el tratamiento de información personal y financiera**.

Este módulo debe diseñarse desde el inicio del proyecto y no incorporarse solamente antes del lanzamiento.

> IMPORTANTE: el contenido legal definitivo debe ser revisado y validado por un profesional legal competente, especialmente considerando que la aplicación manejará información financiera y datos personales.

---

# 1. Documentos legales

La aplicación debe contemplar, como mínimo, los siguientes documentos:

### Términos y Condiciones

Debe establecer:

* Qué es la aplicación.
* Qué servicios proporciona.
* Qué puede y no puede hacer.
* Responsabilidades del usuario.
* Responsabilidades del servicio.
* Uso permitido.
* Conductas prohibidas.
* Limitaciones del servicio.
* Disponibilidad del servicio.
* Propiedad intelectual.
* Terminación de cuentas.
* Modificaciones del servicio.
* Limitaciones de responsabilidad.
* Legislación aplicable.
* Mecanismos de contacto.

---

### Política de Privacidad

Debe explicar de manera clara:

* Qué datos se recopilan.
* Para qué se recopilan.
* Cómo se utilizan.
* Cómo se almacenan.
* Cómo se protegen.
* Durante cuánto tiempo se conservan.
* Con quién pueden compartirse.
* Qué proveedores externos pueden procesarlos.
* Cómo se manejan las integraciones con correo.
* Cómo se manejan los datos financieros.
* Cómo se procesan las cartolas.
* Cómo se gestionan las cookies o tecnologías similares.
* Derechos del usuario.
* Procedimiento para solicitar eliminación de datos.
* Procedimiento para solicitar una copia de los datos.
* Información de contacto.

---

### Política de Seguridad

Crear un documento específico que explique, a nivel apropiado para el usuario, las medidas de seguridad implementadas.

Debe contemplar:

* Cifrado de datos sensibles.
* HTTPS/TLS.
* Hashing de contraseñas.
* Protección de tokens.
* Control de acceso.
* Protección de archivos.
* Protección de backups.
* Gestión de sesiones.
* Gestión de dispositivos.
* Auditoría.
* Gestión de incidentes.
* Actualizaciones de seguridad.

No revelar información técnica que pueda facilitar ataques contra la infraestructura.

---

### Política de Cookies y tecnologías similares

Si la aplicación utiliza cookies, almacenamiento local, analítica u otras tecnologías de seguimiento, documentar:

* Qué tecnologías se utilizan.
* Para qué se utilizan.
* Qué información recopilan.
* Cómo puede gestionarlas el usuario.

No implementar tecnologías de seguimiento innecesarias.

---

# 2. Aceptación durante el registro

El usuario debe aceptar los documentos correspondientes antes de completar el registro.

Ejemplo:

```text
☐ Acepto los Términos y Condiciones.

☐ He leído la Política de Privacidad.

☐ Acepto el tratamiento de mis datos conforme a la Política de Privacidad.
```

No utilizar una aceptación ambigua como:

> "Al crear una cuenta aceptas todo."

Los documentos deben poder abrirse y leerse directamente desde el formulario.

---

# 3. Registro de consentimiento

La aplicación debe guardar evidencia de la aceptación.

No almacenar solamente:

```text
termsAccepted = true
```

Registrar información suficiente para saber:

* Usuario.
* Documento aceptado.
* Versión del documento.
* Fecha y hora.
* Tipo de aceptación.
* Versión de la aplicación cuando corresponda.

Ejemplo conceptual:

```text
Consent
├── userId
├── documentType
├── documentVersion
├── acceptedAt
└── applicationVersion
```

---

# 4. Versionado de documentos

Los documentos legales deben tener versiones.

Ejemplo:

```text
Términos y Condiciones
v1.0
v1.1
v2.0
```

Cuando se modifique un documento importante, conservar las versiones anteriores para poder identificar qué versión aceptó cada usuario.

No sobrescribir silenciosamente documentos previamente aceptados.

---

# 5. Cambios importantes en las políticas

Si se modifica una política de manera relevante:

1. Crear una nueva versión.
2. Registrar la fecha de entrada en vigencia.
3. Informar al usuario.
4. Solicitar una nueva aceptación cuando corresponda.
5. Registrar la nueva aceptación.

Ejemplo:

```text
⚠️ Hemos actualizado nuestros Términos y Condiciones.

Versión anterior: 1.0
Nueva versión: 1.1

[Ver cambios]

[Revisar y aceptar]
```

---

# 6. Historial de documentos

Crear una sección:

## "Documentos legales"

Permitir al usuario consultar:

* Términos y Condiciones.
* Política de Privacidad.
* Política de Seguridad.
* Política de Cookies.

Mostrar:

```text
Términos y Condiciones
Versión aceptada: 1.1
Aceptado: 15/08/2026

Política de Privacidad
Versión aceptada: 1.0
Aceptado: 15/08/2026
```

---

# 7. Acceso desde la aplicación

Los documentos deben estar disponibles permanentemente desde:

```text
Configuración
    ↓
Legal y privacidad
```

También deberían estar disponibles desde:

* Registro.
* Inicio de sesión cuando corresponda.
* Footer.
* Pantallas relacionadas con conexiones externas.

---

# 8. Conexiones externas

Antes de conectar servicios externos que puedan acceder a información del usuario, mostrar información clara sobre:

* Qué servicio se conectará.
* Qué información se solicitará.
* Para qué se utilizará.
* Qué permisos se requieren.
* Cómo desconectarlo.

Ejemplo:

```text
Conectar Gmail

La aplicación solicitará permiso para analizar determinados
correos relacionados con compras y pagos.

No necesitamos tu contraseña.

Puedes desconectar esta cuenta en cualquier momento.

[Cancelar] [Conectar Gmail]
```

---

# 9. Consentimiento específico para automatización

No asumir que aceptar los términos generales significa automáticamente aceptar todas las integraciones.

Las conexiones de:

* Gmail.
* Outlook.
* Bancos.
* Open Banking.
* Otros servicios externos.

deben tener sus propios flujos de autorización.

El usuario debe saber exactamente qué está autorizando.

---

# 10. Eliminación de cuenta y datos

Desde configuración debe existir:

**Eliminar mi cuenta**

Antes de confirmar:

* Explicar qué datos serán eliminados.
* Informar sobre posibles períodos de conservación cuando correspondan.
* Permitir exportar información.
* Revocar conexiones externas.
* Revocar sesiones.
* Revocar tokens.
* Eliminar o anonimizar información según corresponda.

---

# 11. Solicitud de datos

Crear una funcionalidad:

**"Descargar mis datos"**

El usuario debería poder solicitar una copia de la información asociada a su cuenta.

Considerar:

* Perfil.
* Cuentas.
* Movimientos.
* Categorías.
* Presupuestos.
* Límites.
* Gastos fijos.
* Metas.
* Configuraciones.
* Conexiones.
* Consentimientos.

---

# 12. Política de retención

Definir para cada tipo de información:

* Por qué se conserva.
* Durante cuánto tiempo.
* Cuándo se elimina.
* Si debe conservarse por obligaciones legales.
* Cómo se elimina.

Ejemplo conceptual:

```text
Datos de usuario
→ mientras la cuenta esté activa

Sesiones
→ hasta expiración/revocación

Tokens externos
→ mientras la conexión esté activa

Archivos PDF
→ solamente durante el período necesario

Logs
→ según política de retención

Consentimientos
→ conservar evidencia según corresponda
```

Los períodos definitivos deben ser determinados considerando las obligaciones legales aplicables.

---

# 13. Seguridad y cumplimiento

La implementación debe diferenciar entre:

### Seguridad técnica

Protección de:

* Contraseñas.
* Tokens.
* Datos bancarios.
* RUT.
* Correos.
* Archivos.
* Sesiones.

### Privacidad

Control sobre:

* Recopilación.
* Uso.
* Conservación.
* Eliminación.
* Compartición.

### Documentación legal

Definición de:

* Términos.
* Condiciones.
* Responsabilidades.
* Consentimientos.
* Políticas.

Estas tres áreas deben trabajar juntas, pero no deben confundirse.

---

# 14. Administración de documentos

Preparar el backend para que los documentos legales puedan actualizarse sin necesidad de modificar el código de autenticación.

Considerar una estructura:

```text
LegalDocument
├── id
├── type
├── version
├── title
├── content
├── status
├── effectiveFrom
└── createdAt
```

Y:

```text
UserConsent
├── id
├── userId
├── documentId
├── version
├── acceptedAt
└── metadata
```

---

# 15. Flujo completo de registro

El flujo recomendado sería:

```text
REGISTRO
   ↓
Datos personales
   ↓
Validación
   ↓
Términos y Condiciones
   ↓
Política de Privacidad
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
DASHBOARD
```

---

# 16. Regla fundamental

La aplicación no debe considerar que:

> "Seguridad = tener login."

La seguridad debe ser transversal a todo el sistema.

Debe existir desde el diseño:

**Autenticación → Autorización → Cifrado → Gestión de secretos → Privacidad → Consentimiento → Auditoría → Eliminación segura**

Todas las nuevas funcionalidades deben respetar estas capas.

---

# 17. Importante para el proyecto

Antes de publicar la aplicación, realizar una revisión legal y de seguridad independiente.

El contenido generado durante el desarrollo debe considerarse un **borrador técnico**, no asesoría legal.

La versión definitiva de:

* Términos y Condiciones.
* Política de Privacidad.
* Política de Cookies.
* Política de Seguridad.
* Consentimientos.
* Retención de datos.

debe ser revisada según la legislación aplicable y el país donde se ofrecerá el servicio.
