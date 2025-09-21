import React, { useState } from 'react';
import '../styles/HydrationTracker.css';

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
      <h2 className="hydration-title">Hydration Tracker</h2>
      <p className="hydration-goal">Goal: {dailyGoal} glasses of water per day</p>
      <div className="progress-bar">
        <div
          className="progress-fill"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <p className="hydration-current">Current: {currentIntake} / {dailyGoal} glasses</p>
      {currentIntake >= dailyGoal && (
        <p className="hydration-complete">You reached the Goal! ✨</p>
      )}
      <div className="hydration-buttons">
        <button
          onClick={addGlass}
          disabled={currentIntake >= dailyGoal}
          className="hydration-button add-button"
        >
          Add a Glass 💧
        </button>
        <button onClick={resetTracker} className="hydration-button reset-button">
          Reset
        </button>
      </div>
    </div>
  );
};

export default HydrationTracker;
