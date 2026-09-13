// COMMIT: "fix: mejorar accesibilidad del login y la pagina 404"
// (archivo entero reescrito: antes era solo <h1>Error 404 - Página no encontrada</h1>,
// sin import de Link ni forma de volver al inicio)
import { Link } from 'react-router-dom'

const ErrorPage = () => {
  return (
    <div style={{ textAlign: 'center', padding: '60px 20px' }}>
      <h1>Error 404 - Página no encontrada</h1>
      <p>La página que buscás no existe o fue movida.</p>
      <Link to="/">Volver al inicio</Link>
    </div>
  )
}

export default ErrorPage
