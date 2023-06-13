import { useParams } from 'react-router-dom/';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import LoadingSpinner from './Loading';
import '../styles/CaseInformation.css';
import Navbar from './Navbar';
import { useCasesStore } from '../store/casesStore';
import { useCaseDetailsStore } from '../store/caseDetailsStore';
const CaseInformation = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  let { cases,getCases } = useCasesStore();
  const { getCaseDetails,caseDetails, caseId, setCaseId,status } = useCaseDetailsStore();
  const legalCase = cases.find((legalCase) => legalCase.idLegalCase == id);
  useEffect(() => {
    setCaseId(id);
    cases = getCases();

       getCaseDetails(id);
       //console.log("detail case" + caseId);
   }, [caseId, getCaseDetails, id, setCaseId]);

  
  if (!legalCase) {
    return <p>Caso no encontrado {id} </p>;
  }

  return (
    <>
     {status === 'loading' || status ==='init' && <LoadingSpinner/>}
    <div className="legal-case-details">
      <Navbar></Navbar>
      <div className="legal-case-details container">
        <div className="card">
          <h2 className="card-title">Caso # {status}{id}</h2>
          <h3 className="card-subtitle">{legalCase.title}</h3>
          <p className="card-description">{legalCase.summary}</p>
          <button className="card-button" onClick={() => navigate(`/RegisterFile/${caseId}`)}>Añadir al expediente del caso {caseId}</button>
        </div>
        <div className="expediente">
          <h4 className="expediente-title">Expediente</h4>
          {caseDetails && caseDetails.map((link, index) => (
            <div className="card link-card" key={index}>
              <a href={link} target="_blank" rel="noopener noreferrer">
                <img src="https://img.freepik.com/iconos-gratis/pdf_318-187733.jpg" className="link-card-icon" alt="pdf icon"/>
                Documento #{index + 1}
              </a>
              <div>
              <label>
                {link.split(',')[1].trim()}
              </label>
              </div>
              <div>
              <label>
                {link.split(',')[2].trim()}
              </label>
              </div>
            </div>
          ))}
        </div>
      </div>

      </div>
    </>
  );
};

export default CaseInformation;
