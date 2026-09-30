import { useContext } from 'react'
import { AutorizacionesContext } from '../context/autorizaciones.context'
const useAutorizaciones = () => {
  return useContext(AutorizacionesContext)
}
export default useAutorizaciones