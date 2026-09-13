import PropTypes from 'prop-types'
import { Navigate } from 'react-router-dom'
import useAutorizaciones from '../hooks/useAutorizaciones'

const RutaProtegida = ({ children }) => {
  const { admin } = useAutorizaciones()

  if (!admin) {
    return <Navigate to="/login" replace />
  }
  return children
}

RutaProtegida.propTypes = {
  children: PropTypes.node.isRequired
}

export default RutaProtegida
