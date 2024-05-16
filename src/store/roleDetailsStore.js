import { create } from "zustand";
import axios from 'axios';


const API_URL = import.meta.env.VITE_API_URL;




export const useRoleDetailsStore = create((set, get) => ({
   rol = {},
   status: 'init',

   setRole: (rol) => set({ rol }),
   
   getRole: async () => {
      set({ status: 'loading' });
      try {
        const response = await axios.get(`${API_URL}/roles/`);
        if (response.data.response !== null || response.data.code === '0000') {
          set({ status: 'success' });
          set({ roles: response.data.response });
        }
      } catch (error) {
        set({ status: 'error' });
        console.error("Error fetching roles:", error);
      }
    },
   })
);