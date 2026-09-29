# Auditoría del piloto BOIA PLANET

Referencia: BOIA_PLANET_Piloto_Iteracion_Mejoras_COMPLETA.docx aportado por Álvaro. Base: versión pública 5, cf3bf94c9669588a1c3501d781a9ccadd156ccd0. Auditoría realizada antes de modificar código. Se conservan Three.js, controles, Worker, D1, autenticación, progreso y estética.

| Punto | Clasificación inicial | Actuación |
| --- | --- | --- |
| 1 CTA principal | MODIFICACIÓN PEQUEÑA | Ampliar CTA y explicar descuentos, mantener Tickets |
| 2 Home y mundo | MODIFICACIÓN MEDIA | Viaje a destino, abrir contenido y conservar posición |
| 3 Entradas e isla | MODIFICACIÓN PEQUEÑA | Enlace de navegación en eventos; Nochevieja prioritaria |
| 4 Artistas rotatorios | SISTEMA NUEVO | Tres simultáneos, rotación equilibrada cada 3 s |
| 5 Menos HUD | MODIFICACIÓN PEQUEÑA | Quitar tarjeta fija y reutilizar cola de notificaciones |
| 6 Misiones y logros | MODIFICACIÓN PEQUEÑA | Unificar acceso a progreso, retirar encuesta anterior de artistas |
| 7 Primera boya | SISTEMA NUEVO | Bocadillos por proximidad sin modal ni pausa |
| 8 Islas por proximidad | MODIFICACIÓN MEDIA | Llegada desde cualquier lado y descubrimiento una vez |
| 9 Minimapa | MODIFICACIÓN MEDIA | Más pequeño, arrastre largo, anclaje y preferencia local |
| 10 Misión Fiestera | SISTEMA NUEVO | Estados perdida, rescatada y entregada persistentes |
| 11 Rescate | SISTEMA NUEVO | Cocodrilos, diálogo y animación de embarque |
| 12 Pasajera visible | SISTEMA NUEVO | Fiestera físicamente en barco y reacciones |
| 13 Entrega | SISTEMA NUEVO | Desembarco, celebración y mundo abierto |
| 14 Restos | SISTEMA NUEVO | Recogida al pasar, regeneración y puntos repetibles |
| 15 Mar vivo | SISTEMA NUEVO | Delfín, remolino, cofres; corrientes musicales fuera de prioridad |
| 16 Circuito | YA EXISTE | Conservar cronómetro, marca local y ranking validado |
| 17 Boosts de viento | SISTEMA NUEVO | Banderas, impulso temporal, sonido y estela |
| 18 Obstáculos | MODIFICACIÓN MEDIA | Conservar cocodrilo, añadir roca y medusa |
| 19 Bifurcación | SISTEMA NUEVO | Ruta normal y atajo físico con reencuentro |
| 20 Botellas | MODIFICACIÓN PEQUEÑA | Conservar una por persona y límite; quitar puntos |
| 21 Carnet | MODIFICACIÓN MEDIA | Vista pública antes de edición, avatar/foto y fecha de alta |
| 22 Descubrir Carnets | YA EXISTE | Adaptar enlaces de ranking y botellas, añadir artistas |
| 23 Preguntas | MODIFICACIÓN MEDIA | Cinco preguntas definitivas y sus respuestas visibles |
| 24 Menú | MODIFICACIÓN PEQUEÑA | Siete pestañas ordenadas, incluir Mi Carnet |
| 25 Iconos | MODIFICACIÓN PEQUEÑA | Iconos reconocibles y etiquetas accesibles |
| 26 Sonido | MODIFICACIÓN MEDIA | Volumen de efectos separado y sonidos de acciones |
| 27 Welcome Aboard | YA EXISTE | Consulta voluntaria; actualizar objetivo y ayuda |
| 28 UX | MODIFICACIÓN MEDIA | Aplicar a todas las mecánicas y móvil |
| 29 Flujo principal | MODIFICACIÓN MEDIA | Conectar fases sin cerrar mundo al terminar misión |
| 30 Método | YA EXISTE | Adaptaciones progresivas con pruebas acotadas |
| 31 Artistas oficiales | MODIFICACIÓN PEQUEÑA | Sustituir los tres ficticios por 26 nombres aportados |
| 32 Filosofía | MODIFICACIÓN PEQUEÑA | Alicante, encuentro cultural y All Day BOIA |
| 33 Sellos | SISTEMA NUEVO | Historial y canje alternativo; compras dependen de ticketera |
| 34 Lenguaje | MODIFICACIÓN PEQUEÑA | Miembro de BOIA formal y Bollero informal |
| 35 Exclusiones | NO RECOMENDABLE EN ESTE PILOTO | Sin rediseño 2D, admin, blog, amigos ni mensajes privados |
| 36 Prioridad | YA EXISTE | Seguir las cinco fases del documento |
| 37 Implementación | MODIFICACIÓN MEDIA | Entrega sobre el mismo proyecto público |

## Dependencias de contenido

La versión previa usa Ada Marea, Bruma Club y Costa Sur, todos ficticios; se ha avisado antes de reemplazarlos. Los 26 artistas nuevos se toman literalmente del documento. No se inventarán retratos ni respuestas de artistas reales. Se utilizará el avatar BOIA hasta disponer de fotografías y respuestas autorizadas.

Las canciones, fechas, carteles, venta de entradas, productos, WhatsApp y promociones comerciales continúan como contenido de muestra o pendiente de configuración. La compra vinculada necesita la ticketera elegida y sus confirmaciones; ningún sello de compra real se concederá por pulsar un botón de muestra. Autenticación actual: ChatGPT; el enlace de email sigue pendiente de proveedor.

## Seguimiento de la implementación

- Fase 1 UX y conversión: implementada. CTA ampliado, acceso físico a contenidos, llegada por proximidad, mapa pequeño y desplazable, menú de siete pestañas.
- Fase 2 aventura: implementada. Fiestera con rescate, embarque, pasajera visible, persistencia y entrega única en la isla final.
- Fase 3 mar vivo: implementada. Maderas regenerables, puntos repetibles con combinación por dispositivo, cofres temporales y accesorio raro, delfín y remolino.
- Fase 4 circuito: implementada. Dos rutas físicas, impulso de dos segundos, cocodrilos, rocas y medusas. Clasificación separada por versión de circuito; marcas previas conservadas en la base de datos.
- Fase 5 social y contenido: implementada para el piloto. Carnet público con avatar, cinco preguntas, fecha de alta y edición separada. Botellas sin recompensa. Lista oficial de 26 artistas, rotación de tres y filosofía actualizada.
- Sellos: historial y soporte de confirmación de compra/canje implementados. Activación comercial pendiente de ticketera, secreto de integración y códigos oficiales. Un botón de muestra no genera una compra ni un sello.
- Día y noche: ciclo de ocho minutos, desactivable en ajustes. Efectos y música con controles separados.
- Seguimiento editable: revisión de 60 puntos en revision.html, con estado, valoración, check, comentario, guardado local y exportación/importación de revisión.

## Verificación y límites del piloto

24 pruebas automatizadas superadas (17 de BOIA.PLANET y 7 conservadas del prototipo anterior). Incluyen rescate y entrega físicos, restauración de pasajera, hallazgos regenerables, mezcla de progreso sin doble crédito, ambos recorridos y validación de vueltas, tres obstáculos, llegada desde todos los lados de las islas, 26 artistas sin repeticiones contiguas, respuestas del Carnet, botellas sin puntos y sellos idempotentes.

Revisión de interfaz en navegador: entrada por fases, portada con cuatro accesos completos en móvil, acceso directo a entradas con Nochevieja en primer lugar y acceso a galería sin WebGL. El navegador de revisión carece de WebGL: quedan por valorar la representación 3D, la fluidez real y el tacto del drift en dispositivos físicos. El piloto conserva su alternativa de consulta del festival sin 3D.

La geometría estática de costas y escenarios se agrupa por material para reducir llamadas de dibujo. Los actores, banderas, mar y sprites permanecen animables.

La clasificación de carreras reproduce las entradas de control en servidor y comprueba el tiempo transcurrido. La clasificación de puntos conserva una política de piloto: los hallazgos del cliente tienen límites, combinación idempotente y valores fijos, pero no constituyen un sistema avanzado contra trampas.

## Activación futura sin rehacer el piloto

- Sustituir las imágenes ilustrativas, las cuatro pistas sintetizadas y los carteles de muestra por material BOIA.
- Configurar ticketera y conectar cada compra con el identificador público del Carnet. El adaptador servidor recibe eventId, profileId y purchaseId en POST /api/tickets/webhook, con el secreto TICKET_WEBHOOK_SECRET. purchaseId debe identificar de forma única la entrada/evento confirmado. El endpoint devuelve 503 hasta que se configure.
- Configurar EVENT_STAMP_CODES como mapa JSON de código oficial a identificador de evento para el canje alternativo. El canje no es necesario para una compra vinculada y confirmada. No se conceden sellos reales con códigos inventados en esta iteración.
- Añadir acceso por enlace de email cuando se elija proveedor. El acceso de cuenta del piloto permanece con ChatGPT.
- Añadir fotos personales propias en una fase de almacenamiento de imágenes. Esta entrega permite elegir avatar BOIA.
- Futuras islas y ofertas se definen en model.mjs; artistas e historias en content-data.mjs; misiones y valores en adventure.mjs / expedition.mjs. Las migraciones anteriores se preservan.
