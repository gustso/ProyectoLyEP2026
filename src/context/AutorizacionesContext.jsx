// COMMIT: "fix: memoizar el value del AutorizacionesContext"
// (antes: import { useState, useEffect } from 'react', sin useMemo)
// COMMIT: "fix: corregir los 4 errores de ESLint del proyecto"
// (antes: import { createContext, useState, useEffect, useMemo } from 'react'
// y export const AutorizacionesContext = createContext() estaban en este mismo
// archivo; se movio createContext a autorizacionesContextObject.js)
import { useState, useEffect, useMemo } from 'react'
import { AutorizacionesContext } from './autorizacionesContextObject'

const AutorizacionesProvider = ({ children }) => {

  const [admin, setAdmin] = useState(()=>{
    const adminGuardado= localStorage.getItem('admin')
    if(adminGuardado){
      return JSON.parse(adminGuardado)
    }
    return null
  })
useEffect(()=>{
  if(admin){
    localStorage.setItem(
      'admin',
      JSON.stringify(admin)
    )
  }else{
    localStorage.removeItem('admin')
  }

},[admin])
const cerrarSesion=()=>{
  setAdmin(null)
}

// COMMIT: "fix: memoizar el value del AutorizacionesContext"
// (antes: value={{ admin, setAdmin, cerrarSesion }} directo en el Provider,
// se recreaba un objeto nuevo en cada render)
const value = useMemo(
  () => ({ admin, setAdmin, cerrarSesion }),
  [admin]
)

return (
    <AutorizacionesContext.Provider value={value}>
      {children}
    </AutorizacionesContext.Provider>
  )
}

export default AutorizacionesProvider