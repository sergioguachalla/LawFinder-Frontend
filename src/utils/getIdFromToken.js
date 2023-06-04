export function getIdFromToken() {
   const token = localStorage.getItem('token');
   if (token) {
      const payload = token.split('.')[1];
      const decodedPayload = atob(payload);
      const {id} = JSON.parse(decodedPayload);
      return id;
   }
   return '';
}