// AudienceCalendar.js
import React, { useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import useStore from '../store/calendarStore';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

const AudienceCalendar = () => {
  const { audiences, fetchAudiences } = useStore((state) => state);

  useEffect(() => {
    fetchAudiences();
  }, [fetchAudiences]);

  const events = audiences.map((audience) => {
    const date = new Date(audience.audienceDate);
    const endDate = new Date(date.getTime() + 60 * 60 * 1000); // Suponemos que cada audiencia dura 1 hora.
    return {
      start: date,
      end: endDate,
      title: `${moment(date).format('HH:mm')} - ${audience.description} @ ${audience.address}`,
      desc: audience.description,
      link: audience.link,
      address: audience.address,
    };
  });

  return (
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
            cursor: event.link ? 'pointer' : 'default',
          };
          return {
            style,
          };
        }}
        onSelectEvent={(event) => {
          if (event.link) {
            window.open(event.link, "_blank");
          } else {
            alert(`Descripción: ${event.desc}\nDirección: ${event.address}`);
          }
        }}
      />
    </div>
  );
};

export default AudienceCalendar;
