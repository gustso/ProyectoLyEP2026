import axios from 'axios'

const URL = `${import.meta.env.VITE_API_URL}/users`

const obtenerClientes = async (signal) => {
  const respuesta = await axios.get(URL, { signal })
  return respuesta.data
}

const obtenerClientePorId = async (id, signal) => {
  const respuesta = await axios.get(`${URL}/${id}`, { signal })
  return respuesta.data
}

const crearCliente = async (cliente) => {
  const respuesta = await axios.post(URL, cliente)
  return respuesta.data
}

const eliminarCliente = async (id) => {
  const respuesta = await axios.delete(`${URL}/${id}`)
  return respuesta.data
}

export default {
  obtenerClientes,
  obtenerClientePorId,
  crearCliente,
  eliminarCliente
}
