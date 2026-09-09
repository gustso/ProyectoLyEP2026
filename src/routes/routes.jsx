import { Routes, Route, useParams } from 'react-router-dom'

import Login from '../pages/Login'
import Dashboard from '../pages/Dashboard'
import ListaClientes from '../pages/ListaClientes'
import DetalleCliente from '../pages/DetalleCliente'
import ErrorPage from '../pages/ErrorPage'
import RutaProtegida from '../components/RutaProtegida'

// key={id} fuerza el remount al cambiar de cliente, para que el estado
// de carga/error de DetalleCliente arranque limpio sin resetearlo a mano.
const DetalleClienteRoute = () => {
  const { id } = useParams()
  return <DetalleCliente key={id} />
}

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/"
        element={
          <RutaProtegida>
            <Dashboard />
          </RutaProtegida>
        }
      />
      <Route
        path="/clientes"
        element={
          <RutaProtegida>
            <ListaClientes />
          </RutaProtegida>
        }
      />
      <Route
        path="/clientes/:id"
        element={
          <RutaProtegida>
            <DetalleClienteRoute />
          </RutaProtegida>
        }
      />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  )
}
export default AppRoutes
