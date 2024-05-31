import { create } from 'zustand';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const useLogsStore = create((set, get) => ({
  logs: [],
  categories: [],
  status: 'init',
  currentPage: 0,
  totalPages: 0,
  fromDate: '',
  toDate: '',
  categoryId: '',
  
  setFromDate: date => set({ fromDate: date, currentPage: 0 }), 
  setToDate: date => set({ toDate: date, currentPage: 0 }), 
  setCategoryId: id => set({ categoryId: id, currentPage: 0 }), 
  
  getLogs: async () => {
    try {
      set({ status: 'loading' });
      const response = await axios.get(`${API_URL}/securityLogs`, {
        params: {
          page: get().currentPage,
          size: 10, // Tamaño de página
          from: get().fromDate,
          to: get().toDate,
          categoryId: get().categoryId,
        },
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if(response.data.code === '0000') {
        const logsPage = response.data.response;
        set({
          logs: logsPage.content,
          currentPage: logsPage.number,
          totalPages: logsPage.totalPages,
          status: 'success'
        });
      } else {
        set({ status: 'empty' });
      }
    } catch (error) {
      console.error('Error fetching logs:', error);
      set({ status: 'error' });
    }
  },

  getCategories: async () => {
    try {
      const response = await axios.get(`${API_URL}/logsCategory`);
      if (response.data.code === '0000') {
        set({ categories: response.data.response });
      }
    } catch (error) {
      console.error('Error fetching categories', error);
    }
  },

  nextPage: () => {
    if (get().currentPage < get().totalPages - 1) {
      set(state => ({ currentPage: state.currentPage + 1 }));
      get().getLogs();
    }
  },

  previousPage: () => {
    if (get().currentPage > 0) {
      set(state => ({ currentPage: state.currentPage - 1 }));
      get().getLogs();
    }
  },

  clearFilters: () => {
    set({
      fromDate: '',
      toDate: '',
      categoryId: '',
      currentPage: 0,
    });
    get().getLogs();
  }
}));
