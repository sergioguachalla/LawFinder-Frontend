import {create} from 'zustand';
import axios  from 'axios';
export const useCaseDetailsStore = create((set,get) => ({
   caseDetails: null,
   caseFiles: null,
   caseId: localStorage.getItem('caseId') ,
   status: 'init',
   updateInstance: false,
   setUpdateInstance: (updateInstance) => set({updateInstance}),
   setCaseDetails: (caseDetails) => set({caseDetails}),  
   setCaseId: (caseId) => set({caseId}),

   getCaseDetails: async (caseId) => {
      set({status: 'loading'});
      //console.log(caseId);
      localStorage.setItem('caseId', caseId);
      const response = await axios.get(`${API_URL}/case/${caseId}/files`);
      console.log(response);
      if(response.data.response != null || response.data.code == '0000'){
         set({status: 'success'});
         set({caseFiles: response.data.response});

      }
   },

   getCaseInformation : async (caseId) => {
      set({status: 'loading'});
      console.log(caseId);
      //localStorage.setItem('caseId', caseId);
      const response = await axios.get(`http://localhost:8080/api/v1/legalcase/${caseId}/information`);
      if(response.data.response != null || response.data.code == '0000'){
         set({status: 'success'});
        // console.log(response.data.response);
         set({caseDetails: response.data.response});
         console.log(get().caseDetails);
      }
   },

   handleUpdateCase: async (caseId) => {
      set({status: 'loading'});
      const token = localStorage.getItem('token');
      //localStorage.setItem('caseId', caseId);
      const response = await axios.put(`http://localhost:8080/api/v1/legalcase/${caseId}`,{},{
         headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
         }

      });
      console.log(response);
      if(response.data.response != null || response.data.code == '0000'){
         set({status: 'success'});
         alert('Case Updated Successfully');
        // console.log(response.data.response);
         set({caseDetails: response.data.response});
         console.log(get().caseDetails);
      }
   }

  

   

}));
