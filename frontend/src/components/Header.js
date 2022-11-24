import '../styles/header.css'
import { Link } from 'react-router-dom'
import { useCart } from 'react-use-cart'
function Header () {
    const { totalUniqueItems } = useCart()
    return (
        <div className="header">
            <Link to="/" style={{textDecoration: 'none'}}><div className="app-logo"><p>Amazon</p></div></Link>
            <div className="header-search-container"><input type="text" className="header-search"></input></div>
            <Link to="/cart" className='cart-container'><span className="material-icons cart-logo">shopping_cart <span className='cart-count'>{totalUniqueItems}</span></span></Link>
        </div>
    )
}

export default Header