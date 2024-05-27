import { create } from 'zustand';
import axios from 'axios';
const API_URL = import.meta.env.VITE_API_URL;

export const useLogsStore = create((set, get) => ({
  logs: [],
  levels: [],
  categories: [],
  status: 'init',
  currentPage: 0,
  totalPages: 0,
  fromDate: '',
  toDate: '',
  levelId: '',
  categoryId: '',
  
  setFromDate: date => set({ fromDate: date, currentPage: 0 }), 
  setToDate: date => set({ toDate: date, currentPage: 0 }), 
  setLevelId: id => set({ levelId: id, currentPage: 0 }), 
  setCategoryId: id => set({ categoryId: id, currentPage: 0 }), 
  
  getLogs: async () => {
    try {
      set({ status: 'loading' });
      const response = await axios.get(`${API_URL}/applicationLogs`, {
        params: {
          page: get().currentPage,
          size: 10, // Tamaño de página
          from: get().fromDate,
          to: get().toDate,
          levelId: get().levelId,
          categoryId: get().categoryId,
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

  getLevels: async () => {
    try {
      const response = await axios.get(`${API_URL}/logsLevel`);
      if (response.data.code === '0000') {
        set({ levels: response.data.response });
      }
    } catch (error) {
      console.error('Error fetching levels', error);
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
      levelId: '',
      categoryId: '',
      currentPage: 0,
    });
    get().getLogs();
  }
}));
