import { useState, useEffect, useMemo } from 'react'
import { AutorizacionesContext } from './autorizacionesContextObject'

const AutorizacionesProvider = ({ children }) => {
  const [admin, setAdmin] = useState(() => {
    const adminGuardado = localStorage.getItem('admin')
    if (adminGuardado) {
      return JSON.parse(adminGuardado)
    }
    return null
  })
  useEffect(() => {
    if (admin) {
      localStorage.setItem('admin', JSON.stringify(admin))
    } else {
      localStorage.removeItem('admin')
    }
  }, [admin])
  const cerrarSesion = () => {
    setAdmin(null)
  }

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
