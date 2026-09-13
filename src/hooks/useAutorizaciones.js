import { useContext } from 'react'
import { AutorizacionesContext } from '../context/autorizacionesContextObject'
const useAutorizaciones = () => {
  return useContext(AutorizacionesContext)
}
export default useAutorizaciones
