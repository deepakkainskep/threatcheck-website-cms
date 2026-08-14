import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Shield, Mail, ArrowRight } from 'lucide-react';
import logo from '../assets/logo.png';
import './Footer.css';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) {
      setError('Please enter your email address');
      return;
    }
    // Simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address');
      return;
    }

    // Success state
    setError('');
    setSubmitted(true);
    setEmail('');
    setTimeout(() => {
      setSubmitted(false);
    }, 5000);
  };

  return (
    <footer className="footer">
      <div className="container footer-container">

        {/* Top Section: Branding & Newsletter */}
        <div className="footer-top">
          <div className="footer-brand">
            <Link to="/" className="footer-logo">
              <img src={logo} alt="ThreatCheck Logo" className="logo-image" style={{ height: '56px', width: 'auto', marginBottom: '1rem' }} />
            </Link>
            <p className="brand-tagline">
              Real posture management and continuous compliance automation for modern, cloud-first enterprise organizations.
            </p>
          </div>

          <div className="footer-newsletter">
            <h4 className="newsletter-title">Subscribe to Security Briefings</h4>
            <p className="newsletter-desc">Get zero-fluff analyses of emerging regulatory frameworks and cloud threats.</p>
            <form onSubmit={handleSubscribe} className="newsletter-form">
              <div className="newsletter-input-wrapper">
                <Mail className="mail-icon" size={16} />
                <input
                  type="email"
                  placeholder="Enter work email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-control newsletter-input"
                />
                <button type="submit" className="btn btn-primary newsletter-btn" aria-label="Subscribe">
                  <ArrowRight size={16} />
                </button>
              </div>
              {error && <p className="newsletter-feedback error-text">{error}</p>}
              {submitted && <p className="newsletter-feedback success-text">Subscription received! Welcome onboard.</p>}
            </form>
          </div>
        </div>

        {/* Middle Section: Columns of links */}
        <div className="footer-grid">

          <div className="footer-col">
            <h4 className="footer-title">Platform</h4>
            <ul className="footer-links">
              <li><Link to="/platform">Platform Overview</Link></li>
              <li><Link to="/features">Interactive Features</Link></li>
              <li><Link to="/security#threat-detection">Threat Detection</Link></li>
              <li><Link to="/risk-management">Risk Management</Link></li>
              <li><Link to="/frameworks">Frameworks</Link></li>
              <li><Link to="/security#continuous-monitoring">Continuous Posture</Link></li>
              <li><Link to="/reporting-analytics">Reporting & Analytics</Link></li>
              <li><Link to="/automation">Remediation Automation</Link></li>
              <li><Link to="/integrations">Integrations Center</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4 className="footer-title">Solutions</h4>
            <ul className="footer-links">
              <li><Link to="/solutions/enterprise">Enterprise Sellers</Link></li>
              <li><Link to="/solutions/security-teams">Security Operations</Link></li>
              <li><Link to="/solutions/compliance-teams">Compliance Officers</Link></li>
              <li><Link to="/solutions/risk-teams">Risk Managers</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4 className="footer-title">Resources Hub</h4>
            <ul className="footer-links">
              <li><Link to="/resources">All Resources</Link></li>
              <li><Link to="/blog">Blog & Best Practices</Link></li>
              <li><Link to="/insights">Executive Insights</Link></li>
              <li><Link to="/case-studies">Case Studies</Link></li>
              <li><Link to="/resources">Whitepapers & Guides</Link></li>
              <li><Link to="/resources">Auditing Checklists</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4 className="footer-title">Trust & Company</h4>
            <ul className="footer-links">
              <li><Link to="/about">About ThreatCheck</Link></li>
              <li><Link to="/security">Security Stance</Link></li>
              <li><Link to="/contact">Contact Support</Link></li>
              <li><Link to="/about">Careers</Link></li>
              {/* <li><Link to="/about">Press Kit</Link></li> */}
            </ul>
          </div>
        </div>

        {/* Bottom Section: Copyright & Socials */}
        <div className="footer-bottom">
          <p className="copyright">
            &copy; {new Date().getFullYear()} ThreatCheck Security Inc. All rights reserved.
          </p>

          <div className="social-links">
            {/* GitHub */}
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="social-icon-btn" aria-label="GitHub">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
              </svg>
            </a>
            {/* LinkedIn */}
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-icon-btn" aria-label="LinkedIn">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
            {/* X / Twitter */}
            <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="social-icon-btn" aria-label="X (Twitter)">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            {/* Discord */}
            <a href="https://discord.com" target="_blank" rel="noopener noreferrer" className="social-icon-btn" aria-label="Discord">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057c.002.022.015.04.032.05a19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
              </svg>
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}
