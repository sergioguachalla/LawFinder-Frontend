
const initialState = {
   nombres: "",
   apellidos: "",
   tipoDocumento: "",
   documento: "",
   complemento: "",
   direccion: "",
   celular: "",
   correo: "",
   contraseña: "",
   confirmarContraseña: ""
 };
 
 const userReducer = (state = initialState, action) => {
   switch (action.type) {
     case 'UPDATE_USER_FIELD':
       return {
         ...state,
         [action.payload.fieldName]: action.payload.value
       };
     case 'REGISTER_USER':
       return {
         ...state,
         // Aquí puedes manejar la lógica de registro y actualizar el estado del usuario según sea necesario
       };
     // Otros casos de acción relacionados con el usuario...
     // ...
     default:
       return state;
   }
 };
 
 export default userReducer;
 