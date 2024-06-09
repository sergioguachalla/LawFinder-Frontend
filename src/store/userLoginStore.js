import {create} from 'zustand';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const useLoginUserStore = create((set,get) => ({
   
   username: '',
   secret: '',
   status: 'init',
   setStatus: (status) => set({status: status}),
   handleChange: (fieldName, event) => {
      const {value} = event.target;
      set({[fieldName]: value});
   },
   handleSubmit: (event) => {
      set({status: 'loading'});
      event.preventDefault();
      const formData = {
         username: event.target.username.value,
         secret: event.target.secret.value,
      };
      const requestBody = {
         "username": formData.username,
         "password": formData.secret,
      };
      setTimeout(() => {
      axios.post(`http://209.97.144.146:8080/api/v1/auth/login`, requestBody)
         .then((response) => {
            console.log(response);
            set({username: formData.username});     
            if(response.data.response !== null){
               localStorage.setItem('token', response.data.response.authToken);
               set({status: 'success'});
            }else if (response.data.code === '0001') {
               set({ status: 'invalid' });
            }else if (response.data.code === '0002') {
               set({ status: 'blocked' });
            }
            
            
            /*else if(response.data.response === null){
               set({status: 'invalid'});
            }*/
         })
         .catch((error) => {
            console.log(error);
         });
         console.log('El estado es: ' + get().status);
   }, 1500);
   },
   
}));

