import '../css/detallecliente.css'
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import useAutorizaciones from "../hooks/useAutorizaciones";
import clientesService from '../services/clientesService';

const DetalleCliente = () => {
 const { id } = useParams();
  const navigate = useNavigate();
  const { admin } = useAutorizaciones();
  const role = admin?.sector;

  const [cliente, setCliente] = useState(null);
  const [errorCarga, setErrorCarga] = useState(false);
  const [mensaje, setMensaje] = useState("");
  const [mostrarConfirmacion, setMostrarConfirmacion] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    clientesService
      .obtenerClientePorId(id, controller.signal)
      .then((data) => setCliente(data))
      .catch((err) => {
        if (err.name === "CanceledError") return;
        setErrorCarga(true);
      });

    return () => controller.abort();
  }, [id]);

  const eliminarCliente = async () => {
    try {
      await clientesService.eliminarCliente(id);

      setMensaje("Cliente eliminado correctamente");

      setTimeout(() => {
        navigate("/clientes");
      }, 2000);

    } catch {
      setMensaje("Error al eliminar cliente");
    }
  };

  const confirmarEliminar = async () => {
    setMostrarConfirmacion(false);
    await eliminarCliente();
  };

  if(errorCarga){
    return <h2>No se pudo cargar la informacion del cliente.Error al cargar el cliente</h2>
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

      <h2>Cuenta</h2>

      <p>
        <strong>Usuario:</strong> {cliente.username}
      </p>

      {role?.trim() === "Gerencia" && (
        <>
          <button
            className="btn-eliminar"
            onClick={() => setMostrarConfirmacion(true)}
          >
            Eliminar Cliente
          </button>

          <Modal
            show={mostrarConfirmacion}
            onHide={() => setMostrarConfirmacion(false)}
          >
            <Modal.Header closeButton>
              <Modal.Title>Confirmar eliminación</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              ¿Estás seguro que querés eliminar a{" "}
              {cliente.name.firstname} {cliente.name.lastname}? Esta
              acción no se puede deshacer.
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="secondary"
                onClick={() => setMostrarConfirmacion(false)}
              >
                Cancelar
              </Button>
              <Button variant="danger" onClick={confirmarEliminar}>
                Sí, eliminar
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      )}
    </div>
  );
};

export default DetalleCliente;
