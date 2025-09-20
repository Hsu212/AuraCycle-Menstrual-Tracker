import React, { useState } from 'react';

const Knowledge: React.FC = () => {
  const [notes, setNotes] = useState('');

  return (
    <div className="max-w-2xl mx-auto p-5">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Knowledge</h1>
      <div className="bg-white p-5 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">Learn About Your Cycle</h2>
        <p className="text-gray-600 mb-4">
          Understanding your menstrual cycle can help you better manage your health. Here are some key points:
        </p>
        <ul className="list-disc pl-5 text-gray-600 mb-4">
          <li>The menstrual cycle typically lasts 28 days, but can vary between 21-35 days.</li>
          <li>It consists of four phases: menstrual, follicular, ovulation, and luteal.</li>
          <li>Tracking your cycle can help predict ovulation and manage symptoms.</li>
          <li>Hormonal changes can affect mood, energy, and physical symptoms.</li>
          <li>Consult a healthcare provider for irregular cycles or severe symptoms.</li>
        </ul>
        <h2 className="text-xl font-semibold text-gray-800 mb-2">Your Notes</h2>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded text-base"
          rows={5}
          placeholder="Write your notes or questions here..."
        />
      </div>
    </div>
  );
};

export default Knowledge;