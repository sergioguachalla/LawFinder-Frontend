import {create} from 'zustand';
import jwt_decode from "jwt-decode";
import axios from 'axios';
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
    const response = await axios.get(`http://localhost:8080/api/v1/invitation/${userId}`)
    
    if (response.data.code === '0000') {
      set(() => ({ status: 'success' }));
      set(() => ({ invitations: response.data.response }));
      console.log(response.data.response);
    }
  }
  
}));

export default invitationStore;
