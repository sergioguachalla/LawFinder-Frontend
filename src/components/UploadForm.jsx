import React from 'react';
import useStore from '../store/fileRegistrationStore';


const UploadForm = () => {
  const { uploadFile, loading, message, summary, setSummary, dueDate, setDueDate, setFile } = useStore();

  const onFileChange = (event) => {
    const file = event.target.files[0];
    setFile(file);
  }

  const onSubmit = (event) => {
    event.preventDefault();
    uploadFile();
  }

  return (
    <form onSubmit={onSubmit}>
      <input type="file" onChange={onFileChange} disabled={loading} />
      <input type="text" value={summary} onChange={(e) => setSummary(e.target.value)} placeholder="Resumen" disabled={loading} />
      <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} disabled={loading} />
      <button type="submit" disabled={loading}>Enviar</button>
      {loading ? <p>Cargando...</p> : <p>{message}</p>}
    </form>
  );
};

export default UploadForm;
