import '../css/detallecliente.css'
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
// COMMIT: "fix: unificar el rol de sesion y quitar el alert() del login"
// (antes: este import no existia, el rol se leia con localStorage.getItem("role"))
import useAutorizaciones from "../hooks/useAutorizaciones";
// COMMIT: "refactor: centralizar llamadas HTTP en clientesService"
// (antes: este import no existia, se usaba fetch directo a la API)
import clientesService from "../services/clientesService";

const DetalleCliente = () => {
 const { id } = useParams();
  const navigate = useNavigate();
  // COMMIT: "fix: unificar el rol de sesion y quitar el alert() del login"
  // (antes: const role = localStorage.getItem("role"))
  const { admin } = useAutorizaciones();
  const role = admin?.sector;

  const [cliente, setCliente] = useState(null);
  // COMMIT: "fix: manejar errores de carga en DetalleCliente"
  // (antes: este estado no existia)
  const [errorCarga, setErrorCarga] = useState(false);
  const [mensaje, setMensaje] = useState("");

  const eliminarCliente = async () => {
    try {
      await clientesService.eliminarCliente(id);

      setMensaje("Cliente eliminado correctamente");

      setTimeout(() => {
        navigate("/clientes");
      }, 2000);
    } catch {
      // COMMIT: "fix: corregir los 4 errores de ESLint del proyecto"
      // (antes: catch (error) { ... } con 'error' sin usar)
      setMensaje("Error al eliminar cliente");
    }
  };
  if (errorCarga) {
    return <h2>No se pudo cargar la información del cliente.</h2>;
  }

  if (!cliente) {
    return <h2>Cargando cliente...</h2>;
  }

  return (
    <div className="detalle-cliente">
      <h1>Ficha del Cliente</h1>
      <p>Rol actual: {role}</p>

      {mensaje && <p className = 'mensaje-eliminado'>{mensaje}</p>}

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

      {/* COMMIT: "fix: quitar la contraseña del cliente visible en la ficha" */}
      {/* (titulo cambiado de "Credenciales" a "Cuenta") */}
      <h2>Cuenta</h2>

      <p>
        <strong>Usuario:</strong> {cliente.username}
      </p>
      {/* COMMIT: "fix: quitar la contraseña del cliente visible en la ficha" */}
      {/* (aca antes habia un <p><strong>Contraseña:</strong> {cliente.password}</p>, eliminado) */}

      {role?.trim() === "Gerencia" && (
        <button className='btn-eliminar'onClick={eliminarCliente}>
          Eliminar Cliente
        </button>
      )}
    </div>
  );
};

export default DetalleCliente;