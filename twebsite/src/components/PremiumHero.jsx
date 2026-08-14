import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import ScrollReveal from './ScrollReveal';
import GlowParticles from './GlowParticles';
import './PremiumHero.css';

const renderAnimatedWords = (text, delayOffset) => {
  if (!text) return null;
  const words = text.split(' ');
  return words.map((word, i) => (
    <span
      key={i}
      className="tc-animated-word"
      style={{ animationDelay: `${delayOffset + (i * 0.08)}s` }}
    >
      {word}&nbsp;
    </span>
  ));
};

export default function PremiumHero({
  label,
  titleLine1,
  titleLine2,
  description,
  primaryButtonText = "Get a Demo",
  primaryButtonLink = "/request-demo",
  secondaryButtonText,
  secondaryButtonLink
}) {
  return (
    <section className="premium-hero-section">
      <div className="premium-hero-bg">
        <div className="premium-hero-grid"></div>
        <GlowParticles variant="grid" count={20} />
        <div className="premium-hero-glow"></div>
        <div className="premium-hero-glow premium-hero-glow-secondary"></div>
      </div>
      
      <div className="container premium-hero-content">
        <ScrollReveal variant="fade-up" delay={50}>
          <div className="premium-hero-label">
            {label}
          </div>
        </ScrollReveal>

        <h1 className="premium-hero-title">
          <span className="title-line-1 d-block tc-word-reveal-wrapper">
            {renderAnimatedWords(titleLine1, 0.1)}
          </span>
          {titleLine2 && (
            <span className="title-line-2 d-block tc-word-reveal-wrapper">
              {renderAnimatedWords(titleLine2, 0.1 + (titleLine1.split(' ').length * 0.08) + 0.1)}
            </span>
          )}
        </h1>

        <ScrollReveal variant="fade-up" delay={350}>
          <p className="premium-hero-desc">
            {description}
          </p>
        </ScrollReveal>

        <ScrollReveal variant="fade-up" delay={450}>
          <div className="premium-hero-actions">
            <Link to={primaryButtonLink} className="btn btn-primary tc-magnetic">
              {primaryButtonText} <ArrowRight size={18} style={{ marginLeft: '8px' }} />
            </Link>
            {secondaryButtonText && secondaryButtonLink && (
              <Link to={secondaryButtonLink} className="btn btn-secondary tc-magnetic">
                {secondaryButtonText}
              </Link>
            )}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
