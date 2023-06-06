import React, { useEffect } from 'react';
import useStore from '../store/fileRegistrationStore';
import { useParams } from 'react-router-dom';
import '../styles/RegisterFile.css'; 
import { useCaseDetailsStore } from '../store/caseDetailsStore';

const RegisterFile = () => {
  const {caseIdParams} = useParams();
  const { 
    uploadFile, 
    loading, 
    message, 
    summary, 
    setSummary, 
    dueDate, 
    setDueDate, 
    setFile, 
    courts, 
    getCourts, 
    documentTypes, 
    getDocumentTypes, 
    selectedCourt, 
    setSelectedCourt, 
    selectedDocumentType, 
    setSelectedDocumentType,
    getInstanceId ,
    setCaseId
  } = useStore();
  const { caseId } = useCaseDetailsStore();
  useEffect(() => {
    getCourts();
    getDocumentTypes();
    setCaseId(caseIdParams);

    getInstanceId();
    console.log("register" + caseIdParams);
  }, [caseIdParams, getCourts, getDocumentTypes, getInstanceId, setCaseId]);

  const onFileChange = (event) => {
    const file = event.target.files[0];
    setFile(file);
  }

  const onSubmit = (event) => {
    event.preventDefault();
    uploadFile();
  }

  return (
    <form onSubmit={onSubmit} className='register-file-form'>
      <h1>Usted está editando el caso : {caseId}</h1>
      <label>Corte:</label>
      <select onChange={(e) => setSelectedCourt(parseInt(e.target.value))} disabled={loading} value={selectedCourt}>
        {courts.map(court => <option key={court.idCourt} value={court.idCourt}>{court.courtName}</option>)}
      </select>
      <label>Tipo de documento:</label>
      <select onChange={(e) => setSelectedDocumentType(parseInt(e.target.value))} disabled={loading} value={selectedDocumentType}>
        {documentTypes.map(type => <option key={type.typeId} value={type.typeId}>{type.name}</option>)}
      </select>
      <input type="file" onChange={onFileChange} disabled={loading} />
      <input type="text" value={summary} onChange={(e) => setSummary(e.target.value)} placeholder="Resumen" disabled={loading}  />
      <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} disabled={loading}  />
      <button type="submit" disabled={loading} >Enviar</button>
      {loading ? <p>Cargando...</p> : <p>{message}</p>}
    </form>
  );
};

export default RegisterFile;
