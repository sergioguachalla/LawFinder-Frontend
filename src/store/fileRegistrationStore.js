import axios from 'axios';
import create from 'zustand';

export const useStore = create((set, get) => ({
  loading: false,
  message: '',
  summary: '',
  dueDate: '',
  file: null,
  setSummary: (summary) => set({ summary }),
  setDueDate: (dueDate) => set({ dueDate }),
  setFile: (file) => set({ file }),
  uploadFile: async () => {
    if (get().file === null) {
      set({ message: 'Por favor, selecciona un archivo.' });
      return;
    }
    set({ loading: true, message: '' });
    const formData = new FormData();
    formData.append('file', get().file);
    formData.append('summary', get().summary);
    formData.append('dueDate', get().dueDate);
    try {
      const response = await axios.post('http://localhost:8080/upload', formData, {
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
