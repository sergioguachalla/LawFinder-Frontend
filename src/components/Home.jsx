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
  const Home = () => {
    const navigate = useNavigate();
    const { getCases, cases, status, currentPage, totalPages, nextPage, previousPage, fromDate, toDate, setFromDate, 
      setToDate, clearFilters, getInstances, instances, setInstanceId, instanceId, archiveCase,  inProgress, setInProgress  } = useCasesStore();

    const formatDate = (dateInput) => {
      const formattedDate = format(new Date(dateInput), 'yyyy-MM-dd');
      return formattedDate;
    }


    
    useEffect(() => {
      
      const token = localStorage.getItem('token');

      if(token){
        const role = getRoleFromToken(token);
        console.log("Roles" + role);
        const timeoutId = setTimeout(() => {
          
          getCases();
          getInstances(); 
          
        }, 0); // quité el timeout
    
        return () => clearTimeout(timeoutId);
      } else {
        navigate('/');
      }
      
    }, [getCases,getInstances , currentPage, fromDate, toDate,inProgress , instanceId]); // Se añaden fromDate y toDate como dependencias
    
    const handleCaseClick = (id) => {
      console.log(id);
      navigate(`/CaseDetails/${id}`);
    }

    const handleArchiveCase = (id) => {
      console.log(`Caso ${id} archivado xd`);
      archiveCase(id);
    }
    
    return (
      <>
        {status === 'loading' || status ==='init' && <LoadingSpinner/>}

        <Navbar></Navbar>
        
        <div className="cases-container">
          <h1>Casos</h1>
          <div>
            <label htmlFor="inProgress">Estado: </label>
            <select id="inProgress" value={inProgress} onChange={e => { const value = e.target.value; setInProgress(value === 'true' ? true : value === 'false' ? false : null)}}>
              <option value="">Todos</option>
              <option value="true">En Curso</option>
              <option value="false">Archivados</option>
            </select>
            <label htmlFor="instanceId">Instancia: </label>
            <select id="instanceId" value={instanceId} onChange={e => setInstanceId(e.target.value)}>
              <option value="">Todos</option>
              {instances.map(instance => (
                <option key={instance.instanceId} value={instance.instanceId}>{instance.instanceName}</option>
              ))}
            </select>
            <label htmlFor="fromDate">Desde: </label>
            <input type="date" id="fromDate" value={fromDate} onChange={e => setFromDate(e.target.value)} />

            <label htmlFor="toDate">Hasta: </label>
            <input type="date" id="toDate" value={toDate} onChange={e => setToDate(e.target.value)} />

            <button onClick={clearFilters}>Vaciar Filtros</button>
          </div>

          {status === 'success' && cases.map((legalCase) => (
            <div key={legalCase.idLegalCase} className="card">
              <h2>{legalCase.title}</h2>
              <p className="last-modified">Última modificación: {formatDate(legalCase.lastUpdate)}</p>
              <p>{legalCase.summary}</p>
              <p>{legalCase.crime}</p>
              <Link to={`/CaseDetails/${legalCase.idLegalCase}`}><button>Ver Más</button></Link>
              <button onClick={() => handleArchiveCase(legalCase.idLegalCase)}>Archivar Caso</button>
            </div>
          ))}

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
        <button className="floating-button-right" onClick={() => navigate('/RegisterCase')}>
          +
        </button>
      </>
    );
  };

  export default Home;