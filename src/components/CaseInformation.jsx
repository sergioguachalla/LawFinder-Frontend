import { useParams } from 'react-router-dom/';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/CaseInformation.css';
import Navbar from './Navbar';
import { useCasesStore } from '../store/casesStore';
import { useCaseDetailsStore } from '../store/caseDetailsStore';

const CaseInformation = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { cases } = useCasesStore();
  const { getCaseDetails, caseDetails, caseId, setCaseId } = useCaseDetailsStore();
  const legalCase = cases.find((legalCase) => legalCase.idLegalCase == id);

  useEffect(() => {
    setCaseId(id);
    getCaseDetails(id);
  }, [caseId, getCaseDetails, id]);

  if (!legalCase) {
    return <p>Caso no encontrado {id}</p>;
  }

  return (
    <>
      <Navbar></Navbar>
      <div className="legal-case-details container">
        <div className="card">
          <h2 className="card-title">Caso #{id}</h2>
          <h3 className="card-subtitle">{legalCase.title}</h3>
          <p className="card-description">{legalCase.summary}</p>
          <button className="card-button" onClick={() => navigate(`/RegisterFile/${caseId}`)}>Editar Expediente del Caso {caseId}</button>
        </div>
        <div className="expediente">
          <h4 className="expediente-title">Expediente</h4>
          {caseDetails && caseDetails.map((link, index) => (
            <div className="card link-card" key={index}>
              <a href={link} target="_blank" rel="noopener noreferrer">
                <img src="https://img.freepik.com/iconos-gratis/pdf_318-187733.jpg" className="link-card-icon" alt="pdf icon"/>
                Documento #{index + 1}
              </a>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default CaseInformation;
