import { create } from 'zustand';
import axios from 'axios';
import Format from 'date-fns/format';
import jwt_decode from 'jwt-decode';
export const useCaseStore = create((set, get) => ({
 
  formData: {
    userId: '',
    subCategoryId: '',
    provinceId: '1',
    crimeId: '',
    title: '',
    startDate: '',
    summary: '',
    idInstance: '',
    startDateInstance: '',
    endDateInstance: '',
    lastUpdate: Format(Date.now(), 'dd-MM-yyyy'),
    complainant: true,
    counterpart: '',
  },
  departmentId: '',
  status: '',
  departamentos: [],
  provincias: [],
  instancias: [],
  categorias: [],
  subCategorias: [],
  crimes: [],
  lawyerEmail: '',
  customerEmail: '',
  getIdFromToken: () => {
    const token = localStorage.getItem('token');
    const decoded = jwt_decode(token);
    return decoded.userId;
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
    }));}
    else if (name === 'lawyerEmail') {
      set((state) => ({
        ...state,
        lawyerEmail: value,
        formData: {
          ...state.formData,
          [field]: value,
        },
      }));
    }
    else if(name === 'customerEmail'){
      set((state) => ({
        ...state,
        customerEmail: value,
        formData: {
          ...state.formData,
          [field]: value,
        },
      }));
    }else {
    set((state) => ({
      ...state,
      status: value,
      formData: {
        ...state.formData,
        [field]: value,
      },
    }));
  }


  console.log(get().formData);
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
    const token = localStorage.getItem('token');
    console.log(get().formData);
    const body = {
      "userId": get().getIdFromToken(),
      "idSubCategory": get().formData.subCategoryId,
      "idProvince": get().formData.provinceId,
      "idCrime": get().formData.crimeId,
      "title": get().formData.title,
      "startDate": get().formData.startDate,
      "summary": get().formData.summary,
      "idInstance": get().formData.idInstance,
      "startDateInstance": get().formData.startDateInstance,
      "endDateInstance": get().formData.endDateInstance,
      "complainant": true,
      "counterpartName": get().formData.counterpart,
    };
    try{
      const response = axios.post('http://localhost:8080/api/v1/legalcase', body,{
        headers: {
          'Content-Type': 'application/json', 
          'Authorization': `Bearer ${token}` 
        }
      });
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
      set(() => ({ instancias: responseInstancias.data.response }));
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
      // eslint-disable-next-line no-unused-vars
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
      const response = await axios.get(`http://localhost:8080/api/v1/category/${idCategoria}/subcategory`,{
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }

      });
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

<<<<<<< HEAD
  addCounterpart: (value) => {
    
    set((state) => ({
      ...state,
      formData: {
        ...state.formData,
        contraparte: [...state.formData.contraparte, value],
      },
    }));
  },

  printCounterpart:() =>{
    console.log(get().formData.contraparte);
  },
=======
>>>>>>> e71582e315fce39488be94edd90c407e64c1e23b

  handleInvitation: async (param) => {
    try{
      let email = "";
      if(param == "lawyer"){
        email = get().formData.lawyerEmail;
      }
      else{
        email = get().formData.customerEmail;
      }
      console.log(email);
      const response = await axios.post(`http://localhost:8080/api/v1/userverification`,{"email":email});
      console.log(response);
      if(response.data.response == "User Does Not Exist"){
        set(() => ({status : param+"NotFound"}));
      }
      else if(response.data.response == "User Already Exists"){
        set(() => ({status : param+"Found"}));

       
      }  
   
    } catch (error) {
      console.log(error);
      // Manejar el error
    }
  }
  

}));

export default useCaseStore;
  