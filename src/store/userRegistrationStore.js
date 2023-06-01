import { create } from 'zustand';
import axios from 'axios';

export const useRegisterUserStore = create((set) => ({
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

  handleChange: (fieldName, event) => {
    const { value } = event.target;
    console.log('Cambio en el campo ' + fieldName + ' con valor ' + value);
    set({ [fieldName]: value });
  },

   registerPerson: async (data) => {
    const requestBody = {
      name: data.nombres,
      lastname: data.apellidos,
      ci: data.documento,
      complement: data.complemento,
      address: data.direccion,
      number: data.celular,
      email: data.correo,
    };
    const response = await axios.post('http://localhost:8080/api/person', requestBody);
    console.log(response);
  },

  handleSubmit: (event) => {
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
    const requestBody = {
      "username": formData.username,
      "secret": formData.secret,
      "personId": {
         "name": formData.nombres,
         "lastname": formData.apellidos,
         "ci": formData.documento,
         "number": formData.celular,   
         "complement": formData.complemento,
         "email": formData.correo,
         "address": formData.direccion,
      },
      
      };


    console.log('Formulario enviado:', formData);
    set({ nombres: '', apellidos: '', /* ... */ });
    const registerUser = async () => {
      const response = await axios.post('http://localhost:8080/api/v1/user', requestBody);
      console.log(response);
    }
      registerUser();
  },

  setUserName: (username) => set({ username: username }),
}));

export default useRegisterUserStore;
