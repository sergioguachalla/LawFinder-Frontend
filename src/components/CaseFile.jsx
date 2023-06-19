import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useCaseDetailsStore } from '../store/caseDetailsStore';
import { useCaseFilesStore } from '../store/caseFilesStore';
import MyAccordion from './MyAccordion';

const CaseFile = () => {
   const navigate = useNavigate();
   const {caseFilesInfo, getFilesInfo} = useCaseFilesStore();
   const { getCaseDetails, caseId, setCaseId } = useCaseDetailsStore();
   const { id } = useParams();
   useEffect(() => {
      const token = localStorage.getItem('token');
      if(token){
        setCaseId(id);
       
        getFilesInfo(id);
                
      }else{
         navigate('/');
      }
       }, [caseId, getCaseDetails, getFilesInfo, id, navigate, setCaseId]);
       return (
         <div>
           <h1>CaseFile</h1>
           {caseFilesInfo && caseFilesInfo.length == 0 ? (
              <p>No Existen Archivos</p>
           ) : (
             <p>No hay archivos</p>
           )} <MyAccordion
           title={'Instancia Preliminar'} 
           items={caseFilesInfo}></MyAccordion>
           <MyAccordion
            title={'Instancia de Juicio'}
            items={caseFilesInfo}></MyAccordion>  
         </div>
        
       );
       
      
   
}

export default CaseFile;