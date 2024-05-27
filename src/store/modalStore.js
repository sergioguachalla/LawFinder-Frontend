import {create} from 'zustand';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

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
      const response = await axios.get(`${API_URL}/legalcase/instance`);
      if(response.data.response != null || response.data.code == '0000'){
         set({instances: response.data.response});
         console.log(get().instances);
         //console.log(response.data);
      }
   },

   updateRequest: async (caseId) => {
      try {
        const response = await axios.post(`${API_URL}/legalcase/${caseId}/instance`, 
          {
            instanceId: get().instanceId,
            startDate: get().startDate,
            endDate: get().endDate,
          },
          {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
          }
        );
    
        if(response.data.response != null || response.data.code === '0000'){
          console.log(response.data);
        } else {
          console.log(response.data);
        }
      } catch (error) {
        console.error('Error updating request:', error);
      }
    },
    


}));
