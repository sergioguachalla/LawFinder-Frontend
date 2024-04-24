import {create} from 'zustand';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

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
      const response = await axios.get(`${API_URL}/case/${caseId}/instance/Instancia Preliminar`);
      if(response.data.response != null || response.data.code == '0000'){
         set({status: 'success'});
         set({preliminarCases: response.data.response});
         console.log(get().preliminarCases);
         //console.log(response.data);
      }
   },
   getSentenceCases: async (caseId) => {
      set({status: 'loading'});
      const response = await axios.get(`${API_URL}/case/${caseId}/instance/Instancia de Sentencia`);
      if(response.data.response != null || response.data.code == '0000'){
         set({status: 'success'});
         set({sentenceCases: response.data.response});
         console.log(get().sentenceCases);
         //console.log(response.data);
      }
   },
   getInvestigationCases: async (caseId) => {
      set({status: 'loading'});
      const response = await axios.get(`${API_URL}/case/${caseId}/instance/Instancia de Investigación`);
      if(response.data.response != null || response.data.code == '0000'){
         set({status: 'success'});
         set({investigationCases: response.data.response});
         console.log(get().investigationCases);
         //console.log(response.data);
      }
   },

}));