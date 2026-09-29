# Traspaso técnico del prototipo

## Qué contiene este repositorio

`index.html` es una demo autocontenida creada para validar concepto, tono visual e interacciones. Su tamaño se debe a que imágenes, audio y código están embebidos. Puede servir para demostraciones y para extraer decisiones de UX, pero no debe convertirse en la base monolítica de producción.

## Qué debe construirse de nuevo

- Aplicación web modular y responsive con escena 2.5D isométrica.
- Backend y base de datos reales.
- Autenticación por enlace de acceso al email y recuperación segura.
- Perfil/pasaporte público con controles de privacidad y moderación.
- Persistencia anónima local y migración del progreso al crear cuenta.
- Catálogo de eventos con estados: borrador, próximo, a la venta, agotado, finalizado y archivado.
- Islas persistentes separadas del ciclo de venta de cada evento.
- Ticketera, tienda, fotos/vídeos y artistas conectados a islas y accesibles tanto desde landing como desde el mapa.
- Logros, rango pirata, puntos históricos, saldo gastable, recompensas y ranking.
- Mensajes globales, notificaciones y encuestas voluntarias.
- Minijuego de carrera, tabla de tiempos y faro de batalla visible como contenido futuro, sin bloquear el MVP.
- Panel de administración completo y seguro.

## Principio clave del modelo de contenido

Una **isla** no es un **evento**. La isla puede permanecer indefinidamente y mostrar su archivo de fotos, vídeos y memoria histórica. Los eventos vinculados pueden aparecer o desaparecer de los módulos comerciales según su estado y sus fechas. Al seleccionar Tickets, Fotos o Tienda desde la landing, el sistema debe llevar a la isla correspondiente y abrir automáticamente el panel solicitado.

## Capacidades mínimas del panel de administración

- Crear, editar, ordenar, publicar, despublicar y archivar eventos.
- Crear y colocar nuevas islas, boyas, puertos, rutas y puntos interactivos sin editar código.
- Vincular varios eventos históricos o futuros a una isla.
- Editar landing, módulos comerciales, manifiesto, artistas, galería, tienda y enlaces.
- Crear logros nuevos y decidir si se aplican a todos los usuarios, solo hacia adelante o mediante recalculo controlado.
- Editar perfiles BOIA, crear perfiles y artistas, moderar contenido y suspender cuentas con auditoría.
- Publicar mensajes globales y notificaciones segmentadas.
- Gestionar encuestas voluntarias, recompensas, códigos generales y límites de uso.
- Previsualizar cambios antes de publicar, usar borradores y recuperar versiones.
- Requerir doble factor, permisos por rol y doble confirmación antes de borrar.

## No implementar como secretos estáticos

No existe una “contraseña de administrador” que deba figurar en el código o en este documento. El primer administrador debe aprovisionarse mediante el sistema de autenticación y los siguientes deben invitarse con roles. Producción debe usar variables de entorno, 2FA y registro de auditoría.

## Próximo paso recomendado

Crear el esqueleto técnico descrito en el Prompt 1 del documento maestro y convertir el mapa final en datos antes de iniciar el Prompt 3. El arte definitivo del mapa puede entregarse después de la arquitectura y el sistema de contenido, pero antes de cerrar las colisiones, rutas, cámara y colocación final del mundo jugable.

