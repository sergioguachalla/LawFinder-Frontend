import { create } from 'zustand';
import axios from 'axios';
import {owasp, traducirErrores} from '../utils/passwordStrengthTestEs';
const API_URL = import.meta.env.VITE_API_URL;

export const useRegisterUserStore = create((set, get) => ({
  deviceId: localStorage.getItem('device-id') || generateUUID(),
  nombres: '',
  apellidos: '',
  tipoDocumento: '',
  documento: '',
  complemento: '', 
  direccion: '',
  celular: '',
  correo: '',
  username: '',
  secret: '',
  secretConfirm: '',
  status: 'init',
  inputType: 'password',
  emailExists: false,
  userAlreadyExists: false,
  goodPassword: true,
  errorMessage: '',
  confirmSecret: true,
  confirmSecretMessage: '',
  getgoodPassword: () => get().goodPassword,
  getSecret: () => get().secret,
  setErrorMessage: (value) => set({errorMessage: value}),
  setUserAlreadyExists: (value) => set({userAlreadyExists: value}),
  setInputText: () => set({inputType:'text'}),
  setInputPassword: () => set({inputType:'password'}),
  handleChange: (fieldName, event) => {
    const { value } = event.target;
    console.log('Cambio en el campo ' + fieldName + ' con valor ' + value);
    set({ [fieldName]: value });
    if(fieldName === 'secret'){
      set({secret: value});
      set({errorMessage: ''});
      const result = owasp.test(value);
      let errors = [];
      const erroresTraducidos = traducirErrores(result.errors); 
      erroresTraducidos.forEach(error => errors.push(error+"\n"));
      set({errorMessage: errors});
      if(!result.strong){
        set({ goodPassword: false });
    }
    else{
      
      set({ goodPassword: true });
    }
    }
    if(fieldName === 'secretConfirm'){
      if(value !== get().secret){
        set({confirmSecret: false});
        set({confirmSecretMessage: 'Las contraseñas no coinciden'});
      }
      else{
        set({confirmSecret: true});
        set({confirmSecretMessage: ''});
      }
    }
  },


  generateNewUUID: () => {
    const newUUID = generateUUID();
    set({ uuid: newUUID });
    localStorage.setItem('device-id', newUUID);
    //console.log('Nuevo UUID generado: ' + newUUID);
  },


  handleSubmit: (event) => {
    const correoRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    const letrasRegex = /^[a-zA-Z\s]*$/;
    const numbersRegex = /^[0-9]*$/;
    const apellidosRegex = /^[a-zA-Z]+ [a-zA-Z]+$/;
    const apellidosRegex2 = /^[a-zA-Z]+ [a-zA-Z]+ [a-zA-Z]+$/;

    event.preventDefault();
    const usernameAux = event.target.nombres.value.split(' ');
    const lastnameAux = event.target.apellidos.value.split(' ');
    const primerNombre = usernameAux[0];
    const primerApellido = lastnameAux[0];
    //get the second last name first letter
    const segundoApellido = lastnameAux[lastnameAux.length - 1].charAt(0);
    const usernameFinal = `${primerNombre}_${primerApellido}${segundoApellido}`;
    console.log(usernameFinal);
    const formData = {
      nombres: event.target.nombres.value,
      apellidos: event.target.apellidos.value,
      tipoDocumento: event.target.tipoDocumento.value,
      documento: event.target.documento.value,
      complemento: event.target.complemento.value,
      direccion: event.target.direccion.value,
      celular: event.target.celular.value,
      correo: event.target.correo.value,
      username: usernameFinal,
      secret: event.target.secret.value,
      secretConfirm: event.target.secretConfirm.value,
    };
    
      set({ nombres: formData.nombres });
      set({ apellidos: formData.apellidos });
      set({ tipoDocumento: formData.tipoDocumento });
      set({ documento: formData.documento });
      set({ complemento: formData.complemento });
      set({ direccion: formData.direccion });
      set({ celular: formData.celular });
      set({ correo: formData.correo });
      set({ username: formData.username });
      set({ secret: formData.secret });
      set({ secretConfirm: formData.secretConfirm });
    
    console.log(formData.secret); 
    //set({formData: formData});
    localStorage.setItem('correo', formData.correo);

    if(!letrasRegex.test(formData.nombres)){
      alert('El campo de nombres solo puede contener letras');
      return;
    }
    console.log(formData.apellidos);
    console.log(apellidosRegex.test(formData.apellidos));
    console.log(apellidosRegex2.test(formData.apellidos));
    if(!apellidosRegex.test(formData.apellidos) && !apellidosRegex2.test(formData.apellidos)){
      alert('El campo de apellidos debe tener dos apellidos y solo puede contener letras');
      return;
    }
    if(!numbersRegex.test(formData.documento)){
      alert('El campo de documento solo puede contener números');
      return;
    }
    if(!numbersRegex.test(formData.celular)){
      alert('El campo de celular solo puede contener números');
      return;
    }

    if(get().goodPassword === false){
      alert('La contraseña debe tener al menos 10 caracteres, una letra mayúscula, una letra minúscula, un número y un caracter especial');
      return;
    }
    if (formData.secret !== formData.secretConfirm) {
      alert('Las contraseñas no coinciden');
      return;
    }
    if (!correoRegex.test(formData.correo)) {
      alert('El correo electrónico no tiene un formato válido');
      return;
    }
    //if (!passwordRegex.test(formData.secret)) {
    //  alert('La contraseña debe tener al menos 8 caracteres, una letra mayúscula, una letra minúscula, un número y un caracter especial');
    //  return;
    //}
    set({ statusState: 'loading' });
    
    
    

    const verificationBody = {
      "deviceId": localStorage.getItem('device-id'),
      "type": "email",
      "email": formData.correo,
    };
    const requestVerificatioBody = {
      "email" : formData.correo,
    };

    const userExists = async () => {
      const response = await axios.post(`${API_URL}/verification`, requestVerificatioBody);
      console.log(response);
      if(response.data.response == "User Already Exists"){
        //alert('El correo ya se encuentra registrado');
        set({ status: 'registered' });
        set({ formData : ''});
        set({ nombres : ''});
        set({ correo : ''});
      }
      else if(response.data.response == "User Does Not Exist"){
        registerUser();
        set({ status: 'loading' });
      }
    }
    userExists();

    //set({ nombres: '', apellidos: '', tipoDocumento: '', documento: '', complemento: '', direccion: '', celular: '', correo: '', username: '', secret: '', secretConfirm: ''});
    const registerUser = async () => {
      set({ status: 'loading' });
      
      const response = await axios.post(`${API_URL}/verify`, verificationBody);
      console.log(response);
     
      //set({ statusState: 'success' });
      if(response.status == 200){    
        set({ status: 'success' });
        
      }
      else if(response.status === 400){
        set({ status: 'error' });
      }

      
    };
   
    
  },


  setUserName: (username) => set({ username: username }),
}));
function generateUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}


export default useRegisterUserStore;
