import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BarChart2 } from 'lucide-react';
import './CaseStudyCard.css';

export default function CaseStudyCard({ study }) {
  const { _id, title, company, industry, challenge, results, image } = study;
  
  return (
    <div className="case-study-card glass-panel">
      {image && (
        <div className="case-study-image-wrapper" style={{ width: '100%', height: '220px', overflow: 'hidden' }}>
          <img src={image} alt={title} style={{ width: '100%', height: '100%', objectFit: 'cover' }}
               onError={e => { e.target.onerror = null; e.target.style.display = 'none'; }} />
        </div>
      )}
      <div className="case-study-content">
        <div className="case-study-meta">
          <span className="badge badge-secondary">{industry}</span>
          <span className="case-study-company">{company}</span>
        </div>
        
        <h3 className="case-study-title">
          <Link to={`/case-studies/${_id}`}>{title}</Link>
        </h3>
        
        <p className="case-study-challenge">{challenge}</p>
        
        {/* Highlight Metrics */}
        <div className="case-study-metrics">
          {results && results.slice(0, 2).map((res, idx) => (
            <div key={idx} className="metric-box">
              <span className="metric-num">{res.metric}</span>
              <span className="metric-lbl">{res.label}</span>
            </div>
          ))}
        </div>
        
        <div className="case-study-footer">
          <span className="illustrative-label">Illustrative Case Study</span>
          <Link to={`/case-studies/${_id}`} className="case-study-link">
            Read Case Study <ArrowRight size={14} className="arrow" />
          </Link>
        </div>
      </div>
    </div>
  );
}
