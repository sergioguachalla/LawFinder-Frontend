import '../styles/RegisterUser.css';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useRegisterUserStore } from '../store/userRegistrationStore';
import { useState } from 'react';

const RegisterCase = () => {
  const history = useNavigate();
  const {
    handleChange,
    handleSubmit,
  } = useRegisterUserStore();
  
  const [partes, setPartes] = useState([0]);

  // Función para agregar un nuevo campo de entrada de 'parte'
  const addParte = () => {
    setPartes([...partes, partes.length]);
  }

  // Aquí debes implementar la lógica para cargar los departamentos y provincias de Bolivia
  
  return (
    <>
      <h1 className='centered-apple-font'>REGISTRO DE CASO</h1>
      <form className="form-container" onSubmit={handleSubmit}>
        <div className="form-row">
          <label>Título *</label>
          <input name="titulo" type="text" onChange={(event) => handleChange('titulo', event)} required />
        </div>
        {partes.map((parte, index) => (
          <div className="form-row" key={index}>
            <label>Parte {index + 1} *</label>
            <input name={`parte${index + 1}`} type="text" onChange={(event) => handleChange(`parte${index + 1}`,event)} required />
          </div>
        ))}
        <div className="form-row">
          <button type="button" onClick={addParte}>+</button>
        </div>
        <div className="form-row">
          <label>Contraparte *</label>
          <input name="contraparte" type="text" onChange={(event) => handleChange('contraparte',event)}   required />
        </div>
        <div className="form-row">
              <label>Fecha de inicio *</label>
              <input name="fechaInicio" type="date" onChange={(event) => handleChange('fechaInicio',event)}  required />
            </div>
            <div className="form-row">
              <label>Departamento*</label>
              <select name="departamento" onChange={(event) => handleChange('departamento',event)}  required>
                {/* Debes rellenar estos options con los departamentos de Bolivia */}
              </select>
            </div>
            <div className="form-row">
              <label>Provincia*</label>
              <select name="provincia" onChange={(event) => handleChange('provincia',event)}  required>
                {/* Debes rellenar estos options con las provincias de Bolivia */}
              </select>
            </div>
            <div className="form-row">
              <label>Categoría*</label>
              <select name="categoria" onChange={(event) => handleChange('categoria',event)}  required>
                <option value="">Seleccione</option>
                <option value="penal">Penal</option>
                <option value="civil">Civil</option>
                {/* Agrega aquí las otras categorías */}
              </select>
            </div>
            <div className="form-row">
              <label>Crimen*</label>
              <select name="crimen" onChange={(event) => handleChange('crimen',event)}  required>
                {/* Debes rellenar estos options con los crímenes */}
              </select>
            </div>
            <div className="form-row">
              <label>Resumen*</label>
              <textarea name="resumen" onChange={(event) => handleChange('resumen',event)}  required />
            </div>
            <div className="button-row">
              <button type="submit" className="register-button">Registrar</button>
            </div>
      </form>
    </>
  );
}

export default RegisterCase;


