import React, { useEffect, useRef } from 'react';
import './ScrollReveal.css';

/**
 * Upgraded ScrollReveal — supports multiple animation variants,
 * staggered children, custom delay/duration, and threshold control.
 *
 * Props:
 *  variant: 'fade-up' | 'fade-down' | 'fade-left' | 'fade-right' | 'scale-in' | 'scale-up' | 'rotate-in'
 *  delay:   number (ms, default 0)
 *  stagger: boolean — applies .sr-stagger to animate children with 80ms offsets
 *  threshold: 0–1 (default 0.12)
 *  once:    boolean (default true) — only animate in once
 *  className: extra classes
 */
export default function ScrollReveal({
  children,
  className = '',
  variant = 'fade-up',
  delay = 0,
  duration,
  stagger = false,
  threshold = 0.12,
  once = true,
  parallax = false,
  parallaxSpeed = 0.05
}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Apply initial class
    el.classList.add(`sr-${variant}`);
    if (stagger) el.classList.add('sr-stagger');
    if (delay) el.style.transitionDelay = `${delay}ms`;
    if (duration) el.style.transitionDuration = `${duration}ms`;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.classList.add('sr-visible');
            if (once) observer.unobserve(el);
          } else if (!once) {
            el.classList.remove('sr-visible');
          }
        });
      },
      { threshold }
    );

    observer.observe(el);

    // Parallax logic
    let rafId;
    const handleScroll = () => {
      if (!parallax) return;
      rafId = requestAnimationFrame(() => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        // Calculate offset based on distance from center of screen
        const centerOffset = (rect.top + rect.height / 2) - (window.innerHeight / 2);
        const yMove = centerOffset * parallaxSpeed;

        // We only want to transform the Y axis without overriding the reveal animation completely
        // To play nice with sr-visible which removes transform, we will apply this to a child wrapper
        // But since we can't easily inject a wrapper without breaking styles, we apply it via custom property
        el.style.setProperty('--parallax-y', `${yMove}px`);
      });
    };

    if (parallax) {
      window.addEventListener('scroll', handleScroll, { passive: true });
      handleScroll(); // Initial check
    }

    return () => {
      observer.disconnect();
      if (parallax) {
        window.removeEventListener('scroll', handleScroll);
        cancelAnimationFrame(rafId);
      }
    };
  }, [variant, delay, duration, stagger, threshold, once, parallax, parallaxSpeed]);

  // If parallax is true, we need to ensure the transform incorporates the custom property
  const parallaxStyle = parallax ? { transform: 'translateY(var(--parallax-y, 0))' } : {};

  return (
    <div ref={ref} className={`${className} ${parallax ? 'tc-parallax-wrapper' : ''}`} style={parallaxStyle}>
      {children}
    </div>
  );
}
