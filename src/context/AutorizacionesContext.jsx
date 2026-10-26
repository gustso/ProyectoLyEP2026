import { createContext, useState, useEffect } from 'react'

export const AutorizacionesContext = createContext()

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
  localStorage.removeItem('role')
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