import React from 'react';
import useAnimatedCounter from '../hooks/useAnimatedCounter';
import './AnimatedCounter.css';

/**
 * AnimatedCounter
 * Renders a number that counts up from 0 when entering viewport.
 * 
 * Props:
 *   value:    number — the target value
 *   suffix:   string — appended after the number (e.g. '%', '+', 'hrs')
 *   prefix:   string — prepended before the number (e.g. '$')
 *   decimals: number — decimal places (default 0)
 *   duration: number — animation duration ms (default 1800)
 *   className: string
 *   label:    string — optional label below number
 */
export default function AnimatedCounter({
  value,
  suffix = '',
  prefix = '',
  decimals = 0,
  duration = 1800,
  className = '',
  label,
}) {
  const { ref, displayValue } = useAnimatedCounter(value, { decimals, duration });

  return (
    <div ref={ref} className={`tc-animated-counter ${className}`}>
      <div className="tc-counter-value">
        {prefix && <span className="tc-counter-prefix">{prefix}</span>}
        <span className="tc-counter-number">{displayValue}</span>
        {suffix && <span className="tc-counter-suffix">{suffix}</span>}
      </div>
      {label && <div className="tc-counter-label">{label}</div>}
    </div>
  );
}
