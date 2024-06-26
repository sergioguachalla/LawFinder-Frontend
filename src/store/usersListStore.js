import {create} from 'zustand';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const useUsersListStore = create((set,get) => ({
    users: [],
    status: 'init',
    setStatus: (status) => set({status: status}),
  
    fetchUsers: async () => {
      try {
        set({ status: 'loading' });
        const response = await axios.get(`${API_URL}/users`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        const mappedUsers = response.data.response.map(user => ({
          id: user.id,
          username: user.username,
          roles: user.roles,
          isBlocked: user.isblocked 
        }));
        set({ users: mappedUsers, status: 'success' });
      } catch (error) {
        console.error('Error fetching users:', error);
        set({ status: 'error' });
      }
    },
    

      deleteUser: async (userId) => {
        try {
          await axios.put(`${API_URL}/users/${userId}`,{}, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
          });
          set((state) => ({
            users: state.users.filter(user => user.id !== userId),
            status: 'success'
          }));
        } catch (error) {
          console.error('Error deleting user:', error);
          set({ status: 'error' });
          throw error;
        }
      },
      
    
      changeLock: async (userId) => {
        try {
          await axios.put(`${API_URL}/user/${userId}/unlock`, {}, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
          });
          set((state) => ({
            users: state.users.map(user => {
              if (user.id === userId) {
                return {
                  ...user,
                  isBlocked: !user.isBlocked, // Cambia locked a isBlocked
                };
              }
              return user;
            }),
            status: 'success'
          }));
        } catch (error) {
          console.error('Error locking/unlocking user:', error);
          set({ status: 'error' });
          throw error;
        }
      },
      
      


}));
