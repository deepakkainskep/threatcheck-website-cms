import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { Calendar, Clock, ArrowLeft, ArrowRight, Tag } from 'lucide-react';
import CTA from '../components/CTA';
import { apiService } from '../services/api';
import { useApi } from '../hooks/useApi';
import './Insights.css';
import './BlogDetail.css';

function renderContent(blocks) {
  return blocks.map((block, idx) => {
    if (block.type === 'heading') {
      const Tag = `h${block.level}`;
      return <Tag key={idx} className="article-heading">{block.text}</Tag>;
    }
    if (block.type === 'paragraph') {
      return <p key={idx} className="article-paragraph">{block.text}</p>;
    }
    if (block.type === 'list') {
      return (
        <ul key={idx} className="article-list">
          {block.items.map((item, i) => {
            const parts = item.split('**');
            return (
              <li key={i}>
                {parts.length >= 3
                  ? <><strong>{parts[1]}</strong>{parts[2]}</>
                  : item}
              </li>
            );
          })}
        </ul>
      );
    }
    return null;
  });
}

export default function InsightsDetail() {
  const { id } = useParams();
  const { data: insightsData = [], loading } = useApi(apiService.getInsights);

  if (loading) {
    return <div className="insights-detail-page container" style={{ padding: '6rem 2rem', textAlign: 'center' }}>Loading insight...</div>;
  }

  const insight = insightsData.find(i => i._id === id);

  if (!insight && !loading) return <Navigate to="/insights" replace />;

  const related = insightsData.filter(i => i._id !== id).slice(0, 2);

  return (
    <div className="insights-detail-page">
      <div className="container article-back">
        <Link to="/insights" className="back-link">
          <ArrowLeft size={16} /> Back to Insights
        </Link>
      </div>

      <header className="article-header container">
        <div className="article-meta-row">
          <span className="badge badge-secondary">{insight.category}</span>
          <span className="article-meta-item"><Calendar size={13} /> {insight.date}</span>
          <span className="article-meta-item"><Clock size={13} /> {insight.readingTime}</span>
        </div>
        <h1 className="article-title">{insight.title}</h1>
        <p className="article-subtitle">{insight.subtitle}</p>
        <div className="article-author-bar">
          <div className="article-author-avatar">{insight.author.split(' ').map(n => n[0]).join('')}</div>
          <div>
            <span className="author-name">{insight.author}</span>
            <span className="author-role">{insight.role}</span>
          </div>
        </div>
      </header>

      <div className="article-hero-image-wrapper container">
        <img
          src={insight.image}
          alt={insight.title}
          className="article-hero-image"
          onError={e => {
            e.target.onerror = null;
            e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1200' height='500' viewBox='0 0 1200 500'%3E%3Crect width='100%25' height='100%25' fill='%230c0f17'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%239ca3af' font-family='sans-serif' font-size='24'%3E" + encodeURIComponent(insight.category) + "%3C/text%3E%3C/svg%3E";
          }}
        />
      </div>

      <div className="article-body container" style={{ gridTemplateColumns: '1fr' }}>
        <div className="article-content">
          {renderContent(insight.content)}
        </div>
      </div>

      {related.length > 0 && (
        <section className="container related-articles">
          <h3 className="related-title">More Insights</h3>
          <div className="insights-grid insights-grid-small">
            {related.map(i => (
              <Link key={i._id} to={`/insights/${i._id}`} className="insight-card glass-panel">
                <div className="insight-card-image-wrapper" style={{ paddingTop: '50%' }}>
                  <img src={i.image} alt={i.title} className="insight-card-image"
                    onError={e => { e.target.onerror = null; e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='200'%3E%3Crect fill='%230c0f17' width='100%25' height='100%25'/%3E%3C/svg%3E"; }}
                  />
                </div>
                <div className="insight-card-body">
                  <h3 className="insight-card-title" style={{ fontSize: '1rem' }}>{i.title}</h3>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      <CTA />
    </div>
  );
}
