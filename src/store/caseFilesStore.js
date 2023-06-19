import {create} from 'zustand';
import axios from 'axios';


export const useCaseFilesStore = create((set,get) => ({
   preliminarCases: [],
   trialCases: [],
   sentenceCases: [],
   investigationCases: [],
   status: 'init',
   caseId: localStorage.getItem('caseId'),
   setCaseFiles: (caseFiles) => set({caseFiles}),
   setCaseId: (caseId) => set({caseId}),
   getPreliminarCases: async (caseId) => {
      
      set({status: 'loading'});
      const response = await axios.get(`http://localhost:8080/api/v1/case/${caseId}/instance/Instancia Preliminar`);
      if(response.data.response != null || response.data.code == '0000'){
         set({status: 'success'});
         set({preliminarCases: response.data.response});
         console.log(get().preliminarCases);
         //console.log(response.data);
      }
   },
   getSentenceCases: async (caseId) => {
      set({status: 'loading'});
      const response = await axios.get(`http://localhost:8080/api/v1/case/${caseId}/instance/Instancia de Sentencia`);
      if(response.data.response != null || response.data.code == '0000'){
         set({status: 'success'});
         set({sentenceCases: response.data.response});
         console.log(get().sentenceCases);
         //console.log(response.data);
      }
   },
   getInvestigationCases: async (caseId) => {
      set({status: 'loading'});
      const response = await axios.get(`http://localhost:8080/api/v1/case/${caseId}/instance/Instancia de Investigación`);
      if(response.data.response != null || response.data.code == '0000'){
         set({status: 'success'});
         set({investigationCases: response.data.response});
         console.log(get().investigationCases);
         //console.log(response.data);
      }
   },

}));