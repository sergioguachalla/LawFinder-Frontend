import { useEffect } from "react";
import { useRolesAdminStore } from "../store/rolesAdminStore";
import { useNavigate } from "react-router-dom";
import '../styles/RolesAdmin.css';
import Navbar from "./Navbar";
import LoadingSpinner from "./Loading";
import { getRoleFromToken } from "../utils/getIdFromToken";

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
    const roles = getRoleFromToken();
    const requiredRoles = ['CREATE_ROLE','CREATE_PRIVILEGE'];
    if (!roles.includes("CREATE_ROLE")) {
      navigate('/Unauthorized');
    }

    if (token) {
      const timeoutId = setTimeout(() => {
        getRoles();
      }, 0);
      return () => clearTimeout(timeoutId);
    } 
  }, [getRoles, createRole, updateRole, navigate]);

  const handleRoleClick = (id) => {
    console.log(id);
    navigate(`/UpdateRole/${id}`);
  };

  const registerRole = () => {
    navigate('/RegisterRoles');
  };

  const handleDeleteRole = (id) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este rol?")) {
      deleteRole(id);
      window.location.reload();

    }
    
  };

  return (
    <>
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
                <button onClick={() => handleDeleteRole(role.roleId)}>Eliminar</button>
              </div>
            ))}
          {status === 'empty' && <p>No hay roles registrados</p>}
        </div>
      </div>
      <button className="add-role-button" onClick={registerRole}>
        <i className="fas fa-plus"></i>
      </button>
    </>
  );
};

export default RolesAdmin;
