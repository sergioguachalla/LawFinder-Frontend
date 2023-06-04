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
   id: '',
   status: 'init',
   
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
   getCases: async () => {
     set((state) => ({ id: get().getIdFromToken() }));
      
      try {
         const response = await axios.get(`http://localhost:8080/api/v1/legalcase/user/${get().id}`);
         set((state) => ({ cases: response.data.response }));
         if(response.data.response == null){
            set({status: 'empty'});
         }else{
            set({status: 'success'});
         }
         console.log(response);
      } catch (error) {
         // Manejar el error
      }
   },
   

}));


export default useCasesStore;







