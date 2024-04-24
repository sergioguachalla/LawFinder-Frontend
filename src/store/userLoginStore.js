import {create} from 'zustand';
import axios from 'axios';

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
      axios.post(`${process.env.API_URL}/auth/login`, requestBody)
         .then((response) => {
            console.log(response);
            set({username: formData.username});     
            if(response.data.response !== null){
               localStorage.setItem('token', response.data.response.authToken);
               set({status: 'success'});
            }else if(response.data.response === null){
               set({status: 'invalid'});
            }
         })
         .catch((error) => {
            console.log(error);
         });
         console.log('El estado es: ' + get().status);
   }, 2000);
   },
   
}));

