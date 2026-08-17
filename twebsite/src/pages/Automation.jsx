import React from 'react';
import { Cpu, Check, Play, Zap } from 'lucide-react';
import SectionHeader from '../components/SectionHeader';
import CTA from '../components/CTA';
import ScrollReveal from '../components/ScrollReveal';
import GlowParticles from '../components/GlowParticles';
import PremiumHero from '../components/PremiumHero';
import './PlatformFeatures.css';

export default function Automation() {
  return (
    <div className="automation-page">
      {/* Hero Section */}
      <PremiumHero
        label="WORKFLOW AUTOMATION"
        titleLine1="Autonomous Remediation &"
        titleLine2="Developer Security Workflows"
        description="Trigger intelligent webhooks, generate Jira tickets, and execute auto-remediation pipelines the moment drift is detected."
        primaryButtonText="Get a Demo"
        primaryButtonLink="/request-demo"
        secondaryButtonText="Explore Integrations"
        secondaryButtonLink="/integrations"
      />

      {/* Grid Capability Detail */}
      <section className="pf-details-section section-padding bg-secondary-theme">
        <div className="container pf-grid">

          <ScrollReveal variant="fade-right" className="pf-text">
            <h2 className="gradient-text">API-driven Posture Correction</h2>
            <p>Don't rely solely on manual ticketing. Configure automated rules to resolve simple configuration drifts immediately.</p>

            <ul className="pf-list">
              <li>
                <Check size={18} />
                <div>
                  <strong>Remediation Webhook Pipelines</strong>
                  <p>Trigger automated serverless functions to lock open firewall ports or encrypt RDS buckets.</p>
                </div>
              </li>
              <li>
                <Check size={18} />
                <div>
                  <strong>Developer Alert Routing</strong>
                  <p>Send alerts directly to team Slack channels and generate Jira tickets in real-time.</p>
                </div>
              </li>
              <li>
                <Check size={18} />
                <div>
                  <strong>DevSecOps Build Blockers</strong>
                  <p>Incorporate compliance assessments inside CI/CD code checks to block vulnerabilities before deployment.</p>
                </div>
              </li>
            </ul>
          </ScrollReveal>

          <ScrollReveal variant="fade-left" delay={150} className="pf-visual-card glass-panel">
            <h4 className="pf-visual-title"><Zap size={14} /> Automation Triggers</h4>
            <ul className="pf-visual-list">
              <li><Play size={14} className="text-success" /> Trigger: Open S3 Bucket Detected</li>
              <li><Zap size={14} className="text-teal" /> Action: Run AWS Lambda bucket restrictor</li>
              <li><Play size={14} className="text-success" /> Trigger: Non-MFA Okta User Active</li>
              <li><Zap size={14} className="text-teal" /> Action: Send Slack alert to Admin</li>
            </ul>
          </ScrollReveal>

        </div>
      </section>

      {/* CTA */}
      <ScrollReveal variant="scale-up">
        <CTA
          title="Automate your posture defense"
          subtitle="Book a walkthrough of our webhook remediation engine."
        />
      </ScrollReveal>
    </div>
  );
}
