import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateUserField, registerUser } from '../actions/userActions';

const RegisterUser = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(updateUserField(name, value));
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUser(user));
  }

  return (
    
    <div className="form-container">
      <h2 className="form-title">Registro de nuevo usuario</h2>
      <div className="form-card">
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <label>Nombres*</label>
            <input name="nombres" type="text" onChange={handleChange} required />
          </div>
          <div className="form-row">
            <label>Apellidos*</label>
            <input name="apellidos" type="text" onChange={handleChange} required />
          </div>
          <div className="form-row">
            <label>Tipo de documento*</label>
            <select name="tipoDocumento" onChange={handleChange} required>
              <option value="">Seleccione</option>
              <option value="ci">CI</option>
              <option value="pasaporte">Pasaporte</option>
            </select>
          </div>
          <div className="form-row">
            <div className="half-input">
              <label>Documento*</label>
              <input name="documento" type="text" onChange={handleChange} required />
            </div>
            <div className="half-input">
              <label>Complemento*</label>
              <input name="complemento" type="text" onChange={handleChange} required />
            </div>
          </div>
          <div className="form-row">
            <label>Dirección de domicilio*</label>
            <input name="direccion" type="text" onChange={handleChange} required />
          </div>
          <div className="form-row">
            <label>Celular*</label>
            <input name="celular" type="text" onChange={handleChange} required />
          </div>
          <div className="form-row">
            <label>Correo electrónico*</label>
            <input name="correo" type="email" onChange={handleChange} required />
          </div>
          <div className="form-row">
            <label>Contraseña*</label>
            <input name="contraseña" type="password" onChange={handleChange} required />
          </div>
          <div className="form-row">
            <label>Confirmar contraseña*</label>
            <input name="confirmarContraseña" type="password" onChange={handleChange} required />
          </div>
          <div className="button-row">
            <button type="reset" className="cancel-button">Cancelar</button>
            <button type="submit" className="register-button">Registrar</button>
          </div>
        </form>
      </div>
    </div>
  );
   
  
}

export default RegisterUser;
