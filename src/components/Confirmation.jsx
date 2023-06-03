import '../styles/Confirmation.css';
import {useConfirmationStore} from '../store/confirmationStore';
const ConfirmationCode = () => {
  
 
  const userEmail = localStorage.getItem('correo');
  const { code, handleChange, handleRequest } = useConfirmationStore();


  

  

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
          <button className="continue-button" onClick={handleRequest}>
            Continuar
          </button>
        </div>
      </div>
    </div>
  );
};
  

export default ConfirmationCode;
