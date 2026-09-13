import { useContext } from 'react'
import { AutorizacionesContext } from '../context/AutorizacionesContext'
const useAutorizaciones = () => {
  return useContext(AutorizacionesContext)
}
export default useAutorizaciones
