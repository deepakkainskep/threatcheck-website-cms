import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import './FeatureCard.css';

export default function FeatureCard({ icon: Icon, title, description, link, tags = [] }) {
  return (
    <div className="feature-card glass-panel">
      <div className="feature-card-header">
        <div className="feature-icon-container">
          {Icon && <Icon className="feature-icon" size={24} />}
          <div className="feature-icon-glow"></div>
        </div>
      </div>
      
      <div className="feature-card-body">
        <h3 className="feature-card-title">{title}</h3>
        <p className="feature-card-desc">{description}</p>
        
        {tags.length > 0 && (
          <div className="feature-card-tags">
            {tags.map((tag, idx) => (
              <span key={idx} className="feature-card-tag">{tag}</span>
            ))}
          </div>
        )}
      </div>

      {link && (
        <div className="feature-card-footer">
          <Link to={link} className="feature-card-link">
            Explore Capabilities <ArrowRight size={14} className="arrow" />
          </Link>
        </div>
      )}
    </div>
  );
}
