import React, { useState } from 'react';
import '../styles/Hygiene.css'; // We'll define CSS below

const HygienePage: React.FC = () => {
  const [selectedFlow, setSelectedFlow] = useState<string | null>(null);
  const [concerns, setConcerns] = useState<string[]>([]);
  const [selectedMood, setSelectedMood] = useState<string | null>(null);

  const flowOptions = [
    { name: 'Light', color: '#f8d7da' }, // Pastel pink
    { name: 'Medium', color: '#ffd1b3' }, // Peach
    { name: 'Heavy', color: '#e6d3f8' }, // Lavender
  ];

  const concernOptions = [
    'Cramps',
    'Bloating',
    'Fatigue',
    'Mood Swings',
    'Headache',
  ];

  const moodOptions = [
    { emoji: '😊', label: 'Happy' },
    { emoji: '😔', label: 'Sad' },
    { emoji: '😴', label: 'Tired' },
    { emoji: '😣', label: 'Irritated' },
    { emoji: '🥰', label: 'Loved' },
  ];

  const handleConcernChange = (concern: string) => {
    setConcerns(prev =>
      prev.includes(concern)
        ? prev.filter(c => c !== concern)
        : [...prev, concern]
    );
  };

  return (
    <div className="hygiene-container">

      <div className="tracker-section">
        <h2>Period Flow</h2>
        <div className="flow-options">
          {flowOptions.map(flow => (
            <button
              key={flow.name}
              className={`flow-button ${selectedFlow === flow.name ? 'active' : ''}`}
              style={{ backgroundColor: flow.color }}
              onClick={() => setSelectedFlow(flow.name)}
            >
              {flow.name}
            </button>
          ))}
        </div>
      </div>

      <div className="tracker-section">
        <h2>Concerns Today</h2>
        <div className="concerns-list">
          {concernOptions.map(concern => (
            <label key={concern} className="concern-item">
              <input
                type="checkbox"
                checked={concerns.includes(concern)}
                onChange={() => handleConcernChange(concern)}
              />
              <span>{concern}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="tracker-section">
        <h2>How You Feel Today</h2>
        <div className="mood-options">
          {moodOptions.map(mood => (
            <button
              key={mood.label}
              className={`mood-button ${selectedMood === mood.label ? 'active' : ''}`}
              onClick={() => setSelectedMood(mood.label)}
            >
              {mood.emoji} {mood.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HygienePage;