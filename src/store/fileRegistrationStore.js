import axios from 'axios';
import {create} from 'zustand';
import { configDotenv } from 'dotenv';

const API_URL = import.meta.env.VITE_API_URL;

export const useStore = create((set, get) => ({
  loading: false,
  message: '',
  summary: '',
  dueDate: '',
  file: null,
  courts: [],
  documentTypes: [],
  selectedCourt: '',
  selectedDocumentType: '',
  caseId: localStorage.getItem('caseId'),
  instanceId: '',
  setSummary: (summary) => set({ summary }),
  setDueDate: (dueDate) => set({ dueDate }),
  setFile: (file) => set({ file }),
  setCaseId: (caseId) => set({ caseId }),
  setSelectedCourt: (court) => set({ selectedCourt: court }),
  setSelectedDocumentType: (type) => set({ selectedDocumentType: type }),
  getCourts: async () => {
    set({caseId: localStorage.getItem('caseId')})
    const response = await axios.get(`${API_URL}/Court`);
    set({ courts: response.data.response });
    console.log("caseid" + get().caseId);
  },
  getDocumentTypes: async () => {
    const response = await axios.get(`${API_URL}/LegalType`);
    set({ documentTypes: response.data.response });
  },
  uploadFile: async () => {
    if (get().file === null) {
      set({ message: 'Por favor, selecciona un archivo.' });
      return;
    }
    set({ loading: true, message: '' });
    const formData = new FormData();
    // aqui se pone el id del instance legal case

    formData.append('instanceCaseId', get().instanceId);
    formData.append('file', get().file);
    formData.append('summary', get().summary);
    formData.append('dueDate', get().dueDate);
    formData.append('courtId', get().selectedCourt ? get().selectedCourt : '1');
    formData.append('documentTypeId', get().selectedDocumentType ? get().selectedDocumentType : '1');
    //formData.append('courtId', get().selectedCourt); // Agregamos courtId a la FormData
    //formData.append('documentTypeId', get().selectedDocumentType); // Agregamos documentTypeId a la FormData
   
    console.log(formData);

    try {
      const response = await axios.post(`${API_URL}/legalfile`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${localStorage.getItem('token')}`

        }
      });
      set({ loading: false, message: 'Archivo cargado con éxito: ' + response.data });
    } catch (error) {
      set({ loading: false, message: 'Error al cargar el archivo: ' + error.message });
    }
  },
  getInstanceId: async () => {
    const response = await axios.get(`${API_URL}/instanceLegal/${localStorage.getItem('caseId')}`);
    console.log(response.data.response.instanceId);
    set({ instanceId: response.data.response.instanceLegalCaseId });
  }
}));

export default useStore;
