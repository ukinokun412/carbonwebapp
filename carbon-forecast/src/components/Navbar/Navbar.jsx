import React from 'react';
import { Link } from 'react-router-dom';  
import logo from '../../assets/EF_icon.png';
import './Navbar.css';



const Navbar = () => {
  return (
    <header className="header">
        <Link to="/" className="logo">
          <img 
            src={logo} 
            alt="EmissionCast Logo" 
            style={{ height: "40px" }}
          />
        </Link> 

        <nav className="navbar">    
        </nav>
    </header>
  )
}

export default Navbar;