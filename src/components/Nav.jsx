import '../css/nav.css'
import { NavLink } from 'react-router-dom'
import useAutorizaciones from '../hooks/useAutorizaciones'
const Nav = () => {
    const { admin } = useAutorizaciones()

    if (!admin) return null

    return (
        <nav className="nav">
            <ul className="nav-lista">
                <li>
                    <NavLink to="/">
                        Dashboard
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/clientes">
                        Clientes
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
    
};
export default Nav;