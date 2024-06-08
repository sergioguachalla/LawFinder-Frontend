import '../styles/Login.css';
import { useLoginUserStore } from '../store/userLoginStore';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { Spinner } from 'react-bootstrap';
import SpinnerCircle from './ui-custom/SpinnerCircle';
const Login = () => {
  const navigate = useNavigate();
  const {handleChange, handleSubmit,status} = useLoginUserStore();
  
  useEffect(() => {
    if (status === 'success') {
      const timeoutId = setTimeout(() => {
        navigate('/Home');
      }, 1000);
      return () => clearTimeout(timeoutId); // Esperar 2 segundos (2000 milisegundos) antes de navegar
    } else {
      console.log(status + "b");
    }
  }, [navigate, status]);

  const handleLoginFormSubmit = async (e) => {
    e.preventDefault();

    // Lógica de autenticación
     await handleSubmit(e);

  };

  return (
    <div className="login-container">
      <div className="login-black">
        <img src="https://cdn.dribbble.com/users/1753238/screenshots/11466307/media/1410c84f5eeeff0077af245e36319642.jpg?compress=1&resize=400x300" alt="Law Image" />
      </div>
      <div className="login-white">
        <div className="login-content">
          <h1 className="title">Law Finder TESTGI</h1>
          <form onSubmit={(e) => {handleLoginFormSubmit(e)}} className="login-form">
            <input
              id="username"
              placeholder="Nombre de Usuario "
              name='username'
              onChange={(e) => handleChange('username', e)}
              className="login-input"
            />
            <input
              id="password"
              type="password"
              placeholder="Contraseña"
              name='secret'
              onChange={(e) => handleChange('secret', e)}
              className="login-input"
            />
            
              <button type="submit" className="login-button" id="login-button">Iniciar sesión {status === 'loading' && <SpinnerCircle></SpinnerCircle>    }</button>
              
              <p className="error-message" id="error-message">
                {status === 'invalid' && 'Usuario o contraseña incorrectos'}
                {status === 'blocked' && 'Su cuenta se encuentra en estado de verificación, por favor espere'}
                </p>
            
            <a href="/Role" className="register-link">¿No tienes una cuenta? Regístrate</a>
            <br/>
            <a href="/ForgotPassword" className="register-link">Olvidaste tu contraseña?</a>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
