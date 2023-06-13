import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';
import { useNavbarStore } from '../store/navbarStore';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faBriefcase, faEnvelopeOpenText, faSignOutAlt, faUser } from '@fortawesome/free-solid-svg-icons';
import useAuthStore from '../store/authStore';


const Navbar = () => {
   const {username,setUsername,getUserNameFromToken} = useNavbarStore();
   const {logout} = useAuthStore();
   
   useEffect(() => {
       setUsername();
   }, [setUsername, username]);

  return (
    <nav className="navbar">
      <div className="links-container">
        <ul className="navbar-list">
          <li className="navbar-item">
            <Link to="/Home" className="navbar-link">
              <FontAwesomeIcon icon={faHome} /> Inicio
            </Link>
          </li>
          <li className="navbar-item">
            <Link to="/Home" className="navbar-link">
              <FontAwesomeIcon icon={faBriefcase} /> Casos
            </Link>
          </li>
          <li className="navbar-item">
            <Link to="/Invitation" className="navbar-link">
              <FontAwesomeIcon icon={faEnvelopeOpenText} /> Invitaciones
            </Link>
          </li>
          <li className="navbar-item">
            <Link to="/" className="navbar-link" onClick={logout}>
              <FontAwesomeIcon icon={faSignOutAlt} /> Salir
            </Link>
          </li>
        </ul>
      </div>
      <div className="username">
        <FontAwesomeIcon icon={faUser} className="username-icon" /> 
        <span className="username-text">{username}</span>
      </div>
    </nav>
  );
};

export default Navbar;
