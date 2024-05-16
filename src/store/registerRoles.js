import { create } from 'zustand';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const useRegisterRolesStore = create((set) => ({
  status: 'init',
  privileges: [],

  createRole: async (roleData) => {
    set({ status: 'loading' });
    const token = localStorage.getItem('token');
    try {
      const response = await axios.post(`${API_URL}/roles`, roleData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
      if (response.data.code === '0000') {
        set({ status: 'success' });
        alert('Role Registered Successfully');
      }
    } catch (error) {
      set({ status: 'error' });
      console.error("Error registering role:", error);
    }
  },

  getPrivileges: async () => {
    try {
      const response = await axios.get(`${API_URL}/privileges`);
      if (response.data.code === '0004') {
        set({ privileges: response.data.response });
      }
    } catch (error) {
      console.error("Error fetching privileges:", error);
    }
  },
}));
