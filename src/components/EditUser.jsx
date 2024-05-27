import React, { useEffect, useState } from 'react';
import { Button, Dropdown } from 'react-bootstrap';
import Navbar from './Navbar';
import { useEditUserStore } from '../store/EditUserStore'; 
import { useParams } from 'react-router-dom';
import { Eye, EyeSlash } from 'react-bootstrap-icons';
import '../styles/EditUsers.css';
import { getRoleFromToken } from '../utils/getIdFromToken';
import { useNavigate } from 'react-router-dom';

const EditUser = () => {
  const navigate = useNavigate();

  const { id } = useParams();
  const { userId, username, password, confirm_password, roles, allRoles, 
    loadUserData, handleChange, handleSubmit, DeleteRole, addRoleToUser, errorMessage,status, goodPassword } = useEditUserStore(); 

  const [selectedRole, setSelectedRole] = useState(null);
  const [inputType, setInputType] = useState('password');
  const [passwordMatch, setPasswordMatch] = useState(true); 
  const [userModified, setUserModified] = useState(false);

  useEffect(() => {
    const roles = getRoleFromToken();
    if(!roles.includes("CREATE_ROLE")  ) {
        navigate('/Unauthorized');
    }
    loadUserData(id);
  }, [id, loadUserData]);

  const togglePasswordVisibility = () => {
    setInputType(inputType === 'password' ? 'text' : 'password');
  };

  const handleAddRole = async () => {
    if (selectedRole) {
      await addRoleToUser(userId, selectedRole.id);
      setSelectedRole(null);
      await loadUserData(userId);
    }
  };

  const handleDeleteRole = async (roleId) => {
    const confirmed = window.confirm("¿Estás seguro de que quieres eliminar este rol?");
    if (confirmed) {
      await DeleteRole(userId, roleId);
      await loadUserData(userId);
    }
  };
  

  const handlePasswordChange = (fieldName, event) => {
    const { value } = event.target;
    handleChange(fieldName, event);

    if (fieldName === 'password') {
      setPasswordMatch(value === confirm_password);
    } else if (fieldName === 'confirm_password') {
      setPasswordMatch(value === password);
    }
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    await handleSubmit(userId, username, password, event);
    setUserModified(true);
  };

  useEffect(() => {
    if (userModified) {
      window.alert('Usuario modificado con éxito');
      setUserModified(false);
    }
  }, [userModified]);

  return (
    <>
      <Navbar />
      <br/><br/><br/>
      <div className='edituser edit-user-container'>
        <div className='edituser edit-user-white'> 
          <h1>EDITAR USUARIO</h1>
          <form className='edituser form-container' onSubmit={handleFormSubmit}>
            <div className='edituser form-row'>
              <div className='edituser input-group'>
                <label>Nombre de Usuario</label>
                <input name='username' type='text' value={username} onChange={(event) => handleChange('username', event)} />
              </div>
            
              <div className='edituser input-group'>
                <label>Password</label>
                <div className='edituser input-group'>
                  <input name='password' type={inputType} value={password} onChange={(event) => handlePasswordChange('password', event)} />
                  {inputType === 'password' ? (
                    <EyeSlash onClick={togglePasswordVisibility} />
                  ) : (
                    <Eye onClick={togglePasswordVisibility} />
                  )}
                </div>
              </div>
              <div className='edituser input-group'>
                <label>Confirm Password</label>
                <div className='edituser input-group'>
                  <input name='confirm_password' type={inputType} value={confirm_password} onChange={(event) => handlePasswordChange('confirm_password', event)} />
                  {inputType === 'password' ? (
                    <EyeSlash onClick={togglePasswordVisibility} />
                  ) : (
                    <Eye onClick={togglePasswordVisibility} />
                  )}
                </div>
                {!passwordMatch && <span style={{ color: 'red' }}>Las contraseñas no coinciden</span>}
                {!goodPassword && <p className='error-message'>{errorMessage} </p>}
              </div>
            
              <div className='edituser button-row'>
                  <button type='submit' className='edituser edit-users-button' disabled={goodPassword ? false : true}>
                    Guardar Cambios</button> 
              </div>
              <div>
            {status === 'success' && <p className='success-message'>Password reset successfully</p>}
            
          </div>
            </div>
            <div className='edituser form-row'>
              <h1>Editar Roles</h1>

              <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                  {selectedRole ? selectedRole.role : 'Seleccionar Rol'}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {allRoles.map((role) => (
                    <Dropdown.Item key={role.id} onClick={() => setSelectedRole(role)}>
                      {role.role}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
              <Button variant='primary' onClick={handleAddRole}>Añadir Rol</Button>
            </div>
            <div className='edituser form-row'>
              <table className='edituser users-table'> 
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Rol</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {roles.map((role) => (
                    <tr key={role.id}>
                      <td>{role.id}</td>
                      <td>{role.role}</td>
                      <td>
                        <Button variant='danger' onClick={() => handleDeleteRole(role.id)}>Eliminar</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditUser;
