"use client";
import { useState } from "react";
import Calendar, { CalendarProps } from "react-calendar";
import "react-calendar/dist/Calendar.css";

interface Reservations {
  [key: string]: number;
}

const ReservationCalendar: React.FC = () => {
  const [date, setDate] = useState<Date | [Date, Date]>(new Date());
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [reservations, setReservations] = useState<Reservations>({});

  const times = [
    "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
    "12:00", "12:30", "13:00", "13:30", "14:00", "14:30",
    "15:00", "15:30", "16:00", "16:30", "17:00", "17:30","18:00", "18:30", "19:00", "19:30"
  ];

  const handleReservation = () => {
    if (!selectedTime) return;

    const selectedDate = Array.isArray(date) ? date[0] : date;
    const dateString = selectedDate.toISOString().split("T")[0];
    const key = `${dateString}-${selectedTime}`;
    if (reservations[key] === 2) return;

    setReservations((prev) => ({
      ...prev,
      [key]: (prev[key] || 0) + 1,
    }));

    setSelectedTime(null);
  };

  const renderTimeSlots = () => {
    const selectedDate = Array.isArray(date) ? date[0] : date;
    const dateString = selectedDate.toISOString().split("T")[0];

    return times.map((time) => {
      const key = `${dateString}-${time}`;
      const reservationCount = reservations[key] || 0;
      const buttonColor =
        reservationCount === 2
          ? "bg-gray-500"
          : reservationCount === 1
          ? "bg-red-500"
          : "bg-green-500";

      return (
        <button
          key={key}
          className={`time-slot ${buttonColor} m-1 p-2 rounded ${
            selectedTime === time ? "border-2 border-blue-500" : ""
          }`}
          onClick={() => setSelectedTime(time)}
        >
          {time}
        </button>
      );
    });
  };

  return (
    <div className="reservation-calendar">
      <Calendar
        onChange={(value: CalendarProps["value"]) => setDate(value as Date | [Date, Date])}
        value={date}
      />
      <div className="time-slots grid grid-cols-4 gap-2 mt-4">
        {renderTimeSlots()}
      </div>
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
