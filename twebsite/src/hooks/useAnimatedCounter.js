import { useState, useEffect, useRef } from 'react';
import { useInView, animate } from 'framer-motion';

export default function useAnimatedCounter(
  target,
  {
    duration = 1.8,
    decimals = 0,
    startVal = 0,
  } = {}
) {
  const [displayValue, setDisplayValue] = useState(startVal.toFixed(decimals));
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (inView) {
      const controls = animate(startVal, target, {
        duration: duration,
        ease: "easeOut",
        onUpdate: (val) => setDisplayValue(val.toFixed(decimals))
      });
      return controls.stop;
    }
  }, [target, duration, decimals, startVal, inView]);

  return { ref, displayValue };
}
