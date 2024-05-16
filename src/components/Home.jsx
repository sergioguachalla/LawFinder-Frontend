import { useEffect } from "react";
  import {useCasesStore} from "../store/casesStore";
  import { format } from 'date-fns';
  import { useNavigate } from "react-router-dom";
  import '../styles/Home.css';
  import Navbar from "./Navbar";
  import { Link } from "react-router-dom";
  import { getRoleFromToken } from "../utils/getIdFromToken"; 
  import LoadingSpinner from "./Loading";
  import Footer from "./Footer";
  import { getUserNameFromToken } from "../utils/getIdFromToken";
  const Home = () => {
    const navigate = useNavigate();
    const roles = getRoleFromToken();
    const { getCases, cases, status, currentPage, totalPages, nextPage, previousPage, fromDate, toDate, setFromDate, 
      setToDate, clearFilters, getInstances, instances, setInstanceId, instanceId, archiveCase,
      searchTitle, setSearchTitle, getCategories, categories, categoryId, setCategoryId, isLawyer, isClient} = useCasesStore();
   
    const formatDate = (dateInput) => {
      const formattedDate = format(new Date(dateInput), 'yyyy-MM-dd');
      return formattedDate;
    }
    const currentDate = formatDate(new Date());
    

    useEffect(() => {

    const token = localStorage.getItem('token');

    if(token){
      const role = getRoleFromToken(token);
      console.log("Roles" + role);
      const timeoutId = setTimeout(() => {
        
        getCases();
        getInstances(); 
        getCategories();
      
        
      }, 500); // quité el timeout
  
      return () => clearTimeout(timeoutId);
    } else {
      navigate('/');
    }
    
  }, [getCases, getInstances, getCategories, currentPage, fromDate, toDate, instanceId, categoryId, searchTitle, navigate]); // Se añaden fromDate y toDate como dependencias // Se añaden fromDate y toDate como dependencias
  
  
  
  return (
    <>
      {(status === 'loading' || status === 'init') && <LoadingSpinner/>}
      <Navbar />
      <div className="cases-container">
        <h1>Casos</h1>

        <div className="filter-container">
          <div className="search-container">
            <label htmlFor="searchTitle">Buscador por título: </label>
            <input
              type="text"
              id="searchTitle"
              value={searchTitle}
              onChange={(e) => setSearchTitle(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="categoryId" className="label-con-margin">Categoría: </label>
            <select
              id="categoryId"
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
            >
              <option value="">Todos</option>
              {categories.map((category) => (
                <option key={category.categoryId} value={category.categoryId}>
                  {category.categoryName}
                </option>
              ))}
            </select>
            <label htmlFor="instanceId" className="label-con-margin">Instancia: </label>
            <select
              id="instanceId"
              value={instanceId}
              onChange={(e) => setInstanceId(e.target.value)}
            >
              <option value="">Todos</option>
              {instances.map((instance) => (
                <option key={instance.instanceId} value={instance.instanceId}>
                  {instance.instanceName}
                </option>
              ))}
            </select>
            <label htmlFor="fromDate" className="label-con-margin">Desde: </label>
            <input
              type="date"
              id="fromDate"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              max={currentDate}
            />
    
            <label htmlFor="toDate" className="label-con-margin">Hasta: </label>
            <input type="date" id="toDate" min={fromDate} value={toDate} onChange={(e) => setToDate(e.target.value)} />
    
            <button onClick={clearFilters} className="button-filter" >Vaciar Filtros</button>
          </div>

        </div>
  
                
      <div className="cases-container-final">
        {status === 'success' &&
          cases.map((legalCase) => (
            <div key={legalCase.idLegalCase} className="card-item">
              <h2>{legalCase.title}</h2>
              <p className="last-modified">
                Última modificación: {formatDate(legalCase.lastUpdate)}
              </p>
              <p>{legalCase.summary}</p>
              <p>{legalCase.crime}</p>
             
              <Link to={`/CaseDetails/${legalCase.idLegalCase}`}>
                  <button>Ver Más</button>
                </Link>
              {/*(isClient || isLawyer) && (
                
              )*/}        
                
                <Link to={`/RegisterAudience/${legalCase.idLegalCase}`}><button>Registrar Audiencia</button></Link>
             
            </div>
          ))}
      </div>
        
  
       
  
        {status === 'empty' && <p>No tienes casos registrados</p>}
  
        {status === 'success' && (
          <div className="pagination">
            <button onClick={previousPage} disabled={currentPage === 0}>
              Anterior
            </button>
            <span>{currentPage + 1}</span>
            <button onClick={nextPage} disabled={currentPage === totalPages - 1}>
              Siguiente
            </button>
          </div>
        )}
        {roles.includes("CREATE_CASE") && 
          <button className="floating-button-right" onClick={() => navigate('/RegisterCase')}>
            +
          </button>
  }
        {/*isLawyer === true &&  ()*/}
      </div>
      {/* <Footer></Footer> */}
    </>
  );
        }

export default Home;