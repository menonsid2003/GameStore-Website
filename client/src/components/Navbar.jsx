import React, { useContext, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Logo from "../images/logo.svg"
import { AuthContext } from '../context/authContext.js';
import cart from '../images/cart.png'
import Cart from './Cart';

const Navbar = () => {
  const products = useSelector(state => state.cart.products)
  const { currentUser, logout } = useContext(AuthContext);
  const [open, setOpen] = useState(false);

  return (
    <div className='navbar'>
      <div className="container">
        <div className="logo">
          <Link to="/">
            <img src={Logo} alt="" />
          </Link>
        </div>
        <div className="links">
          <div className='user'>
            <span>{currentUser?.username}</span>
            <div className='login'>
              {currentUser ? (<span onClick={logout}>Logout</span>) : (<Link className='link' to="/login">Login</Link>)}
            </div>
          </div>
          <div className='cartIcon' onClick={() => setOpen(!open)}>
            <img src={cart} alt="" />
            <span>{products.length}</span>
          </div>
        </div>
      </div>
      {open && <Cart />}
    </div>
  )
}

export default Navbar