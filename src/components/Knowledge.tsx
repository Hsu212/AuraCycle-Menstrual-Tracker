import React, { useState } from 'react';
import Tools from './Tools';
import '../styles/Knowledge.css';

const Knowledge: React.FC = () => {
  const [notes, setNotes] = useState('');

  return (
    <div className="knowledge-container">
      <div className="knowledge-section">
        <h2 className="knowledge-subtitle">Learn About Your Cycle 🌸</h2>
        <p className="knowledge-text">
          Your menstrual cycle is like a magical rhythm your body dances to every month! 💃 It’s a unique journey that can tell you so much about your health and energy. Here’s a peek into the four fabulous phases of your cycle, plus some fun facts to sparkle up your knowledge! ✨
        </p>
        <ul className="knowledge-list">
          <li><span className="phase-icon">🩸</span> <strong>Menstrual Phase (Day 1-5):</strong> Your period kicks off the cycle, shedding the uterine lining. It’s a time to rest, reflect, and pamper yourself with cozy vibes!</li>
          <li><span className="phase-icon">🌱</span> <strong>Follicular Phase (Day 1-13):</strong> Your body prepares for ovulation by growing follicles. Energy rises, so it’s perfect for planning and creativity!</li>
          <li><span className="phase-icon">🌺</span> <strong>Ovulation (Day 14):</strong> A star egg is released, and you’re at your peak glow! This is when fertility shines brightest.</li>
          <li><span className="phase-icon">🌙</span> <strong>Luteal Phase (Day 15-28):</strong> Your body preps for a potential pregnancy or the next cycle. Cravings and mood swings? Totally normal!</li>
        </ul>
        <p className="knowledge-text">
          <strong>Fun Facts:</strong> Did you know your cycle can vary from 21 to 35 days? Tracking it helps predict ovulation, manage symptoms, and embrace your body’s unique rhythm. If your cycle feels off or symptoms are intense, chat with a healthcare pro for extra sparkle! 💖
        </p>
        <br></br>
        <h2 className="knowledge-subtitle">Explore More Articles</h2>
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
        <div className="knowledge-decoration">
          <div className="floating-heart">💖</div>
          <div className="floating-flower">🌸</div>
          <div className="floating-heart">💕</div>
        </div>
      </div>
      <Tools />
    </div>
  );
};

export default Knowledge;
