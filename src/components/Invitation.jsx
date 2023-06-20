import React, { useEffect } from 'react';
import axios from 'axios';
import invitationStore from '../store/invitationStore';
import '../styles/Invitation.css';
import {  } from '../utils/getIdFromToken';
import Navbar from './Navbar';
import Spinner from './Spinner';
const Invitation = () => {
    const invitations = invitationStore(state => state.invitations);
    const loading = invitationStore(state => state.loading);
    const setInvitations = invitationStore(state => state.setInvitations);
    const setLoading = invitationStore(state => state.setLoading);
    let userId = invitationStore(state => state.userId);
    const getId = invitationStore(state => state.getIdFromToken);
    const { getInvitations, status } = invitationStore();
  
    useEffect(() => {
      setTimeout(() => {

      userId = getId();
      getInvitations(userId);
      }, 1000);
        
    }, [setInvitations, getInvitations]);
  
    const acceptInvitation = (actorId) => {
      setLoading(true);
      axios.put(`http://localhost:8080/api/v1/actor/${actorId}`)
        .then((response) => {
          console.log(response.data);
          setInvitations(invitations.filter(invitation => invitation.actorId !== actorId));
        })
        .catch((error) => {
          console.error('Error updating data: ', error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  
    return (
      <>
        <Navbar></Navbar>
        {invitations.length === 0 && status === 'success' && <h2 style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>No tienes invitaciones pendientes</h2>}
        {status === 'unauthorized' && <h2>403...</h2>}
        {status === 'loading' || status === 'init' && <div className="loading"><Spinner title={'Cargando Invitaciones'}/></div> }
        <div className="invitation-container">
          {invitations.map((invitation, index) => (
            <div className="card" key={index}>
              <h2>Título: Invitación {index + 1}</h2>
              <p>Número de caso: {invitation.legalCaseId}</p>
              <button onClick={() => acceptInvitation(invitation.actorId)} disabled={loading}>
                {loading ? 'Procesando...' : 'Aceptar invitación'}
              </button>
            </div>
          ))}
        </div>
      </>
    );
  };
  
  export default Invitation;