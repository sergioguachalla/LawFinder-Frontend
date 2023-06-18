import {create} from 'zustand';
import axios from 'axios';
import jwt_decode from "jwt-decode";

export const useCaseFilesStore = create((set,get) => ({
   caseFilesInfo: [],
   status: 'init',
   caseId: localStorage.getItem('caseId'),
   setCaseFiles: (caseFiles) => set({caseFiles}),
   setCaseId: (caseId) => set({caseId}),
   getFilesInfo: async (caseId) => {
      set({status: 'loading'});
      const response = await axios.get(`http://localhost:8080/api/v1/case/${caseId}/files`);
      if(response.data.response != null || response.data.code == '0000'){
         set({status: 'success'});
         set({caseFilesInfo: response.data.response});
         console.log(get().caseFilesInfo);
         //console.log(response.data);
      }
   },

}));