import '../styles/Confirmation.css';
import {useConfirmationStore} from '../store/confirmationStore';
import {useRegisterUserStore} from '../store/userRegistrationStore';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ConfirmationCode = () => {
  const navigate = useNavigate();

 
  const userEmail = localStorage.getItem('correo');
  const { code, handleChange, handleRequest } = useConfirmationStore();
  const username = useRegisterUserStore((state) => state.username);
  const status = useConfirmationStore((state) => state.status);
  const handleRequestForm = async (event)  => {
    event.preventDefault();
    await handleRequest(event);
    //console.log(username);
  };
  useEffect(() => {
    if(status === 'success') {
      const timeoutId = setTimeout(() => {
        navigate('/');
      }, 1000); // Esperar 2 segundos (2000 milisegundos) antes de navegar
  
      return () => clearTimeout(timeoutId); // Limpiar el timeout si el componente se desmonta antes de que se complete
  
    } else {
      console.log(status + "b");
    }
  }, [navigate, status]);
  


  

  return (
    <div className="confirmation-container">
      <div className="card">
        <h1 className="title">Law Finder {username}</h1>
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
          <button className="continue-button" onClick={handleRequestForm}>
            Continuar
          </button>
        </div>
      </div>
      <div>
        { status === 'success' ? <p>Success</p> : status === 'error' ? <p>Error</p> : <></>}
      </div>
    </div>
  );
};
  

export default ConfirmationCode;
