import '../css/login.css'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useAutorizaciones from '../hooks/useAutorizaciones'
import AutorizacionesService from '../services/autorizacionesServices'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errores, setErrores] = useState({})
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
    setErrores(nuevosErrores)
    return Object.keys(nuevosErrores).length === 0
  }
  const manejarSubmit = (e) => {
    e.preventDefault()
    setErrorLogin('')
    if (!validar()) return
    const usuario = AutorizacionesService.login(email, password)
    if (!usuario) {
      setErrorLogin('Verifique los datos ingresados')
      return
    }
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
        <label htmlFor="email">Email:</label>
        <input
          id="email"
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <p className="campo-error" aria-live="polite">
          {errores.email || ' '}
        </p>
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
        <p className="campo-error" aria-live="polite">
          {errorLogin || ' '}
        </p>
        <button type="submit">Ingresar</button>
      </form>
    </div>
  )
}
export default Login
