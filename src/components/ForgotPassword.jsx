import { useEffect } from 'react';
import { usePasswordRecoveryStore } from '../store/PasswordRecoveryStore';
import '../styles/PasswordRecovery.css';
import { useNavigate } from 'react-router-dom';

const PasswordRecovery = () => {
  const navigate = useNavigate();
  const {
    handleChange,
    handleSubmit,
    status,
    errorMessage,
    resetStatus,
  } = usePasswordRecoveryStore();

  useEffect(() => {
    if (status === 'success') {
      const timeoutId = setTimeout(() => {
        navigate('/confirmation');
      }, 1000);

      return () => clearTimeout(timeoutId);
    } else if (status === 'error') {
      const timeoutId = setTimeout(() => {
        resetStatus();
      }, 3000);

      return () => clearTimeout(timeoutId);
    }
  }, [status, navigate, resetStatus]);

  return (
    <div className='app-container'>
      <div className='form-section'>
        <h1>PASSWORD RECOVERY</h1>
        <form className='form-container' onSubmit={(event) => handleSubmit(event)}>
          <div className='form-row'>
            <div className='input-group'>
              <label>Email*</label>
              <input name='email' type='email' onChange={(event) => handleChange('email', event)} required />
            </div>
          </div>
          <div className='button-row'>
            <button type='button' onClick={() => navigate('/')}>Cancel</button>
            <button type='submit' className='recover-button'>Recover Password</button>
          </div>
          <div>
            {status === 'success' && <p className='success-message'>Recovery email sent successfully</p>}
            {status === 'error' && <p className='error-message'>{errorMessage}</p>}
          </div>
        </form>
      </div>
      {status === 'loading' && (
        <div className='loading-container'>
          <div className='loading'></div>
        </div>
      )}
      <div className='image-section'>
        <img src="https://rainesinternational.com/wp-content/uploads/2018/01/Articles_EmploymentLawyer-e1550374232107.jpeg" alt="Password Recovery" />
      </div>
    </div>
  );
};

export default PasswordRecovery;
