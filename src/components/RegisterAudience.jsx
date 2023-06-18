import { useEffect } from 'react';
import { useRegisterAudienceStore } from '../store/audienceRegistrartionStore';
import '../styles/RegisterUser.css';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

const RegisterAudience = () => {
  const navigate = useNavigate();
  const {
    setDate,
    setHour,
    setDescription,
    setMeetingLink,
    setLocation,
    registerAudience,
    status
  } = useRegisterAudienceStore();

  const handleSubmitForm = async (event) => {
    event.preventDefault();
    const caseId = 3; // Reemplazar por el id del caso que estás usando
    await registerAudience(caseId);
  };

  useEffect(() => {
    if (status === 'success') {
      const timeoutId = setTimeout(() => {
        navigate('/Home');
      }, 1000);

      return () => clearTimeout(timeoutId);
    }
  }, [navigate, status]);

  return (
    <>
      <Navbar />
      <h1 className=''>Agendar Audiencia</h1>
      <form className='form-container' onSubmit={handleSubmitForm}>
        <div className='form-row'>
          <div className='input-group'>
            <label>Fecha *</label>
            <input type='date' onChange={(event) => setDate(event.target.value)} required />
          </div>
          <div className='input-group'>
            <label>Hora *</label>
            <input type='time' onChange={(event) => setHour(event.target.value)} required />
          </div>
        </div>
        <div className='form-row'>
          <label>Descripción*</label>
          <input type='text' onChange={(event) => setDescription(event.target.value)} required />
        </div>
        <div className='form-row'>
            <label>Link de la reunión (Opcional)</label>
            <input type='text' onChange={(event) => setMeetingLink(event.target.value)} />
        </div>
        <div className='form-row'>
          <label>Dirección de la audiencia*</label>
          <input type='text' onChange={(event) => setLocation(event.target.value)} required />
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
