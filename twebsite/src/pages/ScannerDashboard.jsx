import React, { useState, useEffect } from 'react';
import ThreatScanner from '../components/scanner/ThreatScanner';
import ThreatScoreRadial from '../components/scanner/ThreatScoreRadial';
import ThreatBreakdown from '../components/scanner/ThreatBreakdown';
import IntelligenceGraph from '../components/scanner/IntelligenceGraph';
import RiskTimeline from '../components/scanner/RiskTimeline';
import SecurityMetrics from '../components/scanner/SecurityMetrics';
import RecentChecksTable from '../components/scanner/RecentChecksTable';
import ActivityFeed from '../components/scanner/ActivityFeed';
import ThreatDetailsDrawer from '../components/scanner/ThreatDetailsDrawer';
import CommandPalette from '../components/scanner/CommandPalette';
import ScrollReveal from '../components/ScrollReveal';
import PremiumHero from '../components/PremiumHero';
import './ScannerDashboard.css';

export default function ScannerDashboard() {
  const [activeThreat, setActiveThreat] = useState(null);
  const [scanResult, setScanResult] = useState(null);

  const handleScanComplete = (result) => {
    setScanResult(result);
  };

  return (
    <div className="tc-dashboard-layout">
      <CommandPalette />

      {/* Background Effects */}
      <div className="tc-dashboard-bg">
        <div className="tc-glow-orb tc-orb-1" />
        <div className="tc-glow-orb tc-orb-2" />
        <div className="tc-grid-overlay" />
      </div>

      <PremiumHero
        label="THREAT SCANNER"
        titleLine1="Continuous Vulnerability Sweeping"
        titleLine2="at the Speed of Engineering"
        description="Analyze and correlate live security signals, detecting configuration drift and active threats before they become breaches."
        primaryButtonText="Get a Demo"
        primaryButtonLink="/request-demo"
      />

      <div className="container tc-dashboard-container">

        <ScrollReveal variant="fade-up" delay={0.1}>
          <SecurityMetrics />
        </ScrollReveal>

        <div className="tc-dashboard-grid">
          {/* Main Scan Column */}
          <div className="tc-dashboard-col tc-col-main">
            <ScrollReveal variant="fade-up" delay={0.2}>
              <ThreatScanner onScanComplete={handleScanComplete} />
            </ScrollReveal>

            {scanResult && (
              <div className="tc-scan-results-grid">
                <ScrollReveal variant="scale-in">
                  <ThreatScoreRadial score={scanResult.score} />
                </ScrollReveal>
                <ScrollReveal variant="fade-left" delay={0.1}>
                  <ThreatBreakdown score={scanResult.score} />
                </ScrollReveal>
              </div>
            )}

            <ScrollReveal variant="fade-up" delay={0.3}>
              <IntelligenceGraph />
            </ScrollReveal>

            <ScrollReveal variant="fade-up" delay={0.4}>
              <RecentChecksTable onRowClick={(threat) => setActiveThreat(threat)} />
            </ScrollReveal>
          </div>

          {/* Sidebar Column */}
          <div className="tc-dashboard-col tc-col-side">
            <ScrollReveal variant="fade-up" delay={0.2}>
              <ActivityFeed />
            </ScrollReveal>

            <ScrollReveal variant="fade-up" delay={0.3}>
              <div className="tc-timeline-wrapper">
                <RiskTimeline />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>

      <ThreatDetailsDrawer
        threat={activeThreat}
        onClose={() => setActiveThreat(null)}
      />
    </div>
  );
}
