import { useEffect, useRef } from 'react';

/**
 * useIntersection — triggers a callback when element enters viewport.
 * 
 * Usage:
 *   const ref = useIntersection((entry) => { ... }, { threshold: 0.1 });
 */
export function useIntersection(callback, options = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(callback);
    }, options);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return ref;
}

/**
 * useScrollProgress — returns a 0–1 value indicating how far
 * through an element the user has scrolled.
 * Fires on rAF for smooth tracking.
 */
export function useScrollProgress(ref) {
  const progress = useRef(0);

  useEffect(() => {
    let rafId;
    const update = () => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const winH = window.innerHeight;
      const start = winH;
      const end = -rect.height;
      const val = (start - rect.top) / (start - end);
      progress.current = Math.max(0, Math.min(1, val));
      rafId = requestAnimationFrame(update);
    };
    rafId = requestAnimationFrame(update);
    return () => cancelAnimationFrame(rafId);
  }, [ref]);

  return progress;
}
