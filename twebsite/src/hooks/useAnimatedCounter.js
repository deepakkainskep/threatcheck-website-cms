import { useState, useEffect, useRef } from 'react';

/**
 * useAnimatedCounter
 * Counts from 0 (or startVal) to target when the ref enters viewport.
 * Supports integer and decimal targets.
 * 
 * Usage:
 *   const { ref, displayValue } = useAnimatedCounter(98.4, { decimals: 1, duration: 2000 });
 *   <span ref={ref}>{displayValue}</span>
 */
export default function useAnimatedCounter(
  target,
  {
    duration = 1800,
    decimals = 0,
    startVal = 0,
    easing = 'easeOutExpo',
    threshold = 0.5,
  } = {}
) {
  const [displayValue, setDisplayValue] = useState(startVal.toFixed(decimals));
  const ref = useRef(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const easingFn = (t) => {
      switch (easing) {
        case 'easeOutExpo': return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
        case 'easeOutQuart': return 1 - Math.pow(1 - t, 4);
        case 'linear': return t;
        default: return 1 - Math.pow(2, -10 * t);
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const start = performance.now();

          const step = (now) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = easingFn(progress);
            const current = startVal + (target - startVal) * eased;
            setDisplayValue(current.toFixed(decimals));
            if (progress < 1) requestAnimationFrame(step);
          };

          requestAnimationFrame(step);
          observer.disconnect();
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration, decimals, startVal, easing, threshold]);

  return { ref, displayValue };
}
