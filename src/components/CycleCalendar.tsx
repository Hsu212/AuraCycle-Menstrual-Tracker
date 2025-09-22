import React from 'react';
import Calendar from 'react-calendar';
import '../styles/CycleCalendar.css';

interface Cycle {
  id?: string;
  startDate: string;
  endDate: string;
}

interface CycleCalendarProps {
  cycles: Cycle[];
  deleteCycle: (cycleId: string) => void;
}

const CycleCalendar: React.FC<CycleCalendarProps> = ({ cycles, deleteCycle }) => {
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
      <h2 className="cycle-calendar-title">Cycle Calendar</h2>
      {cycles.length === 0 ? (
        <p className="no-cycles-message">No cycles logged yet. 🌸</p>
      ) : (
        <div>
          <Calendar
            calendarType="gregory"
            tileClassName={tileClassName}
            className="border-none w-full"
          />
          <ul className="mt-4">
            {cycles.map((cycle, index) => (
              <li key={cycle.id || index} className="cycle-item">
                <span>Start: {cycle.startDate} | End: {cycle.endDate}</span>
                <button
                  className="delete-button"
                  onClick={() => cycle.id && deleteCycle(cycle.id)}
                  disabled={!cycle.id}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CycleCalendar;
