import { create } from 'zustand';
import axios from 'axios';
const API_URL = import.meta.env.VITE_API_URL;

export const useAssetStore = create((set, get) => ({
  assets: [],
  confidentialityLevels: [],
  status: 'init',
  currentPage: 0,
  totalPages: 0,
  confidentialityId: '',

  setConfidentialityId: id => set({ confidentialityId: id, currentPage: 0 }),

  getAssets: async () => {
    try {
      set({ status: 'loading' });
      const response = await axios.get(`${API_URL}/informationAssets/all`, {
        params: {
          page: get().currentPage,
          size: 10, // Tamaño de página
          confidentialityId: get().confidentialityId,
        }
      });

      if (response.data.code === '0000') {
        const assetsPage = response.data.response;
        const { content, pageable, totalPages, number } = assetsPage;
        set({
          assets: content || [],
          currentPage: pageable?.pageNumber || 0,
          totalPages: totalPages || 0,
          status: 'success'
        });
      } else {
        set({ status: 'empty' });
      }
    } catch (error) {
      console.error('Error fetching assets:', error);
      set({ status: 'error' });
    }
  },

  getConfidentialityLevels: async () => {
    try {
      const response = await axios.get(`${API_URL}/informationAssets/category`);
      if (response.data.code === '0000') {
        set({ confidentialityLevels: response.data.response });
      }
    } catch (error) {
      console.error('Error fetching confidentiality levels', error);
    }
  },

  nextPage: () => {
    if (get().currentPage < get().totalPages - 1) {
      set(state => ({ currentPage: state.currentPage + 1 }));
      get().getAssets();
    }
  },

  previousPage: () => {
    if (get().currentPage > 0) {
      set(state => ({ currentPage: state.currentPage - 1 }));
      get().getAssets();
    }
  },

  clearFilters: () => {
    set({
      confidentialityId: '',
      currentPage: 0,
    });
    get().getAssets();
  }
}));
