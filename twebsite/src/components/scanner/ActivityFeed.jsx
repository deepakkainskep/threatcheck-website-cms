import React, { useState, useEffect } from 'react';
import { Activity, ShieldAlert, Globe, Server } from 'lucide-react';
import './ActivityFeed.css';

const INITIAL_EVENTS = [
  { id: 1, time: 'Just now', msg: 'New suspicious domain analyzed', icon: Globe, type: 'info' },
  { id: 2, time: '2 mins ago', msg: 'High-risk IP detected in scan', icon: ShieldAlert, type: 'danger' },
  { id: 3, time: '5 mins ago', msg: 'Phishing indicator correlated', icon: Server, type: 'warning' }
];

export default function ActivityFeed() {
  const [events, setEvents] = useState(INITIAL_EVENTS);

  // Simulate incoming live events
  useEffect(() => {
    const timer = setInterval(() => {
      const newEvent = {
        id: Date.now(),
        time: 'Just now',
        msg: 'Automated remediation triggered',
        icon: Activity,
        type: 'info'
      };
      
      setEvents(prev => {
        const updated = [newEvent, ...prev].slice(0, 5); // Keep max 5
        // Update "Just now" to "1 min ago" for older items roughly (mock logic)
        return updated;
      });
    }, 15000); // New event every 15s

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="tc-feed-container tc-glow-card">
      <div className="tc-feed-header">
        <h4>Live Activity Feed</h4>
        <div className="tc-live-indicator">
          <span className="tc-pulse-dot" /> LIVE
        </div>
      </div>

      <div className="tc-feed-list">
        {events.map((evt, idx) => {
          const Icon = evt.icon;
          return (
            <div 
              key={evt.id} 
              className="tc-feed-item"
              style={{ animationDelay: idx === 0 ? '0s' : `${idx * 0.1}s` }}
            >
              <div className={`tc-feed-icon tc-feed-${evt.type}`}>
                <Icon size={14} />
              </div>
              <div className="tc-feed-content">
                <span className="tc-feed-msg">{evt.msg}</span>
                <span className="tc-feed-time">{evt.time}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
