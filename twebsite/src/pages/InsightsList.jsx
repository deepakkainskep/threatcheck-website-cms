import React, { useState } from 'react';
import { Search, Calendar, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import SectionHeader from '../components/SectionHeader';
import CTA from '../components/CTA';
import PremiumHero from '../components/PremiumHero';
import { apiService } from '../services/api';
import { useApi } from '../hooks/useApi';
import './Insights.css';

export default function InsightsList() {
  const { data: insightsData = [], loading } = useApi(apiService.getInsights);
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = insightsData.filter(item =>
    (item.title || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
    (item.excerpt || item.description || '').toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="insights-list-page">
      <PremiumHero
        label="SECURITY INSIGHTS"
        titleLine1="Threat Intelligence &"
        titleLine2="Executive Analysis"
        description="Strategic analysis of emerging cybersecurity threats, compliance regulatory shifts, and high-level strategies for modern CISO teams."
        primaryButtonText="View Latest Reports"
        primaryButtonLink="/insights"
      />

      <div className="container">
        <div className="shared-search-controls">
          <div className="search-wrapper">
            <Search size={16} className="search-icon" />
            <input
              type="text"
              placeholder="Search insights..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="form-control search-input"
            />
          </div>
        </div>

        <div className="insights-grid">
          {loading ? (
            <div className="glass-panel" style={{ padding: '2rem', textAlign: 'center', gridColumn: '1 / -1' }}>Loading insights...</div>
          ) : filtered.length > 0 ? filtered.map(insight => (
            <Link key={insight._id} to={`/insights/${insight._id}`} className="insight-card glass-panel">
              <div className="insight-card-image-wrapper">
                <img
                  src={insight.image}
                  alt={insight.title}
                  className="insight-card-image"
                  onError={e => {
                    e.target.onerror = null;
                    e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='220' viewBox='0 0 400 220'%3E%3Crect width='100%25' height='100%25' fill='%230c0f17'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%239ca3af' font-family='sans-serif' font-size='14'%3EInsight%3C/text%3E%3C/svg%3E";
                  }}
                />
                <span className="badge badge-secondary insight-cat-badge">{insight.category}</span>
              </div>
              <div className="insight-card-body">
                <div className="blog-meta">
                  <span className="blog-meta-item"><Calendar size={12} /> {insight.date}</span>
                  <span className="blog-meta-item"><Clock size={12} /> {insight.readingTime}</span>
                </div>
                <h3 className="insight-card-title">{insight.title}</h3>
                <p className="insight-card-excerpt">{insight.excerpt}</p>
                <div className="insight-card-author">
                  <span className="author-name">{insight.author}</span>
                  <span className="insight-read-link">Read Insight →</span>
                </div>
              </div>
            </Link>
          )) : (
            <div className="no-results-banner glass-panel">
              <p>No insights matched your search.</p>
            </div>
          )}
        </div>
      </div>

      <CTA />
    </div>
  );
}
