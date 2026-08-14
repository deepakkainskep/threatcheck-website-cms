import React, { useEffect, useState } from 'react';
import { Shield, FileSearch, Target, Activity } from 'lucide-react';
import './SecurityMetrics.css';

// Animated Counter Hook
function useAnimatedCounter(end, duration = 2000) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const increment = end / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [end, duration]);

  return count;
}

const MetricCard = ({ title, value, icon: Icon, delay }) => {
  const count = useAnimatedCounter(value);

  return (
    <div className="tc-metric-card tc-glow-card" style={{ animationDelay: `${delay}s` }}>
      <div className="tc-metric-icon">
        <Icon size={24} />
      </div>
      <div className="tc-metric-content">
        <span className="tc-metric-value">{count.toLocaleString()}</span>
        <span className="tc-metric-title">{title}</span>
      </div>
    </div>
  );
};

export default function SecurityMetrics() {
  return (
    <div className="tc-metrics-grid">
      <MetricCard title="Indicators Analyzed" value={12482} icon={FileSearch} delay={0.1} />
      <MetricCard title="Threats Detected" value={347} icon={Target} delay={0.2} />
      <MetricCard title="Critical Risks" value={28} icon={Shield} delay={0.3} />
      <MetricCard title="Avg Risk Score" value={42} icon={Activity} delay={0.4} />
    </div>
  );
}
