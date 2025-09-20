import React from 'react';
import '../styles/CycleSummary.css';

interface Cycle {
  id?: string;
  startDate: string;
  endDate: string;
}

interface CycleSummaryProps {
  cycles: Cycle[];
}

const CycleSummary: React.FC<CycleSummaryProps> = ({ cycles }) => {
  return (
    <div className="cycle-summary-container">
      <h2>Cycle Summary</h2>
      {cycles.length === 0 ? (
        <p>No cycles recorded yet.</p>
      ) : (
        <ul>
          {cycles.map((cycle) => (
            <li key={cycle.id || `${cycle.startDate}-${cycle.endDate}`}>
              {cycle.startDate} to {cycle.endDate}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CycleSummary;