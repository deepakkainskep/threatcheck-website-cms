import React from 'react';
import { Clock, Globe, ShieldAlert, CheckCircle, Search } from 'lucide-react';
import './RiskTimeline.css';

const TIMELINE_EVENTS = [
  { id: 1, time: '2024-03-12', title: 'Domain Registered', desc: 'Domain created via Namecheap.', icon: Globe },
  { id: 2, time: '2024-03-14', title: 'SSL Certificate Issued', desc: 'Let\'s Encrypt 90-day cert.', icon: CheckCircle },
  { id: 3, time: '2024-03-18', title: 'Suspicious Redirects', desc: 'Traffic routed to unknown ASN.', icon: ShieldAlert, highlight: true },
  { id: 4, time: 'Today', title: 'ThreatCheck Analysis', desc: 'Manual scan initiated.', icon: Search }
];

export default function RiskTimeline() {
  return (
    <div className="tc-timeline-container tc-glow-card">
      <div className="tc-timeline-header">
        <h4>Threat Activity Timeline</h4>
      </div>
      
      <div className="tc-timeline-list">
        {TIMELINE_EVENTS.map((evt, idx) => {
          const Icon = evt.icon;
          return (
            <div 
              key={evt.id} 
              className={`tc-timeline-item ${evt.highlight ? 'highlight' : ''}`}
              style={{ animationDelay: `${idx * 0.15}s` }}
            >
              <div className="tc-timeline-line" />
              <div className="tc-timeline-marker">
                <Icon size={14} />
              </div>
              <div className="tc-timeline-content">
                <span className="tc-timeline-time">{evt.time}</span>
                <h5 className="tc-timeline-title">{evt.title}</h5>
                <p className="tc-timeline-desc">{evt.desc}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
