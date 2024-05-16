import { create } from 'zustand';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const useUpdateRoleStore = create((set, get) => ({
  status: 'init',
  privileges: [],
  roleName: '',
  privilegeRole: {
    roleName: '',
    privileges: []
  },

  handleRoleNameChange: (event) => {
    const { value } = event.target;
    set({ roleName: value });
  },

  handlePrivilegeChange: (event) => {
    const { value } = event.target;
    set({ privilegeRole: { ...get().privilegeRole, privileges: value } });
  },

  getPrivileges: async () => {
    try {
      const response = await axios.get(`${API_URL}/privileges/`);
      if (response.data.code === '0004') {
        set({ privileges: response.data.response });
      }
    } catch (error) {
      console.error("Error fetching privileges:", error);
    }
  },

  updateRole: async () => {
    const { roleId, privilegeRole } = get();
    set({ status: 'loading' });
    const token = localStorage.getItem('token');

    try {
      const response = await axios.put(`${API_URL}/role/${roleId}`, privilegeRole, {
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
      console.error("Error updating role:", error);
    }
  },
}));