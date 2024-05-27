import { create } from 'zustand';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const useUpdateRoleStore = create((set, get) => ({
  roleId: null,
  privileges: [],
  
  setRoleId: (roleId) => set({ roleId }),
  
  setPrivilegeStatus: (privilegeId, status) => {
    set(state => ({
      privileges: state.privileges.map(privilege => 
        privilege.privilegeId === privilegeId ? { ...privilege, status } : privilege
      )
    }));
  },

  getRoleDetails: async (roleId) => {
    try {
      const response = await axios.get(`${API_URL}/roles/${roleId}/privileges`);
      if (response.data.code === '0000') {
        const privileges = response.data.response.map(privilege => ({
          ...privilege,
          status: privilege.status || false
        }));
        set({ privileges });
      }
    } catch (error) {
      console.error("Error fetching role details:", error);
    }
  },

  updateRole: async () => {
    try {
      const { roleId, privileges } = get();
      const response = await axios.put(`${API_URL}/roles/${roleId}/privileges`, privileges);
      if (response.data.code === '0000') {
        console.log("Role updated successfully");
      }
    } catch (error) {
      console.error("Error updating role:", error);
    }
  }
}));
