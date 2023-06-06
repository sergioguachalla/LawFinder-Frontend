import {create} from 'zustand';
import axios  from 'axios';
export const useCaseDetailsStore = create((set) => ({
   caseDetails: null,
   caseId: null,
   setCaseDetails: (caseDetails) => set({caseDetails}),
   setCaseId: (caseId) => set({caseId}),

   getCaseDetails: async (caseId) => {
      localStorage.setItem('caseId', caseId);
      const response = await axios.get(`http://localhost:8080/api/v1/case/${caseId}/files`);
      console.log(response.data.response);
      set({caseDetails: response.data.response});
   }

   

}));
