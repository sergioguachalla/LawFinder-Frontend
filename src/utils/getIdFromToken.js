export const getIdFromToken= () => {
   const token = localStorage.getItem('token');
   if (token) {
      const payload = token.split('.')[1];
      const decodedPayload = atob(payload);
      const {id} = JSON.parse(decodedPayload);
      return id;
   }
   return '';
}
export const getUserNameFromToken = () =>{
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
}

export const getRoleFromToken = () =>{
   const token = localStorage.getItem('token');
   if(token) {
   const payload = token.split('.')[1];
   const decodedPayload = atob(payload);
   let role = decodedPayload.split(',')[0].split(':')[1].split('}')[0];
   //remove "" from username
   role;

   return role;
}
return 'error';
}