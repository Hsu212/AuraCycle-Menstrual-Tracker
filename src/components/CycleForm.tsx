import React, { useState } from 'react';
import '../styles/CycleForm.css';

interface CycleFormProps {
  addCycle: (startDate: string, endDate: string) => void;
  resetCycles: () => void;
}

const CycleForm: React.FC<CycleFormProps> = ({ addCycle, resetCycles }) => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!startDate || !endDate) {
      setError('Please fill in all fields');
      return;
    }
    try {
      await addCycle(startDate, endDate);
      setStartDate('');
      setEndDate('');
      setError('');
    } catch (error: any) {
      setError(error.message || 'Failed to add cycle');
    }
  };

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset all cycle data? This cannot be undone.')) {
      resetCycles();
    }
  };

  return (
    <div className="cycle-form-container">
      <h2 className="cycle-form-title">Add Cycle</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit} className="cycle-form">
        <div className="input-group">
          <label>Start Date</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
            className="input-field"
          />
        </div>
        <div className="input-group">
          <label>End Date</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            required
            className="input-field"
          />
        </div>
        <div className="button-group">
          <button type="submit" className="submit-button">Add Cycle</button>
          <button type="button" className="reset-button" onClick={handleReset}>Reset All Cycles</button>
        </div>
      </form>
      <div className="form-decoration">
        <div className="floating-heart">💕</div>
      </div>
    </div>
  );
};

export default CycleForm;
