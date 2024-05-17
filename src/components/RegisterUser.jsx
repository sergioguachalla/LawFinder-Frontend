import { useEffect } from 'react';
import { useRegisterUserStore } from '../store/userRegistrationStore';
import '../styles/RegisterUser.css';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeSlash } from 'react-bootstrap-icons';

const RegisterUser = () => {
  const navigate = useNavigate();
  const {
    handleChange,
    handleSubmit,
    generateNewUUID,
    inputType,
    setInputText, 
    setInputPassword,
    userAlreadyExists,
    emailExists,
    status,
    goodPassword,
    errorMessage,
    confirmSecret,
    confirmSecretMessage,
  } = useRegisterUserStore();
  

  useEffect(() => {
    generateNewUUID();
  }, [generateNewUUID]);

  const handleSubmitForm = async (event) => {
    event.preventDefault();
    await handleSubmit(event);
  };

  
  
  const togglePasswordVisibility = () => {
    if (inputType === 'password') {
      setInputText('text');
    } else {
      setInputPassword('password');
    }
    console.log(inputType);
  };

  useEffect(() => {
    if (status === 'success') {
      
      const timeoutId = setTimeout(() => {
        navigate('/confirmation');
      }, 1000);

      return () => clearTimeout(timeoutId);
    } else if (status === 'registered') {
      setTimeout(() => {
        navigate('/RegisterUser');
      }, 1000);
    } else if (status === 'loading') {
      setTimeout(() => {}, 1000);
    }
  }, [emailExists, navigate, status]);

  return (
    <div className='app-container'>
      <div className='form-section'>
        <h1>REGISTRO DE CLIENTE</h1>
        <form className='form-container' onSubmit={(event) => handleSubmitForm(event)}>
          <div className='form-row'>
            <div className='input-group'>
              <label>Nombres *</label>
              <input name='nombres' type='text' onChange={(event) => handleChange('nombres', event)} required placeholder='Ingrese nombres' />
            </div>
            <div className='input-group'>
              <label>Apellidos *</label>
              <input name='apellidos' type='text' onChange={(event) => handleChange('apellidos', event)} required placeholder='Ingrese sus dos apellidos' />
            </div>
            {userAlreadyExists && <p className='error-message'>El usuario ya se encuentra registrado</p>}
          </div>
          <div className='form-row'>
            <label>Tipo de documento *</label>
            <select name='tipoDocumento' onChange={(event) => handleChange('tipoDocumento', event)} required >
              <option value=''>Seleccione</option>
              <option value='ci'>CI</option>
              <option value='pasaporte'>Pasaporte</option>
            </select>
          </div>
          <div className='form-row'>
            <div className='input-group'>
              <label>Documento*</label>
              <input name='documento' type='text' onChange={(event) => handleChange('documento', event)} required placeholder='El campo solo acepta numeros'/>
            </div>
            <div className='input-group'>
              <label>Complemento*</label>
              <input name='complemento' type='text' onChange={(event) => handleChange('complemento', event)} placeholder='El campo solo acepta numeros'/>
            </div>
          </div>
          <div className='form-row'>
            <label>Dirección de domicilio*</label>
            <input name='direccion' type='text'  onChange={(event) => handleChange('direccion', event)} required placeholder='Ingrese la dirección'/>
          </div>
          <div className='form-row'>
            <div className='input-group'>
              <label>Celular*</label>
              <input name='celular' type='text' onChange={(event) => handleChange('celular', event)} required placeholder='El campo solo acepta numeros'/>
            </div>
            <div className='input-group'>
              <label>Correo electrónico*</label>
              <input name='correo' type='email' onChange={(event) => handleChange('correo', event)} required placeholder='Ingrese un correo válido'/>
            </div>
          </div>
          <div className='form-row'>
            <div className='input-group'>
            <label>Contraseña*</label> {inputType === 'password' ? (
            <EyeSlash onClick={()=> {togglePasswordVisibility()}} />) : (
            inputType === 'text' &&(
            <Eye onClick={()=> {togglePasswordVisibility()}} />     
            ))}
              <input name='secret' type={inputType} onChange={(event) => handleChange('secret', event)} required />
       
            </div>
            <div className='input-group'>
              <label>Confirmar contraseña*</label> {inputType === 'password' ? (
            <EyeSlash onClick={()=> {togglePasswordVisibility()}} />) : (
            inputType === 'text' &&(
            <Eye onClick={()=> {togglePasswordVisibility()}} />     
            ))}
              <input name='secretConfirm' type={inputType} onChange={(event) => handleChange('secretConfirm', event)} required />
            </div>

          </div>
          {!goodPassword && <p className='error-message'>{errorMessage}</p>}
          {!confirmSecret && <p className='error-message'>{confirmSecretMessage}</p>}
          <div className='button-row'>
            <button type='button' onClick={() => navigate('/')}>Cancelar</button>
            <button type='submit' className='register-button'>Registrar</button>
          </div>
          <div>
            {status === 'success' && <p className='success-message'>Usuario registrado con éxito</p>}
            {status === 'error' && <p className='error-message'>Se ha producido un error</p>}
            {status === 'registered' && <p className='error-message'>El usuario ya se encuentra registrado</p>}
          </div>
        </form>
      </div>
      {status === 'loading' && (
        <div className='loading-container'>
          <div className='loading'></div>
          </div>
          )}
      <div className='image-section'>
        <img src="https://rainesinternational.com/wp-content/uploads/2018/01/Articles_EmploymentLawyer-e1550374232107.jpeg" alt="Empleo"/>
      </div>
    </div>
  );
  
};

export default RegisterUser;
