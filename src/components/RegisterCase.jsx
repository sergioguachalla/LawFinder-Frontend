import '../styles/RegisterUser.css';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { CaseStore } from '../store/caseRegistrationStore';
import { useState } from 'react';

const RegisterCase = () => {
  const history = useNavigate();
  const { formData, departamentos, provincias, handleChange, handleSubmit, loadDepartamentos, loadProvincias } = useCaseStore();

  useEffect(() => {
    loadDepartamentos();
  }, []);

  const handleDepartamentoChange = (event) => {
    const idDepartamento = event.target.value;
    handleChange('departamento', idDepartamento);
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
          <label>Departamento*</label>
          <select name="departamento" onChange={handleDepartamentoChange} required>
            {departamentos.map((departamento) => (
              <option key={departamento.idDepartment} value={departamento.idDepartment}>
                {departamento.departmentName}
              </option>
            ))}
          </select>
        </div>
        <div className="form-row">
          <label>Provincia*</label>
          <select name="provincia" onChange={(event) => handleChange('provincia', event)} required>
            {provincias.map((provincia) => (
              <option key={provincia.idProvince} value={provincia.idProvince}>
                {provincia.provinceName}
              </option>
            ))}
          </select>
        </div>
        {/* Resto del formulario... */}
        <div className="button-row">
          <button type="submit" className="register-button">Registrar</button>
        </div>
      </form>
    </>
  );
};

export default RegisterCase;