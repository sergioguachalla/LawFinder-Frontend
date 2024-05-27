import React, { useEffect, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import useStore from '../store/calendarStore';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import Modal from 'react-modal';
import Navbar from "./Navbar";
import '../styles/Calendar.css';

const localizer = momentLocalizer(moment);

Modal.setAppElement('#root'); 

const AudienceCalendar = () => {
  const { audiences, fetchAudiences } = useStore((state) => state);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      transform: 'translate(-50%, -50%)',
      width: '40%', 
      border: '1px solid #ccc',
      borderRadius: '4px',
      padding: '20px',
      position: 'relative', 
    },
    overlay: { zIndex: 1000 },
    closeButton: {
      fontSize: '1.5em',
      position: 'absolute', 
      top: '12px', 
      right: '10px',
      borderRadius: '45%',
   
    },
  };

  useEffect(() => {
    fetchAudiences();
  }, [fetchAudiences]);

  const events = audiences.map((audience) => {
    const date = new Date(audience.audienceDate); 
    const endDate = new Date(date.getTime() + 60 * 60 * 1000); // Suponemos que cada audiencia dura 1 hora.
    return {
      start: date,
      end: endDate,
      title: `${moment(date).format('HH:mm')} - ${audience.description}`,
      desc: audience.description,
      link: audience.link,
      address: audience.address,
    };
  });

  const openModal = (event) => {
    setSelectedEvent(event);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <>
      <Navbar/>
      <h1 className='Calendar-title'>Agenda de audiencias</h1>
      <div style={{ height: 500 }}>
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          titleAccessor="title"
          tooltipAccessor="desc"
          eventPropGetter={(event) => {
            const backgroundColor = '#f0f0f0';
            const style = {
              backgroundColor,
              borderRadius: '0',
              opacity: 0.8,
              color: 'black',
              border: '0',
              display: 'block',
              cursor: 'pointer',
            };
            return {
              style,
            };
          }}
          onSelectEvent={openModal}
        />

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Detalles del evento"
        style={customStyles} // Añade los estilos personalizados aquí
      >
        <h2>{selectedEvent?.title}</h2>
        <p>Descripción: {selectedEvent?.desc}</p>
        <p>Dirección: {selectedEvent?.address}</p>
        <p>Link de la audiencia: {selectedEvent?.link && <a href={selectedEvent.link} target="_blank" rel="noopener noreferrer">Ingresar</a>}</p>
        
        <button onClick={closeModal} style={customStyles.closeButton}>X</button>
      </Modal>
      </div>
    </>
  );
};

export default AudienceCalendar;
