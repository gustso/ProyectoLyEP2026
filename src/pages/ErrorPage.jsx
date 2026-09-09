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
