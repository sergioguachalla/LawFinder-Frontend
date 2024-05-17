import { create } from 'zustand';
import axios from 'axios';
import UpdateRoles from '../components/UpdateRole';

const API_URL = import.meta.env.VITE_API_URL;

export const useUpdateRoleStore = create((set, get) => ({
  status: 'init',
  privileges: [],
  
  
  setRoleId: (roleId) => set({ roleId }),
  setPrivilegeStatus: (privilegeId, status) => {
    const updatedPrivileges = get().privileges.map(privilege => {
      if (privilege.privilegeId === privilegeId) {
        console.log(privilegeId, status);
        return { ...privilege, status };
      }
      return privilege;
    });
    set({ privileges: updatedPrivileges });
    console.log(get().privileges);
  },

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
      
      console.log(get().privileges)
      
    }
    catch(error){
      console.error("Error fetching role details:", error);
    }
  },
  updateRole: async() => {
    try{
      const { roleId } = get();
      const privileges = get().privileges;
      const response = await axios.put(`${API_URL}/roles/${roleId}/privileges`, privileges);
      if(response.data.code === '0000'){
        console.log("Role updated successfully");
      }
    }
    catch(error){
      console.error("Error updating role:", error);
    }
  }

  



  
}));