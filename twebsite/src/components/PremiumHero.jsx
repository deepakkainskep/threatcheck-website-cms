import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import GlowParticles from './GlowParticles';
import './PremiumHero.css';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
  }
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
  // Helper to wrap each word in the gradient class
  const renderGradientWords = (text) => {
    if (typeof text !== 'string') return text;
    return text.split(' ').map((word, i) => (
      <span key={i} className="highlight-word">
        {word}{' '}
      </span>
    ));
  };

  return (
    <section className="premium-hero-section">
      <div className="premium-hero-bg">
        <div className="premium-hero-grid"></div>
        <GlowParticles variant="grid" count={20} />
        <div className="premium-hero-glow"></div>
        <div className="premium-hero-glow premium-hero-glow-secondary"></div>
      </div>

      <motion.div
        className="container premium-hero-content"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants} className="premium-hero-label">
          {label}
        </motion.div>

        <motion.h1 variants={itemVariants} className="premium-hero-title">
          <span className="title-line-1">{titleLine1}</span>
          {titleLine2 && (
            <span className="title-line-2">
              {renderGradientWords(titleLine2)}
            </span>
          )}
        </motion.h1>

        <motion.p variants={itemVariants} className="premium-hero-desc">
          {description}
        </motion.p>

        <motion.div variants={itemVariants} className="premium-hero-actions">
          <Link to={primaryButtonLink} className="btn btn-primary tc-magnetic">
            {primaryButtonText} <ArrowRight size={18} style={{ marginLeft: '8px' }} />
          </Link>
          {secondaryButtonText && secondaryButtonLink && (
            <Link to={secondaryButtonLink} className="btn btn-secondary tc-magnetic">
              {secondaryButtonText}
            </Link>
          )}
        </motion.div>
      </motion.div>
    </section>
  );
}
