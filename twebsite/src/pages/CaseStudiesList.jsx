import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import CaseStudyCard from '../components/CaseStudyCard';
import CTA from '../components/CTA';
import PremiumHero from '../components/PremiumHero';
import { apiService } from '../services/api';
import { useApi } from '../hooks/useApi';
import './CaseStudies.css';

export default function CaseStudiesList() {
  const { data: caseStudiesData = [], loading } = useApi(apiService.getCaseStudies);

  return (
    <div className="case-studies-list-page">
      <PremiumHero
        label="CASE STUDIES"
        titleLine1="Real-World Compliance"
        titleLine2="& Automation Success"
        description="Discover how engineering and security teams use ThreatCheck to achieve rapid compliance, reduce audit fatigue, and secure their cloud environments."
        primaryButtonText="Explore Stories"
        primaryButtonLink="/case-studies"
      />

      <div className="container">
      {loading ? (
        <div style={{ padding: '4rem', textAlign: 'center' }}>Loading case studies...</div>
      ) : (
        <div className="grid-3 cs-grid">
          {caseStudiesData && caseStudiesData.length > 0 ? (
            caseStudiesData.map(study => (
              <CaseStudyCard key={study._id} study={study} />
            ))
          ) : (
            <div style={{ gridColumn: '1 / -1', padding: '2rem', textAlign: 'center', background: 'var(--bg-card)', borderRadius: 'var(--radius-lg)' }}>
              No case studies available.
            </div>
          )}
        </div>
      )}
      </div>

      <CTA
        title="See results like these in your organization"
        subtitle="Book a ThreatCheck walkthrough and map SOC 2 controls to your cloud environment in days, not months."
      />
    </div>
  );
}
