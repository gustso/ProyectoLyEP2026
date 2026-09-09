import '../css/detallecliente.css'
import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import useAutorizaciones from '../hooks/useAutorizaciones'
import clientesService from '../services/clientesService'

const DetalleCliente = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { admin } = useAutorizaciones()

  const [cliente, setCliente] = useState(null)
  const [cargando, setCargando] = useState(true)
  const [errorCarga, setErrorCarga] = useState(false)
  const [mensaje, setMensaje] = useState('')

  useEffect(() => {
    const controller = new AbortController()

    clientesService
      .obtenerClientePorId(id, controller.signal)
      .then((data) => {
        setCliente(data)
        setCargando(false)
      })
      .catch((err) => {
        if (err.name === 'CanceledError') return
        setErrorCarga(true)
        setCargando(false)
      })

    return () => controller.abort()
  }, [id])

  const eliminarCliente = async () => {
    try {
      await clientesService.eliminarCliente(id)

      setMensaje('Cliente eliminado correctamente')

      setTimeout(() => {
        navigate('/clientes')
      }, 2000)
    } catch {
      setMensaje('Error al eliminar cliente')
    }
  }

  if (cargando) {
    return <h2>Cargando cliente...</h2>
  }

  if (errorCarga || !cliente) {
    return <h2>No se pudo cargar la información del cliente.</h2>
  }

  return (
    <div className="detalle-cliente">
      <h1>Ficha del Cliente</h1>
      <p>Rol actual: {admin?.sector}</p>

      {mensaje && <p className="mensaje-eliminado">{mensaje}</p>}

      <p>
        <strong>ID:</strong> {cliente.id}
      </p>

      <p>
        <strong>Nombre:</strong> {cliente.name?.firstname}{' '}
        {cliente.name?.lastname}
      </p>

      <p>
        <strong>Email:</strong> {cliente.email}
      </p>

      <p>
        <strong>Teléfono:</strong> {cliente.phone}
      </p>

      <h2>Dirección</h2>

      <p>
        <strong>Calle:</strong> {cliente.address?.street}
      </p>

      <p>
        <strong>Número:</strong> {cliente.address?.number}
      </p>

      <p>
        <strong>Código Postal:</strong> {cliente.address?.zipcode}
      </p>

      <p>
        <strong>Ciudad:</strong> {cliente.address?.city}
      </p>

      <h2>Cuenta</h2>

      <p>
        <strong>Usuario:</strong> {cliente.username}
      </p>

      {admin?.sector?.trim() === 'Gerencia' && (
        <button className="btn-eliminar" onClick={eliminarCliente}>
          Eliminar Cliente
        </button>
      )}
    </div>
  )
}

export default DetalleCliente
