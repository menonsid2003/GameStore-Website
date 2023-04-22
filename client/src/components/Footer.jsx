import React from 'react'
import Logo from "../images/logo.svg"

const Footer = () => {
  return (
    <footer>
      <img src={Logo} alt="" />
      <span>Made with <b>React.js</b> and <b>MySQL</b></span>
    </footer>
  )
}

export default Footer