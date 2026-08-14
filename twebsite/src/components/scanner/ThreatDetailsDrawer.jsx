import React, { useEffect } from 'react';
import { X, ShieldAlert, Globe, Server, AlertTriangle } from 'lucide-react';
import './ThreatDetailsDrawer.css';

export default function ThreatDetailsDrawer({ threat, onClose }) {
  // Prevent body scroll when open
  useEffect(() => {
    if (threat) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [threat]);

  if (!threat) return null;

  return (
    <div className="tc-drawer-overlay" onClick={onClose}>
      <div className="tc-drawer-panel" onClick={e => e.stopPropagation()}>
        
        <div className="tc-drawer-header">
          <div className="tc-drawer-title-group">
            <h3 className="tc-drawer-title">{threat.indicator}</h3>
            <span className={`tc-tag tc-score-${threat.riskLevel}`}>{threat.classification}</span>
          </div>
          <button className="tc-drawer-close" onClick={onClose}><X size={20} /></button>
        </div>

        <div className="tc-drawer-body">
          <div className="tc-drawer-score-card">
            <div className={`tc-drawer-score tc-text-${threat.riskLevel}`}>{threat.risk}</div>
            <div className="tc-drawer-score-meta">
              <span className="tc-drawer-score-label">Risk Score</span>
              <span className="tc-drawer-score-status">/ 100</span>
            </div>
          </div>

          <div className="tc-drawer-section">
            <h4 className="tc-drawer-section-title">Evidence & Context</h4>
            <ul className="tc-drawer-list">
              <li>Suspicious domain age (registered &lt; 30 days ago)</li>
              <li>Credential harvesting indicators detected in payload</li>
              <li>Obfuscated redirects routing to known malicious ASN</li>
            </ul>
          </div>

          <div className="tc-drawer-section">
            <h4 className="tc-drawer-section-title">Infrastructure</h4>
            <div className="tc-drawer-infra-grid">
              <div className="tc-infra-item">
                <span className="tc-infra-label">Type</span>
                <span className="tc-infra-value"><Globe size={14} className="tc-infra-icon"/> {threat.type}</span>
              </div>
              <div className="tc-infra-item">
                <span className="tc-infra-label">IP Address</span>
                <span className="tc-infra-value"><Server size={14} className="tc-infra-icon"/> 192.168.45.2</span>
              </div>
              <div className="tc-infra-item">
                <span className="tc-infra-label">ASN</span>
                <span className="tc-infra-value">AS13335 (Cloudflare)</span>
              </div>
              <div className="tc-infra-item">
                <span className="tc-infra-label">Location</span>
                <span className="tc-infra-value">United States</span>
              </div>
            </div>
          </div>

          <div className="tc-drawer-section">
            <h4 className="tc-drawer-section-title">Associated Signals</h4>
            <div className="tc-signal-tags">
              <span className="tc-signal-tag tc-risk-high"><AlertTriangle size={14}/> Phishing</span>
              <span className="tc-signal-tag tc-risk-moderate">New Domain</span>
              <span className="tc-signal-tag tc-risk-critical">Malware C2</span>
            </div>
          </div>

        </div>
        
        <div className="tc-drawer-footer">
          <button className="tc-btn-secondary" onClick={onClose}>Close</button>
          <button className="tc-btn-primary tc-magnetic">Export Report</button>
        </div>
      </div>
    </div>
  );
}
