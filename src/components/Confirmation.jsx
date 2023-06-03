import React, { useState } from 'react';
import axios from 'axios';
import '../styles/Confirmation.css';
import {useRegisterUserStore} from '../store/userRegistrationStore';
const ConfirmationCode = () => {
  
 
  const userEmail = localStorage.getItem('correo');
  const [code, setCode] = useState(['', '', '', '']);
  
  const handleChange = (event, index) => {
    const { value } = event.target;
    setCode((prevCode) => {
      const newCode = [...prevCode];
      newCode[index] = value;
      return newCode;
    });
  };

  const handleValidation = async () => {
    try {
      const response = await axios.post('http://localhost:8080/api/v1/sendmail', {
        mail: email,
      });

      // Hacer algo con la respuesta si es necesario

    } catch (error) {
      console.error(error);
      // Manejar el error de la solicitud
    }
  };

  const handleVerification = async () => {
    const token = code.join('');
    try {
      const response = await axios.post('http://localhost:8080/api/v1/verify', {
        mail: email,
        token: token,
        
      });
      console.log(response.data);

      if (response.data.code !== '0000') {
        alert('Código inválido');
      } else {
        // Redirigir a la siguiente ruta
        window.location.href = '/RegisterUser';
      }
    } catch (error) {
      console.error(error);
      // Manejar el error de la solicitud
    }
  };

  return (
    <div className="confirmation-container">
      <div className="card">
        <h1 className="title">Law Finder</h1>
        <h2 className="subtitle">Se ha enviado un correo con el código de confirmación a: {userEmail} </h2>
        <div className="verification-container">
          

        </div>
        {/* {verificationError && <p>Error en la validación del correo electrónico</p>} */}
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
          <button className="continue-button" onClick={handleVerification}>
            Continuar
          </button>
        </div>
      </div>
    </div>
  );
};
  

export default ConfirmationCode;
