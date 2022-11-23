import '../styles/header.css'
import { Link } from 'react-router-dom'
function Header () {
    return (
        <div className="header">
            <Link to="/"><p>Amazon</p></Link>
            <Link to="/cart"><img src="../../public/shopping-cart.png" /></Link>
        </div>
    )
}

export default Header