"use client";
import { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

interface Reservations {
  [key: string]: number;
}

const ReservationCalendar: React.FC = () => {
  const [date, setDate] = useState<Date | null>(new Date());
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [reservations, setReservations] = useState<Reservations>(() => {
    const savedReservations = localStorage.getItem('reservations');
    return savedReservations ? JSON.parse(savedReservations) : {};
  });
  const [message, setMessage] = useState<string | null>(null);

  const times = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
    '15:00', '15:30', '16:00', '16:30', '17:00', '17:30',
  ];

  useEffect(() => {
    localStorage.setItem('reservations', JSON.stringify(reservations));
  }, [reservations]);

  const handleReservation = () => {
    if (!selectedTime || !date) return;

    const dateString = date.toISOString().split('T')[0];
    const key = `${dateString}-${selectedTime}`;
    if (reservations[key] === 2) {
      setMessage('This slot is full. No reservations can be placed.');
      return;
    }

    setReservations(prev => ({
      ...prev,
      [key]: (prev[key] || 0) + 1
    }));

    setSelectedTime(null);
    setMessage(null);
  };

  const renderTimeSlots = () => {
    if (!date) return null;

    const dateString = date.toISOString().split('T')[0];

    return times.map(time => {
      const key = `${dateString}-${time}`;
      const reservationCount = reservations[key] || 0;
      const buttonColor = reservationCount === 2 ? 'bg-gray-500' : reservationCount === 1 ? 'bg-red-500' : 'bg-green-500';
      const hoverMessage = reservationCount === 2 ? 'No reservations can be placed' : reservationCount === 1 ? '1 reservation left' : '2 reservations left';

      return (
        <button
          key={key}
          className={`time-slot ${buttonColor} m-1 p-2 rounded ${selectedTime === time ? 'border-2 border-blue-500' : ''}`}
          onClick={() => {
            if (reservationCount === 2) {
              setMessage('This slot is full. No reservations can be placed.');
            } else {
              setSelectedTime(time);
              setMessage(null);
            }
          }}
          title={hoverMessage}
        >
          {time}
        </button>
      );
    });
  };

  return (
    <div className="reservation-calendar">
      <Calendar
        onChange={(value) => setDate(value as Date)}
        value={date}
        tileDisabled={({ date }) => date.getDay() === 0 || date < new Date(new Date().setHours(0, 0, 0, 0))} // Disable Sundays and past dates
        className="text-gray-700 mx-auto w-[500px]"
      />
      <div className="time-slots grid grid-cols-4 gap-2 mt-4">
        {renderTimeSlots()}
      </div>
      {message && <div className="message text-red-500 mt-2">{message}</div>}
      <button
        className="make-reservation-button bg-blue-500 text-white p-2 mt-4 rounded"
        onClick={handleReservation}
        disabled={!selectedTime}
      >
        Make a Reservation
      </button>
    </div>
  );
};

export default ReservationCalendar;