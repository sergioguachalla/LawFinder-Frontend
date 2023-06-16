import { create } from 'zustand';
import axios from 'axios';

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
  inProgress: "", 

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
  setInProgress: inProgress => set({ inProgress: inProgress, currentPage: 0 }), 

  getInstances: async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/v1/legalcase/instance');
      if (response.data.code === '0000') {
        set({ instances: response.data.response });
      }
    } catch (error) {
      console.error('Error fetching instances', error);
    }
  },

  getIdFromToken: () => {
    const token = localStorage.getItem('token');
    if(token) {
      const payload = token.split('.')[1];
      const decodedPayload = atob(payload);
      const id = decodedPayload.split(',')[5].split(':')[1].split('}')[0];
      console.log(id);
      return id;
    }
    return '';
  },
  
  getCases: async () => {
    set(() => ({ id: get().getIdFromToken() }));
    try {
      set(() => ({ status: 'loading' }));
      const page = get().currentPage;
      set(() => ({ currentPage: page }) );
  
      const response = await axios.get(`http://localhost:8080/api/v1/legalcase/user/${get().id}`, {
        params: {
          page: get().currentPage,
          size: 2, // Tamaño de página
          from: get().fromDate,
          to: get().toDate,
          instanceId: get().instanceId,
          inProgress: get().inProgress,
        },
        
      });
      console.log(get().inProgress + "a");

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
      inProgress: null,
      currentPage: 0,
    }));
  },
  archiveCase: async (caseId) => {
    try {
      const response = await axios.put(`http://localhost:8080/api/v1/legalcase/${caseId}`);
      if (response.status === 200) {
        console.log('Case archived');
        //get().getCases();  Refetch cases
      }
    } catch (error) {
      console.error('Error archiving case', error);
    }
  },
  
}));
