import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { ArrowLeft, FileText, ExternalLink, Download } from 'lucide-react';
import CTA from '../components/CTA';
import { apiService } from '../services/api';
import { useApi } from '../hooks/useApi';
import './ResourcesHub.css';

export default function ResourcesDetail() {
  const { type, id } = useParams();
  const { data: resourcesData = [], loading } = useApi(apiService.getResources);

  if (loading) {
    return <div className="resources-detail-page container" style={{ padding: '6rem 2rem', textAlign: 'center' }}>Loading resource...</div>;
  }

  const resource = resourcesData.find(r => r._id === id && r.type === type);

  if (!resource && !loading) return <Navigate to="/resources" replace />;

  return (
    <div className="resources-detail-page">
      <div className="container" style={{ paddingTop: '6rem', paddingBottom: '1rem' }}>
        <Link to="/resources" className="back-link">
          <ArrowLeft size={16} /> Back to Resources
        </Link>
      </div>

      {/* Header */}
      <div className="container resources-detail-header" style={{ maxWidth: '860px', paddingTop: '2rem', textAlign: 'left' }}>
        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
          <span className="badge badge-primary">{resource.category}</span>
          <span className="badge badge-secondary">{resource.type}</span>
        </div>

        <h1 style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)', fontWeight: 800, lineHeight: 1.2, color: 'var(--text-primary)', marginBottom: '1rem' }}>
          {resource.title}
        </h1>
        <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', lineHeight: 1.65, marginBottom: '2rem' }}>
          {resource.description}
        </p>

        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          {resource.downloadUrl ? (
            <a href={resource.downloadUrl} className="btn btn-primary" rel="noopener noreferrer">
              <Download size={16} /> Download {resource.type}
            </a>
          ) : null}
          {resource.externalUrl ? (
            <a href={resource.externalUrl} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
              <ExternalLink size={16} /> Open Resource
            </a>
          ) : null}
          <Link to="/request-demo" className="btn btn-outline">
            Request a Demo
          </Link>
        </div>
      </div>

      {/* Resource Content Preview */}
      <div className="container" style={{ maxWidth: '860px', margin: '3rem auto 5rem' }}>
        <div className="glass-panel" style={{ padding: '2.5rem', textAlign: 'left' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', marginBottom: '2rem' }}>
            <div style={{
              width: 56, height: 56, borderRadius: 'var(--radius-md)',
              background: 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))',
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
            }}>
              <FileText size={24} color="black" />
            </div>
            <div>
              <p style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{resource.title}</p>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                {resource.type} &bull; {resource.category}
              </p>
            </div>
          </div>

          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '1rem' }}>
            What you'll get
          </h3>

          <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginLeft: '1.25rem' }}>
            {(resource.highlights || [
              'Comprehensive coverage of ' + resource.category + ' best practices',
              'Practical implementation guidance for security teams',
              'Compliance mapping for SOC 2, ISO 27001, and NIST frameworks',
              'Step-by-step checklists and evidence collection templates',
              'Automation workflow examples powered by ThreatCheck'
            ]).map((highlight, i) => (
              <li key={i} style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                {highlight}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <CTA
        title="Automate what this guide teaches"
        subtitle="ThreatCheck continuously maps your evidence to compliance frameworks so audits become a non-event."
      />
    </div>
  );
}
