import '../css/login.css'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useAutorizaciones from '../hooks/useAutorizaciones'
import AutorizacionesService from '../services/autorizacionesServices'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [sector, setSector] = useState('')
  const [errores, setErrores] = useState({})
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
    } else {
      if (password.length < 8) {
        nuevosErrores.password = 'Mínimo 8 caracteres'
      } else if (!/[A-Z]/.test(password)) {
        nuevosErrores.password = 'Debe tener una mayúscula'
      } else if (!/[0-9]/.test(password)) {
        nuevosErrores.password = 'Debe tener un número'
      }
    }
    if (!sector) {
      nuevosErrores.sector = 'Seleccione un sector'
    }
    setErrores(nuevosErrores)
    return Object.keys(nuevosErrores).length === 0
  }
 //Agregue el async 
  const manejarSubmit = async (e) => {
    e.preventDefault()
    if (!validar()) return
    //await para esperar la respuesta de la promesa
    const usuario = await AutorizacionesService.login(
      email,
      password,
      sector
    )
    if (!usuario) {
     alert('Verifique los datos')
      return
    }

    // 1. Guardas el rol (como ya tenías)
    localStorage.setItem("role", usuario.sector)

    // 2. AGREGAR ESTA LÍNEA: Guardas todo el objeto usuario (incluyendo su email)
    localStorage.setItem("usuarioLogueado", JSON.stringify(usuario))
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
        <label>Email:</label>
        <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
        <p style={{ color: 'red', minHeight: '18px' }}>
          {errores.email || ' '}
        </p>
        <label>Contraseña:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <p style={{ color: 'red', minHeight: '18px' }}>
          {errores.password || ' '}
        </p>
        <label>Sector:</label>
        <select value={sector} onChange={(e) => setSector(e.target.value)}>
          <option value="">Seleccione un sector</option>
          <option value="Soporte">Soporte</option>
          <option value="Gerencia">Gerencia</option>
        </select>
        <p style={{ color: 'red', minHeight: '18px' }}>
          {errores.sector || ' '}
        </p>
        <button type="submit">Ingresar</button>
      </form>
    </div>
  )
}
export default Login