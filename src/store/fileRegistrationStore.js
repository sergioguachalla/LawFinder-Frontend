import axios from 'axios';
import create from 'zustand';

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
  setSummary: (summary) => set({ summary }),
  setDueDate: (dueDate) => set({ dueDate }),
  setFile: (file) => set({ file }),
  setSelectedCourt: (court) => set({ selectedCourt: court }),
  setSelectedDocumentType: (type) => set({ selectedDocumentType: type }),
  getCourts: async () => {
    const response = await axios.get('http://localhost:8080/api/v1/Court');
    set({ courts: response.data.response });
  },
  getDocumentTypes: async () => {
    const response = await axios.get('http://localhost:8080/api/v1/LegalType');
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

    formData.append('instanceCaseId', 1);
    formData.append('file', get().file);
    formData.append('summary', get().summary);
    formData.append('dueDate', get().dueDate);
    formData.append('courtId', get().selectedCourt ? get().selectedCourt : '1');
    formData.append('documentTypeId', get().selectedDocumentType ? get().selectedDocumentType : '1');
    //formData.append('courtId', get().selectedCourt); // Agregamos courtId a la FormData
    //formData.append('documentTypeId', get().selectedDocumentType); // Agregamos documentTypeId a la FormData
    console.log("a");
    console.log(get().selectedCourt);
    try {
      const response = await axios.post('http://localhost:8080/api/v1/legalfile', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      set({ loading: false, message: 'Archivo cargado con éxito: ' + response.data });
    } catch (error) {
      set({ loading: false, message: 'Error al cargar el archivo: ' + error.message });
    }
  }
}));

export default useStore;
