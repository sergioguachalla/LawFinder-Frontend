import {create} from 'zustand';
const invitationStore = create(set => ({
  invitations: [],
  loading: false,
  userId: '',
  setInvitations: (invitations) => set(() => ({ invitations })),
  setLoading: (loading) => set(() => ({ loading })),
  getIdFromToken: () => {
    const token = localStorage.getItem('token');
    if (token) {
      const payload = token.split('.')[1];
      const decodedPayload = atob(payload);
      //console.log(decodedPayload.split(',')[4].split(':')[1].split('}')[0]);
      const id = decodedPayload.split(',')[5].split(':')[1].split('}')[0];
      //console.log(id);
      set(() => ({ userId: id }));
      return id;
    }
    return '';
  }
  
}));

export default invitationStore;
