// storeAndApi.js
import create from 'zustand';
import axios from 'axios';

const useStore = create(set => ({
  audiences: [],
  setAudiences: (audiences) => set({ audiences }),
}));

export const fetchAudiences = async () => {
  try {
    const res = await axios.get('http://localhost:8080/api/v1/audience/user/3');
    if (res.data.code === "0000") {
      useStore.getState().setAudiences(res.data.response);
    }
  } catch (error) {
    console.error(error);
  }
};

export default useStore;
