// COMMIT: "fix: corregir los 4 errores de ESLint del proyecto"
// (archivo nuevo: createContext se movio aca desde AutorizacionesContext.jsx
// porque Fast Refresh solo funciona si un archivo exporta solo componentes)
import { createContext } from 'react'

export const AutorizacionesContext = createContext()
