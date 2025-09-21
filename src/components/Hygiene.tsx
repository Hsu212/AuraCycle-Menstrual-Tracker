import React, { useState } from 'react';
import '../styles/Hygiene.css';

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

  const healthTips = {
    Light: [
      'Stay hydrated with water or herbal teas to support light flow days.',
      'Try gentle yoga to keep your body relaxed and comfortable.',
      'Eat iron-rich foods like spinach to maintain energy levels.',
    ],
    Medium: [
      'Use a heating pad to ease any mild discomfort during medium flow.',
      'Incorporate fruits like berries for antioxidants and energy.',
      'Take short walks to boost circulation and mood.',
    ],
    Heavy: [
      'Rest when needed and use overnight pads for heavy flow days.',
      'Try warm baths to relax muscles and reduce tension.',
      'Eat foods rich in vitamin C to aid iron absorption.',
    ],
    Cramps: [
      'Apply a warm compress to soothe cramps and relax muscles.',
      'Try chamomile tea to reduce inflammation and calm cramps.',
      'Gentle stretching can help alleviate cramping discomfort.',
    ],
    Bloating: [
      'Avoid salty foods to reduce water retention and bloating.',
      'Sip peppermint tea to ease bloating and digestive discomfort.',
      'Wear loose, comfortable clothing to feel at ease.',
    ],
    Fatigue: [
      'Take short naps or rest breaks to combat fatigue.',
      'Eat small, frequent meals to maintain steady energy levels.',
      'Try light exercise like stretching to boost energy.',
    ],
    'Mood Swings': [
      'Practice deep breathing or meditation to stabilize your mood.',
      'Connect with a friend or loved one for emotional support.',
      'Journal your feelings to process mood swings calmly.',
    ],
    Headache: [
      'Stay hydrated to help reduce headache intensity.',
      'Try a cool compress on your forehead for headache relief.',
      'Rest in a quiet, dark room to ease headache symptoms.',
    ],
    generic: [
      'Prioritize self-care with a relaxing bath or cozy time.',
      'Stay active with light movement to boost your mood.',
      'Eat a balanced diet to support overall well-being.',
    ],
  };

  const getRandomTip = (key: string) => {
    const tips = healthTips[key as keyof typeof healthTips] || healthTips.generic;
    return tips[Math.floor(Math.random() * tips.length)];
  };

  const generateHealthTips = () => {
    const tips: string[] = [];
    if (selectedFlow) {
      tips.push(getRandomTip(selectedFlow));
    }
    concerns.forEach(concern => {
      tips.push(getRandomTip(concern));
    });
    if (tips.length === 0) {
      tips.push(getRandomTip('generic'));
    }
    return tips;
  };

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

      <div className="tracker-section health-summary">
        <h2>Health Summary</h2>
        {selectedFlow || concerns.length > 0 || selectedMood ? (
          <div className="summary-content">
            {selectedFlow && (
              <p>
                <strong>Period Flow:</strong> {selectedFlow}
              </p>
            )}
            {concerns.length > 0 ? (
              <p>
                <strong>Concerns:</strong> {concerns.join(', ')}
              </p>
            ) : (
              <p>No concerns selected.</p>
            )}
            {selectedMood && (
              <p>
                <strong>Mood:</strong> {selectedMood}
              </p>
            )}
            <div className="health-tips">
              <h3>Health Tips</h3>
              <ul>
                {generateHealthTips().map((tip, index) => (
                  <li key={index}>{tip}</li>
                ))}
              </ul>
            </div>
          </div>
        ) : (
          <p className="no-summary">No health details selected yet.</p>
        )}
      </div>
    </div>
  );
};

export default HygienePage;
