import { Link, useParams } from 'react-router-dom/';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import LoadingSpinner from './Loading';
import '../styles/CaseInformation.css';
import Navbar from './Navbar';
import { useCasesStore } from '../store/casesStore';
import { useCaseDetailsStore } from '../store/caseDetailsStore';
import { useCommentsStore } from '../store/commentsStore';
const CaseInformation = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  let { cases, getCases, isLawyer, isClient } = useCasesStore();
  const { getCaseDetails, caseId, setCaseId,status, getCaseInformation,caseDetails  } = useCaseDetailsStore();
  const {comments,getCaseComments, handleComment, handleChange} = useCommentsStore();
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
   }, [caseId, getCaseDetails, id, setCaseId, handleComment]);
  
 
  const handleSubmitComment = (event) => {
    event.preventDefault();
    handleComment(event);
  }
  
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
            {comments.map((comment) => (
        <div className="comment" key={comment.commentId}>
            <p className="comment-user" key={comment.commentId}>{comment.userName}</p>
            <p className="comment-text">{comment.commentContent}</p>
        </div>))}   
        <button className="comment-button" onClick={handleSubmitComment} >Comentar</button>  


          </div>
          <input className="comment" type="text" placeholder="Escribe un comentario" onChange={(e) => handleChange("comment",e)}></input>
        </div>
      </div>

      </div>
    </>
  );
};

export default CaseInformation;
