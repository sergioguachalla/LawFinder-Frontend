import axios from 'axios';

export const getCrimeById = async (id) => {
      const response = await axios.get(`http://localhost:8080/api/v1/crime/${id}`);
      return response.data.response;
   }