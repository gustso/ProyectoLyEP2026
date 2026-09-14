# ANALISIS TECNICO PROFESIONAL 

## Proyecto analizado

Repositorio: `ProyectoLyEP2026`

Aplicacion: sistema web de gestion de clientes desarrollado con React, Vite, React Router, Context API, Bootstrap y consumo de la API publica FakeStoreAPI.

Objetivo del analisis: revisar el codigo existente, detectar problemas tecnicos, clasificar su impacto, proponer mejoras y documentar las correcciones realizadas mediante ramas feature y Pull Requests.

## Resumen ejecutivo

El prototipo cumple con el objetivo general de mostrar un panel de clientes con autenticacion basica, rutas protegidas, listado, busqueda, ficha de detalle y formulario de alta. Sin embargo, durante la revision se detectaron problemas importantes relacionados con seguridad, estabilidad, manejo de datos externos, estilos globales y mantenimiento del codigo. Las mejoras implementadas apuntan a reducir fallas en tiempo de ejecucion, mejorar el control de acceso y ordenar componentes que tenian responsabilidades innecesarias. Como conclusion general, el proyecto es funcional para una practica academica, pero requiere fortalecer sus validaciones, su manejo de errores y su proteccion de datos antes de considerarse apto para un contexto real.

## Tabla de hallazgos

| ID | Problema detectado | Dimension | Impacto | Propuesta de solucion |
| --- | --- | --- | --- | --- |
| H01 | Deserializacion directa con `JSON.parse(adminGuardado)` en `AutorizacionesContext.jsx`, sin manejo de errores. | Estabilidad y manejo de errores | Alto | Envolver la lectura de `localStorage` en `try/catch`, eliminar datos corruptos y retornar `null` si la sesion guardada no es valida. |
| H02 | Control de permisos basado en `localStorage.getItem("role")` dentro de `DetalleCliente.jsx`. | Seguridad y control de acceso | Alto / Critico | Obtener el sector del usuario desde el contexto de autenticacion (`useAutorizaciones`) y dejar de guardar el rol como clave suelta en `localStorage`. |
| H03 | Exposicion de la contrasena del cliente en la vista de detalle mediante `cliente.password`. | Seguridad y privacidad de datos | Alto | Eliminar la visualizacion de la contrasena en la interfaz y mostrar solo datos no sensibles. |
| H04 | Acceso directo a propiedades anidadas (`cliente.name.lastname`, `cliente.address.city`) durante el filtrado de clientes. | Robustez y experiencia de usuario | Alto | Usar optional chaining (`?.`) y valores por defecto (`|| ""`) antes de ejecutar metodos como `toLowerCase()` e `includes()`. |
| H05 | El componente `Dashboard.jsx` importaba y renderizaba `Login` aunque la ruta ya estaba protegida por `RutaProtegida`. | Arquitectura y mantenibilidad | Medio | Eliminar el codigo muerto y asumir que el usuario autenticado ya fue validado por la ruta protegida. |
| H06 | Selectores globales en `login.css` como `form`, `form label` y `form button`, afectando formularios de otros componentes. | Estilos y mantenibilidad | Medio | Encapsular las reglas bajo `.login-container` para evitar efectos colaterales en otros formularios. |
| H07 | `DetalleCliente.jsx` realiza `fetch` directo y no valida `res.ok` al cargar un cliente individual. | Manejo de errores | Medio | Incorporar validacion de respuesta, estado de error y posible mensaje de cliente no encontrado. |
| H08 | `ListaClientes.jsx` y `DetalleCliente.jsx` consumen la API directamente en componentes, mientras existe `clientesService.js`. | Arquitectura | Medio | Centralizar las operaciones HTTP en servicios para mejorar reutilizacion, legibilidad y testeo. |
| H09 | El formulario de alta de cliente crea registros con contrasena fija `1234`. | Seguridad | Alto | Eliminar contrasenas por defecto o delegar la gestion de credenciales a un flujo seguro de backend. |
| H10 | El dashboard muestra metricas fijas (`10`, `3`, `3`) en lugar de calcularlas desde datos reales. | Funcionalidad y calidad de informacion | Bajo / Medio | Calcular indicadores reales desde la fuente de datos o desde un servicio especifico. |
| H11 | No se observan pruebas automatizadas para rutas protegidas, autenticacion, listado o detalle de clientes. | Calidad y mantenibilidad | Medio | Agregar pruebas unitarias y de integracion para los flujos principales. |
| H12 | La pantalla de login podia quedar disponible para usuarios que ya tenian una sesion activa. | Experiencia de usuario y flujo de autenticacion | Medio | Redirigir automaticamente al dashboard cuando exista un usuario autenticado en el contexto. |

## Mejoras seleccionadas por participante

| Participante | Mejora seleccionada | Archivos involucrados | Justificacion tecnica | Estado |
| --- | --- | --- | --- | --- |
| Mauricio Joaquin Coca | Prevenir caida por `JSON.parse` invalido al recuperar la sesion del administrador. | `src/context/AutorizacionesContext.jsx` | Se eligio porque un dato corrupto en `localStorage` puede provocar pantalla blanca e impedir el uso completo de la aplicacion. | Integrada en `main` mediante PR #3. |
| Emanuel Jesus Valeriano | Depurar el dashboard y encapsular estilos del login. | `src/pages/Dashboard.jsx`, `src/css/login.css` | Se eligio para eliminar codigo muerto, reducir dependencias innecesarias y evitar que los estilos del login afecten otros formularios. | Integrada en `main`. |
| Luciano Gabriel Giron | Corregir control de permisos basado en `localStorage`. | `src/pages/Login.jsx`, `src/pages/DetalleCliente.jsx` | Se eligio porque eliminar clientes es una accion sensible y no debe depender de un valor manipulable desde el navegador. | Integrada en `main` mediante PR #1. |
| Luciano Gabriel Giron | Ocultar contrasena del cliente en la vista de detalle. | `src/pages/DetalleCliente.jsx` | Se eligio porque exponer contrasenas en pantalla es una mala practica de seguridad y privacidad, incluso en un prototipo. | Documentada; pendiente de integracion si no se subio el PR correspondiente. |
| Andres Alvaro Garcia | Evitar caida al filtrar clientes con propiedades anidadas faltantes. | `src/pages/ListaClientes.jsx` | Se eligio porque un dato incompleto de la API podia generar un `TypeError` al buscar por apellido o ciudad. | Integrada en `main` mediante PR #2. |
| Guillermo Javier Soto | Redirigir desde login cuando el usuario ya posee sesion iniciada. | `src/pages/Login.jsx` | Se eligio porque un usuario autenticado no deberia volver a ver el formulario de inicio de sesion; mantenerlo alli genera un flujo confuso y permite reintentos innecesarios de autenticacion. | Integrada en `main` mediante PR #5. |

## Mejoras implementadas y evidencia tecnica

### PR #1 - Validacion de rol desde contexto

**Problema:** La aplicacion leia el rol del usuario desde `localStorage.getItem("role")` para decidir si mostraba el boton de eliminar cliente.

**Riesgo:** Cualquier usuario podia modificar manualmente esa clave desde las herramientas del navegador y simular ser parte del sector "Gerencia".

**Solucion aplicada:** Se modifico `DetalleCliente.jsx` para obtener el sector desde el contexto de autenticacion (`useAutorizaciones`). Tambien se modifico `Login.jsx` para dejar de guardar el rol en una clave separada.

**Commit relacionado:** `fix(seguridad): validar rol desde contexto de usuario`

### PR #2 - Optional chaining en busqueda de clientes

**Problema:** La busqueda accedia directamente a `cliente.name.lastname` y `cliente.address.city`. Si algun cliente llegaba incompleto desde la API, la aplicacion podia fallar con `TypeError`.

**Riesgo:** Una respuesta incompleta o irregular de la API podia romper el listado de clientes al escribir en el buscador.

**Solucion aplicada:** Se incorporo optional chaining y cadenas vacias como respaldo:

```jsx
(cliente.name?.lastname || "").toLowerCase().includes(busqueda.toLowerCase()) ||
(cliente.address?.city || "").toLowerCase().includes(busqueda.toLowerCase())
```

**Commit relacionado:** `arreglo en la lsita de busqueda de cliente`

### PR #3 - Recuperacion segura de sesion

**Problema:** `AutorizacionesContext.jsx` ejecutaba `JSON.parse(adminGuardado)` sin manejo de excepciones.

**Riesgo:** Si el dato guardado en `localStorage` estaba corrupto, la aplicacion podia fallar al iniciar y mostrar una pantalla en blanco.

**Solucion aplicada:** Se incorporo un bloque `try/catch` al recuperar la sesion guardada. Si el parseo falla, se elimina la clave `admin` de `localStorage` y se retorna `null`, permitiendo que la aplicacion vuelva a un estado seguro.

**Commit relacionado:** `fix(auth): prevenir crash por JSON.parse invalido en AutorizacionesContext`

### Mejora documentada - Ocultar contrasena del cliente

**Problema:** La ficha del cliente mostraba el campo `cliente.password`.

**Riesgo:** Se exponia informacion sensible en la interfaz.

**Solucion propuesta:** Eliminar la visualizacion de `cliente.password` y dejar visible solo el usuario, cambiando la seccion a "Datos de acceso".

**Commit sugerido:** `fix(seguridad): ocultar contrasena del cliente en detalle`

### PR #5 - Redireccion si existe sesion iniciada

**Problema:** La pantalla de login podia mostrarse aunque el usuario ya estuviera autenticado en el contexto de la aplicacion.

**Riesgo:** El flujo de navegacion resultaba confuso, porque un usuario con sesion activa podia volver al formulario de login y repetir una accion que ya no correspondia.

**Solucion aplicada:** Se importo `Navigate` desde `react-router-dom`, se obtuvo `admin` desde `useAutorizaciones()` y se agrego una redireccion temprana hacia `/` cuando ya existe una sesion iniciada.

**Commit relacionado:** `fix(login): redirige al dashboard si el usuario posee sesion iniciada`

## Backlog priorizado

1. Integrar la correccion para ocultar la contrasena del cliente en `DetalleCliente.jsx`.
2. Agregar manejo de errores en `DetalleCliente.jsx` para validar `res.ok`, mostrar error si falla la API y contemplar cliente inexistente.
3. Centralizar todos los consumos de FakeStoreAPI en `clientesService.js`.
4. Eliminar la contrasena fija `1234` en `FormCliente.jsx`.
5. Calcular las metricas del dashboard a partir de datos reales.
6. Normalizar mensajes, indentacion y estilo de codigo para mejorar legibilidad.
7. Agregar pruebas automatizadas para login, redireccion de usuarios autenticados, rutas protegidas, listado y detalle de cliente.
8. Revisar si corresponde mantener datos sensibles como `username` en la ficha publica del cliente.
9. Documentar el procedimiento de trabajo con ramas feature, commits semanticos y Pull Requests para futuras iteraciones.

## Riesgos residuales

- El prototipo todavia depende de FakeStoreAPI, por lo que no controla completamente la estructura ni la calidad de los datos recibidos.
- La autorizacion del lado cliente mejora la experiencia y reduce errores visibles, pero en un sistema real las acciones criticas tambien deben validarse en backend.
- Todavia no se evidencian pruebas automatizadas, por lo que las regresiones dependen principalmente de revision manual.
- La mejora para ocultar la contrasena del cliente se encuentra documentada, pero debe verificarse como Pull Request integrado antes de considerar cerrada esa parte de seguridad.

## Descripcion sugerida para Pull Request de documentacion

**Titulo sugerido:** `#4 Agregar ANALISIS.md del punto 5`

**Descripcion:**

Se agrega el archivo `ANALISIS.md` con el analisis tecnico profesional solicitado en el punto 5 del TP. El documento incluye resumen ejecutivo, tabla de hallazgos, mejoras seleccionadas por participante, detalle de mejoras implementadas, backlog priorizado y riesgos residuales.

**Archivos modificados:**

- `ANALISIS.md`

**Verificacion:**

- Revision del documento principal del TP.
- Revision de la documentacion de uso de IA del punto 5.
- Revision del estado actual del repositorio y de los Pull Requests ya mergeados.

## Conclusiones

El equipo identifico problemas relevantes y aplico mejoras concretas sobre seguridad, robustez, flujo de autenticacion y mantenibilidad. Las correcciones ya integradas reducen riesgos asociados al control de acceso, al manejo de datos incompletos en el listado de clientes, a la recuperacion de sesiones corruptas y a la navegacion de usuarios que ya poseen sesion activa. Para completar la entrega con mayor solidez, se recomienda integrar la mejora pendiente relacionada con la eliminacion de contrasenas visibles en la ficha del cliente y continuar con el backlog priorizado.
