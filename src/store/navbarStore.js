import {create} from 'zustand';
import { getUserNameFromToken } from '../utils/getIdFromToken';
export const useNavbarStore = create((set,get) => ({
   username: '',
   
   handleChange: (fieldName, event) => {
      const {value} = event.target;
      console.log('Cambio en el campo ' + fieldName + ' con valor ' + value);
      set({[fieldName]: value});
      
   },
   setUsername: () => {
      if(localStorage.getItem('token') === '') {
         set({username: ''});
      } else {
         set({username: getUserNameFromToken()});
         
      }
   }
   /*getUserNameFromToken:() =>{
      const token = localStorage.getItem('token');
      if(token) {
      const payload = token.split('.')[1];
      const decodedPayload = atob(payload);
      let username = decodedPayload.split(',')[2].split(':')[1].split('}')[0];
      //remove "" from username
      username = username.substring(1, username.length-1);

      //const {username} = JSON.parse(decodedPayload);
      return username;
   }
   return '';
   },*/

   

}));
