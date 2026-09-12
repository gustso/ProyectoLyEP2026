import '../css/dashboard.css'
import useAutorizaciones from '../hooks/useAutorizaciones'
import Login from './Login'
import { useEffect, useState } from 'react'
import clientesService from '../services/clientesService'

const Dashboard = () => {
const { admin } = useAutorizaciones()
const [clientes, setClientes] = useState([])
const [cargando, setCargando] = useState(true)
const [errorCarga, setErrorCarga] = useState("")

useEffect(() => {
  const cargarClientes = async () => {
    try {
      setErrorCarga("")
      const datos = await clientesService.obtenerClientes()
      setClientes(datos)
    } catch {
      setErrorCarga("No se pudieron cargar los clientes.")
    } finally {
      setCargando(false)
    }
  }

  cargarClientes()
}, [])

  return (
    <div className="dashboard">

      <h1>Panel de Control de Clientes</h1>

      {!admin ? (
        <div className="dashboard-login">
          <h3>Bienvenido al sistema</h3>
          <p>Ingrese sus credenciales para acceder.</p>
          <Login />
        </div>
      ) : (
        <>
          <div className="user-card">
            <h3>Usuario conectado</h3>

            <p><strong>Administrador:</strong> {admin.nombre}</p>
            <p><strong>Email:</strong> {admin.email}</p>
            <p><strong>Sector:</strong> {admin.sector}</p>
          </div>

          {errorCarga && <p role="alert">{errorCarga}</p>}
          <div className="dashboard-cards">

            <div className="dashboard-card">
              <h3>Clientes</h3>
              <p>
                {cargando
                  ? "Cargando clientes..."
                  : clientes.length === 0
                    ? "Sin clientes"
                    : clientes.length}
              </p>
            </div>

            <div className="dashboard-card">
              <h3>Gerencia</h3>
              <p>3</p>
            </div>

            <div className="dashboard-card">
              <h3>Soporte</h3>
              <p>3</p>
            </div>
          </div>

        </>
      )}

    </div>
  )
}

export default Dashboard