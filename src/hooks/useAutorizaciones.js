import { useContext } from 'react'
// COMMIT: "fix: corregir los 4 errores de ESLint del proyecto"
// (antes: import { AutorizacionesContext } from '../context/AutorizacionesContext')
import { AutorizacionesContext } from '../context/autorizacionesContextObject'
const useAutorizaciones = () => {
  return useContext(AutorizacionesContext)
}
export default useAutorizaciones