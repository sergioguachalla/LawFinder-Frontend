import {create} from 'zustand';
import axios from 'axios';

export const useLoginUserStore = create((set) => ({
   username: '',
   secret: '',
   status: 'init',
   handleChange: (fieldName, event) => {
      const {value} = event.target;
      console.log('Cambio en el campo ' + fieldName + ' con valor ' + value);
      set({[fieldName]: value});
   },
   handleSubmit: (event) => {
      event.preventDefault();
      const formData = {
         username: event.target.username.value,
         secret: event.target.secret.value,
      };
      const requestBody = {
         "username": formData.username,
         "password": formData.secret,
      };
      axios.post('http://localhost:8080/api/v1/auth/login', requestBody)
         .then((response) => {
            console.log(response);
            set({username: formData.username});
         })
         .catch((error) => {
            console.log(error);
         });
   }
}));
