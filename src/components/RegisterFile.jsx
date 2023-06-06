import  { useState, useEffect, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import useStore from '../store/fileRegistrationStore';
import { useParams } from 'react-router-dom';
import '../styles/RegisterFile.css'; 
import { useCaseDetailsStore } from '../store/caseDetailsStore';
import {useNavigate} from 'react-router-dom';
const RegisterFile = () => {
  const navigate = useNavigate();
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
  const [fileName, setFileName] = useState('');

  useEffect(() => {
    getCourts();
    getDocumentTypes();
    setCaseId(caseIdParams);

    getInstanceId();
  }, [getCourts, getDocumentTypes, getInstanceId]);

  const onDrop = useCallback((acceptedFiles) => {
    setFile(acceptedFiles[0]);
    setFileName(acceptedFiles[0].name);
  }, [setFile]);
  
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const onSubmit = (event) => {
    event.preventDefault();
    uploadFile();
  }

  return (
    <div className='container'>
      <form onSubmit={onSubmit} className='register-file-form'>
        <h1>Añadir al expendiente del caso : {caseId}</h1>
        <label>Corte:</label>
        <select onChange={(e) => setSelectedCourt(parseInt(e.target.value))} disabled={loading} value={selectedCourt}>
          {courts.map(court => <option key={court.idCourt} value={court.idCourt}>{court.courtName}</option>)}
        </select>
        <label>Tipo de documento:</label>
        <select onChange={(e) => setSelectedDocumentType(parseInt(e.target.value))} disabled={loading} value={selectedDocumentType}>
          {documentTypes.map(type => <option key={type.typeId} value={type.typeId}>{type.name}</option>)}
        </select>
        <div {...getRootProps()} className="dropzone">
          <input {...getInputProps()} disabled={loading} />
          {isDragActive ?
            <p>Suelta el archivo aquí...</p> :
            <p>{fileName ? `Archivo seleccionado: ${fileName}` : "Arrastra algún archivo aquí, o haz clic para seleccionar archivo"}</p>
          }
        </div>
        <input type="text" value={summary} onChange={(e) => setSummary(e.target.value)} placeholder="Resumen" disabled={loading}  />
        <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} disabled={loading}  />
        <button type="submit" disabled={loading} >Enviar</button>
        {/* cuando se le de click a cancelar, vuelve a /home */}
        <button type="button" onClick={() => navigate('/Home')} disabled={loading} >Cancelar</button>

        {loading ? <p>Cargando... </p> : <p>{message}</p>}
      </form>
    </div>
  );
};

export default RegisterFile;
