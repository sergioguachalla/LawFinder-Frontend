import { create } from 'zustand';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;


export const useRolesAdminStore = create((set, get) => ({
  roles: [],
  status: 'init',

  setRoles: (roles) => set({ roles }),

  getRoles: async () => {
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

  createRole: async (roleData) => {
    set({ status: 'loading' });
    const token = localStorage.getItem('token');
    try {
      const response = await axios.post(`${API_URL}/roles/`, roleData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
      if (response.data.response !== null || response.data.code === '0000') {
        set({ status: 'success' });
        alert('Role Created Successfully');
        set((state) => ({ roles: [...state.roles, response.data.response] }));
      }
    } catch (error) {
      set({ status: 'error' });
      console.error("Error creating role:", error);
    }
  },

  updateRole: async (roleId, roleData) => {
    set({ status: 'loading' });
    const token = localStorage.getItem('token');
    try {
      const response = await axios.put(`${API_URL}/role/${roleId}`, roleData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer {token}`,
        },
      });
      if (response.data.response !== null || response.data.code === '0000') {
        set({ status: 'success' });
        alert('Role Updated Successfully');
        set((state) => ({
          roles: state.roles.map((role) =>
            role.roleId === roleId ? response.data.response : role
          ),
        }));
      }
    } catch (error) {
      set({ status: 'error' });
      console.error("Error updating role:", error);
    }
  },

  deleteRole: async (roleId) => {
    set({ status: 'loading' });
    const token = localStorage.getItem('token');
    try {
      const response = await axios.delete(`${API_URL}/roles/${roleId}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
      if (response.data.code === '0000') {
        set({ status: 'success' });
        alert('Role Deleted Successfully');
        set((state) => ({
          roles: state.roles.filter((role) => role.roleId !== roleId),
        }));
      }
    } catch (error) {
      set({ status: 'error' });
      console.error("Error deleting role:", error);
    }
  },

  assignPrivileges: async (roleId, privileges) => {
    set({ status: 'loading' });
    const token = localStorage.getItem('token');
    try {
      const response = await axios.put(`${API_URL}/role/${roleId}/privileges`, { privileges }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
      if (response.data.response !== null || response.data.code === '0000') {
        set({ status: 'success' });
        alert('Privileges Assigned Successfully');
        set((state) => ({
          roles: state.roles.map((role) =>
            role.roleId === roleId ? response.data.response : role
          ),
        }));
      }
    } catch (error) {
      set({ status: 'error' });
      console.error("Error assigning privileges:", error);
    }
  }

}));
