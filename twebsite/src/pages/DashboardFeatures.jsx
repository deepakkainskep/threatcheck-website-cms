import React from 'react';
import SectionHeader from '../components/SectionHeader';
import CTA from '../components/CTA';

export default function DashboardFeatures() {
  const detailedFeatures = [
    {
      title: "Compliance Score Dashboard",
      desc: "Single-page view showing % readiness per enabled framework with trend sparklines and direction indicators."
    },
    {
      title: "Multi-Framework Summary View",
      desc: "Side-by-side framework cards (SOC 2, ISO, GDPR, PCI, DPDP, SEBI CSCRF) each showing score, status, next action."
    },
    {
      title: "Audit Readiness Probability",
      desc: "AI-predicted probability of passing the next audit based on current posture + historical outcomes from knowledge graph."
    },
    {
      title: "Days-to-Audit Countdown",
      desc: "Visual countdown to next scheduled or self-declared audit date with priority action list."
    },
    {
      title: "Critical Findings Widget",
      desc: "Top 5 open critical/high findings with one-click jump to remediation guidance."
    },
    {
      title: "Pending Evidence Widget",
      desc: "Evidence items approaching expiry or awaiting approval, sorted by due date."
    },
    {
      title: "Recent Activity Feed",
      desc: "Timestamped log of team actions: scans run, evidence uploaded, controls resolved, integrations connected."
    },
    {
      title: "Industry Benchmark Comparison",
      desc: "How your SOC 2 / ISO score compares to median for companies of your size, industry, and cloud stack."
    }
  ];

  return (
    <div className="dashboard-features-page bg-secondary-theme" style={{ paddingBottom: 0 }}>
      {/* Hero Section */}
      <section className="pf-hero section-padding" style={{ background: 'var(--bg-primary)' }}>
        <div className="container">
          <span className="badge badge-primary">Platform / Dashboard</span>
          <h1 className="pf-main-title">Interactive Dashboard Features</h1>
          <p className="pf-main-lead">
            Everything you need to monitor compliance, track readiness, and manage risk from a single pane of glass.
          </p>
        </div>
      </section>

      {/* Dashboard Features Section */}
      <section className="dashboard-features section-padding">
        <div className="container">
          <SectionHeader 
            badge="Widget Library"
            title="Complete Visibility & Control"
            subtitle="Explore the specific widgets and tools available in the ThreatCheck command center."
          />
          
          <div className="grid-4" style={{ gap: '1.5rem', marginTop: '3rem' }}>
            {detailedFeatures.map((feat, idx) => (
              <div key={idx} className="glass-panel" style={{ padding: '1.75rem', borderRadius: 'var(--radius-lg)', display: 'flex', flexDirection: 'column', gap: '0.75rem', background: 'var(--bg-card)', border: '1px solid var(--border-color-subtle)', transition: 'transform 0.3s ease, box-shadow 0.3s ease', cursor: 'default' }} onMouseOver={(e) => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = 'var(--shadow-md)'; }} onMouseOut={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}>
                <h4 style={{ fontSize: '1.15rem', fontWeight: '800', fontFamily: 'var(--font-heading)', color: 'var(--text-primary)', margin: 0 }}>{feat.title}</h4>
                <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: '1.6', margin: 0 }}>{feat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <CTA />
    </div>
  );
}
