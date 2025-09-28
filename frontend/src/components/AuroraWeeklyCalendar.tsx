import React, { useState } from 'react';
import type { EventDto } from '../services/apiService';
import './AuroraWeeklyCalendar.css';

interface AuroraWeeklyCalendarProps {
  onEventClick?: (event: EventDto) => void;
  onAddEvent?: (date: Date) => void;
}

const AuroraWeeklyCalendar: React.FC<AuroraWeeklyCalendarProps> = ({
  onEventClick,
  onAddEvent
}) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  // Get start of the week (Monday)
  const getWeekStart = (date: Date): Date => {
    const d = new Date(date);
    const day = d.getDay();
    const diff = d.getDate() - day + (day === 0 ? -6 : 1);
    return new Date(d.setDate(diff));
  };

  const weekStart = getWeekStart(currentDate);

  // Generate week dates
  const weekDates = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(weekStart);
    date.setDate(weekStart.getDate() + i);
    return date;
  });

  // Sample data for demonstration - replace with real API call
  const sampleEvents: EventDto[] = [
    {
      id: '1',
      title: 'Reunión de equipo',
      description: 'Reunión semanal del equipo de desarrollo',
      startDate: new Date(2025, 8, 27, 19, 28).toISOString(),
      endDate: new Date(2025, 8, 27, 20, 28).toISOString(),
      isAllDay: false,
      color: '#1447e6',
      isRecurring: false,
      eventCategory: {
        id: '1',
        name: 'Trabajo',
        color: '#1447e6',
        isSystemDefault: true,
        sortOrder: 1
      }
    },
    {
      id: '2',
      title: 'Gimnasio',
      description: 'Sesión de entrenamiento',
      startDate: new Date(2025, 8, 27, 23, 28).toISOString(),
      endDate: new Date(2025, 8, 28, 0, 58).toISOString(),
      isAllDay: false,
      color: '#ca3500',
      isRecurring: false,
      eventCategory: {
        id: '2',
        name: 'Ejercicio',
        color: '#ca3500',
        isSystemDefault: true,
        sortOrder: 2
      }
    },
    {
      id: '3',
      title: 'Clase de React Avanzado',
      description: 'Curso de programación',
      startDate: new Date(2025, 8, 28, 19, 28).toISOString(),
      endDate: new Date(2025, 8, 28, 21, 28).toISOString(),
      isAllDay: false,
      color: '#008236',
      isRecurring: false,
      eventCategory: {
        id: '3',
        name: 'Estudio',
        color: '#008236',
        isSystemDefault: true,
        sortOrder: 3
      }
    }
  ];

  // Navigation functions
  const goToPreviousWeek = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() - 7);
    setCurrentDate(newDate);
  };

  const goToNextWeek = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() + 7);
    setCurrentDate(newDate);
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  // Format functions
  const formatMonth = (date: Date): string => {
    const months = [
      'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
      'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
    ];
    return `${months[date.getMonth()]} ${date.getFullYear()}`;
  };

  const formatDayName = (date: Date): string => {
    const days = ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'];
    return days[date.getDay()];
  };

  const formatTime = (dateTime: string): string => {
    const date = new Date(dateTime);
    return date.toLocaleTimeString('es-ES', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });
  };

  const getEventTimeRange = (event: EventDto): string => {
    const startTime = formatTime(event.startDate);
    const endTime = formatTime(event.endDate);
    return `${startTime} - ${endTime}`;
  };

  const getEventsByDate = (date: Date): EventDto[] => {
    const dateStr = date.toISOString().split('T')[0];
    return sampleEvents.filter((event: EventDto) =>
      event.startDate.startsWith(dateStr)
    );
  };

  const getCategoryColor = (event: EventDto): { bg: string, border: string, text: string } => {
    const category = event.eventCategory;
    if (!category) return { bg: '#e4edff', border: '#1447e6', text: '#1447e6' };

    // Category color mapping based on Aurora design
    const colorMap: Record<string, { bg: string, border: string, text: string }> = {
      'trabajo': { bg: '#dbeafe', border: '#1447e6', text: '#1447e6' },
      'personal': { bg: '#fef3c7', border: '#ca3500', text: '#ca3500' },
      'estudio': { bg: '#dcfce7', border: '#008236', text: '#008236' },
      'salud': { bg: '#ffedd4', border: '#ca3500', text: '#ca3500' },
      'ejercicio': { bg: '#ffedd4', border: '#ca3500', text: '#ca3500' },
    };

    return colorMap[category.name.toLowerCase()] || { bg: '#e4edff', border: '#1447e6', text: '#1447e6' };
  };

  const isToday = (date: Date): boolean => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const getWeekNumber = (date: Date): number => {
    const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    const dayNum = d.getUTCDay() || 7;
    d.setUTCDate(d.getUTCDate() + 4 - dayNum);
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    return Math.ceil((((d.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);
  };

  const totalEvents = sampleEvents.length;

  return (
    <div className="aurora-weekly-calendar">
      {/* Header */}
      <div className="calendar-header">
        <div className="header-controls">
          <div className="nav-controls">
            <button className="nav-btn" onClick={goToPreviousWeek}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M10 12l-4-4 4-4" stroke="currentColor" strokeWidth="2" fill="none" />
              </svg>
            </button>
            <button className="nav-btn" onClick={goToNextWeek}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="2" fill="none" />
              </svg>
            </button>
            <h2 className="month-title">{formatMonth(currentDate)}</h2>
          </div>

          <div className="action-controls">
            <button className="today-btn" onClick={goToToday}>
              Hoy
            </button>
            <button className="settings-btn">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M8 10a2 2 0 100-4 2 2 0 000 4z" fill="currentColor" />
                <path fillRule="evenodd" d="M6.5 2a.5.5 0 01.5-.5h2a.5.5 0 01.5.5v1.086l.943.464a.5.5 0 01.235.664l-.5 1a.5.5 0 01-.664.235L8.5 5.086V6.5a.5.5 0 01-.5.5H7a.5.5 0 01-.5-.5V5.086l-1.019.363a.5.5 0 01-.664-.235l-.5-1a.5.5 0 01.235-.664L5.5 3.086V2z" fill="currentColor" />
              </svg>
            </button>
            <button className="add-event-btn" onClick={() => onAddEvent?.(new Date())}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="2" />
              </svg>
              Evento
            </button>
          </div>
        </div>

        {/* Week Days Header */}
        <div className="week-header">
          {weekDates.map((date, index) => (
            <div
              key={index}
              className={`day-header ${isToday(date) ? 'today' : ''}`}
            >
              <div className="day-name">{formatDayName(date)}</div>
              <div className="day-number">{date.getDate()}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="calendar-grid">
        {weekDates.map((date, dayIndex) => {
          const dayEvents = getEventsByDate(date);

          return (
            <div key={dayIndex} className="day-column">
              {dayEvents.length === 0 ? (
                <div className="add-event-placeholder" onClick={() => onAddEvent?.(date)}>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M10 4v12M4 10h12" stroke="currentColor" strokeWidth="2" />
                  </svg>
                  <span>Agregar evento</span>
                </div>
              ) : (
                <div className="events-container">
                  {dayEvents.map((event) => {
                    const colors = getCategoryColor(event);

                    return (
                      <div
                        key={event.id}
                        className="event-card"
                        style={{
                          backgroundColor: colors.bg,
                          borderLeftColor: colors.border,
                          color: colors.text
                        }}
                        onClick={() => onEventClick?.(event)}
                      >
                        <div className="event-title">{event.title}</div>
                        <div className="event-time">{getEventTimeRange(event)}</div>
                        <div className="event-priority">
                          {Array.from({ length: 4 }).map((_, i) => (
                            <svg key={i} width="12" height="12" viewBox="0 0 12 12" fill="none">
                              <circle cx="6" cy="6" r="2" fill="currentColor" />
                            </svg>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div className="calendar-footer">
        <div className="events-summary">
          {totalEvents} eventos esta semana
        </div>
        <div className="week-badge">
          Semana {getWeekNumber(currentDate)}
        </div>
      </div>
    </div>
  );
};

export default AuroraWeeklyCalendar;