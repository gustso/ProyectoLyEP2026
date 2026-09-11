import axios from "axios";

const URL = "https://fakestoreapi.com/users";

const obtenerClientes = async () => {
    const respuesta = await axios.get(URL);
    return respuesta.data;
};

const crearCliente = async (cliente) => {

    const respuesta = await axios.post(
        URL,
        cliente
    );

    return respuesta.data;
};

export default {
    obtenerClientes,
    crearCliente
};