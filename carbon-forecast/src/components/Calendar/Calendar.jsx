import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

const CalendarComponent = () => {
  const [events, setEvents] = useState([
    {
      title: "Test Event",
      start: new Date(2025, 3, 17, 9, 0), 
      end: new Date(2025, 3, 17, 11, 0), 
      allDay: false,
    },
  ]);

  const [newEvent, setNewEvent] = useState({
    title: "",
    startDate: new Date().toISOString().split("T")[0],
    startTime: "09:00",
    endDate: new Date().toISOString().split("T")[0],
    endTime: "10:00",
  });

  const [date, setDate] = useState(() => {
    const storedDate = localStorage.getItem("calendarDate");
    return storedDate ? new Date(storedDate) : new Date();
  });

  const [view, setView] = useState(() => {
    const storedView = localStorage.getItem("calendarView");
    return storedView || "month";
  });

  useEffect(() => {
    localStorage.setItem("calendarDate", date.toISOString());
    localStorage.setItem("calendarView", view);
  }, [date, view]);

  const handleAddEvent = () => {
    if (!newEvent.title || !newEvent.startDate || !newEvent.startTime || !newEvent.endDate || !newEvent.endTime) {
      alert("Please fill out all fields before adding an event.");
      return;
    }

    const start = new Date(`${newEvent.startDate}T${newEvent.startTime}`);
    const end = new Date(`${newEvent.endDate}T${newEvent.endTime}`);

    if (start >= end) {
      alert("The end time must be after the start time.");
      return;
    }

    setEvents([
      ...events,
      {
        title: newEvent.title,
        start,
        end,
        allDay: false,
      },
    ]);

    setNewEvent({
      title: "",
      startDate: new Date().toISOString().split("T")[0],
      startTime: "09:00",
      endDate: new Date().toISOString().split("T")[0],
      endTime: "10:00",
    });
  };

  const handleDeleteEvent = (event) => {
    const confirmed = window.confirm(`Are you sure you want to delete "${event.title}"?`);
    if (confirmed) {
      setEvents(events.filter((e) => e !== event));
    }
  };

  const handleViewChange = (newView) => {
    setView(newView);
  };

  const handleNavigate = (newDate) => {
    setDate(newDate);
  };

  return (
    <div style={{ height: "100%", padding: "20px" }}>
      <div style={{ marginBottom: "20px" }}>
        <h2>Add Event</h2>
        <input
          type="text"
          placeholder="Event Title"
          value={newEvent.title}
          onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
          style={{ marginRight: "10px", padding: "5px", width: "200px" }}
        />
        <input
          type="date"
          value={newEvent.startDate}
          onChange={(e) => setNewEvent({ ...newEvent, startDate: e.target.value })}
          style={{ marginRight: "10px", padding: "5px" }}
        />
        <input
          type="time"
          value={newEvent.startTime}
          onChange={(e) => setNewEvent({ ...newEvent, startTime: e.target.value })}
          style={{ marginRight: "10px", padding: "5px" }}
        />
        <span> to </span>
        <input
          type="date"
          value={newEvent.endDate}
          onChange={(e) => setNewEvent({ ...newEvent, endDate: e.target.value })}
          style={{ marginRight: "10px", padding: "5px" }}
        />
        <input
          type="time"
          value={newEvent.endTime}
          onChange={(e) => setNewEvent({ ...newEvent, endTime: e.target.value })}
          style={{ marginRight: "10px", padding: "5px" }}
        />
        <button onClick={handleAddEvent} style={{ padding: "5px 10px" }}>
          Add Event
        </button>
      </div>

      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        views={["month", "week", "day", "agenda"]}
        date={date}
        view={view}
        onView={handleViewChange}
        onNavigate={handleNavigate}
        onSelectEvent={(event) => handleDeleteEvent(event)}
        style={{ height: "80vh", backgroundColor: "#f8f9fa", borderRadius: "8px" }}
      />
    </div>
  );
};

export default CalendarComponent;
