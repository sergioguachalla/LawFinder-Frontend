import { create } from 'zustand';
import axios from 'axios';
import jwt_decode from "jwt-decode";
import { getRoleFromToken } from '../utils/getIdFromToken';
export const useCasesStore = create((set, get) => ({
  formData: {
    legalCaseId: '',
    userId: '',
    title: '',
    startDate:'',
    summary:'',
    crimeId:'',
    provinceId:'',
    status:true,
    lastUpdate:'',
  },
  isLawyer: false,
  isClient: false,
  cases: [],
  caseId: '',
  id: '',
  status: 'init',
  currentPage: 0,
  totalPages: 0,
  fromDate: '', 
  toDate: '',
  instances: [], 
  instanceId: '',
  inProgress: 'false',
  searchTitle: '', 
  categories: [], 
  categoryId: '',

  handleChange: (field, event) => {
    set((state) => ({
      formData: {
        ...state.formData,
        [field]: event.target.value,
      },
    }));
  },
  
  // current page lo puse ahi para que reinicie la paginacion cuando se filtra
  // ya que si no hay tantos casos como para esa pagina, no se muestra nada
  setFromDate: date => set({ fromDate: date, currentPage: 0 }), 
  setToDate: date => set({ toDate: date, currentPage: 0 }), 
  setInstanceId: id => set({ instanceId: id, currentPage: 0 }), 
  setSearchTitle: title => set({ searchTitle: title, currentPage: 0 }), 
  setCategoryId: id => set({ categoryId: id, currentPage: 0 }), 

  getCategories: async () => {
    try {
      const response = await axios.get(`${process.env.API_URL}/category`);
      if (response.data.code === '0000') {
        set({ categories: response.data.response });
      }
    } catch (error) {
      console.error('Error fetching categories', error);
    }
  },
  getInstances: async () => {
    try {
      const response = await axios.get(`${process.env.API_URL}/legalcase/instance`);
      if (response.data.code === '0000') {
        set({ instances: response.data.response });
      }
    } catch (error) {
      console.error('Error fetching instances', error);
    }
  },

  handleRoles: () => {
    const role = [...getRoleFromToken()];
    if (role.includes('CREATE_CASE') || role.includes('VIEW_CASE')) {
      set(() => ({ isLawyer: true }));
    }
    if (role.includes('DELETE_CASE')) {
      set(() => ({ isLawyer: false }));
      set(() => ({ isClient: true }));
    }
  },

  getIdFromToken: () => {
    const token = localStorage.getItem('token');
    const decoded = jwt_decode(token);
    return decoded.userId;
   
  },
  
  getCases: async () => {
    get().handleRoles();
    set(() => ({ id: get().getIdFromToken() }));
    try {
      set(() => ({ status: 'loading' }));
      const page = get().currentPage;
      set(() => ({ currentPage: page }) );
      const response = await axios.get(`${API_URL}/legalcase/user/${get().id}`, {
        params: {
          page: get().currentPage,
          size: 2, // Tamaño de página
          from: get().fromDate,
          to: get().toDate,
          instanceId: get().instanceId,
          categoryId: get().categoryId,
          inProgress: get().inProgress,  
          title: get().searchTitle,
        },
        
      });

      if(response.data.response.content.length > 0){
        const casesPage = response.data.response;
        set(() => ({ cases: casesPage.content }));
        set(() => ({
          caseId: casesPage.content[0].legalCaseId,
          currentPage: casesPage.number,
          totalPages: casesPage.totalPages,
        }));
      }
  
      if (response.data.response.content.length === 0) {
        set({ status: 'empty' });
      } else {
        set({ status: 'success' });
      }
    } catch (error) {
      console.log(error);
      set({ status: 'error' });
    }
  },
  
  nextPage: () => {
    if (get().currentPage < get().totalPages - 1) {
      set((state) => ({ currentPage: state.currentPage + 1 }));
      const searchParams = new URLSearchParams(location.search);
      searchParams.set("page", String(get().currentPage + 1));
    }
  },
  
  previousPage: () => {
    if (get().currentPage > 0) {
      set((state) => ({ currentPage: state.currentPage - 1 }));
      const searchParams = new URLSearchParams(location.search);
      searchParams.set("page", String(get().currentPage - 1));
    }
  },
  clearFilters: () => {
    set(() => ({
      fromDate: '',
      toDate: '',
      instanceId: '', 
      searchTitle: '',
      categoryId: '',
      currentPage: 0,
      
    }));
  },

  
}));
