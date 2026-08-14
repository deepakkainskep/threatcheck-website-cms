import React, { useEffect, useRef } from 'react';
import './GlowParticles.css';

/**
 * GlowParticles
 * Renders a subtle animated particle/grid background for hero sections.
 * Pure CSS-driven — no canvas, no heavy JS.
 * 
 * Props:
 *   count:  number of particles (default 20)
 *   variant: 'dots' | 'grid' | 'hex' (default 'dots')
 *   className: string
 */
export default function GlowParticles({ count = 20, className = '', variant = 'dots' }) {
  const particles = Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: 1.5 + Math.random() * 3,
    delay: Math.random() * 6,
    duration: 4 + Math.random() * 5,
    opacity: 0.1 + Math.random() * 0.3,
  }));

  return (
    <div className={`glow-particles ${variant} ${className}`} aria-hidden="true">
      {/* Animated grid overlay */}
      {variant === 'grid' && (
        <div className="gp-grid-overlay" />
      )}

      {/* Particles */}
      {particles.map((p) => (
        <span
          key={p.id}
          className="gp-dot"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            opacity: p.opacity,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
          }}
        />
      ))}

      {/* Animated glow orbs */}
      <div className="gp-orb gp-orb-1" />
      <div className="gp-orb gp-orb-2" />
      <div className="gp-orb gp-orb-3" />
    </div>
  );
}
