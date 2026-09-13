import '../src/css/app.css'
import Header from './components/Header'
import Nav from './components/Nav'
import Footer from './components/Footer'
import AppRoutes from './routes/routes'
import useAutorizaciones from './hooks/useAutorizaciones'

function App() {
  // COMMIT: "fix: ocultar Header y Nav cuando no hay sesion activa"
  // (antes useAutorizaciones se importaba pero no se usaba)
  const { admin } = useAutorizaciones()

  return (
    <>
      {/* COMMIT: "fix: ocultar Header y Nav cuando no hay sesion activa" */}
      {/* (antes: <Header /> y <Nav /> se renderizaban siempre, sin el {admin && ...}) */}
      {admin && <Header />}
      {admin && <Nav />}
      <AppRoutes />
      <Footer />
    </>
  )
}
export default App
  