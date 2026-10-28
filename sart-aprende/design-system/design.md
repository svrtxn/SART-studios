# SART STUDIOS — Dirección visual

Versión 2.0

## Propósito

Este documento define el lenguaje visual común de los productos SART. La tecnología debe sentirse actual y expresiva, pero cada pantalla debe comunicar primero qué puede hacer la persona y cómo avanzar.

SART no debe parecer una plantilla de inteligencia artificial. El ecosistema incluye aprendizaje, organización, finanzas, transcripción y otros productos; la identidad visual debe servir a todos ellos sin convertirlos en una misma interfaz genérica.

## Dirección creativa

**Editorial, tecnológica y experimental con intención.**

- Combinar tipografía con carácter, composiciones asimétricas y espacios amplios.
- Usar geometría, cortes, líneas de recorrido, numeración editorial y capas para dar personalidad.
- Hacer que las interacciones se sientan táctiles y precisas; el movimiento acompaña la acción, no la reemplaza.
- Dar a cada producto un acento propio mediante su sublogo y contenido, dentro del mismo sistema SART.
- Mantener interfaces claras, utilizables y confiables incluso cuando la composición sea atrevida.

La innovación se expresa con composición e interacción, no con ruido visual.

## Inspiración de referencia

Tomar patrones e ideas; no copiar pantallas, código, marcas, ilustraciones ni recursos protegidos.

| Referencia | Uso de inspiración |
|---|---|
| [React Bits](https://reactbits.dev/) | Interacciones y detalles reutilizables para interfaces React. |
| [Motion Primitives](https://motion-primitives.com/) | Composición de movimiento en componentes de interfaz. |
| [Godly](https://godly.design/) | Dirección de arte y ritmo visual; comprobar el destino actual antes de evaluar referencias. |
| [Anime.js](https://animejs.com/) | Secuencias y coreografía de animación cuando aporten contexto. |
| [Skiper UI](https://skiper-ui.com/) | Patrones de landing pages y presentaciones de producto. |
| [Motion](https://motion.dev/) | Transiciones e interacciones expresivas en interfaces. |
| [Cult UI](https://www.cult-ui.com/) | Componentes con personalidad visual y estados de interacción. |
| [Watermelon UI](https://ui.watermelon.sh/) | Referencia pendiente de verificación; no asumir que es una biblioteca de componentes. |
| [Refero Styles](https://styles.refero.design/) | Referencias de estilos para explorar jerarquía y composición. |
| [Magic UI](https://magicui.design/) | Microinteracciones y detalles animados, usados con moderación. |
| [Motion Sites](https://motionsites.ai/) | Referencia pendiente de verificación; confirmar el destino antes de usarla como galería. |
| [Manus](https://manus.im/) | Explorar su flujo de diseño visual; no tratarlo como biblioteca general ni imitar estética de IA. |
| [BKLit UI](https://bklit.com/) | Verificar el producto y su alcance antes de tomarlo como referencia de componentes. |
| [GSAP](https://gsap.com/) | Coreografía de movimiento compleja solo cuando CSS o Motion no basten. |
| [Spline](https://spline.design/) | Elementos 3D puntuales, únicamente si explican el producto. |
| [Mobbin](https://mobbin.com/) | Patrones de producto reales, flujos y convenciones de uso. |
| [Vibe Coder Blog](https://blog.vibecoder.me/) | Exploración de tendencias de diseño y desarrollo. |
| [Particles](https://particles.casberry.in/) | Texturas o partículas ligeras; nunca como fondo genérico permanente. |

Las referencias son una biblioteca de investigación, no dependencias obligatorias. Antes de añadir una librería, comprobar que el patrón no puede resolverse con las herramientas existentes.

Algunas direcciones proporcionadas pueden redirigir, cambiar de producto o no estar verificadas como bibliotecas de UI. Confirmar que el sitio sigue siendo la referencia esperada antes de reutilizar ideas. Para movimiento, distinguir herramientas de animación (Motion, Anime.js, GSAP) de colecciones de componentes, galerías visuales y herramientas 3D.

## Identidad SART

- Usar el azul oficial SART `#1976FF` como color primario en acciones, indicadores y detalles de marca.
- Reutilizar únicamente los colores, escalas, tipografías, radios y espaciados definidos en los documentos del sistema.
- Usar el logotipo oficial de SART STUDIOS en navegación corporativa y el sublogo oficial correspondiente en cada producto.
- Mantener las proporciones, colores y zona de respeto de cada logo. No recrearlos, deformarlos, contornearlos ni aplicarles efectos.
- La tecnología es parte de la identidad; la inteligencia artificial es una capacidad de algunos productos, no la identidad del ecosistema.

## Color y superficies

- Usar los tokens existentes: azul SART, blancos, neutros y azul marino.
- Crear contraste mediante superficies, tipografía, bordes y composición; no mediante colores nuevos.
- Los fondos azules o azul marino pueden servir para una sección editorial destacada, una portada o un estado enfocado. Reservar el azul brillante para áreas con propósito.
- Los degradados, transparencias, desenfoques y efectos de luz no son un estilo por defecto. Usarlos solo si el sistema ya los documenta y mejoran la lectura.
- Evitar neón, arcoíris, resplandores, fondos de partículas permanentes y el conjunto visual típico de “producto IA”.

## Composición y jerarquía

- Diseñar sobre la retícula y la escala de espaciado oficiales; no inventar valores.
- Alternar composiciones simétricas y asimétricas con alineaciones deliberadas. En móvil, conservar una lectura lineal clara.
- Usar titulares expresivos para orientar; mantener textos, formularios y datos fáciles de escanear.
- Dejar espacio alrededor del contenido. La densidad cambia según la tarea: los paneles de trabajo pueden ser más compactos que una landing.
- Agrupar por significado, no solo dentro de tarjetas. Usar líneas, numeración, índices, bandas y cambios de superficie cuando aclaren relaciones.
- La primera acción importante debe destacar; los estados secundarios no deben competir con ella.

## Tipografía

- Usar Space Grotesk para títulos y elementos de marca, e Inter para lectura e interfaz. JetBrains Mono se reserva para datos o código que realmente lo requieran.
- Mantener las escalas y pesos definidos en `typography.md`; no añadir tipografías de moda ni textos artificialmente espaciados.
- Combinar títulos grandes con cuerpo legible. Evitar mayúsculas sostenidas para bloques de lectura.

## Componentes distintivos

Diseñar componentes memorables a partir de patrones documentados en `components.md`, siempre conservando su función:

- **Product Index Card:** ficha editorial con sublogo, nombre, índice, estado, descripción y acción; la composición puede variar según la prioridad del producto.
- **Directional Action:** botón con indicador de dirección que responde al hover, al foco y al estado activo sin ocultar el texto ni desplazar el área de pulsación.
- **Progress Path:** recorrido visual de pasos o módulos que explica avance, bloqueos y próximo paso; debe seguir siendo comprensible sin color ni animación.
- **Layered Spotlight:** una superficie destacada con contenido superpuesto o encuadrado que dirige la mirada a una sola acción; no usar para adornar cada sección.

No añadir componentes “sorpresa” que escondan controles, dependan de hover o interrumpan tareas. Documentar componentes nuevos en `components.md` antes de reutilizarlos.

## Movimiento e interacción

- El movimiento expresa dirección, continuidad, estado o respuesta. No es decoración ambiental.
- Priorizar transformaciones y opacidad; respetar los tiempos y la curva de movimiento de `animations.md`.
- Reservar secuencias, scroll-linked motion, 3D y partículas para momentos breves que tengan una explicación de producto.
- El hover nunca debe ser el único modo de descubrir una acción. Foco de teclado, toque y estados activos deben ser equivalentes.
- Respetar `prefers-reduced-motion`; la información y la navegación deben seguir completas sin movimiento.
- No incorporar Motion, GSAP, Spline ni otra dependencia solo por tendencia. Evaluar coste, accesibilidad, rendimiento y mantenimiento antes de instalar.

## Personalidad por producto

Cada producto conserva su sublogo, vocabulario y prioridad de tareas. El sistema compartido se expresa mediante el azul, tipografía, escalas, componentes, accesibilidad y calidad de interacción; no exige que todos tengan la misma portada, el mismo patrón o la misma densidad.

El contenido debe describir el trabajo que la persona viene a realizar. No presentar cursos, finanzas, comida o transcripciones como funciones de IA salvo que esa capacidad sea real y relevante para la tarea.

## Accesibilidad y adaptación

- Cumplir WCAG AA: contraste suficiente, semántica, etiquetas, foco visible y navegación por teclado.
- Mantener áreas de interacción de al menos 44 × 44 px en controles táctiles.
- Adaptar retículas, navegación, animación y jerarquía a móvil; no reducir simplemente la escala de escritorio.
- Comunicar estados con texto o forma además del color.
- Mantener legibles logos, textos y controles en temas claros y oscuros usando las variantes oficiales.

## Criterio de calidad

Antes de aprobar una pantalla, comprobar:

1. ¿Se entiende el propósito sin conocer SART?
2. ¿La composición tiene personalidad sin obstaculizar la tarea?
3. ¿El color primario y los sublogos son los oficiales?
4. ¿Los controles funcionan con teclado, toque y movimiento reducido?
5. ¿Se usan los tokens y componentes existentes?
6. ¿Se evitó el lenguaje visual genérico de IA y la decoración sin función?