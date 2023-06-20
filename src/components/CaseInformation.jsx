import { Link, useParams } from 'react-router-dom/';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import LoadingSpinner from './Loading';
import '../styles/CaseInformation.css';
import Navbar from './Navbar';
import { useCasesStore } from '../store/casesStore';
import { useCaseDetailsStore } from '../store/caseDetailsStore';
import { useCommentsStore } from '../store/commentsStore';
import CommentSection from './CommentSection';
import InstanceModal from './InstanceModal';
import ConfirmationModal from './ConfirmationModal';
import { set } from 'date-fns';
const CaseInformation = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  let { cases, getCases, isLawyer } = useCasesStore();
  const { getCaseDetails, caseId, setCaseId,status, getCaseInformation,caseDetails, handleUpdateCase  } = useCaseDetailsStore();
  const {comments,getCaseComments, handleComment, handleChange, totalPages, nextPage, previousPage, currentPage} = useCommentsStore();
  const {status: statusComments} = useCommentsStore();
  //const legalCase = cases.find((legalCase) => legalCase.idLegalCase == id);

  const [openModal, setOpenModal] = useState(false);
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
  
  const handleOpenModal = () => {
     setOpenModal(true);
  };
  const handleCloseModal = () => {
    setOpenModal(false);
  };

  
  if (!caseDetails) {
    return <p>Caso no encontrado {id} </p>;
  }

  return (
    <>
{openModal && (

<ConfirmationModal
  message="¿Está seguro que desea archivar este caso?"
  show={openModal}
  onConfirm={() => {
    handleUpdateCase(id);
    handleCloseModal();
    setTimeout(() => {
      navigate('/Home');
    }, 500);
  }}
  onCancel={handleCloseModal}
/>

)}

    
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
          <p className="card-description">Subcategoría: {caseDetails.crimeName}</p>
          <p className="card-description">Crimen: {caseDetails.subCategoryName}</p>
          
          <div>
          <p className="card-description">Resumen: {caseDetails.summary}</p></div>
          <div className="button-row">
  {isLawyer ? (
    <>
      <div className="row">
        <button className="card-button" onClick={() => navigate(`/RegisterFile/${caseId}`)}>
          Añadir al expediente
        </button>
      </div>
      <div className="row">
        <button className="card-button" onClick={() => handleOpenModal()}>
          Archivar Caso
        </button>
      </div>
    </>
  ) : null}

  {isLawyer && <InstanceModal></InstanceModal>}

  <button style={{ textDecoration: 'none' }}>

    <Link to={`/CaseDetails/${caseId}/CaseFile`} style={{ textDecoration: 'none', color: 'white'}}>Expediente</Link>
  </button>
</div>


        </div>
        <div className="expediente">
          <h4 className="expediente-title">Expediente</h4>
         
          
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
