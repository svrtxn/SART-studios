# Módulo de automatización e importación de movimientos financieros

Incorporar un sistema de **automatización de registros financieros** cuyo objetivo sea reducir al mínimo la necesidad de ingresar manualmente cada gasto.

La aplicación debe poder detectar, importar y procesar movimientos provenientes de diferentes fuentes, convertirlos en movimientos financieros y aplicar automáticamente categorías, cuentas y reglas.

El sistema debe estar diseñado de manera modular para permitir agregar nuevas fuentes en el futuro.

---

# 1. Objetivo

El usuario debería poder realizar una compra o recibir una confirmación de pago y que la aplicación pueda detectar automáticamente esa información.

Por ejemplo:

```text
Compra realizada
        ↓
Fuente externa
        ↓
Detector / Importador
        ↓
Procesamiento
        ↓
Detección de monto, comercio y fecha
        ↓
Categorización automática
        ↓
Detección de duplicados
        ↓
Movimiento financiero
```

El objetivo es pasar de:

> "Tengo que registrar cada gasto manualmente."

a:

> "La aplicación detecta mis gastos y yo solamente reviso o corrijo los que sean necesarios."

---

# 2. Fuentes de información

Diseñar el sistema para soportar diferentes fuentes:

### Prioridad inicial

* Correos electrónicos.
* Archivos enviados/importados por el usuario.
* Cartolas bancarias.
* CSV / Excel.

### Futuras integraciones

* Apple Wallet.
* Apple Pay.
* Google Wallet.
* Open Banking.
* APIs bancarias.
* Notificaciones bancarias.
* Aplicación móvil.
* Integraciones con otros servicios financieros.

Cada fuente debe implementarse mediante un **adapter/provider independiente**.

Ejemplo conceptual:

```text
FinancialImportProvider
│
├── EmailProvider
├── PDFProvider
├── CSVProvider
├── AppleWalletProvider
├── OpenBankingProvider
└── BankApiProvider
```

De esta manera, agregar una nueva fuente no debería requerir modificar el núcleo de procesamiento financiero.

---

# 3. Importación desde correos electrónicos

Crear una funcionalidad que permita conectar una cuenta de correo electrónico para detectar automáticamente correos relacionados con compras, pagos y transferencias.

Ejemplos:

```text
"Compra realizada con tu tarjeta"
"Pago realizado"
"Compra aprobada"
"Transferencia realizada"
"Comprobante de pago"
"Has realizado una compra por $25.990"
```

La aplicación debe analizar los correos y detectar información financiera.

---

# 4. Conexión con Gmail / Outlook

Diseñar la integración utilizando APIs oficiales y OAuth.

No almacenar directamente la contraseña del correo.

El usuario debería poder:

1. Seleccionar "Conectar correo".
2. Elegir el proveedor.
3. Autorizar el acceso.
4. Seleccionar qué tipo de correos desea analizar.
5. Definir filtros.
6. Ejecutar la sincronización.

Ejemplo:

```text
Correo conectado:
usuario@gmail.com

☑ Buscar compras
☑ Buscar pagos
☑ Buscar transferencias
☐ Buscar promociones

Período:
Últimos 30 días

[Sincronizar]
```

El sistema debe solicitar únicamente los permisos necesarios.

---

# 5. Filtros de correo

No procesar indiscriminadamente todos los correos.

Permitir configurar reglas como:

```text
Remitente:
notificaciones@banco.cl

Asunto contiene:
"Compra realizada"
```

O:

```text
Remitente:
pagos@empresa.cl

Asunto contiene:
"Pago confirmado"
```

También permitir filtros por:

* Remitente.
* Dominio.
* Asunto.
* Palabras clave.
* Cuenta asociada.

---

# 6. Extracción de información

A partir de un correo, intentar detectar:

* Fecha.
* Hora.
* Monto.
* Moneda.
* Comercio.
* Descripción.
* Tipo de movimiento.
* Últimos dígitos de tarjeta cuando estén disponibles.
* Banco.
* Cuenta asociada.
* Número de operación.
* Identificador de transacción.

Ejemplo:

Correo:

```text
Compra aprobada

Comercio: Uber Eats
Monto: $18.990
Fecha: 15/08/2026
Tarjeta terminada en 1234
```

Convertirlo en:

```text
Tipo: Egreso
Comercio: Uber Eats
Monto: $18.990
Fecha: 15/08/2026
Cuenta: Tarjeta terminada en 1234
```

---

# 7. Procesamiento mediante parsers

No asumir que todos los correos tienen el mismo formato.

Crear parsers especializados.

Ejemplo:

```text
EmailParser
│
├── SantanderPurchaseParser
├── BancoChilePurchaseParser
├── MercadoPagoParser
├── UberParser
├── RappiParser
├── GenericPurchaseParser
└── GenericPaymentParser
```

Cada parser debe poder identificar los datos relevantes de su formato.

Si no se puede determinar con suficiente confianza la información, el sistema debe enviar el registro a revisión manual.

Nunca inventar datos.

---

# 8. Categorización automática

Después de extraer un movimiento, utilizar las reglas de categorización existentes.

Ejemplo:

```text
Uber Eats
↓
Categoría: Alimentación
Subcategoría: Delivery
```

```text
Netflix
↓
Categoría: Suscripciones
```

```text
Uber
↓
Categoría: Transporte
```

La categorización debe poder combinar:

1. Reglas creadas por el usuario.
2. Coincidencias históricas.
3. Información del comercio.
4. Categorización automática opcional mediante IA.

---

# 9. Sistema de confianza

Cada movimiento automatizado debe tener un nivel de confianza.

Ejemplo:

```text
Uber Eats
$18.990

Categoría sugerida:
Alimentación → Delivery

Confianza: 96%
```

Si la confianza es alta:

> Guardar automáticamente.

Si la confianza es media:

> Guardar como "Por revisar".

Si la confianza es baja:

> Solicitar confirmación al usuario.

Los umbrales deben ser configurables.

---

# 10. Bandeja de revisión

Crear una sección:

## "Movimientos por revisar"

Aquí aparecerán los registros detectados automáticamente que requieren confirmación.

Ejemplo:

```text
┌───────────────────────────────────────────┐
│ 🛒 Compra detectada                       │
│                                           │
│ Starbucks                                 │
│ $8.500                                    │
│ 15/08/2026                                │
│                                           │
│ Categoría sugerida: Alimentación          │
│ Confianza: 72%                            │
│                                           │
│ [Aceptar] [Editar] [Ignorar]              │
└───────────────────────────────────────────┘
```

Permitir seleccionar múltiples movimientos y:

* Aprobar.
* Categorizar.
* Eliminar.
* Ignorar.
* Asociar a una cuenta.

---

# 11. Detección de duplicados

Esta funcionalidad es crítica.

Un mismo gasto podría aparecer en:

* Correo.
* Cartola bancaria.
* CSV.
* Integración bancaria.
* Importación manual.

El sistema debe detectar posibles duplicados.

Utilizar una combinación de:

* Fecha.
* Monto.
* Moneda.
* Comercio.
* Cuenta.
* Identificador externo.
* Fuente.

Ejemplo:

```text
Cartola:
15/08/2026 - UBER EATS - $18.990

Correo:
15/08/2026 - Compra Uber Eats - $18.990
```

El sistema debería detectar:

> ⚠️ Posible movimiento duplicado.

Y permitir:

* Fusionar.
* Mantener ambos.
* Ignorar uno.

---

# 12. Apple Wallet / Apple Pay

Investigar cuidadosamente las capacidades oficiales disponibles para acceder a información de transacciones desde Apple Wallet y Apple Pay.

**No asumir que una aplicación web puede acceder directamente al historial completo de transacciones de Apple Wallet.**

La implementación debe respetar las restricciones de privacidad y APIs oficiales de Apple.

Si no existe una API pública que permita obtener directamente las transacciones necesarias, implementar una alternativa compatible, por ejemplo:

* Importación mediante archivos.
* Integración con el banco.
* Integración mediante Open Banking.
* Aplicación móvil complementaria.
* Compartir/exportar información compatible.
* Procesamiento de notificaciones o comprobantes cuando técnicamente sea posible y esté permitido.

No utilizar scraping, métodos no oficiales ni mecanismos que requieran comprometer la seguridad del dispositivo o cuenta del usuario.

La arquitectura debe dejar preparado un:

```text
AppleWalletProvider
```

que pueda implementarse posteriormente si existe una API oficial adecuada.

---

# 13. Open Banking

Diseñar la arquitectura pensando en una futura integración con Open Banking.

La aplicación podría eventualmente obtener:

* Cuentas.
* Saldos.
* Movimientos.
* Bancos.
* Tarjetas.

El sistema debería permitir sincronizar:

```text
Banco
↓
Proveedor Open Banking
↓
Cuenta
↓
Movimientos
↓
Normalización
↓
Categorización
↓
Base de datos
```

No implementar una integración específica con un proveedor hasta analizar:

* Disponibilidad en Chile.
* APIs oficiales.
* Costos.
* Autorizaciones.
* Seguridad.
* Regulaciones.
* Datos realmente disponibles.

---

# 14. Sincronización automática

Permitir configurar la frecuencia de sincronización.

Opciones:

* Manual.
* Cada hora.
* Cada 6 horas.
* Diaria.

Ejemplo:

```text
Sincronización automática

☑ Activada

Frecuencia:
○ Manual
● Diaria
○ Cada 6 horas
○ Cada hora
```

En caso de utilizar un proveedor externo que no permita sincronización frecuente, respetar sus límites.

---

# 15. Historial de sincronizaciones

Crear una sección para visualizar las sincronizaciones realizadas.

Ejemplo:

```text
Historial

15/08/2026 22:00
Gmail
✓ 12 correos analizados
✓ 5 movimientos encontrados
✓ 4 importados
⚠ 1 requiere revisión

14/08/2026 22:00
Gmail
✓ 8 correos analizados
✓ 3 movimientos encontrados
✓ 3 importados
```

Guardar información suficiente para poder diagnosticar errores sin almacenar innecesariamente contenido sensible.

---

# 16. Control del usuario

El usuario debe mantener siempre el control.

Permitir:

* Desconectar una cuenta.
* Pausar sincronización.
* Eliminar credenciales/tokens almacenados.
* Eliminar datos importados.
* Ver qué fuente generó cada movimiento.
* Ver cuándo fue importado.
* Desactivar automatización para una fuente.

Cada movimiento debería indicar su origen.

Ejemplo:

```text
Origen:
✉️ Gmail

Importado:
15/08/2026 22:04
```

---

# 17. Automatización mediante reglas

Permitir crear reglas personalizadas.

Ejemplo:

```text
SI

Descripción contiene:
"UBER"

ENTONCES

Categoría:
Transporte
```

Otro ejemplo:

```text
SI

Remitente:
notificaciones@banco.cl

Monto:
> $100.000

ENTONCES

Marcar:
"Revisar"
```

Otro:

```text
SI

Comercio:
Netflix

ENTONCES

Categoría:
Suscripciones

Y asociar a:
Gasto fijo Netflix
```

---

# 18. Integración con gastos fijos

La automatización debe conectarse con el módulo de gastos recurrentes.

Ejemplo:

Gasto fijo:

```text
Netflix
$9.990
Día 15
```

Correo detectado:

```text
Netflix
Cobro $9.990
15/08/2026
```

El sistema debería reconocer:

> Este movimiento probablemente corresponde al gasto fijo Netflix.

Y marcarlo automáticamente como:

```text
✓ Gasto fijo pagado
```

---

# 19. Integración con límites

Los movimientos automatizados deben afectar inmediatamente los límites de gasto.

Ejemplo:

```text
Límite:
Salidas a comer
$500.000

Gasto detectado automáticamente:
$50.000

Total:
$450.000 / $500.000
90%

⚠️ 90% del límite utilizado
```

La alerta correspondiente debe activarse utilizando exactamente las mismas reglas del módulo de límites.

---

# 20. Integración con dashboard

Mostrar en el dashboard información sobre automatización.

Ejemplo:

```text
AUTOMATIZACIÓN

✓ Última sincronización:
Hoy 22:00

5 movimientos detectados

4 registrados automáticamente
1 pendiente de revisión
```

También mostrar:

> 💡 "No tienes movimientos pendientes de revisión."

o:

> ⚠️ "Tienes 3 movimientos esperando revisión."

---

# 21. Modelo de datos

Agregar las entidades necesarias sin duplicar información existente.

Considerar entidades como:

* FinancialSource.
* EmailConnection.
* ImportJob.
* ImportedTransaction.
* TransactionSource.
* AutomationRule.
* TransactionMatch.
* SyncLog.
* Notification.

Los nombres pueden modificarse si existe una arquitectura mejor.

Un movimiento financiero debería poder indicar:

```text
sourceType:
MANUAL
PDF
EMAIL
CSV
OPEN_BANKING
BANK_API
```

y opcionalmente:

```text
sourceReference
externalTransactionId
importBatchId
```

---

# 22. Seguridad y privacidad

Esta funcionalidad maneja información financiera y correos, por lo que debe tener especial cuidado con la privacidad.

### Correo

* Utilizar OAuth.
* Nunca almacenar contraseñas.
* Solicitar solamente permisos necesarios.
* Almacenar tokens de forma segura.
* Permitir revocar la conexión.
* No guardar el contenido completo de los correos si no es necesario.
* Procesar solamente la información requerida.

### Información financiera

* No almacenar datos innecesarios.
* Evitar almacenar números completos de tarjetas.
* Enmascarar información sensible.
* Utilizar variables de entorno.
* Registrar logs sin información financiera sensible.
* Validar todos los datos recibidos.

---

# 23. Arquitectura general

La arquitectura debería seguir este flujo:

```text
                   FUENTES
                      │
        ┌─────────────┼─────────────┐
        │             │             │
      EMAIL          PDF          CSV
        │             │             │
        └─────────────┼─────────────┘
                      ↓
              IMPORT PROVIDERS
                      ↓
             NORMALIZACIÓN
                      ↓
             DUPLICATE CHECK
                      ↓
             AUTOMATION RULES
                      ↓
           CATEGORIZATION ENGINE
                      ↓
             CONFIDENCE SCORE
                      ↓
             ┌───────────────┐
             │               │
          Alta confianza   Baja/media
             │               │
             ↓               ↓
        AUTOMÁTICO       REVISIÓN
             │               │
             └───────┬───────┘
                     ↓
                TRANSACTION
                     ↓
        ┌────────────┼─────────────┐
        ↓            ↓             ↓
     LIMITES      PRESUPUESTOS   ESTADÍSTICAS
        │            │             │
        └────────────┼─────────────┘
                     ↓
                  DASHBOARD
```

---

# 24. Principio fundamental

La automatización debe ser **asistida y confiable**, no simplemente automática.

La aplicación nunca debe:

* Inventar montos.
* Inventar fechas.
* Crear movimientos dudosos silenciosamente.
* Crear duplicados.
* Modificar movimientos existentes sin trazabilidad.
* Acceder a cuentas externas mediante métodos no oficiales.

Cuando exista incertidumbre, debe mostrar:

> "Encontramos un posible movimiento, pero necesitamos que lo confirmes."

El usuario siempre debe poder revisar, corregir y deshacer las acciones automáticas.

---

# 25. Objetivo final

El resultado debe permitir que la aplicación evolucione desde un simple gestor de gastos hacia un **asistente financiero personal automatizado**.

La experiencia ideal sería:

```text
Compra realizada
      ↓
Banco / correo / fuente externa
      ↓
Aplicación detecta movimiento
      ↓
Identifica comercio y monto
      ↓
Detecta cuenta
      ↓
Categoriza automáticamente
      ↓
Comprueba duplicados
      ↓
Actualiza límites
      ↓
Actualiza presupuestos
      ↓
Comprueba gastos fijos
      ↓
Actualiza estadísticas
      ↓
Actualiza dashboard
      ↓
Notifica solamente si es necesario
```

La prioridad debe ser:

**Automatizar sin perder control, privacidad ni confiabilidad.**
