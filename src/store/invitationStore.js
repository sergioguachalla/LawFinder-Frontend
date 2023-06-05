import create from 'zustand';

const invitationStore = create(set => ({
  invitations: [],
  loading: false,
  setInvitations: (invitations) => set(() => ({ invitations })),
  setLoading: (loading) => set(() => ({ loading })),
}));

export default invitationStore;
