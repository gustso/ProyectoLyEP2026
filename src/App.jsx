import '../src/css/app.css'
import Header from './components/Header'
import Nav from './components/Nav'
import Footer from './components/Footer'
import AppRoutes from './routes/routes'

function App() {
  return (
    <>
      <Header />
      <Nav />
      <AppRoutes />
      <Footer />
    </>
  )
}
export default App