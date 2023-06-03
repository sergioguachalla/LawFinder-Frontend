import {create} from 'zustand';
import axios from 'axios';
import {useRegisterUserStore} from './userRegistrationStore';
export const useConfirmationStore = create((set) => ({
  code: ['', '', '', '', '', ''],
  status: 'init',

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
      if(response.data.response == 'mail verified'){
        set({status: 'success'});
        registerUser();
      }else{
        set({status: 'error'});
      }
    }
    verifyUser();
    const registerUser = async () => {
      const body = {
        "username": useRegisterUserStore.getState().username,
        "secret": useRegisterUserStore.getState().secret,
        "status": 1,
        "personId":{
          "name": useRegisterUserStore.getState().nombres,
          "lastname": useRegisterUserStore.getState().apellidos,
          "ci": useRegisterUserStore.getState().documento,
          "complement": useRegisterUserStore.getState().complemento,
          "number": useRegisterUserStore.getState().celular,
          "email": useRegisterUserStore.getState().correo,
          "address": useRegisterUserStore.getState().direccion,

        },
        "ImageId": 0
      }
      const response = await axios.post('http://localhost:8080/api/v1/user', body);
      console.log(response);
      

    }

      

    
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
