import { useEffect } from "react";
import useCasesStore from "../store/casesStore";
import { format } from 'date-fns';
import '../styles/Home.css';

const Home = () => {
   const { getCases, cases } = useCasesStore((state) => ({
      ...state,
      history: history,
    }));

  const formatDate = (dateInput) => {
    const formattedDate = format(new Date(dateInput), 'dd/MM/yyyy');
    return formattedDate;
  }

  useEffect(() => {
    getCases()   
  }, []);

  return (
    <div className="container">
      <h1>Home</h1>
      {cases.map((legalCase) => (
        <div key={legalCase.idLegalCase} className="card">
          <h2>{legalCase.title}</h2>
          <p className="last-modified">Última modificación: {formatDate(legalCase.lastUpdate)}</p>
          <p>{legalCase.summary}</p>
          <p>{legalCase.crime}</p>
        </div>
      ))}
    </div>
  );
};

export default Home;
