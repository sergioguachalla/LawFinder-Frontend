import { Link, useParams } from 'react-router-dom/';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import LoadingSpinner from './Loading';
import '../styles/CaseInformation.css';
import Navbar from './Navbar';
import { useCasesStore } from '../store/casesStore';
import { useCaseDetailsStore } from '../store/caseDetailsStore';
import { useCommentsStore } from '../store/commentsStore';
import CommentSection from './CommentSection';
import InstanceModal from './InstanceModal';
const CaseInformation = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  let { cases, getCases, isLawyer, isClient } = useCasesStore();
  const { getCaseDetails, caseId, setCaseId,status, getCaseInformation,caseDetails, handleUpdateCase  } = useCaseDetailsStore();
  const {comments,getCaseComments, handleComment, handleChange, totalPages, nextPage, previousPage, currentPage} = useCommentsStore();
  const {status: statusComments} = useCommentsStore();
  //const legalCase = cases.find((legalCase) => legalCase.idLegalCase == id);


  useEffect(() => {
    const token = localStorage.getItem('token');
    if(token){
      setCaseId(id);
      cases = getCases();
      getCaseInformation(id);
     
      setTimeout(() => {
      getCaseComments(id);
      }, 1000);
      
      //getCaseDetails(id);
    }else{
      navigate('/');
    }
   }, [caseId, getCaseDetails, id, setCaseId, handleComment, currentPage]);
  
 

  
  if (!caseDetails) {
    return <p>Caso no encontrado {id} </p>;
  }

  return (
    <>
     {status === 'loading' || status ==='init' && <LoadingSpinner/>}
    <div className="legal-case-details">
      <Navbar></Navbar>
      <div className="legal-case-details container">
        <div className="card" style={{ width: '100%', maxWidth: '800px' }}>
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
          {isLawyer && <button onClick={() => {handleUpdateCase(id)}}>Archivar Caso</button>}
          {isLawyer && <InstanceModal></InstanceModal>}
        </div>
        <div className="expediente">
          <h4 className="expediente-title">Expediente</h4>
          <Link to={`/CaseDetails/${caseId}/CaseFile`}>Expediente</Link>
          
          
        </div>
        {statusComments === 'loading' || status ==='init' && <LoadingSpinner/>}
        <CommentSection
      comments={comments}/>
      
      </div>
     

      </div>
    </>
  );
};

export default CaseInformation;
