import React, { useEffect, useRef } from 'react';
import ScrollReveal from './ScrollReveal';
import './SectionHeader.css';

/**
 * SectionHeader — upgraded with staggered entrance animations.
 * Badge slides in from left, title does a premium fade-up, subtitle fades delayed.
 */
export default function SectionHeader({ badge, title, subtitle, align = 'center', glowColor = 'teal' }) {
  return (
    <div className={`section-header align-${align} glow-${glowColor}`}>
      {badge && (
        <ScrollReveal variant="fade-up">
          <span className={`badge ${glowColor === 'purple' ? 'badge-secondary' : 'badge-primary'} header-badge`}>
            {badge}
          </span>
        </ScrollReveal>
      )}
      <ScrollReveal variant="fade-up" delay={badge ? 100 : 0}>
        <h2 className="header-title gradient-text">{title}</h2>
      </ScrollReveal>
      {subtitle && (
        <ScrollReveal variant="fade-up" delay={badge ? 200 : 100}>
          <p className="header-subtitle">{subtitle}</p>
        </ScrollReveal>
      )}
    </div>
  );
}
