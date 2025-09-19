// HydrationTracker.tsx
import React, { useState } from 'react';
import '../styles/HydrationTracker.css'; // We'll define CSS below

interface HydrationTrackerProps {
  dailyGoal?: number; // Default to 8 glasses
}

const HydrationTracker: React.FC<HydrationTrackerProps> = ({ dailyGoal = 8 }) => {
  const [currentIntake, setCurrentIntake] = useState(0);

  const addGlass = () => {
    if (currentIntake < dailyGoal) {
      setCurrentIntake(currentIntake + 1);
    }
  };

  const resetTracker = () => {
    setCurrentIntake(0);
  };

  const progress = (currentIntake / dailyGoal) * 100;

  return (
    <div className="hydration-container">
      <h2>Hydration Tracker</h2>
      <p>Goal: {dailyGoal} glasses of water per day</p>
      <div className="progress-bar">
        <div
          className="progress-fill"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <p>Current: {currentIntake} / {dailyGoal} glasses</p>
      <button onClick={addGlass} disabled={currentIntake >= dailyGoal}>
        Add a Glass 💧
      </button>
      <button onClick={resetTracker}>Reset</button>
    </div>
  );
};

export default HydrationTracker;