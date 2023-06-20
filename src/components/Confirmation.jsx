import { useConfirmationStore } from '../store/confirmationStore';
import { useRegisterUserStore } from '../store/userRegistrationStore';

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Confirmation.css';
import Spinner from './Spinner';
const ConfirmationCode = () => {
  const navigate = useNavigate();

  const userEmail = localStorage.getItem('correo');
  const { code, handleChange, handleRequest, role, handleLawyer } = useConfirmationStore();
  const username = useRegisterUserStore((state) => state.username);
  const status = useConfirmationStore((state) => state.status);
  const handleRequestForm = async (event) => {
    event.preventDefault();
    role === 'lawyer' ? await handleLawyer(event) : await handleRequest(event);
    //console.log(username);
  };
  useEffect(() => {
    console.log(role + 'rol');
    if (status === 'success') {
      const timeoutId = setTimeout(() => {
        navigate('/');
      }, 1000); // Esperar 2 segundos (2000 milisegundos) antes de navegar

      return () => clearTimeout(timeoutId); 
    } else {
      console.log(status + 'b');
    }
    console.log(role + 'rol');
  }, [navigate, role, status]);

  return (
    <div className="confirmation-container-custom">
      <div className="card-custom">


        <h1 className="title-custom">Law Finder {username}</h1>
        <div className="verification-container-custom">
          <img
            src="https://img.freepik.com/free-icon/email_318-304876.jpg?w=360"
            alt="Icono de correo electrónico"
            className="email-icon"
          />
        </div>
        <h2 className="subtitle-custom">Por favor, verifique su correo electrónico</h2>
        <h3>Se ha enviado un correo con el código de verificación a:</h3>
        <h3>{userEmail}</h3>

        <div className="code-input-custom">
          {code.map((digit, index) => (
            <input
              key={index}
              type="text"
              maxLength="1"
              value={digit}
              onChange={(event) => handleChange(event, index)}
              className="code-digit-input-custom"
            />
          ))}
        </div>
        <div className="button-row-custom">
          <button className="cancel-button-custom" onClick={()=> {navigate("/")}}>Cancelar</button>
          <button className="continue-button-custom" onClick={handleRequestForm}>
            Continuar
          </button>
          
        </div>
        <div>{status === 'success' ? <p className='success-message'>La cuenta ha sido verificada exitósamente!</p> : status === 'error' ? <p className='error-message'>El código introducido es incorrecto</p>  : 
        status === 'loading' ? <Spinner>cargando</Spinner>: <></>}</div>
      </div>
      
    </div>
  );
};

export default ConfirmationCode;
