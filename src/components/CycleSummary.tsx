import React from 'react';
import '../styles/CycleSummary.css';

interface Cycle {
  startDate: string;
  endDate: string;
}

interface CycleSummaryProps {
  cycles: Cycle[];
}

const CycleSummary: React.FC<CycleSummaryProps> = ({ cycles }) => {
  const calculateAverageCycleLength = () => {
    if (cycles.length === 0) return 0;
    const totalDays = cycles.reduce((sum, cycle) => {
      const start = new Date(cycle.startDate);
      const end = new Date(cycle.endDate);
      const diffTime = Math.abs(end.getTime() - start.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return sum + diffDays;
    }, 0);
    return (totalDays / cycles.length).toFixed(1);
  };

  return (
    <div className="cycle-summary bg-white p-5 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Cycle Summary</h2>
      <p className="text-gray-600">Total Cycles Logged: {cycles.length}</p>
      <p className="text-gray-600">Average Cycle Length: {calculateAverageCycleLength()} days</p>
    </div>
  );
};

export default CycleSummary;