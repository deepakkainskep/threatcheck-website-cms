import React from 'react';
import { ShieldCheck, Check, ClipboardList, Shield } from 'lucide-react';
import SectionHeader from '../components/SectionHeader';
import CTA from '../components/CTA';
import PremiumHero from '../components/PremiumHero';
import { apiService } from '../services/api';
import { useApi } from '../hooks/useApi';
import './PlatformFeatures.css';

export default function Frameworks() {
  const { data: frameworksData = [], loading } = useApi(apiService.getFrameworks);
  return (
    <div className="frameworks-page">
      {/* Hero Section */}
      <PremiumHero
        label="COMPLIANCE & AUDIT"
        titleLine1="Continuous Audit Mapping &"
        titleLine2="Evidence Collection"
        description="Automatically map discovered configurations directly to SOC 2, ISO 27001, HIPAA, and GDPR frameworks in real-time."
        primaryButtonText="Get a Demo"
        primaryButtonLink="/request-demo"
        secondaryButtonText="View Frameworks"
        secondaryButtonLink="/frameworks"
      />

      {/* Supported Modules Grid */}
      <section className="framework-modules section-padding bg-secondary-theme">
        <div className="container">
          <SectionHeader 
            badge="Compliance Library"
            title="Comprehensive Framework Coverage"
            subtitle="Explore the detailed regulatory mapping available out-of-the-box with ThreatCheck."
          />
          
          <div className="grid-3" style={{ gap: '1.5rem', marginTop: '3rem' }}>
            
            {loading ? (
              <div className="glass-panel" style={{ padding: '2rem', textAlign: 'center', gridColumn: '1 / -1' }}>Loading frameworks...</div>
            ) : frameworksData.length > 0 ? (
              frameworksData.map((fw) => (
                <div key={fw._id} className="glass-panel" style={{ padding: '1.75rem', borderRadius: 'var(--radius-lg)', background: 'var(--bg-card)', border: '1px solid var(--border-color-subtle)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                    {(fw.logo || fw.image) ? (
                      <img src={fw.logo || fw.image} alt={fw.title || fw.name} style={{ width: '24px', height: '24px', objectFit: 'contain' }}
                           onError={e => { e.target.onerror = null; e.target.style.display = 'none'; }} />
                    ) : (
                      <ShieldCheck className="text-teal" size={20} />
                    )}
                    <h3 style={{ fontSize: '1.15rem', fontWeight: '800', margin: 0, color: 'var(--text-primary)' }}>{fw.title || fw.name}</h3>
                  </div>
                  <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: '1.6', margin: 0 }}>
                    {fw.description || fw.excerpt}
                  </p>
                </div>
              ))
            ) : (
              <div className="glass-panel" style={{ gridColumn: '1 / -1', padding: '2rem', textAlign: 'center', borderRadius: 'var(--radius-lg)', background: 'var(--bg-card)', border: '1px solid var(--border-color-subtle)' }}>
                <p>No frameworks configured in the CMS yet.</p>
              </div>
            )}

          </div>
        </div>
      </section>

      {/* CTA */}
      <CTA 
        title="Become always audit-ready"
        subtitle="Book a customized walkthrough of our framework mapping engine."
      />
    </div>
  );
}

