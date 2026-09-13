import '../css/login.css'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useAutorizaciones from '../hooks/useAutorizaciones'
import AutorizacionesService from '../services/autorizacionesServices'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errores, setErrores] = useState({})
  // COMMIT: "fix: unificar el rol de sesion y quitar el alert() del login"
  // (junto con la eliminacion de localStorage.setItem('role', ...) mas abajo,
  // y el mismo cambio en DetalleCliente.jsx)
  const [errorLogin, setErrorLogin] = useState('')
  const { setAdmin } = useAutorizaciones()
  const navigate = useNavigate()
  const validar = () => {
    const nuevosErrores = {}
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!email) {
      nuevosErrores.email = 'El email es obligatorio'
    } else if (!emailRegex.test(email)) {
      nuevosErrores.email = 'Email inválido'
    }
    if (!password) {
      nuevosErrores.password = 'La contraseña es obligatoria'
    }
    // COMMIT: "fix: simplificar la validacion de contraseña en el login"
    // (aca antes habia un else con chequeo de longitud/mayuscula/numero, se eliminó)
    // COMMIT: "fix: el sector del login lo determina el usuario, no un select"
    // (aca antes habia un if(!sector) que agregaba nuevosErrores.sector, se eliminó)
    setErrores(nuevosErrores)
    return Object.keys(nuevosErrores).length === 0
  }
  const manejarSubmit = (e) => {
    e.preventDefault()
    setErrorLogin('')
    if (!validar()) return
    // COMMIT: "fix: el sector del login lo determina el usuario, no un select"
    // (antes se llamaba login(email, password, sector))
    const usuario = AutorizacionesService.login(email, password)
    if (!usuario) {
      // COMMIT: "fix: unificar el rol de sesion y quitar el alert() del login"
      // (antes era: alert('Verifique los datos'))
      setErrorLogin('Verifique los datos')
      return
    }
    // COMMIT: "fix: unificar el rol de sesion y quitar el alert() del login"
    // (aca antes habia: localStorage.setItem("role", usuario.sector), se eliminó)
    setAdmin({
      nombre: usuario.nombre,
      email: usuario.email,
      sector: usuario.sector
    })
    navigate('/')
  }
  return (
    <div className="login-container">
      <h1>Iniciar Sesión</h1>
      <form onSubmit={manejarSubmit}>
        {/* COMMIT: "fix: mejorar accesibilidad del login y la pagina 404" */}
        {/* (htmlFor="email" / id="email" agregados) */}
        <label htmlFor="email">Email:</label>
        <input
          id="email"
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {/* COMMIT: "fix: mover estilos inline del login a una clase CSS" */}
        {/* (antes: style={{ color: 'red', minHeight: '18px' }}) */}
        {/* COMMIT: "fix: mejorar accesibilidad del login y la pagina 404" */}
        {/* (aria-live="polite" agregado) */}
        <p className="campo-error" aria-live="polite">
          {errores.email || ' '}
        </p>
        {/* COMMIT: "fix: mejorar accesibilidad del login y la pagina 404" */}
        {/* (htmlFor="password" / id="password" agregados) */}
        <label htmlFor="password">Contraseña:</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <p className="campo-error" aria-live="polite">
          {errores.password || ' '}
        </p>
        {/* COMMIT: "fix: el sector del login lo determina el usuario, no un select" */}
        {/* (aca antes estaba el <label>Sector:</label> y el <select> con Soporte/Gerencia,
            junto con el <p> de errores.sector, todo eliminado) */}
        <p className="campo-error" aria-live="polite">
          {errorLogin || ' '}
        </p>
        <button type="submit">Ingresar</button>
      </form>
    </div>
  )
}
export default Login