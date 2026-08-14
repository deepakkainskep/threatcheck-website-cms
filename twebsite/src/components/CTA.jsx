import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck } from 'lucide-react';
import ScrollReveal from './ScrollReveal';
import './CTA.css';

export default function CTA({
  title = "Ready to transition from audit theater to continuous posture security?",
  subtitle = "Deploy ThreatCheck and map SOC 2, ISO 27001, and HIPAA controls in hours, not months. Maintain real-time compliance status automatically.",
  primaryText = "Request a Demo",
  secondaryText = "Talk to an Expert"
}) {
  return (
    <section className="cta-section container">
      <div className="cta-panel glass-panel">
        {/* Decorative Grid Lines */}
        <div className="cta-decor-line cta-line-x"></div>
        <div className="cta-decor-line cta-line-y"></div>

        {/* Glow Effects */}
        <div className="cta-glow-teal"></div>
        <div className="cta-glow-purple"></div>

        <div className="cta-content">
          <div className="cta-icon-wrapper">
            <ShieldCheck size={28} className="cta-icon" />
            <div className="cta-icon-glow"></div>
          </div>

          <ScrollReveal variant="fade-up">
            <h2 className="cta-title">{title}</h2>
          </ScrollReveal>
          <p className="cta-subtitle">{subtitle}</p>

          <div className="cta-buttons">
            <Link to="/request-demo" className="btn btn-primary btn-cta-primary">
              {primaryText} <ArrowRight size={16} />
            </Link>
            <Link to="/contact" className="btn btn-secondary btn-cta-secondary">
              {secondaryText}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
