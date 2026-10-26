import { Container } from 'react-bootstrap';

const ErrorPage = () => {
  return (
    <Container className="text-center mt-5">
      <h1 className="text-danger">Error 404</h1>
      <p className="lead">Página no encontrada</p>
    </Container>
  );
}

export default ErrorPage;