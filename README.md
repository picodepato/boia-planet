# BOIA PLANET

Repositorio de la versión original de **BOIA PLANET**, desarrollada progresivamente como una experiencia web 3D navegable para BOIA Underground Music Festival.

Referencia publicada: [boia-night-signal.picodepatos.chatgpt.site/planet/](https://boia-night-signal.picodepatos.chatgpt.site/planet/)

## Qué contiene

- Entrada cinematográfica bilingüe.
- Landing del festival con accesos a entradas, artistas, galería y tienda.
- Mundo marítimo 3D con barco navegable.
- Control táctil sobre el barco, teclado, piloto automático y drifting.
- Islas de eventos, seis boyas, señales, recompensas y exploración.
- Minijuego de carrera y controles adaptados a móvil.
- Pasaporte piloto, progreso local, logros, cosméticos y mensajes en botella.
- API y esquema de datos de la iteración comunitaria.
- Pruebas automatizadas de navegación, progreso, recompensas y carrera.

## Ejecutar localmente

```bash
npm ci
npm run dev
```

Vite sirve el contenido de `dist/`. La experiencia principal está disponible en `/planet/`.

## Verificar

```bash
npm test
npm run build
```

Estado al importar esta versión: **24 pruebas superadas** y compilación correcta.

## Estructura principal

```text
dist/planet/          Experiencia BOIA.PLANET y mundo navegable
dist/assets/          Recursos visuales de marca y demostración
worker/               Servidor web y API
db/                   Esquema de datos
drizzle/              Migraciones
test/                 Pruebas y páginas de control móvil
scripts/              Compilación y base de datos local
docs/                 Checklist e historial de iteración
review/                Exportación autocontenida para revisión
archive/               Versiones anteriores conservadas
```

## Fuente de verdad y dirección futura

El documento `BOIA_PLANET_Documento_Maestro_Definitivo_v14_TRES_PROMPTS.docx` conserva el alcance funcional acordado. Sin embargo, su indicación de una experiencia isométrica 2.5D queda superada por la decisión posterior de continuar con un **mundo 3D navegable** inspirado en este prototipo.

La siguiente revisión del documento deberá incorporar:

- Mundo 3D marítimo como dirección definitiva.
- Modelado y optimización de escenarios en Blender.
- Catálogo de barcos completos creados en Blender, no simples cambios de textura.
- Exportación web mediante GLB/glTF.
- Distintos modelos de barco con físicas equivalentes y personalización cosmética.
- Gestión desde administración de barcos, accesorios, banderas, estelas y desbloqueos.

Hasta que exista esa revisión, este código es la referencia de experiencia y el documento v14 sigue siendo la referencia funcional, exceptuando la dirección visual isométrica.

## Colaboración

El repositorio es público. Trabajad mediante ramas y pull requests y conceded acceso de escritura únicamente a colaboradores autorizados. Consultad [CONTRIBUTING.md](CONTRIBUTING.md) antes de integrar cambios.

## Seguridad

- No guardar contraseñas, tokens ni claves en Git.
- Las cuentas administrativas deben usar roles individuales y doble factor.
- El prototipo no debe conectarse a pagos o venta real de entradas sin la revisión correspondiente de seguridad, privacidad y cumplimiento.

