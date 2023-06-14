import { useEffect } from 'react';
import useLawyerStore from '../store/lawyerRegistrationStore';
import '../styles/RegisterUser.css';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';


const LaywerRegistration = () => {
  const navigate = useNavigate();
  const {
    handleChange,
    handleSubmit,
    generateNewUUID,
  } = useLawyerStore();
  const status = useLawyerStore((state) => state.statusState);

  useEffect(() => {
    generateNewUUID();
  }, [generateNewUUID]);

  const handleSubmitForm = async (event) => {
    event.preventDefault();
    await handleSubmit(event);
  };

  useEffect(() => {
    if (status === 'success') {
      const timeoutId = setTimeout(() => {
        navigate('/confirmation');
      }, 1000);

      return () => clearTimeout(timeoutId);
    } else if (status === 'registered') {
      setTimeout(() => {
        navigate('/LawyerRegistration');
      }, 1000);
    } else if (status === 'loading') {
      setTimeout(() => {}, 1000);
    }
  }, [navigate, status]);

  return (
    <>
      <Navbar />
      <h1 className=''>REGISTRO DE ABOGADO</h1>
      <form className='form-container' onSubmit={(event) => handleSubmitForm(event)}>
        <div className='form-row'>
          <div className='input-group'>
            <label>Nombres *</label>
            <input name='nombres' type='text' onChange={(event) => handleChange('nombres', event)} required />
          </div>
          <div className='input-group'>
            <label>Apellidos *</label>
            <input name='apellidos' type='text' onChange={(event) => handleChange('apellidos', event)} required />
          </div>
        </div>
        <div className='form-row'>
          <label>Tipo de documento *</label>
          <select name='tipoDocumento' onChange={(event) => handleChange('tipoDocumento', event)} required>
            <option value=''>Seleccione</option>
            <option value='ci'>CI</option>
            <option value='pasaporte'>Pasaporte</option>
          </select>
        </div>
        <div className='form-row'>
          <div className='input-group'>
            <label>Documento*</label>
            <input name='documento' type='text' onChange={(event) => handleChange('documento', event)} required />
          </div>
          <div className='input-group'>
            <label>Complemento*</label>
            <input name='complemento' type='text' onChange={(event) => handleChange('complemento', event)} />
          </div>
        </div>
        <div className='form-row'>
          <label>Dirección de domicilio*</label>
          <input name='direccion' type='text' onChange={(event) => handleChange('direccion', event)} required />
        </div>
        <div className='form-row'>
          <div className='input-group'>
            <label>Celular*</label>
            <input name='celular' type='text' onChange={(event) => handleChange('celular', event)} required />
          </div>
          <div className='input-group'>
            <label>Correo electrónico*</label>
            <input name='correo' type='email' onChange={(event) => handleChange('correo', event)} required />
          </div>
        </div>
        <div className='form-row'>
          <div className='input-group'>
            <label>Contraseña*</label>
            <input name='secret' type='password' onChange={(event) => handleChange('secret', event)} required />
          </div>
          <div className='input-group'>
            <label>Confirmar contraseña*</label>
            <input name='secretConfirm' type='password' onChange={(event) => handleChange('secretConfirm', event)} required />
          </div>
        </div>
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
    </>
  );
};

export default LaywerRegistration;
