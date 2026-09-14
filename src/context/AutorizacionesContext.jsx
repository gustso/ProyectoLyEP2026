import { createContext, useState, useEffect } from 'react'

export const AutorizacionesContext = createContext()

const AutorizacionesProvider = ({ children }) => {

  const [admin, setAdmin] = useState(() => {
  const adminGuardado = localStorage.getItem('admin')
  if (adminGuardado) {
    try {
      return JSON.parse(adminGuardado)
    } catch (error) {
      localStorage.removeItem('admin')
      return null
    }
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
return (
    <AutorizacionesContext.Provider
      value={{ admin, setAdmin, cerrarSesion }}
    >
      {children}
    </AutorizacionesContext.Provider>
  )
}

export default AutorizacionesProvider