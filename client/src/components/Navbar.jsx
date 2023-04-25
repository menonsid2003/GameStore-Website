import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import Logo from "../images/logo.svg"
import { AuthContext } from '../context/authContext.js';
import cart from '../images/cart.png'
import Cart from './Cart';

const Navbar = () => {

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
          {/* <Link className='link' to="/?cat=art">
            <h6>ART</h6>
          </Link>
          <Link className='link' to="/?cat=swag">
            <h6>SWAG</h6>
          </Link>
          <Link className='link' to="/?cat=drip">
            <h6>DRIP</h6>
          </Link>
          <Link className='link' to="/?cat=awesome">
            <h6>AWESOME</h6>
          </Link>
          <Link className='link' to="/?cat=epic">
            <h6>EPIC</h6>
          </Link> */}
          <div className='user'>
            <span>{currentUser?.username}</span>
            <div className='login'>
            {currentUser ? (<span onClick={logout}>Logout</span>) : (<Link className='link' to="/login">Login</Link>)}
            </div>
          </div>
          <div className='cartIcon' onClick={() => setOpen(!open)}>
            <img src={cart} alt="" />
            <span>0</span>
          </div>
        </div>
      </div>
      {open && <Cart />}
    </div>
  )
}

export default Navbar