import { useNavigate } from 'react-router-dom';
import { useCaseStore } from '../store/caseRegistrationStore';
import { useEffect, useState } from 'react';

const RegisterCase = () => {
  const history = useNavigate();
  const { formData, departamentos, provincias, handleChange, handleSubmit, loadDepartamentos, loadProvincias } = 
  useCaseStore((state) => ({
    ...state,
    history: history,
  }));

  const [contrapartes, setContrapartes] = useState([{ id: 0 }]);

  const addContraparte = () => {
    const id = contrapartes[contrapartes.length - 1].id + 1;
    setContrapartes(prev => [...prev, { id }]);
  }

  useEffect(() => {
    loadDepartamentos();
  }, []);

  const handleDepartamentoChange = (event) => {
    const idDepartamento = event.target.value;
    handleChange('departamento', event);
    loadProvincias(idDepartamento);
  };

  return (
    <>
      <h1 className='centered-apple-font'>REGISTRO DE CASO</h1>
      <form className="form-container" onSubmit={handleSubmit}>
        <div className="form-row">
          <label>Título *</label>
          <input name="titulo" type="text" value={formData.titulo} onChange={(event) => handleChange('titulo', event)} required />
        </div>
        <div className="form-row">
          <label>Fecha de inicio *</label>
          <input name="fechaInicio" type="date" value={formData.fechaInicio} onChange={(event) => handleChange('fechaInicio', event)} required />
        </div>
        <div className="form-row">
          <label>Resumen *</label>
          <textarea name="resumen" value={formData.resumen} onChange={(event) => handleChange('resumen', event)} required />
        </div>
        <div className="form-row">
          <label>Crimen *</label>
          <textarea name="crimen" value={formData.resumen} onChange={(event) => handleChange('crimen', event)} required />
        </div>
        <div className="form-row">
          <label>Departamento*</label>
          <select name="departamento" onChange={handleDepartamentoChange} required>
            {departamentos.map((departamento) => (
              <option key={departamento.idDepartment} value={departamento.idDepartment}>
                {decodeURIComponent(departamento.departmentName)}
              </option>
            ))}
          </select>
        </div>
        <div className="form-row">
          <label>Provincia*</label>
          <select name="provincia" onChange={(event) => handleChange('provincia', event)} required>
            {provincias.map((provincia) => (
              <option key={provincia.idProvince} value={provincia.idProvince}>
                {decodeURIComponent(provincia.provinceName)}
              </option>
            ))}
          </select>
        </div>
        <div className="form-row">
          <label>Categoría *</label>
          <select name="categoria" onChange={(event) => handleChange('categoria', event)} required>
            {/* Aquí deberías mapear las categorías como lo haces con los departamentos y las provincias */}
          </select>
        </div>
        <div className="form-row">
          <label>Sub-categoría *</label>
          <select name="subCategoria" onChange={(event) => handleChange('subCategoria', event)} required>
            {/* Aquí deberías mapear las sub-categorías como lo haces con los departamentos y las provincias */}
          </select>
        </div>
        <hr />
        <h2>Actores</h2>
        <div className="form-row">
          <label>Invitar abogado *</label>
          <input name="invitarAbogado" type="text" onChange={(event) => handleChange('invitarAbogado', event)} required />
          <button type="button" onClick={() => {/* Aquí deberías llamar a la función para enviar la invitación */}}>Enviar invitación</button>
        </div>
        <div className="form-row">
          <label>Invitar cliente *</label>
          <input name="invitarCliente" type="text" onChange={(event) => handleChange('invitarCliente', event)} required />
          <button type="button" onClick={() => {/* Aquí deberías llamar a la función para enviar la invitación */}}>Enviar invitación</button>
        </div>
        {contrapartes.map((contraparte, index) => (
          <div key={contraparte.id} className="form-row">
            <label>Contraparte {index + 1} *</label>
        
            <input name={`contraparte${index}`} type="text" onChange={(event) => handleChange(`contraparte${index}`, event)} required />
          </div>
        ))}
        <button type="button" onClick={addContraparte}>+</button>
        <hr />
        <h2>Etapa actual del proceso</h2>
        <div className="form-row">
          <label>Instancia *</label>
          <select name="instancia" onChange={(event) => handleChange('instancia', event)} required>
            {/* Aquí deberías mapear las instancias como lo haces con los departamentos y las provincias */}
          </select>
        </div>
        <div className="form-row">
          <label>Fecha de inicio de la instancia *</label>
          <input name="fechaInicioInstancia" type="date" onChange={(event) => handleChange('fechaInicioInstancia', event)} required />
        </div>
        <div className="form-row">
          <label>Fecha final de plazo de la instancia *</label>
          <input name="fechaFinalInstancia" type="date" onChange={(event) => handleChange('fechaFinalInstancia', event)} required />
        </div>
        <div className="button-row">
          <button type="submit" className="register-button">Registrar</button>
        </div>
      </form>
    </>
  );
};

export default RegisterCase;
