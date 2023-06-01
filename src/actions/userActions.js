// Acción para actualizar el campo del usuario
export const updateUserField = (fieldName, value) => {
   return {
     type: 'UPDATE_USER_FIELD',
     payload: { fieldName, value },
   };
 };
 
 // Acción para registrar un nuevo usuario
 export const registerUser = (user) => {
   return {
     type: 'REGISTER_USER',
     payload: user,
   };
 };
 
 // Otras acciones relacionadas con el usuario...
 // ...
 