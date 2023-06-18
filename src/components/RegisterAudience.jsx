import { useEffect } from 'react';
import { useRegisterUserStore } from '../store/userRegistrationStore';
import '../styles/RegisterUser.css';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
const RegisterAudience = () => {
  const navigate = useNavigate();
  const {
    handleChange,
    handleSubmit,
  } = useRegisterUserStore();
  const status = useRegisterUserStore((state) => state.statusState);


  const handleSubmitForm = async (event) => {
    event.preventDefault();
    await handleSubmit(event);
  };

  useEffect(() => {
    if (status === 'success') {
      const timeoutId = setTimeout(() => {
        navigate('/Home');
      }, 1000);

      return () => clearTimeout(timeoutId);
    } else if (status === 'loading') {
      setTimeout(() => {}, 1000);
    }
  }, [navigate, status]);

  return (
    <>
      <Navbar />
      <h1 className=''>Agendar Audiencia</h1>
      <form className='form-container' onSubmit={(event) => handleSubmitForm(event)}>
        <div className='form-row'>
          <div className='input-group'>
            <label>Fecha *</label>
            <input name='nombres' type='text' onChange={(event) => handleChange('nombres', event)} required />
          </div>
          <div className='input-group'>
            <label>Hora *</label>
            <input name='apellidos' type='text' onChange={(event) => handleChange('apellidos', event)} required />
          </div>
        </div>
        <div className='form-row'>
            <label>Link de la reunión (Opcional)</label>
            <input name='documento' type='text' onChange={(event) => handleChange('documento', event)} required />
        </div>
        <div className='form-row'>
          <label>Dirección de domicilio*</label>
          <input name='direccion' type='text' onChange={(event) => handleChange('direccion', event)} required />
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

          {status === 'success' && <p className='success-message'>Audiencia agendada con éxito</p>}
          {status === 'error' && <p className='error-message'>Se ha producido un error</p>}
        </div>
      </form>
    </>
  );
};

export default RegisterAudience;
