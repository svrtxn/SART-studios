# Módulo de límites de gasto, presupuestos y gastos fijos

Incorporar un sistema de **control de límites de gasto y gastos recurrentes** que permita al usuario organizar sus compromisos financieros, controlar categorías de gasto y recibir recordatorios oportunos.

La funcionalidad debe integrarse con los movimientos, categorías, cuentas, dashboard y estadísticas existentes.

---

## 1. Límites de gasto

El usuario debe poder establecer un límite de gasto para una categoría durante un período determinado.

### Ejemplo

**Categoría:** Salidas a comer
**Límite mensual:** $500.000
**Período:** Mensual

La aplicación debe sumar automáticamente todos los egresos pertenecientes a esa categoría durante el período correspondiente.

### Estados del límite

El sistema debe manejar al menos los siguientes estados:

* **Normal:** gasto inferior al 80%.
* **Advertencia:** gasto igual o superior al 80% pero inferior al 100%.
* **Límite alcanzado:** gasto igual o superior al 100%.
* **Excedido:** gasto superior al límite.

### Ejemplo de funcionamiento

Límite mensual: **$500.000**

* $300.000 → 60% → Normal.
* $400.000 → 80% → ⚠️ Advertencia.
* $450.000 → 90% → ⚠️ Advertencia.
* $500.000 → 100% → 🔴 Límite alcanzado.
* $550.000 → 110% → 🔴 Límite excedido.

---

## 2. Alertas de límites

El usuario debe recibir una alerta cuando alcance determinados porcentajes del límite.

Por defecto:

* **80%:** primera alerta.
* **100%:** segunda alerta.

Estos porcentajes deberían ser configurables.

Por ejemplo:

> ⚠️ Has utilizado el 80% de tu presupuesto mensual para "Salidas a comer".
> Has gastado $400.000 de $500.000.

Al alcanzar el 100%:

> 🔴 Has alcanzado tu límite mensual de "Salidas a comer".
> Has gastado $500.000 de $500.000.

Si continúa gastando después de superar el límite:

> 🚨 Has excedido tu límite de "Salidas a comer" en $50.000.

### Importante

Una alerta no debe enviarse repetidamente por cada movimiento.

Para cada período, cada umbral debe generar como máximo una alerta.

Ejemplo:

* Al llegar al 80% → enviar alerta una vez.
* Aunque posteriormente llegue al 85%, 90% o 95%, no volver a enviar la alerta del 80%.
* Al llegar al 100% → enviar la alerta correspondiente una vez.

Al comenzar un nuevo período, los estados de las alertas deben reiniciarse.

---

# 3. Límites configurables

El usuario debe poder crear, editar, pausar y eliminar límites.

Cada límite debería permitir configurar:

* Nombre.
* Categoría.
* Subcategoría opcional.
* Monto máximo.
* Moneda.
* Período:

  * Mensual.
  * Semanal.
  * Anual.
  * Personalizado.
* Fecha de inicio.
* Fecha de término opcional.
* Porcentaje de advertencia.
* Porcentaje de límite.
* Estado activo/inactivo.

Ejemplo:

```text
Salidas a comer
Límite: $500.000
Período: Mensual
Advertencia: 80%
Estado: Activo
```

---

# 4. Cálculo automático

Los límites deben calcularse utilizando los movimientos financieros existentes.

No crear un sistema separado de gastos.

Si existe un movimiento:

```text
Fecha: 15/08/2026
Tipo: Egreso
Categoría: Alimentación
Subcategoría: Restaurantes
Monto: $45.000
```

El sistema debe incorporarlo automáticamente al cálculo del límite correspondiente.

Los cálculos deben respetar:

* Cuenta seleccionada.
* Categoría.
* Subcategoría.
* Período.
* Moneda.
* Estado del movimiento.

Los movimientos eliminados o anulados no deben contabilizarse.

---

# 5. Límites por cuenta o globales

Permitir que un límite pueda aplicarse:

### Globalmente

Ejemplo:

> Alimentación → $400.000 mensuales entre todas mis cuentas.

### Por cuenta

Ejemplo:

> Alimentación → $300.000 mensuales utilizando mi cuenta Santander.

Esto debe permitir que el usuario pueda decidir si quiere controlar sus gastos considerando:

* Todas las cuentas.
* Una cuenta específica.

---

# 6. Visualización en Dashboard

Agregar una sección de **Presupuestos y límites** al dashboard.

Mostrar tarjetas como:

```text
🍽️ Salidas a comer

$400.000 / $500.000

████████░░ 80%

⚠️ Has alcanzado el 80% de tu límite

$100.000 disponibles
```

También mostrar:

* Porcentaje utilizado.
* Monto gastado.
* Monto disponible.
* Días restantes del período.
* Proyección de gasto si es posible.

---

# 7. Proyección de gasto

Agregar opcionalmente una estimación del gasto al finalizar el período.

Por ejemplo:

```text
Límite mensual: $500.000
Gastado: $400.000
Día actual: 20
Días restantes: 11

Proyección estimada: $620.000
```

Mostrar una advertencia:

> ⚠️ Al ritmo actual de gasto, podrías superar tu límite mensual.

La proyección debe considerarse únicamente como una estimación y no modificar los datos reales.

---

# 8. Gastos fijos y recurrentes

Crear un módulo independiente para registrar **gastos fijos o recurrentes**.

Ejemplos:

* Arriendo.
* Agua.
* Electricidad.
* Gas.
* Internet.
* Telefonía.
* Netflix.
* Spotify.
* Seguros.
* Colegiatura.
* Créditos.
* Suscripciones.
* Otros pagos recurrentes.

Cada gasto fijo debe permitir registrar:

* Nombre.
* Categoría.
* Monto.
* Moneda.
* Cuenta desde la cual se paga.
* Día de vencimiento.
* Fecha de inicio.
* Fecha de término opcional.
* Frecuencia.
* Estado activo/inactivo.
* Descripción.
* Si el monto es fijo o variable.
* Recordatorio activado/desactivado.

---

# 9. Frecuencia de gastos fijos

Permitir diferentes frecuencias:

* Mensual.
* Semanal.
* Quincenal.
* Anual.
* Personalizada.

Ejemplo:

```text
Arriendo
Monto: $450.000
Frecuencia: Mensual
Día de pago: 5
Cuenta: Banco Santander
```

Otro ejemplo:

```text
Seguro
Monto: $120.000
Frecuencia: Anual
Fecha de pago: 15 de marzo
```

---

# 10. Recordatorios de vencimiento

La aplicación debe recordar al usuario cuando se aproxima el día de pago.

Permitir configurar con cuánta anticipación recibir el recordatorio:

* 7 días antes.
* 3 días antes.
* 1 día antes.
* El mismo día.

El usuario debería poder seleccionar uno o varios recordatorios.

Ejemplo:

> 🔔 Próximo pago
> El arriendo de $450.000 vence en 3 días.

El día del vencimiento:

> 🔴 Pago pendiente
> Hoy vence el pago de Arriendo por $450.000.

---

# 11. Estado de los gastos fijos

Cada gasto recurrente debe tener un estado para el período actual:

* Pendiente.
* Pagado.
* Vencido.
* Omitido.

Ejemplo:

```text
AGOSTO 2026

✓ Internet       $25.000    Pagado
✓ Electricidad   $45.000    Pagado
○ Agua           $20.000    Pendiente
🔴 Arriendo      $450.000   Vencido
```

---

# 12. Registro automático de gastos recurrentes

No asumir que crear un gasto fijo significa automáticamente que el dinero fue gastado.

El sistema debe diferenciar entre:

### Gasto programado

> "Tengo que pagar $450.000 de arriendo el día 5."

### Gasto realizado

> "El 5 de agosto efectivamente pagué $450.000."

El usuario debe poder marcar el gasto como pagado.

Al marcarlo como pagado, se debe crear o asociar un movimiento financiero real.

Evitar crear movimientos duplicados.

---

# 13. Asociación inteligente con movimientos

Cuando exista un movimiento que coincida con un gasto recurrente, la aplicación debería sugerir asociarlo.

Ejemplo:

Gasto fijo:

```text
Internet
$25.000
Día 10
```

Movimiento detectado:

```text
10/08/2026
PAGO INTERNET
-$25.000
```

Mostrar:

> 💡 ¿Quieres asociar este movimiento al pago de Internet?

Permitir:

* Asociar.
* Ignorar.
* Asociar automáticamente en futuros períodos.

---

# 14. Gastos fijos variables

Algunos gastos son recurrentes pero no tienen siempre el mismo monto.

Ejemplo:

* Agua.
* Luz.
* Gas.
* Tarjeta de crédito.
* Telefonía.

Permitir configurar:

```text
Electricidad
Frecuencia: Mensual
Monto: Variable
Día de vencimiento: 15
```

Cuando llegue la fecha, el usuario debe poder ingresar el monto real.

---

# 15. Calendario financiero

Agregar una vista de calendario donde se puedan visualizar:

* Gastos fijos próximos.
* Fechas de vencimiento.
* Metas.
* Alertas.
* Límites próximos a alcanzar.
* Pagos pendientes.

Ejemplo:

```text
AGOSTO 2026

15  💡 Electricidad
18  🌐 Internet
20  💧 Agua
25  📱 Telefonía
05  🏠 Arriendo
```

El calendario debe permitir seleccionar un día y visualizar los eventos financieros correspondientes.

---

# 16. Resumen de compromisos mensuales

Crear una sección que muestre cuánto dinero está comprometido antes de comenzar el mes.

Ejemplo:

```text
COMPROMISOS DE AGOSTO

Arriendo          $450.000
Internet           $25.000
Electricidad       $45.000
Agua               $20.000
Telefonía          $15.000
Suscripciones      $35.000
--------------------------------
Total             $590.000
```

Esto debe ayudar al usuario a saber cuánto de sus ingresos ya está comprometido con gastos recurrentes.

---

# 17. Integración con ingresos

Relacionar los gastos fijos con los ingresos para mostrar una visión más completa.

Ejemplo:

```text
Ingresos estimados:          $1.500.000

Gastos fijos:                  $590.000
Presupuestos variables:        $500.000
-----------------------------------------
Disponible estimado:           $410.000
```

Mostrar claramente que el "disponible estimado" es una proyección y no necesariamente el saldo bancario real.

---

# 18. Centro de notificaciones

Crear un sistema centralizado de notificaciones dentro de la aplicación.

Tipos de notificaciones:

### Límites

* 80% alcanzado.
* 100% alcanzado.
* Límite excedido.

### Gastos fijos

* Próximo vencimiento.
* Pago del día.
* Pago vencido.

### Metas

* Progreso de ahorro.
* Meta próxima a vencer.

Ejemplo:

```text
🔔 NOTIFICACIONES

⚠️ Has utilizado el 80% de tu presupuesto de alimentación.
🔴 El arriendo vence mañana.
💰 Has alcanzado el 50% de tu meta de vacaciones.
```

---

# 19. Configuración de notificaciones

Crear una sección de configuración donde el usuario pueda decidir qué notificaciones recibir.

Por ejemplo:

```text
Límites de gasto
☑ 80%
☑ 100%
☑ Límite excedido

Gastos fijos
☑ 7 días antes
☑ 3 días antes
☑ 1 día antes
☑ Día de vencimiento
☑ Pago vencido

Metas
☑ Progreso
☑ Fecha próxima
```

También permitir desactivar completamente las notificaciones.

---

# 20. Consideraciones de arquitectura

Estas funcionalidades deben integrarse con la arquitectura existente y no convertirse en módulos aislados.

El sistema debe reutilizar:

* Transactions.
* Accounts.
* Categories.
* Savings Goals.
* Dashboard.
* Statistics.

Agregar las entidades necesarias, por ejemplo:

* SpendingLimit.
* SpendingLimitPeriod.
* SpendingLimitAlert.
* RecurringExpense.
* RecurringExpensePayment.
* Notification.
* NotificationPreference.

No es obligatorio utilizar exactamente estos nombres si existe una mejor alternativa arquitectónica.

Evitar duplicar información que ya existe en `Transaction`.

---

# 21. Reglas importantes

1. Un límite debe calcularse a partir de los movimientos reales.
2. Un gasto recurrente programado no debe convertirse automáticamente en un gasto real.
3. Marcar un gasto recurrente como pagado debe generar o asociar un movimiento.
4. Nunca crear movimientos duplicados.
5. Las transferencias internas entre cuentas no deben afectar los límites globales de gasto.
6. Los movimientos anulados/eliminados no deben contabilizarse.
7. Los límites deben reiniciarse correctamente según su período.
8. Las alertas de 80% y 100% deben enviarse una sola vez por período.
9. Los gastos recurrentes deben generar nuevos períodos automáticamente.
10. Los cálculos deben respetar la cuenta, categoría, moneda y período seleccionados.
11. Los montos proyectados deben distinguirse claramente de los montos reales.
12. Todas las fechas deben manejarse correctamente considerando la zona horaria configurada por el usuario.

---

# 22. Integración con el dashboard

El dashboard principal debería terminar mostrando una visión financiera como:

```text
┌─────────────────────────────────────────┐
│ SALDO TOTAL                             │
│ $2.450.000                              │
└─────────────────────────────────────────┘

┌──────────────────┐ ┌──────────────────┐
│ INGRESOS         │ │ EGRESOS          │
│ $1.500.000       │ │ $980.000         │
└──────────────────┘ └──────────────────┘

LIMITES DE GASTO

🍽️ Salidas a comer
$400.000 / $500.000
████████░░ 80%
⚠️ Límite próximo

🎮 Entretenimiento
$120.000 / $200.000
██████░░░░ 60%
✓ Dentro del límite


PRÓXIMOS PAGOS

🏠 Arriendo       $450.000    3 días
💡 Electricidad    $45.000    6 días
🌐 Internet        $25.000    8 días


METAS

✈️ Vacaciones
$850.000 / $2.000.000
████░░░░░░ 42,5%


COMPROMISOS DEL MES

Gastos fijos:        $590.000
Presupuestos:        $500.000
Disponible estimado: $410.000
```

El objetivo es que el usuario pueda abrir la aplicación y responder rápidamente:

**¿Cuánto dinero tengo?**

**¿Cuánto he gastado?**

**¿En qué estoy gastando?**

**¿Qué límites estoy cerca de alcanzar?**

**¿Qué pagos tengo próximamente?**

**¿Cuánto dinero tengo comprometido?**

**¿Cuánto puedo ahorrar?**

**¿Cómo voy avanzando hacia mis metas?**
