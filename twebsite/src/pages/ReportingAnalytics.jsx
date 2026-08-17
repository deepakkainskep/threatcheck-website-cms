import React from 'react';
import { Database, Check, FileText, ClipboardCheck } from 'lucide-react';
import SectionHeader from '../components/SectionHeader';
import CTA from '../components/CTA';
import PremiumHero from '../components/PremiumHero';
import './PlatformFeatures.css';

export default function ReportingAnalytics() {
  return (
    <div className="reporting-analytics-page">
      {/* Hero Section */}
      <PremiumHero
        label="REPORTING & ANALYTICS"
        titleLine1="Audit-Ready Intelligence &"
        titleLine2="Executive Compliance Dashboards"
        description="Export comprehensive evidence ledgers and compile executive-ready compliance summaries for leadership and external auditors."
        primaryButtonText="Get a Demo"
        primaryButtonLink="/request-demo"
        secondaryButtonText="View Sample Reports"
        secondaryButtonLink="/reporting-analytics"
      />

      {/* Reporting Modules Grid */}
      <section className="reporting-modules section-padding bg-secondary-theme">
        <div className="container">
          <SectionHeader
            badge="Report Library"
            title="Comprehensive Reporting & Analytics"
            subtitle="Generate audit-ready evidence, gap analyses, and executive summaries instantly."
          />

          <div className="grid-3" style={{ gap: '1.5rem', marginTop: '3rem' }}>

            <div className="glass-panel" style={{ padding: '1.5rem', borderRadius: 'var(--radius-lg)', background: 'var(--bg-card)', border: '1px solid var(--border-color-subtle)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                <FileText className="text-teal" size={20} />
                <h3 style={{ fontSize: '1.1rem', fontWeight: '800', margin: 0, color: 'var(--text-primary)' }}>SOC 2 Readiness Report</h3>
              </div>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: '1.6', margin: 0 }}>
                Comprehensive PDF: passing/failing controls, evidence status, open findings, methodology, executive summary.
              </p>
            </div>

            <div className="glass-panel" style={{ padding: '1.5rem', borderRadius: 'var(--radius-lg)', background: 'var(--bg-card)', border: '1px solid var(--border-color-subtle)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                <FileText className="text-teal" size={20} />
                <h3 style={{ fontSize: '1.1rem', fontWeight: '800', margin: 0, color: 'var(--text-primary)' }}>ISO 27001 Gap Report</h3>
              </div>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: '1.6', margin: 0 }}>
                Annex A gap analysis PDF showing which controls are met, partial, or missing; with recommended actions.
              </p>
            </div>

            <div className="glass-panel" style={{ padding: '1.5rem', borderRadius: 'var(--radius-lg)', background: 'var(--bg-card)', border: '1px solid var(--border-color-subtle)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                <FileText className="text-teal" size={20} />
                <h3 style={{ fontSize: '1.1rem', fontWeight: '800', margin: 0, color: 'var(--text-primary)' }}>EU AI Act Gap Analysis Report</h3>
              </div>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: '1.6', margin: 0 }}>
                AI-generated report: risk classification, top gaps, action plan with EU AI Act article references.
              </p>
            </div>

            <div className="glass-panel" style={{ padding: '1.5rem', borderRadius: 'var(--radius-lg)', background: 'var(--bg-card)', border: '1px solid var(--border-color-subtle)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                <FileText className="text-teal" size={20} />
                <h3 style={{ fontSize: '1.1rem', fontWeight: '800', margin: 0, color: 'var(--text-primary)' }}>DPDP Compliance Report</h3>
              </div>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: '1.6', margin: 0 }}>
                India-specific DPDP gap assessment and readiness report for regulator or DPO review.
              </p>
            </div>

            <div className="glass-panel" style={{ padding: '1.5rem', borderRadius: 'var(--radius-lg)', background: 'var(--bg-card)', border: '1px solid var(--border-color-subtle)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                <FileText className="text-teal" size={20} />
                <h3 style={{ fontSize: '1.1rem', fontWeight: '800', margin: 0, color: 'var(--text-primary)' }}>SEBI CSCRF Compliance Report</h3>
              </div>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: '1.6', margin: 0 }}>
                Dashboard and report formatted for SEBI submission requirements.
              </p>
            </div>

            <div className="glass-panel" style={{ padding: '1.5rem', borderRadius: 'var(--radius-lg)', background: 'var(--bg-card)', border: '1px solid var(--border-color-subtle)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                <FileText className="text-teal" size={20} />
                <h3 style={{ fontSize: '1.1rem', fontWeight: '800', margin: 0, color: 'var(--text-primary)' }}>Framework Readiness Export</h3>
              </div>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: '1.6', margin: 0 }}>
                CSV of all controls per framework with status, owner, last tested date.
              </p>
            </div>

            <div className="glass-panel" style={{ padding: '1.5rem', borderRadius: 'var(--radius-lg)', background: 'var(--bg-card)', border: '1px solid var(--border-color-subtle)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                <FileText className="text-teal" size={20} />
                <h3 style={{ fontSize: '1.1rem', fontWeight: '800', margin: 0, color: 'var(--text-primary)' }}>Evidence Bundle Export</h3>
              </div>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: '1.6', margin: 0 }}>
                ZIP of all evidence for a defined period, structured by control; used for auditor delivery.
              </p>
            </div>

            <div className="glass-panel" style={{ padding: '1.5rem', borderRadius: 'var(--radius-lg)', background: 'var(--bg-card)', border: '1px solid var(--border-color-subtle)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                <FileText className="text-teal" size={20} />
                <h3 style={{ fontSize: '1.1rem', fontWeight: '800', margin: 0, color: 'var(--text-primary)' }}>Risk Register Export</h3>
              </div>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: '1.6', margin: 0 }}>
                CSV/PDF of all risks with treatment status; auditor-ready.
              </p>
            </div>

            <div className="glass-panel" style={{ padding: '1.5rem', borderRadius: 'var(--radius-lg)', background: 'var(--bg-card)', border: '1px solid var(--border-color-subtle)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                <FileText className="text-teal" size={20} />
                <h3 style={{ fontSize: '1.1rem', fontWeight: '800', margin: 0, color: 'var(--text-primary)' }}>Access Review Export</h3>
              </div>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: '1.6', margin: 0 }}>
                CSV of review results: who reviewed, decisions made, date.
              </p>
            </div>

            <div className="glass-panel" style={{ padding: '1.5rem', borderRadius: 'var(--radius-lg)', background: 'var(--bg-card)', border: '1px solid var(--border-color-subtle)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                <FileText className="text-teal" size={20} />
                <h3 style={{ fontSize: '1.1rem', fontWeight: '800', margin: 0, color: 'var(--text-primary)' }}>Audit Log Export</h3>
              </div>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: '1.6', margin: 0 }}>
                Tamper-evident CSV of all platform actions with timestamps; auditor verification of activity.
              </p>
            </div>

            <div className="glass-panel" style={{ padding: '1.5rem', borderRadius: 'var(--radius-lg)', background: 'var(--bg-card)', border: '1px solid var(--border-color-subtle)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                <FileText className="text-teal" size={20} />
                <h3 style={{ fontSize: '1.1rem', fontWeight: '800', margin: 0, color: 'var(--text-primary)' }}>Findings Export</h3>
              </div>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: '1.6', margin: 0 }}>
                CSV/JSON export of all findings; for SIEM ingestion or custom analysis.
              </p>
            </div>

            <div className="glass-panel" style={{ padding: '1.5rem', borderRadius: 'var(--radius-lg)', background: 'var(--bg-card)', border: '1px solid var(--border-color-subtle)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                <FileText className="text-teal" size={20} />
                <h3 style={{ fontSize: '1.1rem', fontWeight: '800', margin: 0, color: 'var(--text-primary)' }}>Executive Summary Report</h3>
              </div>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: '1.6', margin: 0 }}>
                Non-technical PDF for board and management: key metrics, trends, top risks, compliance posture summary.
              </p>
            </div>

            <div className="glass-panel" style={{ padding: '1.5rem', borderRadius: 'var(--radius-lg)', background: 'var(--bg-card)', border: '1px solid var(--border-color-subtle)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                <FileText className="text-teal" size={20} />
                <h3 style={{ fontSize: '1.1rem', fontWeight: '800', margin: 0, color: 'var(--text-primary)' }}>Custom Report Builder</h3>
              </div>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: '1.6', margin: 0 }}>
                Select data dimensions, date ranges, frameworks; save as reusable report template.
              </p>
            </div>

            <div className="glass-panel" style={{ padding: '1.5rem', borderRadius: 'var(--radius-lg)', background: 'var(--bg-card)', border: '1px solid var(--border-color-subtle)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                <FileText className="text-teal" size={20} />
                <h3 style={{ fontSize: '1.1rem', fontWeight: '800', margin: 0, color: 'var(--text-primary)' }}>Scheduled Report Delivery</h3>
              </div>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: '1.6', margin: 0 }}>
                Auto-generate and email reports on weekly/monthly schedule to defined recipients.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* CTA */}
      <CTA
        title="Generate audit-ready evidence"
        subtitle="Schedule a walkthrough of our compliance reporting dashboards."
      />
    </div>
  );
}
