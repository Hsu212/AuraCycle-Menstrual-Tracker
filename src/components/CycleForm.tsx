import React, { useState } from 'react';
import '../styles/CycleForm.css';

interface CycleFormProps {
  addCycle: (startDate: string, endDate: string) => void;
}

const CycleForm: React.FC<CycleFormProps> = ({ addCycle }) => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (startDate && endDate) {
      addCycle(startDate, endDate);
      setStartDate('');
      setEndDate('');
    }
  };

  return (
    <div className="cycle-form bg-white p-5 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Log New Cycle</h2>
      <div className="form-group mb-4">
        <label className="block text-sm text-gray-600 mb-2">Start Date</label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="form-input w-full p-2 border border-gray-300 rounded text-base"
        />
      </div>
      <div className="form-group mb-4">
        <label className="block text-sm text-gray-600 mb-2">End Date</label>
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="form-input w-full p-2 border border-gray-300 rounded text-base"
        />
      </div>
      <button
        onClick={handleSubmit}
        className="form-button w-full p-2 bg-blue-600 text-white rounded text-base hover:bg-blue-700"
      >
        Log Cycle
      </button>
    </div>
  );
};

export default CycleForm;