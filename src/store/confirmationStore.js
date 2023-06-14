import {create} from 'zustand';
import axios from 'axios';
import {useRegisterUserStore} from './userRegistrationStore';
import useLawyerStore from './lawyerRegistrationStore';
export const useConfirmationStore = create((set) => ({
  code: ['', '', '', '', '', ''],
  status: 'init',
  role: '',
  setRole: (role) => {
    set({role: role});
  },
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
        "status": true,
        "personId":{
          "name": useRegisterUserStore.getState().nombres,
          "lastname": useRegisterUserStore.getState().apellidos,
          "ci": useRegisterUserStore.getState().documento,
          "complement": useRegisterUserStore.getState().complemento,
          "number": useRegisterUserStore.getState().celular,
          "email": useRegisterUserStore.getState().correo,
          "address": useRegisterUserStore.getState().direccion,

        },
      }
      const response = await axios.post('http://localhost:8080/api/v1/user', body);
      console.log(response);
      

    }      
  },

  handleLawyer: () => {
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
        "username": useLawyerStore.getState().username,
        "secret": useLawyerStore.getState().secret,
        "status": true,
        "personId":{
          "name": useLawyerStore.getState().nombres,
          "lastname": useLawyerStore.getState().apellidos,
          "ci": useLawyerStore.getState().documento,
          "complement": useLawyerStore.getState().complemento,
          "number": useLawyerStore.getState().celular,
          "email": useLawyerStore.getState().correo,
          "address": useLawyerStore.getState().direccion,

        },
      }
      const response = await axios.post('http://localhost:8080/api/v1/lawyer', body);
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
