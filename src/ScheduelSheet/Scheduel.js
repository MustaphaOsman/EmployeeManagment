import { useCalendarApp, ScheduleXCalendar } from '@schedule-x/react';
import { useState, useEffect } from 'react';
import {
  createViewDay,
  createViewMonthAgenda,
  createViewMonthGrid,
  createViewWeek,
} from '@schedule-x/calendar';
import { createEventsServicePlugin } from '@schedule-x/events-service';

import '@schedule-x/theme-default/dist/index.css';
import "../ScheduelSheet/Scheduel.css";

function CalendarApp() {
  const eventsService = createEventsServicePlugin();

  const [events, setEvents] = useState([]);

  const calendar = useCalendarApp({
    views: [createViewDay(), createViewWeek(), createViewMonthGrid(), createViewMonthAgenda()],
    events: events,
    plugins: [eventsService]
  });

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('https://localhost:7255/api/Timesheet/Details'); // **REPLACE with your API URL**
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

  

        setEvents(data); 

      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div>
      <ScheduleXCalendar calendarApp={calendar} />
    </div>
  );
}

export default CalendarApp;