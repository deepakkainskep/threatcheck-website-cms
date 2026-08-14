import React from 'react';
import { AlertTriangle, ShieldCheck, ShieldAlert, AlertCircle, Info } from 'lucide-react';
import './ThreatBreakdown.css';

const MOCK_SIGNALS = [
  { id: 1, name: 'Phishing Detection', status: 'High Risk', risk: 'high', desc: 'Domain resembles a known brand. Potential credential harvesting.' },
  { id: 2, name: 'Domain Reputation', status: 'Suspicious', risk: 'moderate', desc: 'Domain registered less than 30 days ago.' },
  { id: 3, name: 'SSL Certificate', status: 'Valid', risk: 'safe', desc: 'Valid certificate issued by Let\'s Encrypt.' },
  { id: 4, name: 'Redirect Analysis', status: 'Suspicious', risk: 'moderate', desc: 'Multiple obfuscated redirects detected.' },
  { id: 5, name: 'Malware Indicators', status: 'Detected', risk: 'critical', desc: 'Payload signature matches Trojan.Win32.Agent.' },
  { id: 6, name: 'DNS Reputation', status: 'Clean', risk: 'safe', desc: 'No suspicious DNS records found.' }
];

const ICONS = {
  safe: <ShieldCheck size={20} />,
  low: <Info size={20} />,
  moderate: <AlertCircle size={20} />,
  high: <AlertTriangle size={20} />,
  critical: <ShieldAlert size={20} />
};

export default function ThreatBreakdown({ score }) {
  // If no score yet, show skeleton or empty state
  if (score === null) {
    return (
      <div className="tc-breakdown-container tc-glow-card">
        <h4>Threat Breakdown</h4>
        <div className="tc-skeleton-list">
          {[1, 2, 3, 4, 5].map(i => (
            <div key={i} className="tc-skeleton-item" style={{ animationDelay: `${i * 0.1}s` }} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="tc-breakdown-container tc-glow-card">
      <div className="tc-breakdown-header">
        <h4>Threat Breakdown</h4>
        <span className="tc-badge">Security Signals</span>
      </div>
      <div className="tc-breakdown-list">
        {MOCK_SIGNALS.map((signal, idx) => (
          <div 
            key={signal.id} 
            className="tc-signal-item"
            style={{ animationDelay: `${idx * 0.1}s` }}
          >
            <div className={`tc-signal-icon tc-risk-${signal.risk}`}>
              {ICONS[signal.risk]}
            </div>
            <div className="tc-signal-content">
              <div className="tc-signal-title-row">
                <span className="tc-signal-name">{signal.name}</span>
                <span className={`tc-signal-status tc-text-${signal.risk}`}>
                  {signal.status}
                </span>
              </div>
              <p className="tc-signal-desc">{signal.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
