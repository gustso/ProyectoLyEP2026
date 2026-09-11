# Análisis Técnico — ProyectoLyEP2026

**Integrante:** Benítez Monserrat
**Rama:** `ramaBenitezMonserrat`
**Fecha:** 11/09/2026

## Resumen ejecutivo

El prototipo es un panel de control de clientes construido en React 19 con Vite, React Router y Context API, que simula autenticación por sector (Gerencia/Soporte) contra un array de usuarios hardcodeado y consume la API pública FakeStoreAPI como backend de clientes. La estructura general del proyecto es clara y sigue convenciones razonables de organización (components/pages/services/context), pero presenta fallas de seguridad críticas: expone credenciales de administradores en el bundle, muestra contraseñas de clientes en texto plano, y controla el acceso a acciones sensibles mediante un valor de `localStorage` fácilmente manipulable desde el navegador. Al no contar con un backend propio, cualquier corrección real de autenticación queda limitada a mitigar estos riesgos dentro del alcance del frontend.

## Tabla de hallazgos

| Problema detectado | Dimensión | Impacto | Propuesta de solución |
|---|---|---|---|
| Credenciales de administradores hardcodeadas en texto plano en el bundle | Seguridad | Alto | Mover autenticación a un backend real; nunca embeber contraseñas en el cliente |
| Control de acceso al botón "Eliminar Cliente" basado en `localStorage.getItem("role")`, editable desde DevTools | Seguridad | Alto | Usar el contexto de autorización (`admin.sector`) en vez de `localStorage` |
| Contraseña del cliente renderizada en texto plano en la ficha de detalle | Seguridad | Alto | No renderizar el campo `password`; mostrar un indicador ofuscado |
| Contraseña fija `"1234"` asignada a todo cliente nuevo | Seguridad | Medio | Generar una contraseña temporal aleatoria por cliente |
| Código muerto: rama `!admin` en `Dashboard.jsx` inalcanzable por la protección de ruta | Lógica / Funcional | Medio | Eliminar la rama duplicada de control de acceso |
| Sesión completa persistida en `localStorage` sin expiración ni token | Seguridad | Medio | Persistir sólo un token con expiración, validado contra backend |
| `DetalleCliente` sin manejo de errores de red en el `fetch` inicial | Manejo de errores | Medio | Agregar `try/catch` o `.catch()` con estado de error visible |
| Uso de FakeStoreAPI como backend simulado; mensajes de éxito engañosos | Lógica / Funcional | Medio | Aclarar en README que los datos no persisten, o reemplazar por backend propio |
| Validación de formulario de alta de cliente insuficiente (sólo campos vacíos) | Lógica / Funcional | Bajo | Validar formato de email y teléfono con regex |
| Valores de las tarjetas del Dashboard hardcodeados, no reales | Lógica / Funcional | Bajo | Calcular a partir de los datos reales de clientes/usuarios |
| `package.json` con nombre de otro proyecto/materia | Mantenibilidad | Bajo | Actualizar metadata del proyecto |
| Variable `error` no utilizada en el `catch` de `eliminarCliente` | Mantenibilidad | Bajo | Usar `catch` sin parámetro |

## Mejora seleccionada por Monserrat: justificación técnica

**Mejora implementada:** corregir el control de acceso del botón "Eliminar Cliente" reemplazando la lectura de `localStorage.getItem("role")` por el contexto `useAutorizaciones()` (`admin.sector`), y eliminar la exposición de la contraseña del cliente en la ficha de detalle.

**Por qué esta mejora sobre las demás:**

1. **Es la de mayor impacto real detectado.** Permite escalar privilegios (cualquier usuario puede habilitarse como Gerencia editando una variable del navegador) y expone credenciales de clientes sin ninguna necesidad funcional — ambos son problemas de seguridad directos sobre datos y acciones sensibles, a diferencia de otros hallazgos que son de mantenibilidad o UX.
2. **Es factible de resolver dentro del alcance del proyecto.** A diferencia de corregir las credenciales de administradores hardcodeadas (que exigiría un backend de autenticación propio, fuera de alcance), este fix reutiliza infraestructura que ya existe en el proyecto (el `AutorizacionesContext`), sin agregar dependencias ni tocar arquitectura.
3. **Está acotado a un solo archivo** (`DetalleCliente.jsx`), lo que permite cumplir con la restricción de no modificar archivos no relacionados con la mejora seleccionada.
4. **Es verificable de forma directa:** probando con una cuenta de Gerencia y otra de Soporte se confirma en segundos si el control de acceso funciona correctamente, sin necesidad de mocks ni infraestructura adicional.

## Backlog priorizado (futuras iteraciones)

1. Mover la autenticación de administradores a un backend real con hashing de contraseñas (Crítico).
2. Reemplazar la persistencia de sesión en `localStorage` por un token con expiración validado en servidor (Alto).
3. Generar contraseñas temporales aleatorias al crear clientes, en vez de un valor fijo (Alto).
4. Eliminar la rama de código muerto en `Dashboard.jsx` (Medio).
5. Agregar manejo de errores de red en `DetalleCliente.jsx` (Medio).
6. Documentar o reemplazar el uso de FakeStoreAPI como backend simulado (Medio).
7. Reforzar la validación del formulario de alta de clientes (email, teléfono) (Bajo).
8. Calcular los valores del Dashboard a partir de datos reales (Bajo).
9. Actualizar la metadata de `package.json` y el texto del footer (Bajo).
