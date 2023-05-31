import React, { useState } from 'react';
import '../styles/Confirmation.css'; // Archivo CSS para los estilos
import { Link } from 'react-router-dom';

const ConfirmationCode = () => {
  const [code, setCode] = useState(['', '', '', '', '', '']);

  const handleChange = (event, index) => {
    const { value } = event.target;
    setCode((prevCode) => {
      const newCode = [...prevCode];
      newCode[index] = value;
      return newCode;
    });
  };

  return (
    <div className="confirmation-container">
      <div className="card">
        <h1 className="title">Law Finder</h1>
        <h2 className="subtitle">Registro de nuevo usuario</h2>
        <div className="verification-container">
          <input
            type="text"
            placeholder="Verificación de correo"
            className="verification-input"
          />
          <button className="validate-button">Validar</button>
        </div>
        <div className="code-input">
          {code.map((digit, index) => (
            <input
              key={index}
              type="text"
              maxLength="1"
              value={digit}
              onChange={(event) => handleChange(event, index)}
              className="code-digit-input"
            />
          ))}
        </div>
        <div className="button-row">

          <button className="cancel-button">Cancelar</button>
          {/* Redirecciona a RegisterUser */}
          <Link to="/RegisterUser">
            <button className="continue-button">Continuar</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationCode;
