import React from 'react';
import Calendar from 'react-calendar';
import '../styles/CycleCalendar.css';

interface Cycle {
  startDate: string;
  endDate: string;
}

interface CycleCalendarProps {
  cycles: Cycle[];
}

const CycleCalendar: React.FC<CycleCalendarProps> = ({ cycles }) => {
  const tileClassName = ({ date, view }: { date: Date; view: string }) => {
    if (view !== 'month') return '';
    const dateStr = date.toISOString().split('T')[0];
    const isCycleDate = cycles.some(cycle => {
      const start = new Date(cycle.startDate);
      const end = new Date(cycle.endDate);
      return date >= start && date <= end;
    });
    return isCycleDate ? 'cycle-date bg-pink-300 text-gray-800 rounded-full' : 'default-date bg-white text-gray-800';
  };

  return (
    <div className="cycle-calendar bg-white p-5 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Cycle Calendar</h2>
      {cycles.length === 0 ? (
        <p className="text-gray-600">No cycles logged yet.</p>
      ) : (
        <div>
          <Calendar
            calendarType="gregory"
            tileClassName={tileClassName}
            className="border-none w-full"
          />
          <ul className="mt-4">
            {cycles.map((cycle, index) => (
              <li key={index} className="cycle-item p-2 bg-gray-100 rounded mb-2 text-gray-800">
                Start: {cycle.startDate} | End: {cycle.endDate}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CycleCalendar;
