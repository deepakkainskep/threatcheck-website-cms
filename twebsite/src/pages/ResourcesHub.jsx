import React, { useState } from 'react';
import { FileText, Search, ChevronDown, ChevronUp, ShieldCheck } from 'lucide-react';
import SectionHeader from '../components/SectionHeader';
import ResourceCard from '../components/ResourceCard';
import CTA from '../components/CTA';
import PremiumHero from '../components/PremiumHero';

import { apiService } from '../services/api';
import { useApi } from '../hooks/useApi';
import './ResourcesHub.css';

export default function ResourcesHub() {
  const { data: resourcesData = [], loading } = useApi(apiService.getResources);
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [openFaq, setOpenFaq] = useState(null);

  const categories = [
    { id: 'all', name: 'All Resources' },
    { id: 'checklists', name: 'Checklists' },
    { id: 'guides', name: 'Security Guides' },
    { id: 'reports', name: 'Threat Reports' },
    { id: 'whitepapers', name: 'Whitepapers' },
    { id: 'webinars', name: 'Webinars' }
  ];

  const faqs = [
    {
      q: "Does ThreatCheck write security policies for us?",
      a: "Yes. ThreatCheck provides pre-approved, custom policy templates (e.g. Incident Response, Business Continuity, Access Controls) mapped directly to SOC 2 and ISO 27001 guidelines. You can customize them directly inside the platform and distribute them to your employees for review."
    },
    {
      q: "What credentials does the API require?",
      a: "ThreatCheck connects to your cloud providers (AWS, GCP, Azure), identity tools, and developer channels using read-only API tokens or IAM roles. We do not require write permissions, and we never access or modify your production database records or sensitive customer data."
    },
    {
      q: "How does continuous monitoring speed up audits?",
      a: "Instead of scrambling to collect configuration logs and screenshots at the end of the year, ThreatCheck compiles evidence automatically daily. When audit season arrives, you simply grant your auditor read-only access to our secure evidence ledger, eliminating weeks of manual administrative work."
    },
    {
      q: "What frameworks do you currently support?",
      a: "We support automated mapping for SOC 2 Type I and Type II, ISO 27001:2022, HIPAA Security Rules, GDPR Privacy controls, PCI-DSS, and CIS Benchmarks. You can map a single security control to multiple frameworks simultaneously."
    }
  ];

  const filteredResources = resourcesData.filter(item => {
    const itemType = (item.type || '').toLowerCase();

    const matchesCat = activeCategory === 'all' || itemType === activeCategory;
    const matchesSearch = (item.title || item.name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.excerpt || item.description || '').toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const toggleFaq = (idx) => {
    if (openFaq === idx) {
      setOpenFaq(null);
    } else {
      setOpenFaq(idx);
    }
  };

  return (
    <div className="resources-hub-page">
      {/* Hero Section */}
      <PremiumHero
        label="RESOURCES HUB"
        titleLine1="Master Your Security"
        titleLine2="& Compliance Posture"
        description="Explore our comprehensive library of cybersecurity guides, compliance playbooks, technical whitepapers, and webinars."
        primaryButtonText="Browse Library"
        primaryButtonLink="/resources"
      />

      <div className="container">
        {/* Filter and Search Panel */}
        <div className="shared-search-controls">
          <div className="search-wrapper">
            <Search size={16} className="search-icon" />
            <input
              type="text"
              placeholder="Search checklists, guides, whitepapers..."
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

        {/* Resources Grid */}
        <div className="resources-grid">
          {loading ? (
            <div className="glass-panel" style={{ padding: '2rem', textAlign: 'center', gridColumn: '1 / -1' }}>Loading resources...</div>
          ) : filteredResources.length > 0 ? (
            filteredResources.map((item) => (
              <ResourceCard key={item._id} resource={item} />
            ))
          ) : (
            <div className="no-results-banner glass-panel" style={{ gridColumn: '1 / -1' }}>
              <p>No resources found matching your search query.</p>
            </div>
          )}
        </div>

        {/* FAQ Accordion Section */}
        <section className="faq-section section-padding">
          <SectionHeader
            badge="FAQs"
            title="Frequently Answered Questions"
            subtitle="Learn more about continuous compliance automation, cloud posture configurations, and auditor mappings."
          />

          <div className="faq-list">
            {faqs.map((faq, idx) => (
              <div key={idx} className="faq-item glass-panel">
                <button
                  type="button"
                  className="faq-question-btn"
                  onClick={() => toggleFaq(idx)}
                >
                  <span>{faq.q}</span>
                  {openFaq === idx ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>

                <div className={`faq-answer-wrapper ${openFaq === idx ? 'open' : ''}`}>
                  <p className="faq-answer">{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Final CTA */}
      <CTA />
    </div>
  );
}

