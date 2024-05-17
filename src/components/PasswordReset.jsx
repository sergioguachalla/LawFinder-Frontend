import { useEffect } from 'react';
import { useResetPasswordStore } from '../store/passwordResetStore';
import '../styles/ResetPassword.css';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Eye, EyeSlash } from 'react-bootstrap-icons';


const ResetPassword = () => {
  //get param from current URL
  const [seachParams, setSearchParams] = useSearchParams();
  const passwordResetToken = seachParams.get('uuid');

  const navigate = useNavigate();
  const {
    handleChange,
    handleSubmit,
    inputType,
    togglePasswordVisibility,
    status,
    goodPassword,
    errorMessage,
  } = useResetPasswordStore();

  useEffect(() => {
    if (status === 'success') {
      const timeoutId = setTimeout(() => {
        navigate('/');
      }, 1000);

      return () => clearTimeout(timeoutId);
    }
  }, [status, navigate]);

  return (
    <div className='app-container'>
      <div className='form-section'>
        <h1>RESET PASSWORD</h1>
        <form className='form-container' onSubmit={(event) => handleSubmit(event, passwordResetToken)}>
          <div className='form-row'>
            <div className='input-group'>
              <label>New Password*</label>
              {inputType === 'password' ? (
                <EyeSlash onClick={togglePasswordVisibility} />
              ) : (
                <Eye onClick={togglePasswordVisibility} />
              )}
              <input name='newPassword' type={inputType} onChange={(event) => handleChange('newPassword', event)} required />
            </div>
          </div>
          <div className='form-row'>
            <div className='input-group'>
              <label>Confirm New Password*</label>
              {inputType === 'password' ? (
                <EyeSlash onClick={togglePasswordVisibility} />
              ) : (
                <Eye onClick={togglePasswordVisibility} />
              )}
              <input name='confirmNewPassword' type={inputType} onChange={(event) => handleChange('confirmNewPassword', event)} required />
            </div>
          </div>
          {!goodPassword && <p className='error-message'>{errorMessage}</p>}
          <div className='button-row'>
            <button type='button' onClick={() => navigate('/')}>Cancel</button>
            <button type='submit' className='reset-button'>Reset Password</button>
          </div>
          <div>
            {status === 'success' && <p className='success-message'>Password reset successfully</p>}
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
        <img src="https://rainesinternational.com/wp-content/uploads/2018/01/Articles_EmploymentLawyer-e1550374232107.jpeg" alt="Reset Password" />
      </div>
    </div>
  );
};

export default ResetPassword;
