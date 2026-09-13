import { createContext, useState, useEffect } from 'react'
import PropTypes from 'prop-types'

export const AutorizacionesContext = createContext()

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
  return (
    <AutorizacionesContext.Provider value={{ admin, setAdmin, cerrarSesion }}>
      {children}
    </AutorizacionesContext.Provider>
  )
}

AutorizacionesProvider.propTypes = {
  children: PropTypes.node.isRequired
}

export default AutorizacionesProvider
