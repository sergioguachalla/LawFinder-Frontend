import { create } from 'zustand';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const useRegisterRolesStore = create((set,get) => ({
  status: 'init',
  privileges: [],
  roleName: '',
  privilegeRole:{
    roleName: '',
    privileges: []
  },
  handleRoleNameChange: (event) => {
    const { value } = event.target;
    set({ privilegeRole: value });
  },
  handlePrivilegeChange: (event) => {
    const { value } = event.target;
    set({ privileges: value });
  },
  createRole: async (rolename, privileges) => {
    console.log(rolename);
    console.log(privileges);
    
    set({ status: 'loading' });
    const token = localStorage.getItem('token');

    const formData = new FormData();
    formData.append('roleName', rolename);
    

    try {
      const response = await axios.post(`${API_URL}/roles/privileges/`, rolename , {
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
      const response = await axios.get(`${API_URL}/privileges/`);
      if (response.data.code === '0004') {
        set({ privileges: response.data.response });
      }
    } catch (error) {
      console.error("Error fetching privileges:", error);
    }
  },
}));
