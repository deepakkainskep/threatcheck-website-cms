import React from 'react';
import { BarChart3, Check, Eye, HelpCircle } from 'lucide-react';
import SectionHeader from '../components/SectionHeader';
import CTA from '../components/CTA';
import ScrollReveal from '../components/ScrollReveal';
import GlowParticles from '../components/GlowParticles';
import PremiumHero from '../components/PremiumHero';
import './PlatformFeatures.css';

export default function RiskManagement() {
  return (
    <div className="risk-management-page">
      {/* Hero Section */}
      <PremiumHero
        label="RISK MANAGEMENT"
        titleLine1="Contextual Risk Scoring"
        titleLine2="Based on Actual Exposure"
        description="Prioritize vulnerabilities dynamically by mapping configuration flaws to tangible financial and operational risk vectors."
        primaryButtonText="Get a Demo"
        primaryButtonLink="/request-demo"
      />

      {/* Supported Modules Grid */}
      <section className="risk-modules section-padding bg-secondary-theme">
        <div className="container">
          <SectionHeader 
            badge="Risk Center"
            title="Comprehensive Risk Management"
            subtitle="Centralise, assess, and treat organisational risks with precision and automated intelligence."
          />
          
          <div className="grid-3" style={{ gap: '1.5rem', marginTop: '3rem' }}>
            {[
              { title: 'Risk Register', desc: 'Centralised risk log with name, description, category, likelihood, impact, inherent and residual risk scores.' },
              { title: 'Risk Creation & Assessment', desc: 'Create risks manually or auto-generate from critical findings; likelihood × impact matrix mapping.' },
              { title: 'Risk Treatment Workflow', desc: 'Accept / Mitigate / Transfer / Avoid with treatment plan, designated owner, and target resolution date.' },
              { title: 'Risk Heatmap', desc: 'Visual 5×5 heatmap of all risks plotted by likelihood and impact; automatically colour-coded by severity.' },
              { title: 'Risk Review Schedule', desc: 'Automated reminders for periodic risk reviews; efficiently track last review date and next due date.' },
              { title: 'Risk Register Export', desc: 'One-click CSV/PDF export of the full risk register for rapid external auditor or board review.' },
              { title: 'AI Risk Identification', desc: 'Scan findings and incidents are auto-suggested as risk register entries; built-in LLM drafts risk descriptions.' },
            ].map((mod, idx) => (
              <ScrollReveal key={idx} variant="scale-in" delay={idx * 80}>
                <div className="glass-panel tc-glow-card" style={{ padding: '1.75rem', borderRadius: 'var(--radius-lg)', background: 'var(--bg-card)', border: '1px solid var(--border-color-subtle)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                    <BarChart3 className="text-teal" size={20} />
                    <h3 style={{ fontSize: '1.15rem', fontWeight: '800', margin: 0, color: 'var(--text-primary)' }}>{mod.title}</h3>
                  </div>
                  <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: '1.6', margin: 0 }}>
                    {mod.desc}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <ScrollReveal variant="scale-up">
        <CTA 
          title="Prioritize threats based on actual risk"
          subtitle="Book a customized walkthrough to review your threat metrics."
        />
      </ScrollReveal>
    </div>
  );
}

