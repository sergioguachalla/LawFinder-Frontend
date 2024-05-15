import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';
import { useNavbarStore } from '../store/navbarStore';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserAlt,faHome, faBriefcase, faEnvelopeOpenText, faSignOutAlt, faUser, faArchive, faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import useAuthStore from '../store/authStore';
import { useLoginUserStore } from '../store/userLoginStore';


const Navbar = () => {
   const {username,setUsername} = useNavbarStore();
   const {setStatus} = useLoginUserStore();
   const {logout} = useAuthStore();
   
   useEffect(() => {
    
      setUsername();
   }, [setUsername, username]);
  const handleLogout = () => {
    setStatus('init');
    logout();
  }
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
              <Link to="/Users" className="navbar-link">
              <FontAwesomeIcon icon={faUserAlt} /> Usuarios
            </Link>
          </li>

          <li className="navbar-item">
            <Link to="/Invitation" className="navbar-link">
              <FontAwesomeIcon icon={faEnvelopeOpenText} /> Invitaciones
            </Link>
          </li>
          <li className="navbar-item">
            <Link to="/Calendar" className="navbar-link">
              <FontAwesomeIcon icon={faCalendarAlt} /> Agenda
            </Link>
          </li>
          <li className="navbar-item">
            <Link to="/ArchivedCases" className="navbar-link">
              <FontAwesomeIcon icon={faArchive} /> Casos Archivados
            </Link>
          </li>
          <li className="navbar-item">
            <Link to="/" className="navbar-link" onClick={handleLogout}>
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
