import {create} from 'zustand';

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
   
     // ...

     // Puedes acceder a otros campos del formulario mediante event.target
   };

   // Realiza acciones adicionales o envía los datos a la API
   console.log('Formulario enviado:', formData);

   // Resetea el estado del formulario
   set({ nombres: '', apellidos: '', /* ... */ });
 },
  handleChange: (fieldName, event) => {
   const { value } = event.target;
   console.log('Cambio en el campo ' + fieldName + ' con valor ' + value);
   set({ [fieldName]: value });
 },
  setUserName: (username) => set({ username: username }),
}));

export default useRegisterUserStore;
