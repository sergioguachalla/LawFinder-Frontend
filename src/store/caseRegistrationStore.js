import { create } from 'zustand';
import axios from 'axios';
import Format from 'date-fns/format';
import jwt_decode from 'jwt-decode';
import { delay } from 'framer-motion';

const API_URL = import.meta.env.VITE_API_URL;

export const useCaseStore = create((set, get) => ({

  clearFormData: () => set({
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
      lawyerEmail: '',
      customerEmail: '',
    },
    status: '',
  }),
  categoryId: 1,
  getSubCategoryId: () => get().formData.subCategoryId,
  getCategory: () => get().categoryId,
  setStatus: (status) => set({ status }),
  setCategoryId: (categoryId) => set({ categoryId }),
 
  
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

    } else if(name === 'categoryId') {
      set((state) => ({
        ...state,
        categoryId: value,
        
      }));
    }
    else {
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
      set({ status: 'success' });
      console.log(response);
    } catch (error) {
      set({ status: 'error' });
    }
  },
  registerCase: async () => { 
   
      if(get().formData.lawyerEmail == '' || get().formData.customerEmail == '' || get().formData.title == '' || 
    get().formData.summary == '' || get().formData.counterpart == '' || get().formData.startDate == '' || 
    get().formData.startDateInstance == '' || get().formData.endDateInstance == ''){
      set({ status: 'emptyForm' });
      return;
    }
  
  
    

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
      const response = await axios.post(`${API_URL}/legalcase`, body,{
        headers: {
          'Content-Type': 'application/json', 
          'Authorization': `Bearer ${token}` 
        }
      });
        set({status: 'success'});
     console.log(response);
    } catch (error) {
      console.log(error);
    }
  },
  loadDepartamentos: async () => {
    try {
      const response = await axios.get(`${API_URL}/department`);
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

      if (firstDepartmentId) {
        get().loadProvincias(firstDepartmentId);
      }
    } catch (error) {
      // Manejar el error
    }
  },
  
  loadProvincias: async (idDepartamento) => {
    try {
      const response = await axios.get(`${API_URL}/department/${idDepartamento}/province`);
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
      const responseInstancias = await axios.get(`${API_URL}/legalcase/instance`);
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
      const response = await axios.get(`${API_URL}/category`);
      // eslint-disable-next-line no-unused-vars
      set((state) => ({ categorias: response.data.response }));
      if(response.data.response[0].idCategory) {
        set((state) => ({formData: {...state.formData, categoria: response.data.response[0].idCategory}}));
      }
      const firstCategoryId = response.data.response[0].categoryId;
      //if (firstCategoryId) {
      //  get().loadSubCategorias(firstCategoryId);
      //}
    } catch (error) {
      
      console.log(error);
      // Manejar el error
    }
  },
  loadSubCategorias: async (idCategoria) => {
    console.log("idCategoria", idCategoria);
    try {
      const response = await axios.get(`${API_URL}/category/${idCategoria}/subcategory`,{
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
      const response = await axios.get(`${API_URL}/subcategory/${idSubCategoria}/crime`);
      set((state) => ({
        ...state,
        crimes: response.data.response,
      }));
      set((state) => ({formData: {...state.formData, crimeId: response.data.response[0].crimeId}}));
    } catch (error) {
      // Manejar el error
    }
  },


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
      const response = await axios.post(`${API_URL}/userverification`,{"email":email});
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
  