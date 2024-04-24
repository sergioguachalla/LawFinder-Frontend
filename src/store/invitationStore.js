import {create} from 'zustand';
import jwt_decode from "jwt-decode";
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

const invitationStore = create(set => ({
  invitations: [],
  loading: false,
  userId: '',
  status: 'init',
  setInvitations: (invitations) => set(() => ({ invitations })),
  setLoading: (loading) => set(() => ({ loading })),
  getIdFromToken: () => {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded = jwt_decode(token);
      const id = decoded.userId;
      return id;
    }
    return '';
  },
  getInvitations: async (userId) => {
 
   set(() => ({ status: 'loading' }));
    const response = await axios.get(`${API_URL}/invitation/${userId}`,{
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
    
    if (response.data.code === '0000') {
      set(() => ({ status: 'success' }));
      set(() => ({ invitations: response.data.response }));
      console.log(response.data.response);
    }
    else if(response.data.errorMessage == 'Invalid token'){
      set(() => ({ status: 'unauthorized' }));
    }
  }
  
}));

export default invitationStore;
