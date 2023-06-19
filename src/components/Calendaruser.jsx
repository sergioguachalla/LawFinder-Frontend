// AudienceCalendar.js
import React, { useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import useStore, { fetchAudiences } from '../store/calendarStore';
import 'react-big-calendar/lib/css/react-big-calendar.css';


const localizer = momentLocalizer(moment);

const AudienceCalendar = () => {
  const audiences = useStore(state => state.audiences);

  useEffect(() => {
    fetchAudiences();
  }, []);

  const events = audiences.map(audience => ({
    start: new Date(audience.audienceDate),
    end: new Date(audience.audienceDate), // En caso de que la audiencia tenga una duración, debe especificar una fecha/hora de finalización.
    title: audience.description,
  }));

  return (
    <div style={{ height: 500 }}>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
      />
    </div>
  );
};

export default AudienceCalendar;
