import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useCaseDetailsStore } from '../store/caseDetailsStore';
import { useCaseFilesStore } from '../store/caseFilesStore';
import MyAccordion from './MyAccordion';
import Navbar from './Navbar';
const CaseFile = () => {
   const navigate = useNavigate();
   const {preliminarCases, getPreliminarCases, sentenceCases, getSentenceCases, investigationCases, getInvestigationCases} = useCaseFilesStore();
   const { getCaseDetails, caseId, setCaseId } = useCaseDetailsStore();
   const { id } = useParams();
   useEffect(() => {
      const token = localStorage.getItem('token');
      if(token){
        setCaseId(id);
        getInvestigationCases(id);
        getPreliminarCases(id);
        getSentenceCases(id);
                
      }else{
         navigate('/');
      }
       }, [caseId, getCaseDetails, getPreliminarCases, getSentenceCases, id, navigate, setCaseId]);
       return (
        <div>
          <Navbar />
          <h1>Expediente del caso #{caseId}</h1>
          {preliminarCases && preliminarCases.length > 0 || sentenceCases && sentenceCases.length > 0 || investigationCases && investigationCases.length > 0 ? (
            <div>
              <MyAccordion title={'Instancia Preliminar'} items={preliminarCases} />
              <MyAccordion title={'Instancia de Sentencia'} items={sentenceCases} />
              <MyAccordion title={'Instancia de Investigación'} items={investigationCases} />
            </div>
          ) : (
            <p>No hay archivos</p>
          )}
        </div>
      );
      
       
      
   
}

export default CaseFile;