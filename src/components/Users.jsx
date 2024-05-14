import React from 'react';
import { Button } from 'react-bootstrap';
import Navbar from './Navbar';
import '../styles/Users.css'; 
import { useUsersListStore } from '../store/usersListStore';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt, faKey } from '@fortawesome/free-solid-svg-icons';

const Users = () => {
  const { users, status, fetchUsers, deleteUser, changeLock } = useUsersListStore();

  React.useEffect(() => {
    fetchUsers();
  }, []); 

  const handleDeleteUser = async (userId) => {
    try {
      await deleteUser(userId);
    } catch (error) {
      console.error('Error deleting user:', error);
    }
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
                          <Button variant="light" size="sm" className="users-button">
                            <FontAwesomeIcon icon={faEdit} />
                          </Button>
                          <Button variant="danger" size="sm" className="users-button" onClick={() => confirmDelete(user.id)}>
                            <FontAwesomeIcon icon={faTrashAlt} />
                          </Button>
                          <Button variant="info" size="sm" className="users-button" onClick={() => confirmLock(user.id)}>
                            <FontAwesomeIcon icon={faKey} />
                          </Button>
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
