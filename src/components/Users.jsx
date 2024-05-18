import React from 'react';
import { Button } from 'react-bootstrap';
import Navbar from './Navbar';
import '../styles/Users.css'; 
import { useUsersListStore } from '../store/usersListStore';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt, faKey } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { getRoleFromToken } from '../utils/getIdFromToken';
import { useNavigate } from 'react-router-dom';

const Users = () => {
  const { users, status, fetchUsers, deleteUser, changeLock } = useUsersListStore();
  const navigate = useNavigate();
  const roles = getRoleFromToken();


  React.useEffect(() => {
    fetchUsers();
    const roles = getRoleFromToken();
    const allowedRoles = ["DELETE_USER", "BLOCK_USER","UNLOCK_USER","EDIT_USER"];
    const hasAccess = allowedRoles.some(role => roles.includes(role));
    if (!hasAccess) {
      navigate('/Unauthorized');
    }

  }, [fetchUsers, navigate]); 

  const handleDeleteUser = async (userId) => {
    try {
      await deleteUser(userId);
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };
  const hasRole = (requiredRoles) => {
    return requiredRoles.some(role => roles.includes(role));
  };

  const confirmDelete = (userId) => {
    const confirmDeletion = window.confirm('¿Estás seguro de que quieres eliminar este usuario?');
    if (confirmDeletion) {
      handleDeleteUser(userId);
    }
  };

  const confirmLock = (userId) => {
    const confirmLocking = window.confirm('¿Estás seguro de que quieres bloquear/desbloquear este usuario?');
    if (confirmLocking) {
        handleLockUser(userId);
    }
};

  const handleLockUser = async (userId) => {
    try {
      await changeLock(userId);
    } catch (error) {
      console.error('Error changing user lock status:', error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="users-container">
        <div className="users-white">
          <div className="users-content">
            <h1 className="title">Lista de Usuarios</h1>
            {status === 'loading' && <p>Cargando usuarios...</p>}
            {status === 'error' && <p>Error al cargar usuarios</p>}
            {status === 'success' && (
              <table className="users-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Nombre de usuario</th>
                    <th>Rol</th>
                    <th>Estado</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map(user => (
                    <tr key={user.id}>
                      <td>{user.id}</td>
                      <td>{user.username}</td>
                      <td>{user.roles.join(', ')}</td>
                      <td>{(user.isBlocked) ? "Cuenta bloqueada" : "Cuenta desbloqueada"}</td>
                      <td>
                        <div className="users-icons">
                        {hasRole(["EDIT_USER"]) && 
                          <Link to={`/EditUser/${user.id}`}>
                            <Button variant="light" size="sm" className="users-button">
                              <FontAwesomeIcon icon={faEdit} />
                            </Button>
                          </Link>
                        }
                        {hasRole(["DELETE_USER"]) && 
                          <Button variant="danger" size="sm" className="users-button" onClick={() => confirmDelete(user.id)}>
                            <FontAwesomeIcon icon={faTrashAlt} />
                          </Button>
                        } 
                        {hasRole(["BLOCK_USER","UNLOCK_USER"]) && 
                          <Button variant="info" size="sm" className="users-button" onClick={() => confirmLock(user.id)}>
                            <FontAwesomeIcon icon={faKey} />
                          </Button>
        }
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Users;
