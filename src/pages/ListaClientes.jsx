import "../css/listaclientes.css"
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import FormCliente from "../components/FormCliente";

const ListaClientes = () => {
  const [clientes, setClientes] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
  fetch("https://fakestoreapi.com/users")
    .then((res) => {
      if (!res.ok) throw new Error("Error al obtener clientes");
      return res.json();
    })
    .then((data) => {
      // 1. Obtenemos el usuario activo
      const usuarioSesion = JSON.parse(localStorage.getItem("usuarioLogueado"));
      const emailUsuario = usuarioSesion ? usuarioSesion.email : "sesion_general";

      // 2. Definimos las claves aisladas por su email
      const claveBorrados = `clientes_borrados_${emailUsuario}`;
      const claveCreados = `clientes_creados_${emailUsuario}`;

      // 3. Traemos las listas del sessionStorage
      const borrados = JSON.parse(sessionStorage.getItem(claveBorrados) || "[]");
      const creados = JSON.parse(sessionStorage.getItem(claveCreados) || "[]");

      // 4. Filtramos los borrados de la lista que viene de la API
      const listaApiFiltrada = data.filter((cliente) => !borrados.includes(cliente.id));

      // 5. UNIMOS los nuevos creados al principio de la lista
      setClientes([...creados, ...listaApiFiltrada]);
      setLoading(false);
    })
    .catch(() => {
      setError(true);
      setLoading(false);
    });
}, []);
  const clientesFiltrados = clientes.filter(
    (cliente) =>
      cliente.name.lastname
        .toLowerCase()
        .includes(busqueda.toLowerCase()) ||
      cliente.address.city
        .toLowerCase()
        .includes(busqueda.toLowerCase())
  );

  if (loading) {
    return <h2>Cargando clientes...</h2>;
  }

  if (error) {
    return <h2>Error al cargar los clientes.</h2>;
  }

  return (
    <div className="clientes-container">

      <h1>Clientes</h1>
      <FormCliente />

      <hr />

      <div className="contenedor-buscador">

        <h2 className="titulo-buscador">
          Buscar Clientes
        </h2>

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
                {cliente.name.firstname} {cliente.name.lastname}
              </td>

              <td>{cliente.email}</td>

              <td>{cliente.phone}</td>

              <td>{cliente.address.city}</td>

              <td>
                <Link
                  className="btn-ficha"
                  to={`/clientes/${cliente.id}`}
                >
                  Ver Ficha Completa
                </Link>
              </td>

            </tr>
          ))}

        </tbody>

      </table>

    </div>
  );
};

export default ListaClientes;