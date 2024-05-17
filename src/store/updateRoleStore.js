import { create } from 'zustand';
import axios from 'axios';
import UpdateRoles from '../components/UpdateRole';

const API_URL = import.meta.env.VITE_API_URL;

export const useUpdateRoleStore = create((set, get) => ({
  status: 'init',
  privileges: [],
  
  
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
      const response = await axios.get(`${API_URL}/roles/${roleId}/privileges`);
      if(response.data.code === '0000'){
        set({ privileges: response.data.response });
      }
      
      console.log(privileges)
      
    }
    catch(error){
      console.error("Error fetching role details:", error);
    }
  },

  



  
}));