import React, { useState } from 'react';
import axios from 'axios';
import '../styles/Login.css';
import { Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      console.log('a');
      const response = await axios.post('http://localhost:8080/api/v1/auth/login', {
        username: email,
        password: password
      });

      // Aquí puedes manejar la respuesta del backend
      console.log(response.data);
    } catch (error) {
      // Aquí puedes manejar el error en caso de que la solicitud falle
      console.error(error);
    }
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
            
              <button type="submit" className="login-button">Iniciar sesión</button>
            
            <a href="/Role" className="register-link">¿No tienes una cuenta? Regístrate</a>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
