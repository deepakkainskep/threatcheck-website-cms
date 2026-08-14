import React from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle, Home } from 'lucide-react';
import './NotFound.css';

export default function NotFound() {
  return (
    <div className="not-found-page container">
      <div className="not-found-card glass-panel">
        <div className="not-found-icon-wrapper">
          <AlertTriangle className="not-found-icon text-warning animate-pulse" size={40} />
          <div className="not-found-glow"></div>
        </div>
        
        <h1 className="not-found-title">404 - Page Not Found</h1>
        <p className="not-found-desc">
          The security perimeter could not resolve the requested URL path. The resource may have been relocated, or does not exist.
        </p>

        <Link to="/" className="btn btn-primary not-found-btn">
          <Home size={16} /> Return to Security Control
        </Link>
      </div>
    </div>
  );
}
