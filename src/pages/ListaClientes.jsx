import '../css/listaclientes.css'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import FormCliente from '../components/FormCliente'
import useClientes from '../hooks/useClientes'

const ListaClientes = () => {
  const { clientes, loading, error, agregarCliente } = useClientes()
  const [busqueda, setBusqueda] = useState('')

  const clientesFiltrados = clientes.filter(
    (cliente) =>
      cliente.name?.lastname?.toLowerCase().includes(busqueda.toLowerCase()) ||
      cliente.address?.city?.toLowerCase().includes(busqueda.toLowerCase())
  )

  if (loading) {
    return <h2>Cargando clientes...</h2>
  }

  if (error) {
    return <h2>Error al cargar los clientes.</h2>
  }

  return (
    <div className="clientes-container">
      <h1>Clientes</h1>
      <FormCliente onClienteCreado={agregarCliente} />

      <hr />

      <div className="contenedor-buscador">
        <h2 className="titulo-buscador">Buscar Clientes</h2>

        <input
          className="buscador"
          type="text"
          placeholder="Buscar por apellido o ciudad"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />

        <p className="cantidad-clientes">
          Clientes encontrados: {clientesFiltrados.length}
        </p>
      </div>
      <div className="tabla-clientes-wrapper">
        <table className="tabla-clientes">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Email</th>
              <th>Teléfono</th>
              <th>Ciudad</th>
              <th>Acciones</th>
            </tr>
          </thead>

          <tbody>
            {clientesFiltrados.map((cliente) => (
              <tr key={cliente.id}>
                <td>{cliente.id}</td>

                <td>
                  {cliente.name?.firstname} {cliente.name?.lastname}
                </td>

                <td>{cliente.email}</td>

                <td>{cliente.phone}</td>

                <td>{cliente.address?.city}</td>

                <td>
                  <Link className="btn-ficha" to={`/clientes/${cliente.id}`}>
                    Ver Ficha Completa
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ListaClientes
