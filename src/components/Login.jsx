import '../styles/Login.css';
import { useLoginUserStore } from '../store/userLoginStore';
const Login = () => {
  
  const {handleChange, handleSubmit} = useLoginUserStore();
  return (
    <div className="login-container">
      <div className="login-black">
        <img src="https://cdn.dribbble.com/users/1753238/screenshots/11466307/media/1410c84f5eeeff0077af245e36319642.jpg?compress=1&resize=400x300" alt="Law Image" />
      </div>
      <div className="login-white">
        <div className="login-content">
          <h1 className="title">Law Finder</h1>
          <form onSubmit={handleSubmit} className="login-form">
            <input
              placeholder="Nombre de Usuario "
              name='username'
              onChange={(e) => handleChange('username', e)}
              className="login-input"
            />
            <input
              type="password"
              placeholder="Contraseña"
              name='secret'
              onChange={(e) => handleChange('secret', e)}
              className="login-input"
            />
            <div className="options">
              <div className="remember-me">
                <input
                  type="checkbox"
                 
                  
                />
                <label>Recordarme</label>
              </div>
              <a href="/forgot" className="forgot-password">¿Olvidaste tu contraseña?</a>
            </div>
            
              <button type="submit" className="login-button">Iniciar sesión</button>
            
            <a href="/Role" className="register-link">¿No tienes una cuenta? Regístrate</a>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
