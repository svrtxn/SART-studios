# Requisito transversal — Cifrado y protección de datos sensibles

La aplicación debe implementar una estrategia de **seguridad y protección de datos sensibles desde el diseño**, aplicándola tanto al frontend como al backend, base de datos, APIs, archivos importados y conexiones externas.

El principio fundamental debe ser:

> **Todo dato sensible debe estar protegido tanto durante su transmisión como durante su almacenamiento.**

No se debe almacenar información sensible en texto plano cuando exista una alternativa segura.

---

## 1. Datos que deben considerarse sensibles

Como mínimo, tratar como información sensible:

* RUT.
* Número de cuenta bancaria.
* Número de tarjeta cuando corresponda.
* Información bancaria.
* Saldos y movimientos financieros.
* Correo electrónico.
* Número de teléfono.
* Contraseñas.
* Tokens de autenticación.
* Refresh tokens.
* Tokens OAuth.
* Credenciales de servicios externos.
* Información de conexiones bancarias.
* Información obtenida desde correos electrónicos.
* Datos contenidos en cartolas bancarias.
* Documentos PDF financieros.
* Identificadores externos relacionados con cuentas financieras.
* Cualquier otro dato que pueda comprometer la privacidad o seguridad del usuario.

---

# 2. Cifrado de datos almacenados

Los datos sensibles almacenados en la base de datos deben utilizar **cifrado fuerte y estándares actuales**.

No guardar información sensible directamente como:

```text
rut = "12.345.678-9"
numeroCuenta = "123456789"
```

En su lugar, utilizar un mecanismo de cifrado apropiado para los datos que necesiten ser recuperados posteriormente.

Por ejemplo:

```text
Dato original
      ↓
Servicio de cifrado
      ↓
Dato cifrado
      ↓
Base de datos
```

La clave de cifrado **nunca debe estar almacenada dentro del código fuente ni directamente en la base de datos**.

Debe gestionarse mediante:

* Variables de entorno seguras para desarrollo.
* Secret management en producción.
* Sistema de gestión de claves (KMS) cuando corresponda.

---

# 3. Contraseñas

Las contraseñas tienen un tratamiento diferente.

**Nunca cifrar contraseñas para posteriormente descifrarlas.**

Las contraseñas deben almacenarse utilizando un algoritmo de hashing diseñado específicamente para contraseñas, por ejemplo:

* Argon2id.
* bcrypt como alternativa.

Ejemplo conceptual:

```text
Contraseña
    ↓
Argon2id
    ↓
Hash
    ↓
Base de datos
```

La aplicación nunca debe poder recuperar la contraseña original.

---

# 4. Tokens y credenciales externas

Los tokens utilizados para conexiones externas también deben protegerse.

Esto incluye:

* Access tokens.
* Refresh tokens.
* OAuth tokens.
* Credenciales de APIs.
* Tokens de proveedores de correo.
* Credenciales de futuras integraciones bancarias.

Cuando sea necesario almacenarlos para poder realizar sincronizaciones automáticas, deben mantenerse cifrados y con acceso restringido.

Nunca mostrar estos valores al usuario ni registrarlos en logs.

---

# 5. Datos en tránsito

Toda comunicación entre:

* Frontend.
* Backend.
* Base de datos cuando corresponda.
* Servicios externos.

debe utilizar canales seguros.

Para comunicaciones web:

```text
HTTPS / TLS
```

No permitir el envío de:

* Contraseñas.
* RUT.
* Datos bancarios.
* Tokens.
* Información financiera.

mediante conexiones HTTP sin cifrado.

---

# 6. Protección de la base de datos SQLite

Aunque SQLite sea una base de datos local, no asumir que por estar en un archivo está protegida.

Si la aplicación almacena información sensible en SQLite:

* El archivo de base de datos debe estar protegido.
* El acceso al archivo debe estar restringido.
* Los datos sensibles deben estar cifrados a nivel de aplicación o mediante una solución de cifrado de base de datos apropiada.
* No almacenar secretos directamente en la base de datos sin protección.
* Los backups también deben estar cifrados.

Evaluar una solución como **SQLCipher** si las necesidades de despliegue y arquitectura lo justifican.

---

# 7. Archivos financieros

Los archivos importados también deben considerarse sensibles.

Esto incluye:

* Cartolas PDF.
* CSV bancarios.
* Excel.
* Comprobantes.
* Documentos financieros.

No deben almacenarse permanentemente sin necesidad.

Cuando un archivo deba conservarse:

* Almacenarlo de forma segura.
* Restringir el acceso al usuario propietario.
* Evitar exponerlo públicamente.
* Aplicar cifrado cuando corresponda.
* Validar tipo y tamaño del archivo.
* Generar nombres internos que no revelen información sensible.

Si el archivo solamente se necesita para procesar una importación, considerar eliminarlo después del procesamiento exitoso, según la configuración de privacidad del usuario.

---

# 8. Logs y debugging

**Nunca registrar datos sensibles en logs.**

Evitar:

```text
RUT: 12.345.678-9
Cuenta: 123456789
Token: eyJhbGci...
Password: ********
```

Los logs deben utilizar información anonimizada o enmascarada.

Por ejemplo:

```text
Usuario: usr_83f2
Cuenta: ****6789
Proveedor: Gmail
Resultado: sincronización exitosa
```

Nunca registrar:

* Contraseñas.
* Tokens.
* Refresh tokens.
* Credenciales.
* Números completos de cuentas.
* Información completa de tarjetas.
* Contenido completo de correos financieros.

---

# 9. Enmascaramiento en la interfaz

La aplicación tampoco debe mostrar innecesariamente información sensible.

Por ejemplo:

```text
Cuenta bancaria

**** **** 6789
```

En lugar de:

```text
1234567890123456
```

El usuario puede disponer de una acción explícita para visualizar información adicional cuando sea estrictamente necesario.

---

# 10. Control de acceso

Todos los datos financieros deben estar asociados a un usuario.

El backend debe validar siempre que el usuario autenticado tenga permiso para acceder al recurso solicitado.

Ejemplo:

```text
GET /api/accounts/123
```

No basta con comprobar que la cuenta `123` existe.

Debe comprobarse:

```text
account.userId === authenticatedUser.id
```

Esto debe aplicarse a:

* Cuentas.
* Movimientos.
* Cartolas.
* Metas.
* Presupuestos.
* Gastos fijos.
* Correos conectados.
* Dispositivos.
* Notificaciones.
* Archivos.
* Importaciones.

Nunca confiar únicamente en el ID proporcionado por el frontend.

---

# 11. Protección del frontend

No almacenar información sensible en:

* `localStorage` innecesariamente.
* `sessionStorage` innecesariamente.
* Cookies inseguras.
* Variables globales.
* Código fuente.
* Logs del navegador.

Las sesiones y tokens deben implementarse siguiendo buenas prácticas de seguridad web.

Evitar exponer información financiera sensible en:

* URLs.
* Query parameters.
* Mensajes de error.
* Consola del navegador.

---

# 12. Variables de entorno y secretos

Nunca incluir secretos directamente en el código:

```text
API_KEY = "123456"
DATABASE_PASSWORD = "password"
ENCRYPTION_KEY = "..."
```

Utilizar variables de entorno y, en producción, un gestor de secretos apropiado.

Ejemplo:

```text
DATABASE_URL
JWT_SECRET
ENCRYPTION_KEY
OAUTH_CLIENT_SECRET
```

Los archivos `.env` no deben subirse al repositorio.

Agregar los secretos y archivos sensibles al `.gitignore`.

---

# 13. Gestión de claves de cifrado

Las claves utilizadas para cifrar información sensible deben estar separadas de los datos cifrados.

La aplicación debe contemplar:

* Rotación de claves.
* Versionado de claves.
* Protección contra exposición accidental.
* Recuperación segura.
* Separación entre ambientes.
* No incluir claves en el repositorio.

La arquitectura debe permitir cambiar una clave de cifrado sin tener que rediseñar toda la base de datos.

---

# 14. Backups

Los respaldos también deben considerarse información sensible.

Cualquier backup que contenga:

* Datos personales.
* Datos bancarios.
* Movimientos.
* Correos.
* Tokens.
* Cartolas.

debe estar protegido y cifrado.

No asumir que cifrar la base de datos principal es suficiente si existen backups sin protección.

---

# 15. Privacidad por defecto

La aplicación debe aplicar el principio de **Privacy by Design**.

Esto significa:

* Recopilar solamente los datos necesarios.
* Almacenar solamente lo necesario.
* No conservar archivos innecesariamente.
* Solicitar únicamente los permisos requeridos.
* Permitir desconectar integraciones.
* Permitir eliminar datos.
* Informar al usuario qué información se almacena.
* Evitar compartir información con terceros sin autorización.

---

# 16. Eliminación de datos

Cuando el usuario elimine información sensible, el sistema debe considerar:

* Eliminación de registros.
* Eliminación de archivos asociados.
* Revocación de tokens.
* Desconexión de integraciones.
* Eliminación de sesiones.
* Eliminación de datos derivados cuando corresponda.

También considerar cómo se comportan los backups y períodos de retención.

---

# 17. Principio de mínimo acceso

Cada componente de la aplicación debe tener solamente los permisos necesarios.

Por ejemplo:

```text
Frontend
   ↓
Solo consume API

API
   ↓
Accede únicamente a recursos autorizados

Servicio de correo
   ↓
Solo procesa correos autorizados

Servicio financiero
   ↓
Solo accede a información financiera necesaria
```

No otorgar permisos administrativos innecesarios.

---

# 18. Auditoría de seguridad

Registrar eventos de seguridad relevantes, sin almacenar información sensible.

Ejemplos:

* Inicio de sesión.
* Cierre de sesión.
* Nuevo dispositivo.
* Cambio de contraseña.
* Cambio de correo.
* Nueva conexión externa.
* Desconexión de una cuenta.
* Revocación de sesión.
* Exportación de datos.
* Eliminación de cuenta.

Los registros de auditoría deben identificar el evento y el usuario sin almacenar secretos o datos financieros innecesarios.

---

# 19. Regla fundamental para el desarrollo

Durante todo el desarrollo del proyecto, cualquier nueva funcionalidad debe responder primero:

> **¿Esta funcionalidad maneja información sensible?**

Si la respuesta es sí, se debe definir explícitamente:

1. Qué información se almacena.
2. Por qué se necesita.
3. Cómo se protege.
4. Quién puede acceder.
5. Cuánto tiempo se conserva.
6. Cómo se elimina.
7. Si debe cifrarse, hashearse o simplemente protegerse mediante controles de acceso.

---

# 20. Requisito obligatorio

**No considerar terminada ninguna funcionalidad que almacene información sensible hasta implementar las medidas de seguridad correspondientes.**

La seguridad no debe agregarse al final del proyecto.

Debe formar parte de la arquitectura desde el inicio.

La aplicación debe aplicar como mínimo:

**Cifrado de datos sensibles + hashing seguro de contraseñas + HTTPS/TLS + gestión segura de secretos + control de acceso por usuario + protección de archivos + protección de backups + logs sin información sensible + gestión segura de tokens.**
