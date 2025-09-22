import React from 'react';
import '../styles/CyclePredictions.css';

interface Cycle {
  startDate: string;
  endDate: string;
}

interface CyclePredictionsProps {
  cycles: Cycle[];
}

const CyclePredictions: React.FC<CyclePredictionsProps> = ({ cycles }) => {
  const calculatePredictions = () => {
    if (cycles.length === 0) {
      return {
        ovulation: 'N/A',
        fertileWindow: 'N/A',
        nextPeriod: 'N/A',
      };
    }

    // Calculate average cycle length
    let totalCycleLength = 0;
    let validCycles = 0;
    for (let i = 1; i < cycles.length; i++) {
      const prevStart = new Date(cycles[i - 1].startDate);
      const currStart = new Date(cycles[i].startDate);
      const diffDays = (currStart.getTime() - prevStart.getTime()) / (1000 * 3600 * 24);
      if (diffDays > 0) {
        totalCycleLength += diffDays;
        validCycles++;
      }
    }
    const avgCycleLength = validCycles > 0 ? Math.round(totalCycleLength / validCycles) : 28;

    // Get last cycle's start date
    const lastCycleStart = new Date(cycles[cycles.length - 1].startDate);

    // Next period: Add average cycle length to last start date
    const nextPeriodDate = new Date(lastCycleStart);
    nextPeriodDate.setDate(lastCycleStart.getDate() + avgCycleLength);

    // Ovulation: ~14 days before next period
    const ovulationDate = new Date(nextPeriodDate);
    ovulationDate.setDate(nextPeriodDate.getDate() - 14);

    // Fertile window: 5 days before and including ovulation
    const fertileStart = new Date(ovulationDate);
    fertileStart.setDate(ovulationDate.getDate() - 5);

    return {
      ovulation: ovulationDate.toISOString().split('T')[0],
      fertileWindow: `${fertileStart.toISOString().split('T')[0]} to ${ovulationDate.toISOString().split('T')[0]}`,
      nextPeriod: nextPeriodDate.toISOString().split('T')[0],
    };
  };

  const predictions = calculatePredictions();

  return (
    <div className="predictions-container">
      <h2 className="predictions-title">Cycle Predictions</h2>
      {cycles.length === 0 ? (
        <p className="no-data-message">Log a cycle to see predictions! 🌸</p>
      ) : (
        <div className="predictions-grid">
          <div className="prediction-item">
            <span className="prediction-icon">🌺</span>
            <h3>Ovulation</h3>
            <p>{predictions.ovulation}</p>
          </div>
          <div className="prediction-item">
            <span className="prediction-icon">💫</span>
            <h3>Fertile Window</h3>
            <p>{predictions.fertileWindow}</p>
          </div>
          <div className="prediction-item">
            <span className="prediction-icon">🩸</span>
            <h3>Next Period</h3>
            <p>{predictions.nextPeriod}</p>
          </div>
        </div>
      )}
      
    </div>
  );
};

export default CyclePredictions;