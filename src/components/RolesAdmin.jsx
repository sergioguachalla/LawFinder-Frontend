import { useEffect } from "react";
import { useRolesAdminStore } from "../store/rolesAdminStore"; 
import { useNavigate } from "react-router-dom";
import '../styles/Home.css';
import Navbar from "./Navbar";
import LoadingSpinner from "./Loading";

const RolesAdmin = () => {
  const navigate = useNavigate();
  const {
    getRoles,
    roles,
    status,
    createRole,
    updateRole,
    deleteRole,
  } = useRolesAdminStore();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
        const timeoutId = setTimeout(() => {
            getRoles();
        }, 0);
    
        return () => clearTimeout(timeoutId);
    } 
  }, [getRoles, createRole, updateRole, navigate]);

  const handleRoleClick = (id) => {
    console.log(id);
    navigate(`/RoleDetails/${id}`);
  };
  return (
    <>
      {(status === 'loading' || status === 'init') && <LoadingSpinner />}
      <Navbar />
      <div className="roles-container">
        <h1>Lista de Roles</h1>
        <div className="roles-list">
          {status === 'success' &&
            roles.map((role) => (
              <div key={role.roleId} className="card-item">
                <h2>{role.roleName}</h2>
                <p>Privilegios: {role.privileges.join(', ')}</p>
                <button onClick={() => handleRoleClick(role.roleId)}>Ver Más</button>
                <button onClick={() => deleteRole(role.roleId)}>Eliminar</button>
              </div>
            ))}
          {status === 'empty' && <p>No hay roles registrados</p>}
        </div>
      </div>
    </>
  );
};

export default RolesAdmin;
