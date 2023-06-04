import { create } from 'zustand';
import axios from 'axios';

export const useCaseStore = create((set, get) => ({
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
  instancias: [],
  categorias: [],
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

    const { formData } = get();

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

      // Después de cargar los departamentos, obtenemos el id del primer departamento y cargamos sus provincias
      const firstDepartmentId = response.data.response[0].idDepartment;
      if (firstDepartmentId) {
        get().loadProvincias(firstDepartmentId);
      }
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
  loadInstancias: async () => {
    try{
      const responseInstancias = await axios.get('http://localhost:8080/api/v1/legalcase/instance');
      set((state) => ({ instancias: responseInstancias.data.response }));
      console.log(responseInstancias.data.response);
      //console.log(get().state.instancias + " sssdasdasasdsa");

    } catch (error) {
      console.log(error);
      // Manejar el error
    }

  },
  loadCategorias: async () => {
    try{
      const response = await axios.get('http://localhost:8080/api/v1/category');
      set((state) => ({ categorias: response.data.response }));
    } catch (error) {
      console.log(error);
      // Manejar el error
    }
  }
}));

export default useCaseStore;
  