import { useNavigate } from 'react-router-dom';
import { create } from 'zustand';
import axios from 'axios';

const useCaseStore = create((set) => ({
  formData: {
    titulo: '',
    contraparte: '',
    fechaInicio: '',
    departamento: '',
    provincia: '',
    categoria: '',
    crimen: '',
    resumen: '',
  },
  departamentos: [],
  provincias: [],
  handleChange: (field, event) => {
    set((state) => ({
      formData: {
        ...state.formData,
        [field]: event.target.value,
      },
    }));
  },
  handleSubmit: async (event) => {
    event.preventDefault();

    const { formData } = useCaseStore.getState();

    try {
      const response = await axios.post('api/endpoint', formData);
      // Aquí puedes hacer algo con la respuesta, por ejemplo, mostrar un mensaje de éxito o redireccionar a otra página.
    } catch (error) {
      // Aquí puedes manejar el error, mostrar un mensaje de error, etc.
    }
  },
  loadDepartamentos: async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/v1/department');
      set((state) => ({ departamentos: response.data.response }));
    } catch (error) {
      // Manejar el error
    }
  },
  loadProvincias: async (idDepartamento) => {
    try {
      const response = await axios.get(`http://localhost:8080/api/v1/department/${idDepartamento}/province`);
      set((state) => ({ provincias: response.data.response }));
    } catch (error) {
      // Manejar el error
    }
  },
}));