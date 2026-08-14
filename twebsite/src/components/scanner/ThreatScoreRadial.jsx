import React, { useEffect, useState } from 'react';
import './ThreatScoreRadial.css';

export default function ThreatScoreRadial({ score, label = "Threat Score" }) {
  const [animatedScore, setAnimatedScore] = useState(0);

  useEffect(() => {
    // Animate from 0 to score
    let start = 0;
    const duration = 1500;
    const stepTime = Math.abs(Math.floor(duration / (score || 1)));
    
    const timer = setInterval(() => {
      start += 1;
      setAnimatedScore(start);
      if (start >= score) clearInterval(timer);
    }, stepTime);

    return () => clearInterval(timer);
  }, [score]);

  // Determine color based on score
  let threatColor = 'var(--threat-safe)';
  let threatStatus = 'Safe';
  
  if (score >= 80) {
    threatColor = 'var(--threat-critical)';
    threatStatus = 'Critical Risk';
  } else if (score >= 60) {
    threatColor = 'var(--threat-high)';
    threatStatus = 'High Risk';
  } else if (score >= 40) {
    threatColor = 'var(--threat-moderate)';
    threatStatus = 'Moderate Risk';
  } else if (score >= 20) {
    threatColor = 'var(--threat-low)';
    threatStatus = 'Low Risk';
  }

  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (animatedScore / 100) * circumference;

  return (
    <div className="tc-score-container tc-glow-card" style={{ '--score-color': threatColor }}>
      <div className="tc-score-header">
        <h4>{label}</h4>
      </div>
      <div className="tc-score-radial-wrapper">
        <svg className="tc-score-svg" viewBox="0 0 140 140">
          {/* Background circle */}
          <circle
            className="tc-score-bg"
            cx="70"
            cy="70"
            r={radius}
            strokeWidth="12"
            fill="none"
          />
          {/* Animated progress circle */}
          <circle
            className="tc-score-progress"
            cx="70"
            cy="70"
            r={radius}
            strokeWidth="12"
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
          />
        </svg>
        <div className="tc-score-center">
          <span className="tc-score-number">{animatedScore}</span>
          <span className="tc-score-max">/ 100</span>
        </div>
      </div>
      <div className="tc-score-footer">
        <div className="tc-score-status">{threatStatus}</div>
      </div>
    </div>
  );
}
