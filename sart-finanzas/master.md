# INSTRUCCIÓN MAESTRA — MÓDULOS PENDIENTES

A partir de este punto, implementar únicamente los módulos que todavía faltan en el proyecto.

**NO modificar ni rehacer funcionalidades existentes salvo que sea estrictamente necesario para integrar correctamente los nuevos módulos.**

Los módulos pendientes deben desarrollarse estrictamente en el siguiente orden:

---

# ORDEN OBLIGATORIO

```text id="f4h7u3"
1. AUTENTICACIÓN, USUARIOS Y SESIONES
              ↓
2. CIFRADO Y SEGURIDAD
              ↓
3. TÉRMINOS, PRIVACIDAD Y POLÍTICAS
              ↓
4. GASTOS, LÍMITES Y GASTOS FIJOS
              ↓
5. AUTOMATIZACIÓN
              ↓
6. NOTIFICACIONES
              ↓
7. INTEGRACIONES
              ↓
8. TESTING Y AUDITORÍA
```

No avanzar automáticamente al siguiente módulo.

Cada módulo debe quedar correctamente implementado, integrado y probado antes de comenzar el siguiente.

---

# 1. AUTENTICACIÓN, USUARIOS Y SESIONES

Implementar primero el sistema de identidad del usuario.

Debe incluir:

* Registro.
* Inicio de sesión.
* Cierre de sesión.
* Recuperación de contraseña.
* Cambio de contraseña.
* Perfil de usuario.
* Nombre.
* Apellido.
* Correo.
* Teléfono.
* Preferencias.
* Sesiones activas.
* Dispositivos.
* Revocación de sesiones.
* Protección de endpoints.

También implementar el onboarding inicial.

### Primer ingreso

Cuando el usuario se registre por primera vez:

```text id="9m4n2w"
Registro
 ↓
Cuenta creada
 ↓
Inicio de sesión automático
 ↓
Tutorial / Onboarding
 ↓
Configuración inicial opcional
 ↓
Dashboard
```

El tutorial debe mostrarse únicamente cuando corresponda.

No mostrarlo nuevamente en cada inicio de sesión.

Guardar el estado del onboarding.

También preparar la arquitectura para:

* Múltiples dispositivos.
* Correos asociados.
* Futuras autenticaciones externas.

---

# 2. CIFRADO Y SEGURIDAD

Implementar inmediatamente después de autenticación.

Esta capa debe proteger toda la información sensible existente y la que se agregará posteriormente.

Proteger especialmente:

* RUT.
* Número de cuenta.
* Información bancaria.
* Teléfono.
* Información financiera.
* Tokens.
* Credenciales externas.
* Datos provenientes de correos.
* Cartolas.
* Archivos financieros.

### Contraseñas

No cifrar contraseñas.

Utilizar hashing seguro, preferentemente:

* Argon2id.
* bcrypt como alternativa.

### Datos recuperables

Los datos sensibles que necesiten ser recuperados deben almacenarse mediante cifrado apropiado.

Las claves de cifrado nunca deben estar:

* En el código.
* En Git.
* En la base de datos junto al dato cifrado.

Utilizar:

* Variables de entorno durante desarrollo.
* Secret management en producción.
* KMS cuando corresponda.

También implementar:

* HTTPS/TLS.
* Validación de inputs.
* Rate limiting.
* Protección contra fuerza bruta.
* Control de acceso.
* Logs sin información sensible.
* Protección de archivos.
* Protección de backups.
* Gestión segura de tokens.

---

# 3. TÉRMINOS, PRIVACIDAD Y POLÍTICAS

Una vez implementada la identidad y seguridad, crear el sistema legal/documental.

Debe incluir:

### Términos y Condiciones

Definir:

* Uso de la plataforma.
* Responsabilidades.
* Limitaciones.
* Propiedad intelectual.
* Disponibilidad.
* Terminación de cuentas.
* Modificaciones del servicio.
* Legislación aplicable.

### Política de Privacidad

Definir:

* Datos recopilados.
* Uso de datos.
* Almacenamiento.
* Seguridad.
* Conservación.
* Eliminación.
* Terceros.
* Integraciones.
* Derechos del usuario.

### Política de Seguridad

Explicar las medidas generales utilizadas para proteger la información.

### Política de Cookies

Implementar únicamente si realmente se utilizan cookies o tecnologías equivalentes que requieran documentación/consentimiento.

### Sistema legal

Implementar:

* Versionado.
* Registro de aceptación.
* Fecha de aceptación.
* Historial.
* Nuevas versiones.
* Solicitud de nueva aceptación cuando corresponda.

El usuario debe poder consultar los documentos desde configuración.

**El contenido legal definitivo debe ser revisado por un profesional legal antes de producción.**

---

# 4. GASTOS, LÍMITES Y GASTOS FIJOS

Implementar el sistema de control financiero adicional sobre los movimientos existentes.

### Límites

Permitir establecer:

* Límite mensual.
* Límite semanal.
* Límite anual.
* Categoría.
* Subcategoría.
* Cuenta específica.
* Todas las cuentas.

Ejemplo:

```text id="r6fs5q"
Salidas a comer
Límite: $500.000
Advertencia: 80%
Límite: 100%
```

Implementar estados:

* Normal.
* Advertencia.
* Alcanzado.
* Excedido.

No generar alertas duplicadas.

---

### Gastos fijos

Permitir registrar:

* Arriendo.
* Agua.
* Luz.
* Internet.
* Telefonía.
* Suscripciones.
* Seguros.
* Créditos.
* Otros pagos recurrentes.

Cada uno debe permitir:

* Nombre.
* Monto.
* Moneda.
* Cuenta.
* Categoría.
* Frecuencia.
* Día de pago.
* Fecha de inicio.
* Fecha de término.
* Monto fijo/variable.
* Estado.
* Recordatorio.

Diferenciar:

```text id="e7g1b5"
Gasto programado
≠
Gasto realmente pagado
```

Cuando el usuario confirme un pago, crear o asociar el movimiento correspondiente.

Nunca generar duplicados.

---

# 5. AUTOMATIZACIÓN

Una vez que el sistema financiero y los gastos estén funcionando, implementar la automatización.

Objetivo:

> Reducir al mínimo el registro manual de movimientos.

Fuentes iniciales:

* PDF.
* CSV.
* Excel.
* Correos.

Futuras fuentes:

* Open Banking.
* APIs bancarias.
* Apple u otras plataformas, únicamente mediante mecanismos oficiales disponibles.

Implementar arquitectura basada en providers/adapters:

```text id="9h1e0v"
ImportProvider
├── PDFProvider
├── CSVProvider
├── EmailProvider
├── OpenBankingProvider
└── FutureProviders
```

Implementar:

* Extracción.
* Normalización.
* Detección de duplicados.
* Categorización automática.
* Reglas personalizadas.
* Nivel de confianza.
* Bandeja de revisión.
* Historial de importaciones.
* Sincronización.

No asumir que una plataforma dispone de una API que permita obtener información financiera.

Antes de implementar una integración, verificar técnicamente su disponibilidad y restricciones.

Nunca utilizar métodos no oficiales para acceder a información privada.

---

# 6. NOTIFICACIONES

Después de implementar límites, gastos fijos y automatización, crear un sistema centralizado de notificaciones.

Tipos:

### Límites

* 80%.
* 100%.
* Excedido.

### Gastos fijos

* Próximo vencimiento.
* Día de pago.
* Pago vencido.

### Automatización

* Nuevo movimiento detectado.
* Movimiento pendiente de revisión.
* Error de sincronización.

### Seguridad

* Nuevo inicio de sesión.
* Nuevo dispositivo.
* Cambio de contraseña.
* Nueva conexión.

### Metas

* Progreso.
* Fecha próxima.

El sistema debe evitar notificaciones repetidas.

Permitir configurar las preferencias del usuario.

---

# 7. INTEGRACIONES

Implementar después de que estén listas la automatización y las notificaciones.

Crear un sistema centralizado para administrar conexiones externas.

Inicialmente preparar:

* Gmail.
* Outlook.
* Dispositivos.
* Futuras integraciones bancarias.
* Open Banking.
* Apple cuando exista una integración oficial adecuada.

Cada conexión debe permitir:

* Conectar.
* Desconectar.
* Pausar.
* Reactivar.
* Ver permisos.
* Ver última sincronización.
* Revocar acceso.

Las credenciales y tokens deben estar protegidos mediante la capa de seguridad implementada anteriormente.

El usuario debe saber qué datos está autorizando.

---

# 8. TESTING Y AUDITORÍA

Este módulo debe ejecutarse durante el desarrollo, pero la **auditoría final completa** debe realizarse después de implementar todos los módulos anteriores.

Realizar pruebas:

### Autenticación

* Registro.
* Login.
* Logout.
* Recuperación.
* Sesiones.
* Dispositivos.
* Revocación.

### Seguridad

* Acceso no autorizado.
* Acceso entre usuarios.
* Manipulación de IDs.
* SQL Injection.
* XSS.
* Fuerza bruta.
* Tokens inválidos.
* Tokens expirados.
* Exposición de información sensible.

### Gastos

* Límites.
* 80%.
* 100%.
* Exceso.
* Gastos fijos.
* Vencimientos.
* Pagos.
* Duplicados.

### Automatización

* Importación.
* Parsers.
* Datos incompletos.
* Duplicados.
* Categorización.
* Revisión manual.
* Errores de sincronización.

### Notificaciones

* No duplicación.
* Umbrales.
* Vencimientos.
* Preferencias.
* Revocación.

### Integraciones

* OAuth.
* Permisos.
* Desconexión.
* Tokens.
* Errores externos.

---

# REGLA DE AVANCE

Para cada módulo seguir siempre este proceso:

```text id="l6y0k1"
ANALIZAR
   ↓
DISEÑAR
   ↓
IMPLEMENTAR
   ↓
INTEGRAR
   ↓
TESTEAR
   ↓
REVISAR SEGURIDAD
   ↓
DOCUMENTAR
   ↓
APROBAR
   ↓
SIGUIENTE MÓDULO
```

No comenzar el siguiente módulo hasta completar el anterior.

---

# REGLA DE COMPATIBILIDAD

Antes de modificar una funcionalidad existente:

1. Revisar su implementación actual.
2. Identificar dependencias.
3. Evaluar impacto.
4. Mantener compatibilidad.
5. Evitar duplicar entidades.
6. Evitar duplicar lógica.
7. Reutilizar servicios existentes cuando corresponda.

Si una modificación es necesaria, explicarla antes de realizarla.

---

# REGLA DE SEGURIDAD

En cada módulo responder obligatoriamente:

```text id="6h4t1z"
¿Qué datos sensibles maneja?
¿Cómo se almacenan?
¿Cómo se transmiten?
¿Quién puede acceder?
¿Necesitan cifrado?
¿Se generan logs?
¿Cómo se eliminan?
¿Se comparten con terceros?
```

No considerar terminado un módulo si introduce una vulnerabilidad conocida.

---

# REGLA FINAL

No priorizar velocidad sobre calidad.

La prioridad del desarrollo será:

**1. Seguridad**

**2. Integridad de los datos financieros**

**3. Arquitectura**

**4. Funcionalidad**

**5. Experiencia de usuario**

**6. Rendimiento**

Una funcionalidad se considera terminada solamente cuando está **implementada, integrada, validada, testeada y documentada**.
