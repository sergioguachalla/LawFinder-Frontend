import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';
import { useNavbarStore } from '../store/navbarStore';
const Navbar = () => {
   const {username,setUsername,getUserNameFromToken} = useNavbarStore();
   useEffect(() => {
     
       setUsername();
   }, [setUsername, username]);

  return (
    <nav className="navbar">
      <ul className="navbar-list">
        <li className="navbar-item">
          <Link to="/" className="navbar-link">Inicio</Link>
        </li>
        <li className="navbar-item">
          <Link to="/casos" className="navbar-link">Casos</Link>
        </li>
        <li className="navbar-item">
          <Link to="/invitaciones" className="navbar-link">Invitaciones</Link>
        </li>
        <li className="navbar-item">
          <Link to="/usuarios" className="navbar-link">Usuarios</Link>
        </li>
        
        <li>
            {username}
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
