import '../css/detallecliente.css'
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const DetalleCliente = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const role = localStorage.getItem("role");

  const [cliente, setCliente] = useState(null);
  const [mensaje, setMensaje] = useState("");

  useEffect(() => {
    fetch(`https://fakestoreapi.com/users/${id}`)
      .then((res) => res.json())
      .then((data) => setCliente(data));
  }, [id]);

  const eliminarCliente = async () => {
    try {
      const respuesta = await fetch(
        `https://fakestoreapi.com/users/${id}`,
        {
          method: "DELETE",
        }
      );

      if (respuesta.ok) {
        setMensaje("Cliente Eliminado Correctamente");

        setTimeout(() => {
          navigate("/clientes");
        }, 2000);
      }
    } catch (error) {
      setMensaje("Error al eliminar cliente");
    }
  };

  const confirmarEliminacion = () => {
    const confirmar = window.confirm(
      "¿Está seguro de que desea eliminar este cliente?"
    );

    if (confirmar) {
      eliminarCliente();
    }
  };

  if (!cliente) {
    return <h2>Cargando cliente...</h2>;
  }

  return (
    <div className="Detalle-Cliente">
      <h1>Ficha del Cliente</h1>
      <p>Rol Actual: {role}</p>

      {mensaje && <p className='Mensaje-Eliminado'>{mensaje}</p>}

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

      <h2>Credenciales</h2>

      <p>
        <strong>Usuario:</strong> {cliente.username}
      </p>

      <p>
        <strong>Contraseña:</strong> {cliente.password}
      </p>

      {role?.trim() === "Gerencia" && (
        <button className='btn-eliminar' onClick={confirmarEliminacion}>
          Eliminar Cliente
        </button>
      )}
    </div>
  );
};

export default DetalleCliente;