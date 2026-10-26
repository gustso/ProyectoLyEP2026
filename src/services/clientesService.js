import axios from "axios";

// Única fuente de verdad para la URL de la API de clientes.
// Ningún componente debe volver a escribir esta URL a mano:
// todo acceso a clientes pasa por las funciones de este service.
const URL_CLIENTES = "https://fakestoreapi.com/users";

// Manejo de errores unificado.
// axios rechaza la promesa tanto si la respuesta no es OK (4xx / 5xx)
// como si falla la red, así que acá se traducen los dos casos a un
// único Error con un mensaje ya listo para mostrar en pantalla.
const ejecutar = async (peticion, mensajeError) => {

    try {

        return await peticion();

    } catch (fallo) {

        const codigo = fallo.response?.status;

        throw new Error(
            codigo
                ? `${mensajeError} (código ${codigo})`
                : `${mensajeError} Revise su conexión.`,
            { cause: fallo }
        );

    }
};

const getClientes = async () => {

    const respuesta = await ejecutar(
        () => axios.get(URL_CLIENTES),
        "No se pudieron obtener los clientes."
    );

    return respuesta.data;
};

const getCliente = async (id) => {

    const respuesta = await ejecutar(
        () => axios.get(`${URL_CLIENTES}/${id}`),
        `No se pudo obtener el cliente ${id}.`
    );

    // La API responde 200 con cuerpo vacío cuando el id no existe,
    // así que ese caso también se trata como error.
    if (!respuesta.data) {

        throw new Error(
            `No se encontró el cliente ${id}.`
        );
    }

    return respuesta.data;
};

const crearCliente = async (datosFormulario) => {
    const nuevoCliente = {
        email: datosFormulario.email,
        username: datosFormulario.nombre ? datosFormulario.nombre.toLowerCase().replace(/\s/g, "") : "",
        password: "1234",
        name: {
            firstname: datosFormulario.nombre || "",
            lastname: "-"
        },
        address: {
            city: datosFormulario.ciudad || ""
        },
        phone: datosFormulario.telefono || ""
    };

    const respuesta = await ejecutar(
        () => axios.post(URL_CLIENTES, nuevoCliente),
        "No se pudo crear el cliente."
    );

    return respuesta.data;
};

const eliminarCliente = async (id) => {
    const respuesta = await ejecutar(
        () => axios.delete(`${URL_CLIENTES}/${id}`),
        `No se pudo eliminar el cliente ${id}.`
    );

    return respuesta.data;
};

export default {
    getClientes,
    getCliente,
    crearCliente,
    eliminarCliente
};
