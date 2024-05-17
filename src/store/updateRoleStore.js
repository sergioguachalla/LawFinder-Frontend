import { create } from 'zustand';
import axios from 'axios';
import UpdateRoles from '../components/UpdateRole';

const API_URL = import.meta.env.VITE_API_URL;

export const useUpdateRoleStore = create((set, get) => ({
  status: 'init',
  privileges: [],
  roleName: '',
  roleDetail: {
    roleName: '',
    privileges: []
  },
  setRoleId: (roleId) => set({ roleId }),

  handleRoleNameChange: (event) => {
    const { value } = event.target;
    set({ roleDetail: { ...get().roleDetail, roleName: value } });
  },

  handlePrivilegeChange: (event) => {
    const { value } = event.target;
    set({ roleDetail: { ...get().roleDetail, privileges: value } });
  },

  getRoleDetails: async() => {
    try{
      const { roleId } = get();
      const response = await axios.get(`${API_URL}/roles/${roleId}`);
      if(response.data.code === '0004'){
        set ({ roleDetail: {roleName: response.data.response.roleName, 
          privileges: response.data.response.privilege.map(privilege => privilege.privilege)} });
      }
    }
    catch(error){
      console.error("Error fetching role details:", error);
    }
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
    const { roleId, roleDetail } = get();
    set({ status: 'loading' });
    const token = localStorage.getItem('token');

    try {
      const response = await axios.put(`${API_URL}/role/${roleId}`, roleDetail, {
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