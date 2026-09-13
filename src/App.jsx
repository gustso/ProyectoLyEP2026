import '../src/css/app.css'
import Header from './components/Header'
import Nav from './components/Nav'
import Footer from './components/Footer'
import AppRoutes from './routes/routes'
import useAutorizaciones from './hooks/useAutorizaciones'

function App() {

  const {admin} = useAutorizaciones()
return (
<>
    
    {admin && <Header />}
    {admin && <Nav />}
    <AppRoutes />
    <Footer />
</>
)
}
export default App
  