import create from 'zustand';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const usePasswordRecoveryStore = create((set) => ({
  email: '',
  status: '',
  errorMessage: '',

  handleChange: (field, event) => {
    const value = event.target.value;
    set((state) => ({ ...state, [field]: value }));
  },

  handleSubmit: async (event) => {
    event.preventDefault();
    set({ status: 'loading' });

    const { email } = usePasswordRecoveryStore.getState();

    try {
      // Replace with your actual API endpoint
      const requestBody = {
        mail: email,
      }
      let res = await axios.post(`${API_URL}/user/forgotpassword`, requestBody);
      set({ status: 'error', errorMessage: res.data.response });
    } catch (error) {
      set({ status: 'error', errorMessage: "No se encontró una cuenta con ese correo electronico." });
    }
  },

  resetStatus: () => {
    set({ status: '' });
  }
}));
