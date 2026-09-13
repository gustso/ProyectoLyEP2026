# TRABAJO INTEGRADOR FINAL - PROGRAMACION VISUAL

## Descripcion TP Integrador - 2026

Este proyecto consiste en la construccion de un Panel de Control de Clientes utilizando React y Vite. Esta aplicacion permite la gestion y visualizacion de informacion de clientes a traves del consumo de datos de la API pública FakeStoreAPI, ademas de la navegacion entre distintas vistas de forma dinamica.

Se implementaran tecnologias como React Router Dom, Context API, LocalStorage, peticiones asincronicas y el uso de un framework de interfaz de usuario, para que la experiencia del usuario sea mas dinamica e interactiva.

> **Nota:** FakeStoreAPI es una API de pruebas: los `POST` y `DELETE` responden `200 OK` con datos simulados, pero **no persisten los cambios**. Si creás o eliminás un cliente y recargás la página, va a seguir apareciendo el listado original — es el comportamiento esperado de la API, no un bug de la aplicación.

## Instalación y ejecución

```bash
npm install
npm run dev
```

La app va a levantar en `http://localhost:5173` (o el siguiente puerto libre). No hace falta crear ningún archivo `.env` para probarla — si no existe, usa `https://fakestoreapi.com` por defecto. Si querés apuntar a otra API, copiá `.env.example` a `.env` y cambiá `VITE_API_URL`.

Otros comandos disponibles:

| Comando | Descripción |
|---|---|
| `npm run build` | Genera el build de producción |
| `npm run lint` | Corre ESLint |
| `npm run test` | Corre la suite de tests (Vitest) |

## Credenciales de prueba

El login es simulado (no hay backend de autenticación): las credenciales están hardcodeadas en `src/services/autorizacionesServices.js`.

| Email | Contraseña | Sector |
|---|---|---|
| antonella@gmail.com | Admin123 | Soporte |
| jimena@gmail.com | Admin123 | Gerencia |
| maia@gmail.com | Admin123 | Gerencia |
| abril@gmail.com | Admin123 | Soporte |
| guadalupe@gmail.com | Admin123 | Soporte |
| lourdes@gmail.com | Admin123 | Gerencia |

El sector se determina por el usuario logueado: solo el sector **Gerencia** puede eliminar clientes desde la ficha de detalle.

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