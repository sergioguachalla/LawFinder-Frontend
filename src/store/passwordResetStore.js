import create from 'zustand';
import owasp from 'owasp-password-strength-test';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const useResetPasswordStore = create((set) => ({
  newPassword: '',
  confirmNewPassword: '',
  inputType: 'password',
  status: '',
  goodPassword: true,
  errorMessage: '',
  
  handleChange: (field, event) => {
    const value = event.target.value;
    set((state) => ({ ...state, [field]: value }));
    
    if (field === 'newPassword') {
      const result = owasp.test(value);
      set((state) => ({ 
        goodPassword: result.strong,
        errorMessage: result.errors.join(' ')
      }));
    }
  },
  
  handleSubmit: async (event, passwordResetToken) => {
    event.preventDefault();
    set({ status: 'loading' });

    const { newPassword, confirmNewPassword } = useResetPasswordStore.getState();
    if (newPassword !== confirmNewPassword) {
      set({ status: 'error', errorMessage: 'Las contraseñas no coinciden' });
      return;
    }

    const result = owasp.test(newPassword);
    if (!result.strong) {
      set({ status: 'error', errorMessage: result.errors.join('\n') });
      return;
    }

    try {
      console.log(passwordResetToken);
      // Replace with your actual API endpoint
      await axios.post(`${API_URL}/user/resetpassword?passwordResetToken=${passwordResetToken}`, { password: newPassword });
      set({ status: 'success' });
    } catch (error) {
      set({ status: 'error', errorMessage: 'Failed to reset password. Please try again.' });
    }
  },
  
  togglePasswordVisibility: () => {
    set((state) => ({
      inputType: state.inputType === 'password' ? 'text' : 'password'
    }));
  },
  
  resetStatus: () => {
    set({ status: '' });
  }
}));
