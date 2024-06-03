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
  const { getCaseDetails, caseId, setCaseId,status, getCaseInformation,caseDetails, handleUpdateCase,sendInvitation  } = useCaseDetailsStore();
  const {comments,getCaseComments, handleComment, handleChange, totalPages, nextPage, previousPage, currentPage} = useCommentsStore();
  const {status: statusComments} = useCommentsStore();
  //const legalCase = cases.find((legalCase) => legalCase.idLegalCase == id);
  
  const [lawyerEmail, setLawyerEmail] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');

  const handleInviteLawyer = () => {
    sendInvitation(id, lawyerEmail, 'lawyer');
  };

  const handleInviteCustomer = () => {
    sendInvitation(id, customerEmail, 'customer');
  };


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
    {/*isLawyer ? () ) : null*/}

  {isLawyer && <InstanceModal></InstanceModal>}

  <button style={{ textDecoration: 'none' }}>

    <Link to={`/CaseDetails/${caseId}/CaseFile`} style={{ textDecoration: 'none', color: 'white'}}>Expediente</Link>
  </button>
</div>


        </div>
        <div className="expediente">
          <h4 className="expediente-title">Expediente</h4>
         
          
        </div>
        <hr />
        <h2>Actores</h2>
        <div className="form-row-rc">
      <div className="form-field-invitation-rc">
        <label>Invitar abogado *</label>
        <input 
          name="lawyerEmail" 
          type="text" 
          value={lawyerEmail} 
          onChange={(e) => setLawyerEmail(e.target.value)} 
        />
        <button type="button" onClick={handleInviteLawyer}>Enviar invitación</button>
        {status === 'lawyerNotFound' && <p>Abogado no registrado</p>}
        {status === 'lawyerFound' && <p>Invitación enviada a {lawyerEmail} </p>}
      </div>
      <div className="form-field-invitation-rc">
        <label>Invitar cliente *</label>
        <input 
          name="customerEmail" 
          type="text" 
          value={customerEmail} 
          onChange={(e) => setCustomerEmail(e.target.value)} 
        />
        <button type="button" onClick={handleInviteCustomer}>Enviar invitación</button>
        {status === 'customerNotFound' && <p>Cliente no registrado</p>}
        {status === 'customerFound' && <p>Invitación enviada a {customerEmail} </p>}
      </div>
    </div>
        <hr />
        {statusComments === 'loading' || status ==='init' && <LoadingSpinner/>}
        <CommentSection
      comments={comments}/>
      
      </div>
     

      </div>
    </>
  );
};

export default CaseInformation;
