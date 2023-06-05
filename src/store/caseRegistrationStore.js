import { create } from 'zustand';
import axios from 'axios';
import Format from 'date-fns/format';
export const useCaseStore = create((set, get) => ({
  formData: {
    userId: '',
    subCategoryId: '',
    provinceId: '1',
    crimeId: '',
    title: '',
    startDate: '',
    summary: '',
    contraparte: '',
    idInstance: '',
    startDateInstance: '',
    endDateInstance: '',
    lastUpdate: Format(Date.now(), 'dd-MM-yyyy'),
  },
  departmentId: '',
  departamentos: [],
  provincias: [],
  instancias: [],
  categorias: [],
  subCategorias: [],
  crimes: [],
  getIdFromToken: () => {
    const token = localStorage.getItem('token');
    if (token) {
       const payload = token.split('.')[1];
       const decodedPayload = atob(payload);
       
       //console.log(decodedPayload.split(',')[4].split(':')[1].split('}')[0]);
       const id = decodedPayload.split(',')[4].split(':')[1].split('}')[0];
       //console.log(id);
       return id;
    }
    return '';
 },
 handleChange: (field, event) => {
  const { name, value } = event.target;
  if (name === 'departmentId') {
    set((state) => ({
      ...state,
      departmentId: value,
      formData: {
        ...state.formData,
        [field]: value,
      },
    }));
  } else {
    set((state) => ({
      ...state,
      formData: {
        ...state.formData,
        [field]: value,
      },
    }));
  }


  console.log(get().formData); // Imprime el estado actualizado
},
  
  handleSubmit: async (event) => {
    event.preventDefault();
    const formData  = get().formData;

    try {
      const response = await axios.post('api/endpoint', formData);
      console.log(response);
      // Aquí puedes hacer algo con la respuesta, por ejemplo, mostrar un mensaje de éxito o redireccionar a otra página.
    } catch (error) {
      // Aquí puedes manejar el error, mostrar un mensaje de error, etc.
    }
  },
  registerCase: () => { 
    console.log(get().formData);
    const body = {
      "userId": get().formData.userId,
      "idSubCategory": get().formData.subCategoryId,
      "idProvince": get().formData.provinceId,
      "idCrime": get().formData.crimeId,
      "title": get().formData.title,
      "startDate": get().formData.startDate,
      "summary": get().formData.summary,
      "contrapart": get().formData.contraparte,
      "idInstance": get().formData.idInstance,
      "startDateInstance": get().formData.startDateInstance,
      "endDateInstance": get().formData.endDateInstance,
    };
    try{
      const response = axios.post('http://localhost:8080/api/v1/legalcase', body);
     console.log(response);
    } catch (error) {
      console.log(error);
      // Manejar el error
    }
  },
  loadDepartamentos: async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/v1/department');
      set((state) => ({
        ...state,
        departamentos: response.data.response,

        formData: {
          ...state.formData,
          userId: get().getIdFromToken(),
        },
      }));
  
      // Después de cargar los departamentos, obtenemos el id del primer departamento y cargamos sus provincias
      const firstDepartmentId = response.data.response[0].idDepartment;
      console.log(firstDepartmentId);

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
      set((state) => ({
        ...state,
        provincias: response.data.response,
        formData: {
          ...state.formData,
          provinceId: response.data.response[0].idProvince,
        },
      }));
    } catch (error) {
      // Manejar el error
    }
  },
  loadInstancias: async () => {
    try{
      const responseInstancias = await axios.get('http://localhost:8080/api/v1/legalcase/instance');
      set((state) => ({ instancias: responseInstancias.data.response }));
      console.log(responseInstancias.data.response);
      set((state) => ({formData: {...state.formData, idInstance: ''+responseInstancias.data.response[0].instanceId}}));
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
      if(response.data.response[0].idCategory) {
        set((state) => ({formData: {...state.formData, categoria: response.data.response[0].idCategory}}));
      }
      const firstCategoryId = response.data.response[0].categoryId;
      if (firstCategoryId) {
        get().loadSubCategorias(firstCategoryId);
      }
    } catch (error) {
      
      console.log(error);
      // Manejar el error
    }
  },
  loadSubCategorias: async (idCategoria) => {
    try {
      const response = await axios.get(`http://localhost:8080/api/v1/category/${idCategoria}/subcategory`);
      console.log(response.data.response);
      set((state) => ({
        ...state,
        subCategorias: response.data.response,
        formData: {
          ...state.formData,
          subCategoryId: response.data.response[0].idSubCategory,
        },
      }));
  
      const firstSubCategoryId = response.data.response[0].idSubCategory;
      if (firstSubCategoryId) {
        get().loadCrimes(firstSubCategoryId);
      }
    } catch (error) {
      // Manejar el error
    }
  },
  
  loadCrimes: async (idSubCategoria) => {
    try {
      const response = await axios.get(`http://localhost:8080/api/v1/subcategory/${idSubCategoria}/crime`);
      set((state) => ({
        ...state,
        crimes: response.data.response,
      }));
      set((state) => ({formData: {...state.formData, crimeId: response.data.response[0].crimeId}}));
    } catch (error) {
      // Manejar el error
    }
  },
  

}));

export default useCaseStore;
  