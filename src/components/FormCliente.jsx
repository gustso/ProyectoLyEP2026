import '../css/formcliente.css'
import { useState } from "react";
import { Form, Button, Alert, Spinner } from "react-bootstrap";
import clientesService from "../services/clientesService";

const FormCliente = () => {
    const [nombre, setNombre] = useState("");
    const [email, setEmail] = useState("");
    const [telefono, setTelefono] = useState("");
    const [ciudad, setCiudad] = useState("");

    const [errores, setErrores] = useState({});
    const [mensaje, setMensaje] = useState("");
    const [loading, setLoading] = useState(false);

    const validar = () => {
        const nuevosErrores = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!nombre.trim()) nuevosErrores.nombre = "El nombre es obligatorio.";
        if (!email) {
            nuevosErrores.email = "El email es obligatorio.";
        } else if (!emailRegex.test(email)) {
            nuevosErrores.email = "Formato de email inválido.";
        }
        if (!telefono.trim()) nuevosErrores.telefono = "El teléfono es obligatorio.";
        if (!ciudad.trim()) nuevosErrores.ciudad = "La ciudad es obligatoria.";

        setErrores(nuevosErrores);
        return Object.keys(nuevosErrores).length === 0;
    };

    const manejarSubmit = async (e) => {
        e.preventDefault();
        setMensaje("");

        if (!validar()) return;

        try {
            setLoading(true);
            const respuesta = await clientesService.crearCliente({
                nombre,
                email,
                telefono,
                ciudad
            });

            setMensaje(`Cliente creado correctamente. ID: ${respuesta.id}`);
            setNombre("");
            setEmail("");
            setTelefono("");
            setCiudad("");
            setErrores({});
        } catch {
            setErrores({ general: "Ocurrió un error al conectar con el servidor." });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='formulario-cliente'>
            <h3>Nuevo Cliente</h3>

            <Form onSubmit={manejarSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control
                        type="text"
                        value={nombre}
                        onChange={(e) => {
                            setNombre(e.target.value);
                            if (errores.nombre) {
                                const { nombre, ...resto } = errores;
                                setErrores(resto);
                            }
                        }}
                        isInvalid={!!errores.nombre}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errores.nombre}
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="email"
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                            if (errores.email) {
                                const { email, ...resto } = errores;
                                setErrores(resto);
                            }
                        }}
                        isInvalid={!!errores.email}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errores.email}
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Teléfono</Form.Label>
                    <Form.Control
                        type="text"
                        value={telefono}
                        onChange={(e) => {
                            setTelefono(e.target.value);
                            if (errores.telefono) {
                                const { telefono, ...resto } = errores;
                                setErrores(resto);
                            }
                        }}
                        isInvalid={!!errores.telefono}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errores.telefono}
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Ciudad</Form.Label>
                    <Form.Control
                        type="text"
                        value={ciudad}
                        onChange={(e) => {
                            setCiudad(e.target.value);
                            if (errores.ciudad) {
                                const { ciudad, ...resto } = errores;
                                setErrores(resto);
                            }
                        }}
                        isInvalid={!!errores.ciudad}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errores.ciudad}
                    </Form.Control.Feedback>
                </Form.Group>

                <Button
                    variant="primary"
                    type="submit"
                    disabled={loading}
                >
                    {loading ? <Spinner size="sm" /> : "Guardar Cliente"}
                </Button>
            </Form>

            {mensaje && (
                <Alert className="mt-3" variant="success">
                    {mensaje}
                </Alert>
            )}

            {errores.general && (
                <Alert className="mt-3" variant="danger">
                    {errores.general}
                </Alert>
            )}
        </div>
    );
};

export default FormCliente;