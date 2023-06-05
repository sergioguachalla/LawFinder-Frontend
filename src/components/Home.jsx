import { useEffect } from "react";
import useCasesStore from "../store/casesStore";
import { format } from 'date-fns';
import { useNavigate } from "react-router-dom";
import '../styles/Home.css';

const Home = () => {
  const navigate = useNavigate();
  const { getCases, cases, status } = useCasesStore();

  const formatDate = (dateInput) => {
    const formattedDate = format(new Date(dateInput), 'yyyy-MM-dd');
    return formattedDate;
  }
  
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      getCases();
    }, 2000);
  
    return () => clearTimeout(timeoutId);
  }, [getCases]);

  const handleCaseClick = (id) => {
    console.log(id);
    navigate(`/CaseDetails/${id}`);
  }
  
  return (
    <div className="container">
      <h1>Home</h1>

      {status === 'success' && cases.map((legalCase) => (
        <div key={legalCase.idLegalCase} className="card">
          <h2>{legalCase.title}</h2>
          <p className="last-modified">Última modificación: {formatDate(legalCase.lastUpdate)}</p>
          <p>{legalCase.summary}</p>
          <p>{legalCase.crime}</p>
          <button onClick={() => handleCaseClick(legalCase.idLegalCase)}>Ver Más</button>
        </div>
      ))}

      {status === 'empty' && <p>No tienes casos registrados</p>}
    </div>
  );
};

export default Home;
