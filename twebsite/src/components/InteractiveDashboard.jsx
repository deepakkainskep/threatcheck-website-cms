import React, { useState, useEffect } from 'react';
import { Shield, Radio, ShieldAlert, CheckCircle, Database, Server, Users, RefreshCw } from 'lucide-react';
import './InteractiveDashboard.css';

export default function InteractiveDashboard() {
  const [scanProgress, setScanProgress] = useState(0);
  const [isScanning, setIsScanning] = useState(true);
  const [complianceScore, setComplianceScore] = useState(72);
  const [telemetryLogs, setTelemetryLogs] = useState([
    { id: 1, type: 'info', text: 'Initializing platform telemetry agent...' },
    { id: 2, type: 'info', text: 'Connecting to Cloud Provider API (AWS)...' },
  ]);

  // Handle Scan Progress Loop
  useEffect(() => {
    let interval = null;
    if (isScanning) {
      interval = setInterval(() => {
        setScanProgress((prev) => {
          if (prev >= 100) {
            setIsScanning(false);
            setComplianceScore(98);
            // Append completion logs
            setTelemetryLogs((logs) => [
              ...logs,
              { id: Date.now(), type: 'success', text: 'AWS Asset scan completed. 138 assets discovered.' },
              { id: Date.now() + 1, type: 'success', text: 'MFA compliance check: Okta & Azure AD verified (100%).' },
              { id: Date.now() + 2, type: 'info', text: 'Audit trail compiled. Report ready for SOC 2 Type II assessment.' }
            ].slice(-6));
            return 100;
          }

          // Random scan logs during progress
          if (prev === 20) {
            setTelemetryLogs((logs) => [
              ...logs,
              { id: Date.now(), type: 'info', text: 'Auditing Identity & Access (IAM) permission matrices...' }
            ].slice(-6));
            setComplianceScore(78);
          } else if (prev === 50) {
            setTelemetryLogs((logs) => [
              ...logs,
              { id: Date.now(), type: 'success', text: 'Database encryption verified on all RDS databases.' }
            ].slice(-6));
            setComplianceScore(85);
          } else if (prev === 80) {
            setTelemetryLogs((logs) => [
              ...logs,
              { id: Date.now(), type: 'warning', text: 'Drift detected in AWS Security Group S3-Access-01. Resolving...' }
            ].slice(-6));
            setComplianceScore(92);
          }

          return prev + 5;
        });
      }, 350);
    } else {
      // Periodic reset to keep the animation alive for visitors
      const timeout = setTimeout(() => {
        setIsScanning(true);
        setScanProgress(0);
        setComplianceScore(72);
        setTelemetryLogs([
          { id: 1, type: 'info', text: 'Drift correction triggered. Resetting scan baseline...' },
          { id: 2, type: 'info', text: 'Connecting to Cloud Provider API (AWS)...' },
        ]);
      }, 8000);
      return () => clearTimeout(timeout);
    }
    return () => clearInterval(interval);
  }, [isScanning]);

  return (
    <div className="dashboard-wrapper glass-panel">
      {/* Dashboard Top Header Bar */}
      <div className="db-header">
        <div className="db-status">
          <Radio size={14} className={isScanning ? 'pulse-icon text-teal' : 'text-success'} />
          <span>Status: <strong className={isScanning ? 'text-teal' : 'text-success'}>{isScanning ? `Continuous Scanning (${scanProgress}%)` : 'Monitoring Active'}</strong></span>
        </div>
        <div className="db-window-controls">
          <span className="dot dot-red"></span>
          <span className="dot dot-yellow"></span>
          <span className="dot dot-green"></span>
        </div>
      </div>

      <div className="db-layout">
        {/* Dashboard Sidebar */}
        <aside className="db-sidebar">
          <div className="db-side-section">
            <span className="db-side-title">Frameworks</span>
            <div className="db-side-item active">
              <Shield size={14} /> SOC 2 Type II
            </div>
            <div className="db-side-item">
              <Shield size={14} /> ISO 27001:2022
            </div>
            <div className="db-side-item">
              <Shield size={14} /> HIPAA Security
            </div>
            <div className="db-side-item">
              <Shield size={14} /> NIST CSF
            </div>
          </div>

          <div className="db-side-section">
            <span className="db-side-title">Systems</span>
            <div className="db-side-item"><Server size={14} /> AWS Production</div>
            <div className="db-side-item"><Database size={14} /> PostgreSQL RDS</div>
            <div className="db-side-item"><Users size={14} /> Okta Directory</div>
          </div>
        </aside>

        {/* Dashboard Main Console */}
        <main className="db-console">
          <div className="db-grid">

            {/* Metric Card 1: Score */}
            <div className="db-card card-score">
              <h4 className="db-card-title">Compliance Score</h4>
              <div className="score-container">
                <svg className="score-svg" viewBox="0 0 120 120">
                  {/* Track Circle */}
                  <circle className="circle-track" cx="60" cy="60" r="50" />
                  {/* Radial progress circle */}
                  <circle
                    className="circle-progress"
                    cx="60"
                    cy="60"
                    r="50"
                    style={{
                      strokeDasharray: '314.16',
                      strokeDashoffset: (314.16 * (100 - complianceScore)) / 100,
                    }}
                  />
                </svg>
                <div className="score-text">
                  <span className="score-num">{complianceScore}%</span>
                  <span className="score-label">Mapped</span>
                </div>
              </div>
            </div>

            {/* Metric Card 2: Threats */}
            <div className="db-card card-alerts">
              <h4 className="db-card-title">Active Anomalies</h4>
              <div className="alerts-center">
                {complianceScore < 85 ? (
                  <div className="alert-badge warning animate-pulse">
                    <ShieldAlert size={28} />
                    <span>2 Items Pending Verification</span>
                  </div>
                ) : complianceScore < 98 ? (
                  <div className="alert-badge info animate-pulse">
                    <RefreshCw size={28} className="spin-icon" />
                    <span>Autoremediating SG drift...</span>
                  </div>
                ) : (
                  <div className="alert-badge success">
                    <CheckCircle size={28} />
                    <span>All Controls Restored</span>
                  </div>
                )}
                <div className="alert-stats">
                  <div className="stat"><span className="stat-num text-success">136</span> <span className="stat-lbl">Secure</span></div>
                  <div className="stat"><span className="stat-num text-warning">{complianceScore < 98 ? '2' : '0'}</span> <span className="stat-lbl">Drifted</span></div>
                </div>
              </div>
            </div>

          </div>

          {/* Remediation Timeline Graph */}
          <div className="db-card card-graph">
            <div className="graph-header">
              <h4 className="db-card-title">Vulnerability Remediation Cycle (Weekly)</h4>
              <span className="graph-legend"><span className="legend-dot teal"></span> MTTR: 1.2 hrs</span>
            </div>
            <div className="graph-body">
              <svg className="graph-svg" viewBox="0 0 450 100" preserveAspectRatio="none">
                {/* Horizontal grid lines */}
                <line x1="0" y1="25" x2="450" y2="25" className="grid-line" />
                <line x1="0" y1="50" x2="450" y2="50" className="grid-line" />
                <line x1="0" y1="75" x2="450" y2="75" className="grid-line" />

                {/* SVG glowing graph path */}
                <path
                  d="M0,90 Q45,70 90,85 T180,45 T270,30 T360,15 T450,8"
                  fill="none"
                  stroke="var(--color-primary)"
                  strokeWidth="3"
                  className="graph-path"
                />
                {/* Dots on nodes */}
                <circle cx="90" cy="85" r="4" fill="var(--color-primary)" />
                <circle cx="180" cy="45" r="4" fill="var(--color-primary)" />
                <circle cx="270" cy="30" r="4" fill="var(--color-primary)" />
                <circle cx="360" cy="15" r="4" fill="var(--color-primary)" />
                <circle cx="450" cy="8" r="4" fill="var(--color-primary)" />
              </svg>
              <div className="graph-labels">
                <span>WK 1</span>
                <span>WK 2</span>
                <span>WK 3</span>
                <span>WK 4</span>
                <span>WK 5</span>
              </div>
            </div>
          </div>

          {/* Telemetry Console Output Log */}
          <div className="db-card card-logs">
            <h4 className="db-card-title">Event Telemetry Log Stream</h4>
            <div className="log-console">
              {telemetryLogs.map((log) => (
                <div key={log.id} className={`log-line ${log.type}`}>
                  <span className="log-timestamp">[{new Date().toLocaleTimeString()}]</span>
                  <span className="log-symbol">{log.type === 'success' ? '✔' : log.type === 'warning' ? '⚠' : 'ℹ'}</span>
                  <span className="log-text-content">{log.text}</span>
                </div>
              ))}
            </div>
          </div>

        </main>
      </div>
    </div>
  );
}
