import React, { useEffect,useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';
import { useNavbarStore } from '../store/navbarStore';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserAlt,faHome, faBriefcase, faEnvelopeOpenText, faSignOutAlt, faUser, faArchive, faCalendarAlt ,faChartLine} from '@fortawesome/free-solid-svg-icons';
import useAuthStore from '../store/authStore';
import { useLoginUserStore } from '../store/userLoginStore';
import { getRoleFromToken } from "../utils/getIdFromToken"; 



const Navbar = () => {
   const {username,setUsername} = useNavbarStore();
   const {setStatus} = useLoginUserStore();
   const {logout} = useAuthStore();
   const roles = getRoleFromToken();
   const [reportsOpen, setReportsOpen] = useState(false);


   
   useEffect(() => {
    
      setUsername();
   }, [setUsername, username]);
  const handleLogout = () => {
    setStatus('init');
    logout();
  }

  const toggleReportsMenu = () => {
    setReportsOpen(!reportsOpen);
  };

  const hasRole = (requiredRoles) => {
    return requiredRoles.some(role => roles.includes(role));
  };

  return (
    <nav className="navbar">
      <div className="links-container">
        <ul className="navbar-list">
          <li className="navbar-item">
            <Link to="/Home" className="navbar-link">
              <FontAwesomeIcon icon={faHome} /> Inicio
            </Link>
          </li>
          {hasRole(["DELETE_USER", "BLOCK_USER","UNLOCK_USER","EDIT_USER"]) && 
            <li className="navbar-item">
              <Link to="/Users" className="navbar-link">
              <FontAwesomeIcon icon={faUserAlt} /> Usuarios
              </Link>
            </li>
          }

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
          
          {roles.includes("CREATE_PRIVILEGE") && 
            <li className="navbar-item">
              <Link to="/RolesAdmin" className="navbar-link">
                <FontAwesomeIcon icon={faBriefcase} /> Roles
              </Link>
            </li>
          }


          <li className="navbar-item reports-item">
            <div className="navbar-link" onClick={toggleReportsMenu}>
              <FontAwesomeIcon icon={faChartLine} /> Reportes
            </div>
            {reportsOpen && (
              <ul className="sub-menu">
                <li className="sub-menu-item">
                  <Link to="/ApplicationLogs" className="sub-menu-link">
                    Logs de Aplicación
                  </Link>
                </li>
                <li className="sub-menu-item">
                  <Link to="/SecurityLogs" className="sub-menu-link">
                    Logs de Seguridad
                  </Link>
                </li>
                <li className="sub-menu-item">
                  <Link to="/Clasificación de Activos" className="sub-menu-link">
                    Clasificación de Activos
                  </Link>
                </li>
              </ul>
            )}
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
