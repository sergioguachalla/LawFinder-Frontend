
import { useEffect } from "react";
import {useCasesStore} from "../store/casesStore";
import { format } from 'date-fns';
import { useNavigate } from "react-router-dom";
import '../styles/Home.css';
import Navbar from "./Navbar";
import LoadingSpinner from "./Loading";
import { Link } from "react-router-dom";
import Card from "./Card";
import { getRoleFromToken } from "../utils/getIdFromToken"; 
const ArchivedCases = () => {
  const navigate = useNavigate();
  const { getCases, cases, status, currentPage, totalPages, nextPage, previousPage, fromDate, toDate, setFromDate, 
    setToDate, clearFilters, getInstances, instances, setInstanceId, instanceId, archiveCase,  inProgress, setInProgress,
    searchTitle, setSearchTitle, getCategories, categories, categoryId, setCategoryId, isLawyer, isClient} = useCasesStore();
  const formatDate = (dateInput) => {
    const formattedDate = format(new Date(dateInput), 'yyyy-MM-dd');
    return formattedDate;
  }
 const currentDate = formatDate(new Date());

  const handleArchiveCase = (id) => {
    console.log(`Caso ${id} archivado xd`);
    archiveCase(id);
  }
 
  useEffect(() => {
    

  const token = localStorage.getItem('token');
  

  if(token){
    const role = getRoleFromToken(token);
    console.log("Roles" + role);
    const timeoutId = setTimeout(() => {
      
      getCases();
      getInstances(); 
      getCategories();
      
    }, 1000); // quité el timeout

    return () => clearTimeout(timeoutId);
  } else {
    navigate('/');
  }
  
}, [getCases,getInstances, getCategories , currentPage, fromDate, toDate,inProgress , instanceId, categoryId, searchTitle]); // Se añaden fromDate y toDate como dependencias // Se añaden fromDate y toDate como dependencias

const handleCaseClick = (id) => {
  console.log(id);
  navigate(`/CaseDetails/${id}`);
}


return (
  <>
    {(status === 'loading' || status === 'init') && <LoadingSpinner />}
    <Navbar />

    <div className="cases-container">
      <h1>Casos</h1>

      <div>
        <label htmlFor="fromDate">Desde: </label>
        <input
          type="date"
          id="fromDate"
          value={fromDate}
          onChange={(e) => setFromDate(e.target.value)}
          max={currentDate}
        />
      </div>

      <div className="search-container">
        <label htmlFor="searchTitle">Buscador por título: </label>
        <input
          type="text"
          id="searchTitle"
          value={searchTitle}
          onChange={(e) => setSearchTitle(e.target.value)}
        />
      </div>

      {status === 'success' &&
        cases.map((legalCase) => (
          <div key={legalCase.idLegalCase} className="card">
            <h2>{legalCase.title}</h2>
            <p className="last-modified">
              Última modificación: {formatDate(legalCase.lastUpdate)}
            </p>
            <p>{legalCase.summary}</p>
            <p>{legalCase.crime}</p>

            {(isClient || isLawyer) && (
              <Link to={`/CaseDetails/${legalCase.idLegalCase}`}>
                <button>Ver Más</button>
              </Link>
            )}

            {isLawyer && <button>Archivar Caso</button>}
          </div>
        ))}
      <div>
        <label htmlFor="categoryId">Categoría: </label>
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

        <label htmlFor="inProgress">Estado: </label>
        <select
          id="inProgress"
          value={inProgress}
          onChange={(e) => {
            const value = e.target.value;
            setInProgress(value === 'true' ? true : value === 'false' ? false : null);
          }}
        >
          <option value="">Todos</option>
          <option value="true">En Curso</option>
          <option value="false">Archivados</option>
        </select>

        <label htmlFor="instanceId">Instancia: </label>
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

        <label htmlFor="toDate">Hasta: </label>
        <input type="date" id="toDate" value={toDate} onChange={(e) => setToDate(e.target.value)} />

        <button onClick={clearFilters}>Vaciar Filtros</button>
      </div>

      {isLawyer && (
        <button className="floating-button-right" onClick={() => navigate('/RegisterCase')}>
          +
        </button>
      )}

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
    </div>
  </>
);
      }

export default ArchivedCases;