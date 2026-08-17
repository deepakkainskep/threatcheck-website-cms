import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Cable, Search, Check, ShieldCheck, ArrowRight } from 'lucide-react';
import SectionHeader from '../components/SectionHeader';
import CTA from '../components/CTA';
import PremiumHero from '../components/PremiumHero';
import { apiService } from '../services/api';
import { useApi } from '../hooks/useApi';
import './Integrations.css';

export default function Integrations() {
  const { data: integrationList = [], loading } = useApi(apiService.getIntegrations);

  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { id: 'all', name: 'All Connections' },
    { id: 'identity', name: 'Identity & SSO' },
    { id: 'developer', name: 'Developer Tools' },
    { id: 'operations', name: 'Operations & Alerts' },
    { id: 'device', name: 'Device Management' },
    { id: 'hr', name: 'HR Systems' }
  ];


  const filteredIntegrations = integrationList.filter(item => {
    const matchesCat = activeCategory === 'all' || item.cat === activeCategory || item.category === activeCategory;
    const matchesSearch = (item.name || item.title || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.desc || item.description || item.excerpt || '').toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="integrations-page">
      {/* Hero Section */}
      <PremiumHero
        label="INTEGRATIONS"
        titleLine1="Connected Directly to Your"
        titleLine2="Entire Engineering Toolstack"
        description="Integrate seamlessly with AWS, GitHub, Jira, and your identity providers in minutes to begin scoring your compliance posture instantly."
        primaryButtonText="Get a Demo"
        primaryButtonLink="/request-demo"
      />

      <div className="container">
        {/* Filter and Search controls */}
        <div className="shared-search-controls">
          <div className="search-wrapper">
            <Search size={16} className="search-icon" />
            <input
              type="text"
              placeholder="Search integrations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="form-control search-input"
            />
          </div>

          <div className="category-filters">
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                className={`filter-btn ${activeCategory === cat.id ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat.id)}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        <div className="integrations-grid">
          {loading ? (
            <div className="glass-panel" style={{ padding: '2rem', textAlign: 'center', gridColumn: '1 / -1' }}>Loading integrations...</div>
          ) : filteredIntegrations.length > 0 ? (
            filteredIntegrations.map((item) => (
              <Link to="/request-demo" key={item._id || item.id || item._id} className="integration-card glass-panel" style={{ display: 'block', textDecoration: 'none' }}>
                <div className="integration-card-header">
                  <div className="integration-avatar">
                    {item.logo || item.image ? (
                      <img src={item.logo || item.image} alt={`${item.name || item.title} logo`} className="integration-logo-img" />
                    ) : (
                      <div className="integration-logo-img" style={{
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        background: 'linear-gradient(135deg, var(--primary) 0%, var(--teal) 100%)',
                        color: 'var(--text-primary)', fontSize: '1.25rem', fontWeight: '800'
                      }}>
                        {(item.name || item.title || 'I').charAt(0)}
                      </div>
                    )}
                  </div>
                  <span className="integration-status">
                    <ShieldCheck size={14} className="text-teal" /> {item.status || 'Ready'}
                  </span>
                </div>
                <h3 className="integration-title">{item.name || item.title}</h3>
                <p className="integration-desc">{item.desc || item.description || item.excerpt}</p>
                <div className="integration-card-footer">
                  <span className="integration-badge-cat">{item.cat || item.category || 'All'}</span>
                  <span className="integration-action-link">Configure <ArrowRight size={12} /></span>
                </div>
              </Link>
            ))
          ) : (
            <div className="no-results-banner glass-panel" style={{ gridColumn: '1 / -1' }}>
              <p>No integrations configured in the CMS yet, or matching search parameters.</p>
            </div>
          )}
        </div>
      </div>

      {/* Final CTA */}
      <CTA
        title="Need a custom API connector?"
        subtitle="Our team builds bespoke integrations for proprietary systems under enterprise license terms."
      />
    </div>
  );
}

