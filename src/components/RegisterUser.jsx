import { useEffect } from 'react';
import { useRegisterUserStore } from '../store/userRegistrationStore';
import '../styles/RegisterUser.css';
import Spinner from './Spinner';
import {useNavigate} from 'react-router-dom';

const RegisterUser = () => {
  //const { handleSubmit, handleChange } = useRegisterUserStore();
    const navigate = useNavigate();
    const {
      handleChange,
      handleSubmit,
      generateNewUUID,
      
      
    } = useRegisterUserStore();
    const status = useRegisterUserStore((state) => state.statusState);
    const email = useRegisterUserStore((state) => state.correo);
    useEffect(() => {
      generateNewUUID();
    }, [generateNewUUID]);
  
    
    const handleSubmitForm =  async (event)  => {
      event.preventDefault();
      await handleSubmit(event);
      
      if(status == 'success'){
        //put a timer of 2 seconds
        
        
      
        navigate('/Confirmation');
      }
    }
   
  return (
    <>
      <h1 className='centered-apple-font'> REGISTRO DE USUARIO</h1>
      <form className="form-container" onSubmit={(event) => handleSubmitForm(event)}>
        <div className="form-row">
          <label>Nombres *</label>
          <input name="nombres" type="text" onChange={(event) => handleChange('nombres', event)} required />
        </div>
        <div className="form-row">
          <label>Apellidos *</label>
          <input name="apellidos" type="text" onChange={(event) => handleChange('apellidos',event)} required />
        </div>
        <div className="form-row">
          <label>Tipo de documento *</label>
          <select name="tipoDocumento" onChange={(event) => handleChange('tipoDocumento',event)}   required>
            <option value="">Seleccione</option>
            <option value="ci">CI</option>
            <option value="pasaporte">Pasaporte</option>
          </select>
        </div>
        <div className="form-row">
          <div className="half-input">
            <label>Documento*</label>
            <input name="documento" type="text" onChange={(event) => handleChange('documento',event)}  required />
          </div>
          <div className="half-input">
            <label>Complemento*</label>
            <input name="complemento" type="text" onChange={(event) => handleChange('complemento',event)}   />
          </div>
        </div>
        <div className="form-row">
          <label>Dirección de domicilio*</label>
          <input name="direccion" type="text" onChange={(event) => handleChange('direccion',event)} required />
        </div>
        <div className="form-row">
          <label>Celular*</label>
          <input name="celular" type="text" onChange={(event) => handleChange('celular',event)}  required />
        </div>
        <div className="form-row">
          <label>Correo electrónico*</label>
          <input name="correo" type="email" onChange={(event) => handleChange('correo',event)}  required />
          
        </div>
        <div className="form-row">
          <label>Contraseña*</label>
          <input name="secret" type="password" onChange={(event) => handleChange('secret',event)}  required />
        </div>
        <div className="form-row">
          <label>Confirmar contraseña*</label>
          <input name="secretConfirm" type="password" onChange={(event) => handleChange('secretConfirm',event)}  required />
        </div>
        <div className="button-row">
            <button type="submit" className="register-button">Registrar</button> 
           
        </div>
        <div>
          {status === 'loading' && <Spinner />}
          {status === 'sucess' && <p>Usuario registrado con éxito</p>}
          <p>{status}</p>
          <p>{email}</p>
    
</div>
      </form>

      
    </>
  );
}

export default RegisterUser;
