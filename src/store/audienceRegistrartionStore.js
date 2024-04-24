import axios from 'axios';
import {create} from 'zustand';
import moment from 'moment';

export const useRegisterAudienceStore = create((set, get) => ({
  loading: false,
  date: '',
  hour: '',
  description: '',
  meetingLink: '',
  location: '',
  setDate: (date) => set({ date }),
  setHour: (hour) => set({ hour }),
  setDescription: (description) => set({ description }),
  setMeetingLink: (link) => set({ meetingLink: link }),
  setLocation: (location) => set({ location }),
  status: 'idle',
  setStatus: (status) => set({ status }),
  registerAudience: async (caseId) => {
    set({ loading: true, status: 'loading' });
    try {
      const audienceDate = moment(`${get().date}T${get().hour}`).format("YYYY-MM-DDTHH:mm:ss");
      await axios.post(`${API_URL}/legalcase/${caseId}/audience`, {
        audienceDate: audienceDate,
        description: get().description,
        link: get().meetingLink,
        address: get().location,
      });
      set({ loading: false, status: 'success' });
    } catch (error) {
      set({ loading: false, status: 'error' });
    }
  },
}));
