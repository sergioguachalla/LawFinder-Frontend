import { Link, useParams } from 'react-router-dom/';
import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import LoadingSpinner from './Loading';
import '../styles/CaseInformation.css';
import Navbar from './Navbar';
import { useCasesStore } from '../store/casesStore';
import { useCaseDetailsStore } from '../store/caseDetailsStore';
const CaseInformation = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  let { cases, getCases, isLawyer, isClient } = useCasesStore();
  const { getCaseDetails, caseId, setCaseId,status, getCaseInformation,caseDetails, caseComments, getCaseComments } = useCaseDetailsStore();
  //const legalCase = cases.find((legalCase) => legalCase.idLegalCase == id);


  useEffect(() => {
    const token = localStorage.getItem('token');
    if(token){
      setCaseId(id);
      cases = getCases();
      getCaseInformation(id);
      getCaseComments(id);
      
      //getCaseDetails(id);
    }else{
      navigate('/');
    }
   }, [caseId, getCaseDetails, id, setCaseId]);

  
  if (!caseDetails) {
    return <p>Caso no encontrado {id} </p>;
  }

  return (
    <>
     {status === 'loading' || status ==='init' && <LoadingSpinner/>}
    <div className="legal-case-details">
      <Navbar></Navbar>
      <div className="legal-case-details container">
        <div className="card">
          <h2 className="card-title">Caso # {id}</h2>
        
          <h3 className="card-subtitle">Título del caso: {caseDetails.title}</h3>
          
          <p className="card-description">Provincia: {caseDetails.provinceName}</p>
          <p className="card-description">Caso registrado por: {caseDetails.username}</p>
          <p className="card-description">Última modificación: {caseDetails.txDate}</p>
          <p className="card-description">Instancia del Caso: {caseDetails.instanceName}</p>
          <p className="card-description">Crimen: {caseDetails.crimeName}</p>
          <div>
          <p className="card-description">Resumen: {caseDetails.summary}</p></div>
          {isLawyer ? <button className="card-button" onClick={() => navigate(`/RegisterFile/${caseId}`)}>Añadir al expediente del caso {caseId}</button> : null }
         
        </div>
        <div className="expediente">
          <h4 className="expediente-title">Expediente</h4>
          <Link to={`/CaseDetails/${caseId}/CaseFile`}>Expediente</Link>
          
          
        </div>

        <div className="comment-container">
          <h4 className="comment-title">Comentarios</h4>
          <div className="comment">
            {/*TODO: COMENTARIOS*/}
            <p className="comment-user">Usuario</p>
            {caseComments.map((comment) => (
  <div className="comment" key={comment.commentId}>
    <p className="comment-user">{comment.actorId}</p>
    <p className="comment-text">{comment.commentContent}</p>
  </div>
))}

          </div>
          <input className="comment-input" type="text" placeholder="Escribe un comentario"></input>
        </div>
      </div>

      </div>
    </>
  );
};

export default CaseInformation;
