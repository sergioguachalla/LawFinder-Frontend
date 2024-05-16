import { create } from 'zustand';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const useUpdateRoleStore = create((set) => ({
  status: 'init',
  roleDetails: null,
  privileges: [],

  getRoleDetails: async (roleId) => {
    set({ status: 'loading' });
    try {
      const [roleResponse, privilegeResponse] = await Promise.all([
        axios.get(`${API_URL}/roles/${roleId}`),
        axios.get(`${API_URL}/privileges`)
      ]);

      if (roleResponse.data.code === '0004' && privilegeResponse.data.code === '0004') {
        set({ 
          status: 'success', 
          roleDetails: roleResponse.data.response,
          privileges: privilegeResponse.data.response
        });
      }
    } catch (error) {
      set({ status: 'error' });
      console.error("Error fetching role details:", error);
    }
  },

  updateRoleDetails: async (roleId, updatedDetails) => {
    set({ status: 'loading' });
    const token = localStorage.getItem('token');
    try {
      const response = await axios.put(`${API_URL}/roles/${roleId}`, updatedDetails, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
      if (response.data.code === '0000') {
        set({ status: 'success' });
        alert('Role Updated Successfully');
      }
    } catch (error) {
      set({ status: 'error' });
      console.error("Error updating role details:", error);
    }
  },
}));
