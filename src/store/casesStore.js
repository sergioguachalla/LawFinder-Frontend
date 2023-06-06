import { create } from 'zustand';
import axios from 'axios';
//import { getIdFromToken } from '../utils/getIdFromToken';

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
   
   handleChange: (field, event) => {
      set((state) => ({
         formData: {
            ...state.formData,
            [field]: event.target.value,
         },
      }));
   },
   getIdFromToken: () => {
      const token = localStorage.getItem('token');
      if(token) {
         const payload = token.split('.')[1];
         const decodedPayload = atob(payload);
         //console.log(decodedPayload.split(',')[4].split(':')[1].split('}')[0]);
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
         const urlPage = new URLSearchParams(location.search);
         //set(() => ({ currentPage: Number(urlPage.get("page")) }));
        const page = get().currentPage;
        //console.log(page);

       set(() => ({ currentPage: page}) );
    
        const response = await axios.get(`http://localhost:8080/api/v1/legalcase/user/${get().id}`, {
          params: {
            page: get().currentPage,
            size: 2, // Tamaño de página
          },
        });
        console.log(response);
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
    
        // Actualizar URL con el parámetro 'page'
        const searchParams = new URLSearchParams(location.search);
        searchParams.set("page", String(get().currentPage));
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
         set
        console.log(searchParams.toString());
      }
    },
    
    previousPage: () => {
      if (get().currentPage > 0) {
        set((state) => ({ currentPage: state.currentPage - 1 }));
        const searchParams = new URLSearchParams(location.search);
        searchParams.set("page", String(get().currentPage - 1));
        }
    },
    
}));
