import { useEffect } from "react";
import {useCasesStore} from "../store/casesStore";
import { format } from 'date-fns';
import { useNavigate } from "react-router-dom";
import '../styles/Home.css';
import Navbar from "./Navbar";
import LoadingSpinner from "./Loading";
import { Link } from "react-router-dom";
import Card from "./Card";
const Home = () => {
  const navigate = useNavigate();
  const { getCases, cases, status, currentPage, totalPages, nextPage, previousPage } = useCasesStore();

  const formatDate = (dateInput) => {
    const formattedDate = format(new Date(dateInput), 'yyyy-MM-dd');
    return formattedDate;
  }
  
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      getCases();

    }, 1000);
  
    return () => clearTimeout(timeoutId);
  }, [getCases,currentPage]);
  

  const handleCaseClick = (id) => {
    console.log(id);
    navigate(`/CaseDetails/${id}`);
  }
  
  return (
    <>
          {status === 'loading' || status ==='init' && <LoadingSpinner/>}

      <Navbar></Navbar>
      
      <div className="cases-container">
        <h1>Casos</h1>
        

        {status === 'success' && cases.map((legalCase) => (
          
          <div key={legalCase.idLegalCase} className="card">
            <h2>{legalCase.title}</h2>
            <p className="last-modified">Última modificación: {formatDate(legalCase.lastUpdate)}</p>
            <p>{legalCase.summary}</p>
            <p>{legalCase.crime}</p>
            {/*  TODO: Modularizar el componente Card *
            <Card id={legalCase.idLegalCase} title={legalCase.title}></Card> */}
            <Link to={`/CaseDetails/${legalCase.idLegalCase}`}><button>Ver Más</button></Link>
          </div>
          ))}

        {status === 'empty' && <p>No tienes casos registrados</p>}
        {/* Controles de navegación */}
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
