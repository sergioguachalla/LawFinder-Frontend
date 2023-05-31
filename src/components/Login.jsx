import React, { useState } from 'react';
import '../styles/Login.css'; 

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    // Aquí puede ir la lógica de inicio de sesión
  };

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
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="login-input"
            />
            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="login-input"
            />
            <div className="options">
                <div className="remember-me">
                    <input 
                    type="checkbox" 
                    checked={remember} 
                    onChange={(e) => setRemember(e.target.checked)} 
                    />
                    <label>Recordarme</label>
                </div>
                <a href="/forgot" className="forgot-password">¿Olvidaste tu contraseña?</a>
            </div>

            <button type="submit" className="login-button">Iniciar sesión</button><br/>
            <a href="/Role" className="register-link">¿No tienes una cuenta? Regístrate</a>
    
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
