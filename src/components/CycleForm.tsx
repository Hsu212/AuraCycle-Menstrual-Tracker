import React, { useState } from 'react';
import '../styles/CycleForm.css';

interface CycleFormProps {
  addCycle: (startDate: string, endDate: string) => void;
}

const CycleForm: React.FC<CycleFormProps> = ({ addCycle }) => {
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

  return (
    <div className="cycle-form-container">
      <h2>Add Cycle</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label>Start Date</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label>End Date</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="submit-button">Add Cycle</button>
      </form>
    </div>
  );
};

export default CycleForm;