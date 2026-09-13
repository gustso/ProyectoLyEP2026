const CLAVE_LOCAL = "clientes_persistidos";

 const leerClientesLocal = () => {
     const guardado = localStorage.getItem(CLAVE_LOCAL);
     return guardado ? JSON.parse(guardado) : null;
 };

 const guardarClientesLocal = (clientes) => {
     localStorage.setItem(CLAVE_LOCAL, JSON.stringify(clientes));
 };

const obtenerClientesConPersistencia = async (signal) => {
     const enLocal = leerClientesLocal();
     if (enLocal) return enLocal;

     const clientesBase = await obtenerClientes(signal);
     guardarClientesLocal(clientesBase);
     return clientesBase;
 };

 const crearClienteConPersistencia = async (cliente) => {
     const clientes = leerClientesLocal() ?? [];
     const nuevoId = Math.max(0, ...clientes.map((c) => c.id)) + 1;
     const nuevoCliente = { ...cliente, id: nuevoId };

     guardarClientesLocal([...clientes, nuevoCliente]);
     return nuevoCliente;
 };

 const eliminarClienteConPersistencia = async (id) => {
     const clientes = leerClientesLocal() ?? [];
     guardarClientesLocal(clientes.filter((c) => c.id !== Number(id)));
 };
