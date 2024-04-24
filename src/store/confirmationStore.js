import {create} from 'zustand';
import axios from 'axios';
import {useRegisterUserStore} from './userRegistrationStore';
import useLawyerStore from './lawyerRegistrationStore';
const API_URL = import.meta.env.VITE_API_URL;

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
      const response = await axios.put(`${API_URL}/verify`, body);
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
      set({status: 'loading'});
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
      const response = await axios.post(`${API_URL}/user`, body);
      if(response.data.code === '0000'){
        set({status: 'success'});
      }
      console.log(response);
      

    }      
  },

  handleLawyer: () => {
    set({status: 'loading'});
    const body = {
      "deviceId": localStorage.getItem('device-id'),
      //email: localStorage.getItem('email'),
      "code": useConfirmationStore.getState().code.join(''),
    };
    const verifyUser = async () => {
      const response = await axios.put(`${API_URL}/verify`, body);
      console.log(response);
      if(response.data.response == 'mail verified'){
        set({status: 'verified'});
        registerUser();
        set({status: 'success'});
      }else if(response.data.response == 'mail not verified'){
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
      const response = await axios.post(`${API_URL}/lawyer`, body);
      console.log(response);
      

    }      

  },

  handleRegister: () => {
    set({status: 'loading'});
    const formData = useConfirmationStore.getState().formData;
    const body = {
      "deviceId": localStorage.getItem('device-id'),
      "type": "email",
      "email": formData.correo,
    }
    const registerUser = async () => {
      const response = await axios.post(`${API_URL}/verify`, body);
      console.log(response + " handle register");
      if(response.data.code === '0000'){
        set({status: 'success'});
      }
    }

    registerUser();
  }
}));

export default useConfirmationStore;
