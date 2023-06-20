import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useCaseDetailsStore } from '../store/caseDetailsStore';
import { useCaseFilesStore } from '../store/caseFilesStore';
import MyAccordion from './MyAccordion';
import Navbar from './Navbar';
import styled from 'styled-components';

const AccordionContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

const AccordionWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
`;

const CenteredHeading = styled.h1`
  text-align: center;
  padding: 20px;
`;

const CaseFile = () => {
  const navigate = useNavigate();
  const { preliminarCases, getPreliminarCases, sentenceCases, getSentenceCases, investigationCases, getInvestigationCases } = useCaseFilesStore();
  const { getCaseDetails, caseId, setCaseId } = useCaseDetailsStore();
  const { id } = useParams();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setCaseId(id);
      getInvestigationCases(id);
      getPreliminarCases(id);
      getSentenceCases(id);
    } else {
      navigate('/');
    }
  }, [caseId, getCaseDetails, getPreliminarCases, getSentenceCases, id, navigate, setCaseId]);

  return (
    <>
      <Navbar />
      <CenteredHeading>Expediente del caso #{caseId}</CenteredHeading>
      <AccordionContainer>
        {preliminarCases && preliminarCases.length > 0 || sentenceCases || sentenceCases.length > 0 || investigationCases|| investigationCases.length > 0 ? (
          <AccordionWrapper>
            <MyAccordion title={'Instancia Preliminar'} items={preliminarCases} />
            <MyAccordion title={'Instancia de Sentencia'} items={sentenceCases} />
            <MyAccordion title={'Instancia de Investigación'} items={investigationCases} />
          </AccordionWrapper>
        ) : (
          <p>No hay archivos</p>
        )}
      </AccordionContainer>
    </>
  );
};

export default CaseFile;
