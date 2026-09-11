import { useEffect, useState } from 'react'
import '../css/dashboard.css'
import useAutorizaciones from '../hooks/useAutorizaciones'
import Login from './Login'
import clientesService from '../services/clientesService'
import autorizacionesServices from '../services/autorizacionesServices'

const Dashboard = () => {
  const { admin } = useAutorizaciones()
  const [totalClientes, setTotalClientes] = useState(null)
  const [totalGerencia, setTotalGerencia] = useState(null)
  const [totalSoporte, setTotalSoporte] = useState(null)

  useEffect(() => {
    if (admin) {
      // Clientes desde la API
      clientesService.obtenerClientes()
        .then(data => setTotalClientes(data.length))
        .catch(() => setTotalClientes('Error'))

      // Gerencia y Soporte desde datos locales
      const usuarios = autorizacionesServices.obtenerUsuarios()
      setTotalGerencia(usuarios.filter(u => u.sector === 'Gerencia').length)
      setTotalSoporte(usuarios.filter(u => u.sector === 'Soporte').length)
    }
  }, [admin])

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
          <div className="dashboard-cards">

            <div className="dashboard-card">
              <h3>Clientes</h3>
              <p>{totalClientes ?? '...'}</p>
            </div>

            <div className="dashboard-card">
              <h3>Gerencia</h3>
              <p>{totalGerencia ?? '...'}</p>
            </div>

            <div className="dashboard-card">
              <h3>Soporte</h3>
              <p>{totalSoporte ?? '...'}</p>
            </div>
          </div>

        </>
      )}

    </div>
  )
}

export default Dashboard