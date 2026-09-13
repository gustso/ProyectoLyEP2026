import axios from "axios";

const API_BASE = import.meta.env.VITE_API_URL || "https://fakestoreapi.com";
const URL = `${API_BASE}/users`;

const obtenerClientes = async (signal) => {

    const respuesta = await axios.get(
        URL,
        { signal }
    );

    return respuesta.data;
};

const obtenerClientePorId = async (id, signal) => {

    const respuesta = await axios.get(
        `${URL}/${id}`,
        { signal }
    );

    return respuesta.data;
};

const crearCliente = async (cliente) => {

    const respuesta = await axios.post(
        URL,
        cliente
    );

    return respuesta.data;
};

const eliminarCliente = async (id) => {

    const respuesta = await axios.delete(
        `${URL}/${id}`
    );

    return respuesta.data;
};

export default {
    obtenerClientes,
    obtenerClientePorId,
    crearCliente,
    eliminarCliente
};

// PROPUESTA DE MEJORA: persistencia real de los clientes (no activa todavia)
//
// FakeStoreAPI no persiste nada de verdad: crearCliente y eliminarCliente
// responden 200 OK pero al recargar la pagina los datos vuelven a ser los
// originales. Esta es una implementacion alternativa que SI persiste,
// guardando los clientes en localStorage como una base de datos falsa.
// No reemplaza nada de lo de arriba, solo muestra como se veria.
//
// -----------------------------------------------------------------------
//
// const CLAVE_LOCAL = "clientes_persistidos";
//
// const leerClientesLocal = () => {
//     const guardado = localStorage.getItem(CLAVE_LOCAL);
//     return guardado ? JSON.parse(guardado) : null;
// };
//
// const guardarClientesLocal = (clientes) => {
//     localStorage.setItem(CLAVE_LOCAL, JSON.stringify(clientes));
// };
//
// // La primera vez que se piden los clientes, se trae la lista base de
// // FakeStoreAPI y se guarda en localStorage. Las veces siguientes se lee
// // directo de ahi, para que los cambios (altas/bajas) sobrevivan al refresh.
// const obtenerClientesConPersistencia = async (signal) => {
//     const enLocal = leerClientesLocal();
//     if (enLocal) return enLocal;
//
//     const clientesBase = await obtenerClientes(signal);
//     guardarClientesLocal(clientesBase);
//     return clientesBase;
// };
//
// const crearClienteConPersistencia = async (cliente) => {
//     const clientes = leerClientesLocal() ?? [];
//     const nuevoId = Math.max(0, ...clientes.map((c) => c.id)) + 1;
//     const nuevoCliente = { ...cliente, id: nuevoId };
//
//     guardarClientesLocal([...clientes, nuevoCliente]);
//     return nuevoCliente;
// };
//
// const eliminarClienteConPersistencia = async (id) => {
//     const clientes = leerClientesLocal() ?? [];
//     guardarClientesLocal(clientes.filter((c) => c.id !== Number(id)));
// };
//
// Alternativa mas robusta (si se quiere un backend real en vez de
// localStorage): levantar "json-server" en paralelo al proyecto,
// apuntando VITE_API_URL a http://localhost:3001 durante desarrollo.
// json-server persiste en un archivo db.json de verdad, sin tocar nada
// del codigo de clientesService.js.
