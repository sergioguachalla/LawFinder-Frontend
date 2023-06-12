import {create} from 'zustand';
import axios  from 'axios';
export const useCaseDetailsStore = create((set) => ({
   caseDetails: null,
   caseId: null,
   status: 'init',
   setCaseDetails: (caseDetails) => set({caseDetails}),
   setCaseId: (caseId) => set({caseId}),

   getCaseDetails: async (caseId) => {
      set({status: 'loading'});
      localStorage.setItem('caseId', caseId);
      const response = await axios.get(`http://localhost:8080/api/v1/case/${caseId}/files`);
      if(response.data.response != null){
         set({status: 'success'});
      }
      console.log(response.data.response);
      set({caseDetails: response.data.response});
   }

   

}));
