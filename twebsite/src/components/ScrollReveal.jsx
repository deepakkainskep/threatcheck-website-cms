import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import './ScrollReveal.css';

// Map existing CSS-based variants to Framer Motion variants
const variantsMap = {
  'fade-up': { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0 } },
  'fade-down': { hidden: { opacity: 0, y: -40 }, visible: { opacity: 1, y: 0 } },
  'fade-left': { hidden: { opacity: 0, x: 48 }, visible: { opacity: 1, x: 0 } },
  'fade-right': { hidden: { opacity: 0, x: -48 }, visible: { opacity: 1, x: 0 } },
  'scale-in': { hidden: { opacity: 0, scale: 0.9 }, visible: { opacity: 1, scale: 1 } },
  'scale-up': { hidden: { opacity: 0, scale: 0.92, y: 24 }, visible: { opacity: 1, scale: 1, y: 0 } },
  'rotate-in': { hidden: { opacity: 0, rotate: -8, scale: 0.9 }, visible: { opacity: 1, rotate: 0, scale: 1 } },
};

export default function ScrollReveal({
  children,
  className = '',
  variant = 'fade-up',
  delay = 0,
  duration = 0.6,
  stagger = false,
  threshold = 0.12,
  once = true,
  parallax = false,
  parallaxSpeed = 0.05
}) {
  const [parallaxY, setParallaxY] = useState(0);
  const selectedVariant = variantsMap[variant] || variantsMap['fade-up'];

  useEffect(() => {
    if (!parallax) return;
    
    let rafId;
    const handleScroll = () => {
      rafId = requestAnimationFrame(() => {
        // Simple parallax approximation based on scroll
        const scrollY = window.scrollY;
        // The further you scroll, the more it moves. This is a very basic proxy 
        // to keep it lightweight without needing a ref to the exact element position.
        setParallaxY(scrollY * parallaxSpeed);
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(rafId);
    };
  }, [parallax, parallaxSpeed]);

  // finite state easing
  const ease = [0.22, 1, 0.36, 1];

  // If stagger is true, we define transition for staggerChildren
  const containerVariants = {
    hidden: selectedVariant.hidden,
    visible: {
      ...selectedVariant.visible,
      transition: {
        duration,
        delay: delay / 1000,
        ease,
        ...(stagger && { staggerChildren: 0.08, delayChildren: delay / 1000 })
      }
    }
  };

  // If stagger is used, the parent needs to orchestrate it. But wait, `ScrollReveal` might just wrap raw children. 
  // To avoid breaking existing `sr-stagger` behavior (which targeted CSS child elements), 
  // we will add the `sr-stagger` CSS class so existing CSS continues to stagger the children's transition delays
  // if they use native CSS transitions internally.
  const staggerClass = stagger ? 'sr-stagger' : '';
  const combinedClassName = `${className} ${staggerClass} ${parallax ? 'tc-parallax-wrapper' : ''}`.trim();

  const parallaxStyle = parallax ? { transform: `translateY(${parallaxY}px)` } : {};

  return (
    <motion.div
      className={combinedClassName}
      style={parallaxStyle}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: "-50px" }}
      variants={containerVariants}
    >
      {children}
    </motion.div>
  );
}
