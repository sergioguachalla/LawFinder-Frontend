import { useNavigate } from 'react-router-dom';
import { useCaseStore } from '../store/caseRegistrationStore';
import { useEffect } from 'react';
import '../styles/RegisterCase.css';
import Navbar from './Navbar';
import { getRoleFromToken } from '../utils/getIdFromToken';


const RegisterCase = () => {
  const history = useNavigate();
  const navigate = useNavigate();
  const today = new Date().toISOString().split('T')[0];
  const 
  { formData, departamentos,
    provincias,
    handleInvitation, loadDepartamentos,
    loadProvincias, instancias,
    loadInstancias, categorias,
    loadCategorias, loadSubCategorias,
    subCategorias, crimes,
    loadCrimes, registerCase,
    status, lawyerEmail,setStatus, clearFormData,
    setCategoryId, getCategory,
    handleStateChange,handleFormStateChange
    
 } =
  useCaseStore((state) => ({
    ...state,
    history: history,
  }));


  useEffect(() => {
    //const navigate = useNavigate();
    const roles = getRoleFromToken();
    if(!roles.includes("CREATE_CASE")  ) {
        navigate('/Unauthorized');
    }
    loadDepartamentos();
    loadCategorias();
    loadSubCategorias(getCategory());
    loadInstancias();
    if (status === 'success') {
      clearFormData(); 
      setTimeout(() => {
        navigate('/Home');
        setStatus(''); // Reinicia el estado
      }, 1000);
    } 
  }, [ loadDepartamentos, loadInstancias, navigate, clearFormData, setStatus, loadCategorias, loadSubCategorias]);


  const handleFormStateChanges = (field, event) => {
    handleFormStateChange(field, event);
  };

  const handleDepartmentChange =  (event) =>  {
    const idDepartamento = event.target.value;
    handleStateChange('departmentId', event);
    loadProvincias(idDepartamento);
  };
  
  const handleSubCategoryChange = (event) => {
    const idSubCategoria = event.target.value;
    handleFormStateChange('subCategoryId', event);
    loadCrimes(idSubCategoria);
  };


  const handleCategoriaChange = (event) => {

    const idCategoria = event.target.value;
    setCategoryId(idCategoria);
    handleStateChange("categoryId", event);
    loadSubCategorias(idCategoria);


    
  };

  

  const handleCrimeChange = (event) => {
    const idCrime = event.target.value;
    console.log("idCrime", idCrime);
  };

  const handleSubmitForm = async (event) => {
    event.preventDefault();
    await registerCase(event);
  };

  const handleLawyerEmail = (event) => {
    //const lawyerEmail = event.target.value;
    handleStateChange('lawyerEmail', event);
  }
  const handleCustomerEmail = (event) => {
    handleStateChange('customerEmail', event);
  }
  const handleIsComplainant = (event) => {
    handleStateChange('complainant', event);
  }

 

  return (
    <>
    
      <Navbar />
      <h1 className='centered-apple-font-rc' id="centered-apple-font-rc">REGISTRO DE CASO</h1>
    <div className="main-container-rc">
      <form className="form-container-rc" onSubmit={handleSubmitForm}>
        <div className="form-row-rc">
          <div className="form-field-rc">
            <label>Título *</label>
            <input name="title" type="text" id="title" value={formData.title} onChange={(event) => handleFormStateChanges('title', event)} />
          </div>
          <div className="form-field-rc">
            <label>Fecha de inicio *</label>
            <input name="startDate" type="date" id="startDate" value={formData.startDate} max={today} onChange={(event) => handleFormStateChanges('startDate', event)} />
          </div>
        </div>
        <div className="form-row-inline-rc">      
          <label>Resumen *</label>
          {/* darle un alto maximo a summar */}
          <textarea name="summary"  id="summary" value={formData.summary} onChange={(event) => handleFormStateChanges('summary', event)} maxLength={500} 
          style={{maxHeight: "140px", width: "100%"}}
          />
        </div>
        <div className="form-row-rc">
          <div className="form-field-rc">
            <label>Departamento*</label>
            <select name="idDepartment" onChange={(event) => handleDepartmentChange(event)} >
              {departamentos.map((departamento) => (
                <option key={departamento.idDepartment} value={departamento.idDepartment}>
                  {decodeURIComponent(departamento.departmentName)}
                </option>
              ))}
            </select>
          </div>
          <div className="form-field-rc">
            <label>Provincia*</label>
            <select name="provinceId" onChange={(event) => handleFormStateChange('provinceId',event)} >
              {provincias.map((provincia) => (
                <option key={provincia.idProvince} value={provincia.idProvince}>
                  {decodeURIComponent(provincia.provinceName)}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="form-row-rc">
          <div className="form-field-rc">
            <label>Categoría *</label>
            <select name="categoria" onChange={(event) => handleCategoriaChange(event)}>
              {categorias.map((categoria) => (
                  <option key={categoria.categoryId} value={categoria.categoryId}>
                    {decodeURIComponent(categoria.categoryName)}
                  </option>
                ))
              }
            </select>
          </div>
          <div className="form-field-rc">
            <label>Sub-categoría *</label>
            <select name="subCategoryId" onChange={(event) => handleSubCategoryChange(event)} >
              {subCategorias.map((subCategoria) => (
                  <option key={subCategoria.idSubCategory} value={subCategoria.idSubCategory}>
                    {decodeURIComponent(subCategoria.subCategoryName)}
                  </option>
                ))
              }
            </select>
          </div>
          <div className="form-field-rc">
            <label>Delito *</label>
            <select name="crimeId" onChange={(event) => handleFormStateChanges("crimeId", event)} >
              {crimes.map((crime) => (
                  <option key={crime.crimeId} value={crime.crimeId}>
                    {decodeURIComponent(crime.name)}
                  </option>
                ))
              }
            </select>
          </div>
        </div>
        <div className="form-row-inline-rc">
          <label>Demandante (Si está marcado es demandante, caso contrario es demandado)</label>
          <input name="complainant" type="checkbox" onChange={(event) => handleFormStateChanges('complainant', event)} />
        </div>
        <hr />
        <h2>Actores</h2>
        <div className="form-row-rc">
          <div className="form-field-invitation-rc">
            <label>Invitar abogado *</label>
            <input name="laywerEmail" type="text" onChange={(event) => handleLawyerEmail(event)}/>
            <button type="button" onClick={() => handleInvitation("lawyer")}>Enviar invitación</button>
            {status === 'lawyerNotFound' && <p>Abogado no registrado</p>}
            {status === 'lawyerFound' && <p>Invitación enviada a {formData.lawyerEmail} </p>}
          </div>
          <div className="form-field-invitation-rc">
            <label>Invitar cliente *</label>
            <input name="customerEmail" type="text" onChange={(event) => handleCustomerEmail(event)} />
            <button type="button" onClick={() => {handleInvitation("customer")}}>Enviar invitación</button>
            {status === 'customerNotFound' && <p>Cliente no registrado</p>}
            {status === 'customerFound' && <p>Invitación enviada a {formData.customerEmail} </p>}
          </div>
        </div>
        <hr />
        <div className="form-row-inline-rc">
          <label>Contraparte *</label>
          <input name="counterpart" type="text" id="counterpart" onChange={(event) => handleFormStateChanges("counterpart", event)} />
        </div>
        <h2>Etapa actual del proceso</h2>
        <div className="form-row-inline-rc">
          <label>Instancia *</label>
          <select name="idInstance" onChange={(event) => handleFormStateChanges('idInstance', event)} >
            {instancias.map((instancia) => (
                <option key={instancia.instanceId} value={instancia.instanceId}>
                  {decodeURIComponent(instancia.instanceName)}
                </option>
              ))
            }
          </select>
        </div>
        <div className="form-row-rc">
          <div className="form-field-rc">
            <label>Fecha de inicio de la instancia *</label>
            <input name="startDateInstance" id="startDateInstace" type="date" min={today} onChange={(event) => handleFormStateChanges('startDateInstance', event)} />
          </div>
          <div className="form-field-rc">
            <label>Fecha final de plazo de la instancia *</label>
            <input name="endDateInstance" id="endDateInstace" type="date" min={formData.startDateInstance} onChange={(event) => 
              handleFormStateChanges('endDateInstance', event)} />
          </div>
        </div>
        <div className="button-row-rc">
          <button className="register-button-rc"  onClick={()=> {navigate("/Home")}}>Cancelar</button>
          <button type="submit" className="register-button" id="register-button">Registrar</button>  
        </div>

        <div>
          {status === 'loading' && <p>Cargando...</p>}
          {status === 'emptyForm' && <p id="error-message-form"
          style={{color: 'red'}}
          >Por favor, llene todos los campos</p>}
          {status === 'success' && <p id="success-message">Caso registrado con éxito!</p>}
        </div>


      </form>
    </div>
</>
  );
};

export default RegisterCase;
