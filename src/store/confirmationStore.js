import {create} from 'zustand';
import axios from 'axios';
export const useConfirmationStore = create((set) => ({
  code: ['', '', '', '', '', ''],
  isVerified: false,
  

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
      if(response.status == 200){
        set({isVerified: true});
      }
    }

    verifyUser();
    
  },
  handleRegister: () => {
    const formData = useConfirmationStore.getState().formData;
    const body = {
      "deviceId": localStorage.getItem('device-id'),
      "type": "email",
      "email": formData.correo,
    }
    const registerUser = async () => {
      const response = await axios.post('http://localhost:8080/api/v1/verify', body);
      console.log(response);
      if(response.status == 200){
        set({isVerified: true});
      }
    }
    registerUser();
  }
}));

export default useConfirmationStore;
