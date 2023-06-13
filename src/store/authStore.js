import { create } from 'zustand';

const useAuthStore = create((set) => ({
  token: localStorage.getItem('token') || null,
  status: '',
  login: (token) => set({ token, status: 'success' }),
  logout: () => {
    localStorage.removeItem('token');
    set({ token: null, status: '' });
  },
}));

export default useAuthStore;
