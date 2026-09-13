import '../css/header.css'
import { Navbar, Container, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import useAutorizaciones from '../hooks/useAutorizaciones'

const Header = () => {
  const { admin, cerrarSesion } = useAutorizaciones()
  const navigate = useNavigate()
  const manejarCerrarSesion = () => {
    cerrarSesion()
    navigate('/login')
  }
  return (
    <Navbar>
      <Container>
        <Navbar.Brand>Panel de Control de Clientes</Navbar.Brand>
        {admin && (
          <div className="usuario-header">
            <p>
              {admin.nombre} - {admin.sector}
            </p>
            <Button className="btn-header" onClick={manejarCerrarSesion}>
              {' '}
              Cerrar Sesion{' '}
            </Button>
          </div>
        )}
      </Container>
    </Navbar>
  )
}
export default Header
