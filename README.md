# BOIA PLANET

Repositorio de trabajo de **BOIA PLANET**, una experiencia web 2.5D para BOIA Underground Music Festival: landing comercial, mapa navegable, comunidad, recompensas y panel de administración.

## Estado actual

Este primer commit conserva dos piezas de referencia:

- `index.html`: demo jugable/autocontenida v0.4.0. Funciona como prototipo visual y de interacción, no como arquitectura de producción.
- `BOIA_PLANET_Documento_Maestro_Definitivo_v14_TRES_PROMPTS.docx`: especificación funcional y de producto vigente. **Es la fuente de verdad para el desarrollo definitivo.**

La demo incluye recursos embebidos en un único HTML para que pueda probarse sin instalación. La implementación definitiva deberá separarse en componentes, servicios, contenido administrable y recursos optimizados.

## Probar la demo

Opción rápida: abrir `index.html` en un navegador moderno.

Opción recomendada:

```bash
python3 -m http.server 4173
```

Después, abrir `http://localhost:4173`.

## Estructura

```text
.
├── index.html                         # Demo jugable actual
├── BOIA_mascota.jpeg                  # Mascota de marca recibida
├── BOIA_logotipo.jpeg                 # Logotipo recibido
├── BOIA_PLANET_Documento_...docx      # Documento maestro definitivo v14
├── HANDOFF_TECNICO.md                 # Notas para el equipo de desarrollo
├── CONTRIBUTING.md                    # Flujo de colaboración
└── README.md
```

## Prioridades de reconstrucción

1. Leer el documento maestro completo antes de decidir arquitectura o alcance.
2. Implementar los tres prompts definitivos en orden y validar cada puerta de calidad.
3. Mantener la venta de entradas como objetivo comercial principal.
4. Construir contenido y mundo desde datos: eventos, islas, artistas, logros, mensajes, recompensas y tienda no deben quedar codificados de forma rígida.
5. Crear un panel de administración seguro que permita ampliar el universo sin despliegues de código.
6. Conservar el progreso local de visitantes anónimos y migrarlo al registrarse.
7. Garantizar experiencia móvil, controles táctiles, accesibilidad y buen rendimiento.

## Avisos importantes

- No hay credenciales reales en el repositorio y nunca deben añadirse.
- La contraseña de administración no debe estar escrita en el frontend ni en la documentación. Debe gestionarse mediante el proveedor de autenticación y variables de entorno.
- La demo no implementa todavía autenticación, pagos, ticketera, base de datos ni panel administrativo reales.
- Antes de producción deben completarse privacidad, consentimiento, moderación, analítica, copias de seguridad y pruebas de seguridad.

## Colaboración

El repositorio es público para facilitar el acceso y la colaboración. El equipo debe trabajar mediante ramas y pull requests; conceder acceso de escritura únicamente a colaboradores autorizados. Las normas mínimas están en [CONTRIBUTING.md](CONTRIBUTING.md).
