import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Eye, ShieldAlert, Cpu, BarChart3, Database, Cable, ArrowRight } from 'lucide-react';


import SectionHeader from '../components/SectionHeader';
import FeatureCard from '../components/FeatureCard';
import CTA from '../components/CTA';
import ScrollReveal from '../components/ScrollReveal';
import GlowParticles from '../components/GlowParticles';
import PremiumHero from '../components/PremiumHero';

import './PlatformOverview.css';

export default function PlatformOverview() {
  const corePillars = [
    {
      icon: ShieldAlert,
      title: "Threat Detection",
      desc: "Scan infrastructure configurations and cloud node subnets for active security flaws and vulnerabilities.",
      link: "/security#threat-detection",
      tags: ["CSPM", "Vulnerability Sweeping"]
    },
    {
      icon: BarChart3,
      title: "Risk Management",
      desc: "Prioritize vulnerabilities by mapping configuration flaws to financial and operational risk vectors.",
      link: "/risk-management",
      tags: ["Contextual Scoring", "Risk Matrices"]
    },
    {
      icon: Shield,
      title: "Frameworks",
      desc: "Automatically map configuration checkpoints directly to SOC 2, ISO 27001, HIPAA, and GDPR frameworks.",
      link: "/frameworks",
      tags: ["Cross-Framework Maps", "Audit Vault"]
    },
    {
      icon: Eye,
      title: "Security Monitoring",
      desc: "Maintain continuous, 24/7 posture checks on encryption, user directories, and identity accounts.",
      link: "/security#continuous-monitoring",
      tags: ["Hourly Telemetry", "Drift Tracking"]
    },
    {
      icon: Database,
      title: "Reporting & Analytics",
      desc: "Export audit-ready evidence ledgers and compile executive compliance summaries for leadership reviews.",
      link: "/reporting-analytics",
      tags: ["Auditor Portals", "Executive Reports"]
    },
    {
      icon: Cpu,
      title: "Workflow Automation",
      desc: "Trigger Slack/Jira developer tickets and run auto-remediation scripts to correct drift states.",
      link: "/automation",
      tags: ["Auto-Remediation", "DevSecOps Webhooks"]
    }
  ];

  return (
    <div className="platform-overview-page">
      {/* Hero Section */}
      <PremiumHero
        label="PLATFORM OVERVIEW"
        titleLine1="The Unified Product Security OS"
        titleLine2="for Connected Cloud Environments"
        description="ThreatCheck consolidates posture management, identity verification, and multi-framework audit evidence into a single, AI-driven platform."
        primaryButtonText="Get a Demo"
        primaryButtonLink="/request-demo"
        secondaryButtonText="Explore Platform"
        secondaryButtonLink="/security#threat-detection"
      />

      {/* Marquee Section */}
      <section className="platform-marquee-section">
        <div className="platform-marquee-container">
          <div className="platform-marquee-track">
            {/* Render 4 copies of the text so it's wide enough for a seamless -50% loop */}
            {[...Array(4)].map((_, i) => (
              <span key={i} className="platform-marquee-text">
                See the Threats Before They Become Breaches •{' '}
              </span>
            ))}
          </div>
        </div>
        <ScrollReveal variant="fade-up">
          <p className="platform-marquee-subtitle">
            ThreatCheck turns complex security signals into clear, actionable intelligence—helping teams detect, understand, and respond to risk before it becomes an incident.
          </p>
        </ScrollReveal>
      </section>

      {/* Grid of Capabilities */}
      <section className="platform-pillars section-padding bg-secondary-theme">
        <ScrollReveal variant="fade-up">
          <div className="container">
            <SectionHeader
              badge="Core Pillars"
              title="Six Capabilities, Unified"
              subtitle="Real security controls that map directly to compliance frameworks, generating evidence logs automatically."
            />

            <div className="grid-3">
              {corePillars.map((p, idx) => (
                <ScrollReveal variant="fade-up" delay={idx * 100} key={idx} style={{ height: '100%' }}>
                  <FeatureCard
                    icon={p.icon}
                    title={p.title}
                    description={p.desc}
                    link={p.link}
                    tags={p.tags}
                  />
                </ScrollReveal>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* Integrations Banner Hook */}
      <section className="platform-integrations section-padding">
        <ScrollReveal variant="fade-up">
          <div className="container solution-grid">
            <div className="solution-text">
              <span className="badge badge-primary">Integrations</span>
              <h2 className="gradient-text">Connected to Your Toolstack</h2>
              <p className="solution-lead">ThreatCheck integrates directly with your active cloud hosting accounts, developer platforms, database systems, and identity directors via API.</p>
              <p className="solution-lead">Within minutes of authorizing read-only integrations, the platform discovers assets and begins scoring compliance postures.</p>
              <Link to="/integrations" className="btn btn-secondary">
                View All Integrations <ArrowRight size={16} />
              </Link>
            </div>

            <div className="solution-visual glass-panel flex-center">
              <div style={{ textAlign: 'center', opacity: 0.8 }}>
                <Cable size={80} className="text-primary-color" style={{ marginBottom: '1rem' }} />
                <h3>70+ Pre-built Integrations</h3>
                <p>AWS, GitHub, Google Workspace, Jira, Datadog & more.</p>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* Final CTA */}
      <ScrollReveal variant="fade-up">
        <CTA
          title="See the Platform in Action"
          subtitle="Stop managing security through disconnected spreadsheets. Start a free trial and see how ThreatCheck maps your entire security infrastructure to compliance frameworks automatically."
        />
      </ScrollReveal>
    </div>
  );
}
