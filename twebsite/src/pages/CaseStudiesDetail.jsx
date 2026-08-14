import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { ArrowLeft, Building, TrendingUp, CheckCircle } from 'lucide-react';
import CTA from '../components/CTA';
import CaseStudyCard from '../components/CaseStudyCard';
import { apiService } from '../services/api';
import { useApi } from '../hooks/useApi';
import './CaseStudies.css';

export default function CaseStudiesDetail() {
  const { id } = useParams();
  const { data: caseStudiesData = [], loading } = useApi(apiService.getCaseStudies);

  if (loading) {
    return <div className="cs-detail-page container" style={{ padding: '6rem 2rem', textAlign: 'center' }}>Loading case study...</div>;
  }

  const study = caseStudiesData.find(s => s._id === id);

  if (!study && !loading) return <Navigate to="/case-studies" replace />;

  const related = caseStudiesData.filter(s => s._id !== id).slice(0, 2);

  return (
    <div className="cs-detail-page">
      {/* Hero Section */}
      <div className="cs-detail-hero">
        <div className="container cs-hero-inner">
          <div className="article-back">
            <Link to="/case-studies" className="back-link">
              <ArrowLeft size={16} /> Back to Case Studies
            </Link>
          </div>
          
          <div className="cs-detail-header">
            <div className="cs-company-info">
              <span className="badge badge-primary">{study.industry}</span>
              <h1 className="article-title">{study.title}</h1>
              <p className="article-subtitle">{study.challenge && study.challenge.substring(0, 160)}...</p>
              
              <div className="cs-meta-pills">
                <span className="cs-meta-pill"><Building size={14} /> {study.company}</span>
                <span className="cs-meta-pill"><TrendingUp size={14} /> {study.size}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="container cs-main-layout">
        
        {/* Left Column: Story */}
        <div className="cs-content-story">
          <section className="cs-section challenge-section">
            <div className="section-icon-wrap"><TrendingUp size={24} /></div>
            <h2 className="cs-section-title">The Challenge</h2>
            <p className="article-paragraph">{study.challenge}</p>
          </section>

          <section className="cs-section solution-section glass-panel">
            <div className="section-icon-wrap primary"><CheckCircle size={24} /></div>
            <h2 className="cs-section-title">Our Solution</h2>
            <p className="article-paragraph">{study.solution}</p>
          </section>

          {study.implementation && (
            <section className="cs-section implementation-section">
              <h2 className="cs-section-title">Implementation</h2>
              <p className="article-paragraph">{study.implementation}</p>
            </section>
          )}

          {study.businessImpact && (
            <blockquote className="cs-testimonial gradient-border">
              <div className="testimonial-content">
                <p className="cs-testimonial-quote">"{study.businessImpact}"</p>
                <footer className="cs-testimonial-footer">
                  <strong>Business Impact</strong>
                  <span>{study.company}</span>
                </footer>
              </div>
            </blockquote>
          )}
        </div>

        {/* Right Column: Sticky Sidebar with Stats & Results */}
        <aside className="cs-sidebar">
          {study.results && study.results.length > 0 && (
            <div className="cs-sidebar-block stat-cards-container">
              <h3 className="sidebar-title">Impact at a Glance</h3>
              <div className="cs-stat-cards">
                {study.results.map((stat, i) => (
                  <div key={i} className="cs-stat-card glass-panel">
                    <p className="cs-stat-value">{stat.metric}</p>
                    <p className="cs-stat-label">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="cs-sidebar-block results-block">
            <h3 className="sidebar-title">Key Outcomes</h3>
            <ul className="cs-results-list">
              {study.results.map((r, i) => (
                <li key={i}>
                  <CheckCircle size={18} className="check-icon" />
                  <div>
                    <strong>{r.metric}</strong>
                    <p>{r.label}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </aside>

      </div>

      {/* Related Case Studies */}
      {related.length > 0 && (
        <section className="container cs-related">
          <div className="related-header">
            <h3 className="related-title">Similar Success Stories</h3>
          </div>
          <div className="grid-2 cs-grid">
            {related.map(s => (
              <CaseStudyCard key={s._id} study={s} />
            ))}
          </div>
        </section>
      )}

      <CTA />
    </div>
  );
}
