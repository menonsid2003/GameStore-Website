import React from 'react'
import { Link } from 'react-router-dom'
import Logo from "../images/logo.svg"

const Navbar = () => {
  return (
    <div className='navbar'>
      <div className="container">
        <div className="logo">
          <Link to="/">
            <img src={Logo} alt="" />
          </Link>
        </div>
        <div className="links">
          <Link className='link' to="/?cat=art">
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
          </Link>
          <span>John</span>
          <span>Logout</span>
          <span className='write'>
            <Link className='link' to="/write">Write</Link>
          </span>
        </div>
      </div>
    </div>
  )
}

export default Navbar