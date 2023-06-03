import {create} from 'zustand';
import axios from 'axios';
import {useRegisterUserStore} from './userRegistrationStore';
export const useConfirmationStore = create((set) => ({
  code: ['', '', '', '', '', ''],
  formData: useRegisterUserStore.getState().formData,

  handleChange: (event, index) => {
    const { value } = event.target;
    set((state) => {
      const newCode = [...state.code];
      newCode[index] = value;
      console.log(newCode);
      return { code: newCode };
    });
  },
  handleRequest: () => {
    const body = {
      "deviceId": localStorage.getItem('device-id'),
      //email: localStorage.getItem('email'),
      "code": useConfirmationStore.getState().code.join(''),
    };
    const verifyUser = async () => {
      const response = await axios.put('http://localhost:8080/api/v1/verify', body);
      console.log(response);
    }
    verifyUser();
    
  }
}));

export default useConfirmationStore;
