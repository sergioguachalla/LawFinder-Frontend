import {create} from 'zustand';

export const useUserConfirmationStore = create((set) => ({
   code: '',
   handleChange: (fieldName, event) => {
      const {value} = event.target;
      console.log('Cambio en el campo ' + fieldName + ' con valor ' + value);
      set({[fieldName]: value});
   }
}));

export default useUserConfirmationStore;
