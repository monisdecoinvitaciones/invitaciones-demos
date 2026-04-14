"use client";
import { motion } from "framer-motion";
import { Calendar, Apple } from "lucide-react";
import "./SaveTheDate.css";

const SaveTheDate = () => {
  const event = {
    title: "Mis XV Años: Luciana", // Cambiado a XV años como tu instrucción previa
    details: "¡Te espero para celebrar juntos una noche mágica!",
    location: "Quinta Las Palomas, Monterrey, N.L.",
    start: "20270724T170000", // 5:00 PM
    end: "20270725T020000",   // 2:00 AM
  };

  // Google Calendar Link
  const googleUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.title)}&details=${encodeURIComponent(event.details)}&location=${encodeURIComponent(event.location)}&dates=${event.start}/${event.end}`;

  const handleAppleCalendar = () => {
    const icsData = `BEGIN:VCALENDAR\nVERSION:2.0\nBEGIN:VEVENT\nSUMMARY:${event.title}\nDTSTART:${event.start}\nDTEND:${event.end}\nLOCATION:${event.location}\nDESCRIPTION:${event.details}\nEND:VEVENT\nEND:VCALENDAR`;
    const blob = new Blob([icsData], { type: "text/calendar;charset=utf-8" });
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute("download", "evento-mis-xv.ics");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section className="save-date-section">
      <motion.div 
        className="save-date-container"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        viewport={{ once: true }}
      >
        <h2 className="save-date-title">Agéndalo</h2>
        <p className="save-date-subtitle">No olvides guardar esta fecha especial</p>

        <div className="calendar-buttons">
          <motion.a 
            href={googleUrl} 
            target="_blank" 
            className="cal-btn google"
            whileHover={{ y: -5 }}
            whileTap={{ scale: 0.98 }}
          >
            <Calendar size={18} strokeWidth={1.5} />
            <span>Google Calendar</span>
          </motion.a>

          <motion.button 
            onClick={handleAppleCalendar} 
            className="cal-btn apple"
            whileHover={{ y: -5 }}
            whileTap={{ scale: 0.98 }}
          >
            <Apple size={18} strokeWidth={1.5} />
            <span>Apple / iCal</span>
          </motion.button>
        </div>
      </motion.div>
    </section>
  );
};

export default SaveTheDate;