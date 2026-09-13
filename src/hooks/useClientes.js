// COMMIT: "refactor: extraer la carga de clientes a un hook useClientes"
// (archivo nuevo: esta logica antes vivia toda adentro de ListaClientes.jsx)
import { useEffect, useState } from "react";
import clientesService from "../services/clientesService";

const useClientes = () => {
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    clientesService
      .obtenerClientes(controller.signal)
      .then((data) => {
        setClientes(data);
        setLoading(false);
      })
      .catch((err) => {
        if (err.name === "CanceledError") return;
        setError(true);
        setLoading(false);
      });

    return () => controller.abort();
  }, []);

  const agregarCliente = (cliente) => {
    setClientes((previos) => [...previos, cliente]);
  };

  return { clientes, loading, error, agregarCliente };
};

export default useClientes;
