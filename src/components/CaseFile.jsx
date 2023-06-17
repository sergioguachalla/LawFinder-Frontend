import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useCaseDetailsStore } from '../store/caseDetailsStore';

const CaseFile = () => {
   const navigate = useNavigate();
   const { getCaseDetails,caseDetails, caseId, setCaseId,status } = useCaseDetailsStore();
   const { id } = useParams();
   useEffect(() => {
      const token = localStorage.getItem('token');
      if(token){
         setCaseId(id);
         getCaseDetails(id);
      }else{
         navigate('/');
      }
       }, [caseId, getCaseDetails, id, setCaseId]);
       return (
         <div>
           <h1>CaseFile</h1>
           {caseDetails && caseDetails.length > 0 ? (
             caseDetails.map((link, index) => (
               <div className="card link-card" key={index}>
                 <a href={link} target="_blank" rel="noopener noreferrer">
                   <img
                     src="https://img.freepik.com/iconos-gratis/pdf_318-187733.jpg"
                     className="link-card-icon"
                     alt="pdf icon"
                   />
                   Documento #{index + 1}
                 </a>
                 <div>
                   <label>{link.split(',')[1].trim()}</label>
                 </div>
                 <div>
                   <label>{link.split(',')[2].trim()}</label>
                 </div>
               </div>
             ))
           ) : (
             <p>No hay archivos</p>
           )}
         </div>
       );
       
      
   
}

export default CaseFile;