import React from 'react';
import { motion } from 'framer-motion';

// Matches the easing already used in ScrollReveal so it feels consistent
// with the rest of the site's animation language.
const ease = [0.22, 1, 0.36, 1];

const variants = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.45, ease } },
  exit: { opacity: 0, y: -12, transition: { duration: 0.3, ease } },
};

export default function PageTransition({ children }) {
  return (
    <motion.div
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {children}
    </motion.div>
  );
}
