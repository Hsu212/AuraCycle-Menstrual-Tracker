import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import CycleForm from './components/CycleForm';
import CycleCalendar from './components/CycleCalendar';
import CycleSummary from './components/CycleSummary';
import SelfCarePage from './components/SelfCare';
import HygienePage from './components/Hygiene';
import Knowledge from './components/Knowledge';
import './styles/App.css';

interface Cycle {
  startDate: string;
  endDate: string;
}

const App: React.FC = () => {
  const [cycles, setCycles] = useState<Cycle[]>([]);

  const addCycle = (startDate: string, endDate: string) => {
    setCycles([...cycles, { startDate, endDate }]);
  };

  return (
    <BrowserRouter>
      <div className="app-container">
        <Navbar />
        <div className="content">
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <h1>Aura Cycle</h1>
                  <CycleForm addCycle={addCycle} />
                  <CycleSummary cycles={cycles} />
                  <CycleCalendar cycles={cycles} />
                </>
              }
            />
            <Route path="/self-care" element={<SelfCarePage />} />
            <Route path="/hygiene" element={<HygienePage />} />
            <Route path="/knowledge" element={<Knowledge />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;