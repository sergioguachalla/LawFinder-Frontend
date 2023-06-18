import {create} from 'zustand';
import axios  from 'axios';
export const useCaseDetailsStore = create((set,get) => ({
   caseDetails: null,
   caseId: localStorage.getItem('caseId') ,
   status: 'init',
   setCaseDetails: (caseDetails) => set({caseDetails}),
   setCaseId: (caseId) => set({caseId}),

   getCaseDetails: async (caseId) => {
      set({status: 'loading'});
      console.log(caseId);
      localStorage.setItem('caseId', caseId);
      const response = await axios.get(`http://localhost:8080/api/v1/case/${caseId}/files`);
      if(response.data.response != null || response.data.code == '0000'){
         set({status: 'success'});
         //set({caseDetails: response.data.response});

      }
   },

   getCaseInformation : async (caseId) => {
      set({status: 'loading'});
      console.log(caseId);
      localStorage.setItem('caseId', caseId);
      const response = await axios.get(`http://localhost:8080/api/v1/legalcase/${caseId}/information`);
      if(response.data.response != null || response.data.code == '0000'){
         set({status: 'success'});
        // console.log(response.data.response);
         set({caseDetails: response.data.response});
         console.log(get().caseDetails);
      }
   },

  

   

}));
