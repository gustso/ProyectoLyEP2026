# TRABAJO INTEGRADOR FINAL - PROGRAMACION VISUAL

## Descripcion TP Integrador - 2026

Este proyecto consiste en la construccion de un Panel de Control de Clientes utilizando React y Vite. Esta aplicacion permite la gestion y visualizacion de informacion de clientes a traves del consumo de datos de la API pública FakeStoreAPI, ademas de la navegacion entre distintas vistas de forma dinamica.

Se implementaran tecnologias como React Router Dom, Context API, LocalStorage, peticiones asincronicas y el uso de un framework de interfaz de usuario, para que la experiencia del usuario sea mas dinamica e interactiva.

## Flujo de Trabajo para Equipos LyEP - 2026

Este repositorio está configurado como base para práctica profesional. Si sos parte de un equipo de trabajo, seguí las instrucciones del TP01.

El flujo general es:

1. Hacé fork de este repositorio
2. Cloná tu fork localmente
3. Agregá este repo como upstream: git remote add upstream [URL]
4. Trabajá en ramas feature: git checkout -b feature/nombre-mejora
5. Hacé commits semánticos frecuentes
6. Abrí un Pull Request desde tu fork hacia este repo

## Licencia de Uso

El código fuente está bajo licencia MIT.

La documentación y material pedagógico están bajo Creative Commons Attribution 4.0.

© 2026 — Cátedra Legislación y Ejercicio Profesional - Carrera Analista Programador Universitario - FI UNJu

## Tests

Este proyecto usa Vitest + React Testing Library.

Para correr los tests:

```bash
npm run test
```

Cobertura actual:
- `Login.jsx`: validación de email, contraseña (longitud, mayúscula, número) y sector obligatorio; login exitoso y credenciales inválidas
- `RutaProtegida.jsx`: redirección a `/login` sin sesión, acceso permitido con sesión activa