import React from 'react';
import { Link } from 'react-router-dom';
import { Download, FileText, ArrowRight } from 'lucide-react';
import './ResourceCard.css';

export default function ResourceCard({ resource }) {
  const { _id, type, typeName, title, excerpt, category, downloadSize, fileType } = resource;
  
  return (
    <div className="resource-card glass-panel">
      {resource.image && (
        <div className="resource-image-wrapper" style={{ width: '100%', height: '200px', overflow: 'hidden' }}>
          <img src={resource.image} alt={title} style={{ width: '100%', height: '100%', objectFit: 'cover' }}
               onError={e => { e.target.onerror = null; e.target.style.display = 'none'; }} />
        </div>
      )}
      <div className="resource-content">
        <div className="resource-card-header">
          <span className="badge badge-primary">{category}</span>
          <span className="resource-type-indicator">
            <FileText size={14} /> {typeName}
          </span>
        </div>
        
        <div className="resource-card-body">
          <h3 className="resource-card-title">
            <Link to={`/resources/${type}/${_id}`}>{title}</Link>
          </h3>
          <p className="resource-card-excerpt">{excerpt}</p>
        </div>
        
        <div className="resource-card-footer">
          <span className="resource-meta-size">{fileType} &bull; {downloadSize}</span>
          <Link to={`/resources/${type}/${_id}`} className="resource-download-btn">
            Access Now <ArrowRight size={14} className="arrow" />
          </Link>
        </div>
      </div>
    </div>
  );
}
