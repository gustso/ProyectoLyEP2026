import '../css/detallecliente.css'
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useAutorizaciones from "../hooks/useAutorizaciones";

const sanitizarCliente = (datosCliente) => {
  const clienteSinDatosSensibles = { ...datosCliente };
  delete clienteSinDatosSensibles.password;

  return clienteSinDatosSensibles;
};

const DetalleCliente = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { admin } = useAutorizaciones();

  const [cliente, setCliente] = useState(null);
  const [mensaje, setMensaje] = useState("");

  useEffect(() => {
    // 1. Buscamos el usuario activo y leemos los clientes creados en esta sesión
    const usuarioSesion = JSON.parse(localStorage.getItem("usuarioLogueado"));
    const emailUsuario = usuarioSesion ? usuarioSesion.email : "sesion_general";
    const claveCreados = `clientes_creados_${emailUsuario}`;

    const creados = JSON.parse(sessionStorage.getItem(claveCreados) || "[]");
    
    // 2. Buscamos si el ID corresponde a un cliente creado en la sesión local
    const clienteLocal = creados.find((c) => String(c.id) === String(id));

    if (clienteLocal) {
      // Si existe localmente, lo asignamos de inmediato sin llamar a la API
      setCliente(clienteLocal);
    } else {
      // Si no es un cliente local, realizamos el fetch normal a la API
      fetch(`https://fakestoreapi.com/users/${id}`)
        .then((res) => {
          if (!res.ok) throw new Error("No se pudo obtener el cliente");
          return res.json();
        })
        .then((data) => setCliente(data))
        .catch(() => setMensaje("Error al cargar los datos del cliente"));
    }
  }, [id]);

 const eliminarCliente = async () => {
  try {
   const usuarioSesion = JSON.parse(localStorage.getItem("usuarioLogueado"));
      const emailUsuario = usuarioSesion ? usuarioSesion.email : "sesion_general";

      // 1. Identificar claves
      const claveBorrados = `clientes_borrados_${emailUsuario}`;
      const claveCreados = `clientes_creados_${emailUsuario}`;

      // 2. Si es un cliente creado localmente, lo eliminamos de la lista de creados
      const creados = JSON.parse(sessionStorage.getItem(claveCreados) || "[]");
      const esLocal = creados.some((c) => String(c.id) === String(id));

      if (esLocal) {
        const nuevosCreados = creados.filter((c) => String(c.id) !== String(id));
        sessionStorage.setItem(claveCreados, JSON.stringify(nuevosCreados));
      } else {
        // Si viene de la API, intentamos el DELETE e impactamos la clave de borrados
        await fetch(`https://fakestoreapi.com/users/${id}`, {
          method: "DELETE",
        });

        const borrados = JSON.parse(sessionStorage.getItem(claveBorrados) || "[]");
        sessionStorage.setItem(claveBorrados, JSON.stringify([...borrados, Number(id)]));
      }

      setMensaje("Cliente eliminado correctamente");

      setTimeout(() => {
        navigate("/clientes");
      }, 1500);
   } catch (error) {
    setMensaje("Error al eliminar cliente");
   }
 };

  if (!cliente) {
    return <h2>Cargando cliente...</h2>;
  }

  return (
    <div className="detalle-cliente">
      <h1>Ficha del Cliente</h1>
      <p>Sector actual: {admin ? admin.sector : "Sin sesión activa"}</p>

      {mensaje && <p className='mensaje-eliminado'>{mensaje}</p>}

      <p>
        <strong>ID:</strong> {cliente.id}
      </p>

      <p>
        <strong>Nombre:</strong>{" "}
        {cliente.name.firstname} {cliente.name.lastname}
      </p>

      <p>
        <strong>Email:</strong> {cliente.email}
      </p>

      <p>
        <strong>Teléfono:</strong> {cliente.phone}
      </p>

      <h2>Dirección</h2>

      <p>
        <strong>Calle:</strong> {cliente.address.street}
      </p>

      <p>
        <strong>Número:</strong> {cliente.address.number}
      </p>

      <p>
        <strong>Código Postal:</strong> {cliente.address.zipcode}
      </p>

      <p>
        <strong>Ciudad:</strong> {cliente.address.city}
      </p>

      <h2>Datos de la cuenta</h2>

      <p>
        <strong>Usuario:</strong> {cliente.username}
      </p>

      <p>
        <strong>Contraseña:</strong> {cliente.password}
      </p>

      {admin?.sector === "Gerencia" && (
        <button className='btn-eliminar' onClick={eliminarCliente}>
          Eliminar Cliente
        </button>
      )}
    </div>
  );
};

export default DetalleCliente;
