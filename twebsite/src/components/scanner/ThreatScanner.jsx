import React, { useState, useEffect } from 'react';
import { Search, Loader2, ShieldCheck, AlertTriangle } from 'lucide-react';
import './ThreatScanner.css';

const PHASES = [
  { id: 'idle', text: '' },
  { id: 'init', text: 'Initializing ThreatCheck engine...', duration: 800 },
  { id: 'collect', text: 'Collecting intelligence (DNS, SSL, Malware)...', duration: 1500 },
  { id: 'correlate', text: 'Correlating security signals...', duration: 1200 },
  { id: 'calculate', text: 'Calculating threat confidence...', duration: 1000 },
  { id: 'complete', text: 'Threat analysis complete.', duration: 500 }
];

export default function ThreatScanner({ onScanComplete }) {
  const [input, setInput] = useState('');
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [isScanning, setIsScanning] = useState(false);

  useEffect(() => {
    if (!isScanning || phaseIndex === 0) return;

    const currentPhase = PHASES[phaseIndex];
    if (currentPhase.id === 'complete') {
      const timer = setTimeout(() => {
        setIsScanning(false);
        // Mock score generation based on input length/hash for consistency
        const mockScore = input.includes('malicious') ? 87 : (input.length * 7) % 100;
        onScanComplete({ indicator: input, score: mockScore });
        setPhaseIndex(0);
      }, currentPhase.duration);
      return () => clearTimeout(timer);
    }

    const timer = setTimeout(() => {
      setPhaseIndex(prev => prev + 1);
    }, currentPhase.duration);

    return () => clearTimeout(timer);
  }, [isScanning, phaseIndex, input, onScanComplete]);

  const handleScan = (e) => {
    e.preventDefault();
    if (!input.trim() || isScanning) return;
    setIsScanning(true);
    setPhaseIndex(1); // start init
  };

  const currentPhase = PHASES[phaseIndex];

  return (
    <div className="tc-scanner-container tc-glow-card">
      <div className="tc-scanner-header">
        <h3>Threat Intelligence Scanner</h3>
        <p>Analyze suspicious URLs, domains, IPs, or file hashes instantly.</p>
      </div>

      <form className="tc-scanner-form" onSubmit={handleScan}>
        <div className="tc-scanner-input-group">
          <Search size={20} className="tc-scanner-icon" />
          <input
            type="text"
            placeholder="e.g. secure-login-example.com"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isScanning}
            className="tc-scanner-input"
          />
        </div>
        <button type="submit" className="tc-scanner-btn" disabled={isScanning || !input.trim()}>
          {isScanning ? <Loader2 size={18} className="spin" /> : 'Run Threat Check'}
        </button>
      </form>

      {isScanning && (
        <div className="tc-scanner-progress-panel">
          <div className="tc-scanner-progress-header">
            <span className="tc-phase-text">{currentPhase.text}</span>
            <span className="tc-phase-percentage">
              {Math.round(((phaseIndex) / (PHASES.length - 1)) * 100)}%
            </span>
          </div>
          <div className="tc-scanner-progress-track">
            <div 
              className="tc-scanner-progress-fill" 
              style={{ width: `${((phaseIndex) / (PHASES.length - 1)) * 100}%` }}
            />
          </div>
          
          <div className="tc-scanner-indicators">
            <div className={`tc-indicator-dot ${phaseIndex >= 1 ? 'active' : ''}`} />
            <div className={`tc-indicator-dot ${phaseIndex >= 2 ? 'active' : ''}`} />
            <div className={`tc-indicator-dot ${phaseIndex >= 3 ? 'active' : ''}`} />
            <div className={`tc-indicator-dot ${phaseIndex >= 4 ? 'active' : ''}`} />
            <div className={`tc-indicator-dot ${phaseIndex >= 5 ? 'active' : ''}`} />
          </div>
        </div>
      )}
    </div>
  );
}
