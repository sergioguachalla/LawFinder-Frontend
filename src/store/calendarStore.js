import create from 'zustand';
import axios from 'axios';
import jwt_decode from "jwt-decode";

const useStore = create((set,get) => ({
  audiences: [],
  id: '',

  setAudiences: (audiences) => set({ audiences }),

  getIdFromToken: () => {
    const token = localStorage.getItem('token');
    const decoded = jwt_decode(token);
    return decoded.userId;
   
  },
  fetchAudiences: async () => {
    set(() => ({ id: get().getIdFromToken() }));
    try {
      const res = await axios.get(`${API_URL}/audience/user/${get().id}`);
      if (res.data.code === "0000") {
        set({ audiences: res.data.response });
      }
    } catch (error) {
      console.error(error);
    }
  },
}));

export default useStore;