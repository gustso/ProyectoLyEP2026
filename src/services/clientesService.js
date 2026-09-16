import axios from "axios";

const URL = "https://fakestoreapi.com/users";

const crearCliente = async (cliente) => {
    const respuesta = await axios.post(URL, cliente);
    return respuesta.data;
};

const obtenerClientes = async () => {
    const respuesta = await axios.get(URL);
    return respuesta.data;
};

const obtenerClientePorId = async (id) => {
    const respuesta = await axios.get(`${URL}/${id}`);
    return respuesta.data;
};

const eliminarCliente = async (id) => {
    const respuesta = await axios.delete(`${URL}/${id}`);
    return respuesta.data;
};

const actualizarCliente = async (id, cliente) => {
    const respuesta = await axios.put(`${URL}/${id}`, cliente);
    return respuesta.data;
};

export default {
    crearCliente,
    obtenerClientes,
    obtenerClientePorId,
    eliminarCliente,
    actualizarCliente
};