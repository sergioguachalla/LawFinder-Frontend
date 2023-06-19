import {create} from 'zustand';
import axios from 'axios';
export const useModalStore = create((set,get) => ({
   modal: false,
   isOpen: false,
   instances: [],
   instanceId: '',
   startDate: '',
   endDate: '',
   caseId: localStorage.getItem('caseId') || null,
   setModal: (modal) => set({modal}),
   setModalOpen: (isOpen) => set({isOpen}),
   modalType: '',
   setModalType: (modalType) => set({modalType}),
   handleChange: (fieldName, event) => {
      const { value } = event.target;
      console.log('Cambio en el campo ' + fieldName + ' con valor ' + value);
      set({ [fieldName]: value });
    },
   getInstances: async () => {
      const response = await axios.get(`http://localhost:8080/api/v1/legalcase/instance`);
      if(response.data.response != null || response.data.code == '0000'){
         set({instances: response.data.response});
         console.log(get().instances);
         //console.log(response.data);
      }
   },

   updateRequest: async (caseId) => {
      const response = await axios.post(`http://localhost:8080/api/v1/legalcase/${caseId}/instance`,{
         "instanceId": get().instanceId,
         "startDate": get().startDate,
         "endDate": get().endDate,
      });
      
      if(response.data.response != null || response.data.code == '0000'){
         console.log(response.data);
      }
      else{
         console.log(response.data);
      }
   },


}));
