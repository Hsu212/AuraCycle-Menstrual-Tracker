import React, { useState } from 'react';
import Tools from './Tools';
import '../styles/Knowledge.css';

const Knowledge: React.FC = () => {
  const [notes, setNotes] = useState('');

  return (
    <div className="knowledge-container">
      <div className="knowledge-section">
        <h2 className="knowledge-subtitle">Learn About Your Cycle</h2>
        <p className="knowledge-text">
          Understanding your menstrual cycle can help you better manage your health. Here are some key points:
        </p>
        <ul className="knowledge-list">
          <li>The menstrual cycle typically lasts 28 days, but can vary between 21-35 days.</li>
          <li>It consists of four phases: menstrual, follicular, ovulation, and luteal.</li>
          <li>Tracking your cycle can help predict ovulation and manage symptoms.</li>
          <li>Hormonal changes can affect mood, energy, and physical symptoms.</li>
          <li>Consult a healthcare provider for irregular cycles or severe symptoms.</li>
        </ul>
        <h2 className="knowledge-subtitle">Articles on Menstruation</h2>
        <ul className="knowledge-article-list">
          <li>
            <a href="https://www.ncbi.nlm.nih.gov/books/NBK500020/" target="_blank" rel="noopener noreferrer">
              Physiology, Menstrual Cycle - StatPearls - NCBI Bookshelf
            </a>
          </li>
          <li>
            <a href="https://my.clevelandclinic.org/health/articles/10132-menstrual-cycle" target="_blank" rel="noopener noreferrer">
              Menstrual Cycle (Normal Menstruation): Overview & Phases - Cleveland Clinic
            </a>
          </li>
          <li>
            <a href="https://www.sciencedirect.com/science/article/abs/pii/S2666571924000380" target="_blank" rel="noopener noreferrer">
              The menstrual cycle as a vital sign: a comprehensive review - ScienceDirect
            </a>
          </li>
          <li>
            <a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC8363181/" target="_blank" rel="noopener noreferrer">
              How to study the menstrual cycle: Practical tools and recommendations - PMC
            </a>
          </li>
          <li>
            <a href="https://hsph.harvard.edu/research/apple-womens-health-study/study-updates/" target="_blank" rel="noopener noreferrer">
              Study Updates | Apple Women's Health Study
            </a>
          </li>
        </ul>
        
      </div>
      <Tools />
    </div>
  );
};

export default Knowledge;
