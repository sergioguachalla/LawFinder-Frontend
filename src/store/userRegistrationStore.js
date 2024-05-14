import { create } from 'zustand';
import axios from 'axios';


const API_URL = import.meta.env.VITE_API_URL;

export const useRegisterUserStore = create((set) => ({
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
  setUserAlreadyExists: (value) => set({userAlreadyExists: value}),
  setInputText: () => set({inputType:'text'}),
  setInputPassword: () => set({inputType:'password'}),
  handleChange: (fieldName, event) => {
    const { value } = event.target;
    console.log('Cambio en el campo ' + fieldName + ' con valor ' + value);
    set({ [fieldName]: value });
    if(fieldName === 'secret'){
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      if(passwordRegex.test(value)){
        set({goodPassword: true});
      }
      else{
        set({goodPassword: false});
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
    // Expresión regular para validar formato de correo electrónico
    const correoRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    event.preventDefault();
    const usernameAux = event.target.nombres.value.split(' ');
    const lastnameAux = event.target.apellidos.value.split(' ');
    const primerNombre = usernameAux[0];
    const primerApellido = lastnameAux[0];
    const usernameFinal = `${primerNombre}_${primerApellido}`;
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

    if (formData.secret !== formData.secretConfirm) {
      alert('Las contraseñas no coinciden');
      return;
    }
   
    if (!correoRegex.test(formData.correo)) {
      alert('El correo electrónico no tiene un formato válido');
      return;
    }
    if (!passwordRegex.test(formData.secret)) {
      alert('La contraseña debe tener al menos 8 caracteres, una letra mayúscula, una letra minúscula, un número y un caracter especial');
      return;
    }
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
