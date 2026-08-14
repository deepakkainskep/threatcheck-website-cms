import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Shield, ChevronDown, Menu, X, ArrowRight } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import logo from '../assets/logo.png';
import './Navbar.css';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const suppressHover = useRef(false);

  useEffect(() => {
    setIsOpen(false);
    setActiveDropdown(null);
  }, [location]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleDropdown = (name) => {
    setActiveDropdown(prev => prev === name ? null : name);
  };

  const closeDropdown = () => {
    setActiveDropdown(null);
    suppressHover.current = true;
    setTimeout(() => {
      suppressHover.current = false;
    }, 400);
  };

  const handleMouseEnter = (name) => {
    if (!suppressHover.current) {
      setActiveDropdown(name);
    }
  };

  const handleMouseLeave = () => {
    if (!suppressHover.current) {
      setActiveDropdown(null);
    }
  };

  const isPlatformActive = ['/platform', '/dashboard-features', '/integrations', '/security', '/risk-management', '/frameworks', '/reporting-analytics', '/automation'].includes(location.pathname);
  const isSolutionsActive = location.pathname.startsWith('/solutions');
  const isResourcesActive = ['/resources', '/blog', '/insights', '/case-studies'].some(path => location.pathname.startsWith(path));

  return (
    <>
      <header className={`navbar-header ${scrolled ? 'scrolled' : ''}`}>
        <div className="container navbar-container">
          {/* Logo */}
          <Link to="/" className="navbar-logo">
            <img src={logo} alt="ThreatCheck Logo" className="logo-image" style={{ height: '48px', width: 'auto' }} />
          </Link>

          {/* Desktop Navigation */}
          <nav className="desktop-nav">
            <ul className="nav-links">
              {/* Platform Dropdown */}
              <li
                className={`nav-item has-dropdown${activeDropdown === 'platform' ? ' dropdown-open' : ''}`}
                onMouseEnter={() => handleMouseEnter('platform')}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  className={`nav-link-btn ${activeDropdown === 'platform' || isPlatformActive ? 'active' : ''}`}
                  onClick={() => toggleDropdown('platform')}
                >
                  Platform <ChevronDown size={14} className="chevron" />
                </button>
                <div className="dropdown-panel mega-menu">
                  <div className="mega-menu-content">
                    <div className="mega-menu-links">
                      <div className="mega-menu-col">
                        <h4 className="mega-col-title">Core Capability</h4>
                        <Link to="/platform" className="mega-menu-item" onClick={closeDropdown}>
                          <span className="mega-item-title">Platform Overview</span>
                          <span className="mega-item-desc">Unified control center for security & compliance</span>
                        </Link>
                        <Link to="/scanner" className="mega-menu-item" onClick={closeDropdown}>
                          <span className="mega-item-title">Threat Scanner</span>
                          <span className="mega-item-desc">Analyze and correlate live security signals</span>
                        </Link>
                        <Link to="/integrations" className="mega-menu-item" onClick={closeDropdown}>
                          <span className="mega-item-title">Integrations</span>
                          <span className="mega-item-desc">SaaS, Cloud providers, and HR tools</span>
                        </Link>
                      </div>
                      <div className="mega-menu-col">
                        <h4 className="mega-col-title">Security Pillars</h4>
                        <Link to="/security#threat-detection" className="mega-menu-item" onClick={closeDropdown}>
                          <span className="mega-item-title">Threat Detection</span>
                          <span className="mega-item-desc">Real-time vulnerability scanning</span>
                        </Link>
                        <Link to="/security#continuous-monitoring" className="mega-menu-item" onClick={closeDropdown}>
                          <span className="mega-item-title">Continuous Monitoring</span>
                          <span className="mega-item-desc">Automated drift assessment</span>
                        </Link>
                        <Link to="/automation" className="mega-menu-item" onClick={closeDropdown}>
                          <span className="mega-item-title">Workflow Automation</span>
                          <span className="mega-item-desc">Auto-remediation pipelines</span>
                        </Link>
                      </div>
                      <div className="mega-menu-col">
                        <h4 className="mega-col-title">Audit & Risk</h4>
                        <Link to="/frameworks" className="mega-menu-item" onClick={closeDropdown}>
                          <span className="mega-item-title">Frameworks</span>
                          <span className="mega-item-desc">SOC 2, ISO 27001, HIPAA & more</span>
                        </Link>
                        <Link to="/risk-management" className="mega-menu-item" onClick={closeDropdown}>
                          <span className="mega-item-title">Risk Management</span>
                          <span className="mega-item-desc">Track and score operational risk</span>
                        </Link>
                        <Link to="/reporting-analytics" className="mega-menu-item" onClick={closeDropdown}>
                          <span className="mega-item-title">Reporting & Analytics</span>
                          <span className="mega-item-desc">Audit-ready executive compliance reporting</span>
                        </Link>
                      </div>
                    </div>
                    <div className="mega-menu-featured">
                      <h4 className="featured-subtitle">DISCOVER THREATCHECK</h4>
                      <h3 className="featured-title">See the platform in action.</h3>
                      <p className="featured-desc">Book a demo to see how we automate security and compliance mapping.</p>
                      <Link to="/request-demo" className="featured-link" onClick={closeDropdown}>Request Demo &rarr;</Link>
                    </div>
                  </div>
                </div>
              </li>

              {/* Solutions Dropdown */}
              <li
                className={`nav-item has-dropdown${activeDropdown === 'solutions' ? ' dropdown-open' : ''}`}
                onMouseEnter={() => handleMouseEnter('solutions')}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  className={`nav-link-btn ${activeDropdown === 'solutions' || isSolutionsActive ? 'active' : ''}`}
                  onClick={() => toggleDropdown('solutions')}
                >
                  Solutions <ChevronDown size={14} className="chevron" />
                </button>
                <div className="dropdown-panel mega-menu">
                  <div className="mega-menu-content">
                    <div className="mega-menu-links">
                      <div className="mega-menu-col">
                        <h4 className="mega-col-title">By Role</h4>
                        <Link to="/solutions/security-teams" className="mega-menu-item" onClick={closeDropdown}>
                          <span className="mega-item-title">For Security Teams</span>
                          <span className="mega-item-desc">Real-time continuous posture visibility</span>
                        </Link>
                        <Link to="/solutions/compliance-teams" className="mega-menu-item" onClick={closeDropdown}>
                          <span className="mega-item-title">For Compliance Teams</span>
                          <span className="mega-item-desc">Eliminate spreadsheet assessments</span>
                        </Link>
                        <Link to="/solutions/risk-teams" className="mega-menu-item" onClick={closeDropdown}>
                          <span className="mega-item-title">For Risk Teams</span>
                          <span className="mega-item-desc">Map vulnerabilities to financial risks</span>
                        </Link>
                      </div>
                      <div className="mega-menu-col">
                        <h4 className="mega-col-title">By Size</h4>
                        <Link to="/solutions/enterprise" className="mega-menu-item" onClick={closeDropdown}>
                          <span className="mega-item-title">For Enterprise</span>
                          <span className="mega-item-desc">Scalable frameworks for global organizations</span>
                        </Link>
                      </div>
                    </div>
                    <div className="mega-menu-featured">
                      <h4 className="featured-subtitle">BY INDUSTRY</h4>
                      <h3 className="featured-title">Compliance mapped to how your industry is regulated.</h3>
                      <p className="featured-desc">Fintech, healthcare, SaaS, and public sector programs, pre-mapped to the frameworks that apply.</p>
                      <Link to="/frameworks" className="featured-link" onClick={closeDropdown}>Browse industries &rarr;</Link>
                    </div>
                  </div>
                </div>
              </li>

              {/* Resources Dropdown */}
              <li
                className={`nav-item has-dropdown${activeDropdown === 'resources' ? ' dropdown-open' : ''}`}
                onMouseEnter={() => handleMouseEnter('resources')}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  className={`nav-link-btn ${activeDropdown === 'resources' || isResourcesActive ? 'active' : ''}`}
                  onClick={() => toggleDropdown('resources')}
                >
                  Resources <ChevronDown size={14} className="chevron" />
                </button>
                <div className="dropdown-panel mega-menu mega-menu-center">
                  <div className="mega-menu-content">
                    <div className="mega-menu-links">
                      <div className="mega-menu-col">
                        <h4 className="mega-col-title">Learn & Explore</h4>
                        <Link to="/resources" className="mega-menu-item" onClick={closeDropdown}>
                          <span className="mega-item-title">Resources Hub</span>
                          <span className="mega-item-desc">Whitepapers, guides, checklists, and webinars</span>
                        </Link>
                        <Link to="/blog" className="mega-menu-item" onClick={closeDropdown}>
                          <span className="mega-item-title">Blog & Insights</span>
                          <span className="mega-item-desc">Cybersecurity best practices and tutorials</span>
                        </Link>
                      </div>
                      <div className="mega-menu-col">
                        <h4 className="mega-col-title">Research</h4>
                        <Link to="/insights" className="mega-menu-item" onClick={closeDropdown}>
                          <span className="mega-item-title">Security Insights</span>
                          <span className="mega-item-desc">Executive analysis of emerging threats</span>
                        </Link>
                        <Link to="/case-studies" className="mega-menu-item" onClick={closeDropdown}>
                          <span className="mega-item-title">Case Studies</span>
                          <span className="mega-item-desc">Customer stories of rapid compliance</span>
                        </Link>
                      </div>
                    </div>
                    <div className="mega-menu-featured">
                      <h4 className="featured-subtitle">LATEST REPORT</h4>
                      <h3 className="featured-title">2026 Cloud Security Benchmark</h3>
                      <p className="featured-desc">Read our annual report on the state of cloud posture and compliance.</p>
                      <Link to="/resources" className="featured-link" onClick={closeDropdown}>Read Report &rarr;</Link>
                    </div>
                  </div>
                </div>
              </li>

              <li className="nav-item">
                <NavLink to="/security" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                  Security
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink to="/about" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                  About
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink to="/contact" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                  Contact
                </NavLink>
              </li>
            </ul>
          </nav>

          {/* CTA + Theme Toggle */}
          <div className="navbar-actions">
            <ThemeToggle />
            <Link to="/request-demo" className="btn btn-primary btn-demo-nav">
              Request Demo <ArrowRight size={16} />
            </Link>

            <button className="mobile-menu-toggle" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle Navigation">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <div className={`mobile-drawer-overlay ${isOpen ? 'active' : ''}`} onClick={() => setIsOpen(false)}></div>
      <div className={`mobile-drawer ${isOpen ? 'open' : ''}`}>
        <div className="mobile-drawer-header">
          <Link to="/" className="navbar-logo" onClick={() => setIsOpen(false)}>
            <img src={logo} alt="ThreatCheck Logo" className="logo-image" style={{ height: '40px', width: 'auto' }} />
          </Link>
          <div className="mobile-header-actions">
            <ThemeToggle />
            <button className="close-drawer" onClick={() => setIsOpen(false)} aria-label="Close Navigation">
              <X size={24} />
            </button>
          </div>
        </div>
        <div className="mobile-drawer-body">
          <nav className="mobile-nav">
            <ul className="mobile-nav-links">
              <li className="mobile-nav-item">
                <button className="mobile-dropdown-btn" onClick={() => toggleDropdown('m-platform')}>
                  Platform <ChevronDown size={16} className={`chevron ${activeDropdown === 'm-platform' ? 'rotated' : ''}`} />
                </button>
                <div className={`mobile-dropdown-content ${activeDropdown === 'm-platform' ? 'open' : ''}`}>
                  <Link to="/platform" onClick={() => setIsOpen(false)}>Platform Overview</Link>
                  <Link to="/features" onClick={() => setIsOpen(false)}>Interactive Features</Link>
                  <Link to="/scanner" onClick={() => setIsOpen(false)}>Threat Scanner</Link>
                  <Link to="/security#threat-detection" onClick={() => setIsOpen(false)}>Threat Detection</Link>
                  <Link to="/risk-management" onClick={() => setIsOpen(false)}>Risk Management</Link>
                  <Link to="/frameworks" onClick={() => setIsOpen(false)}>Frameworks</Link>
                  <Link to="/security#continuous-monitoring" onClick={() => setIsOpen(false)}>Continuous Monitoring</Link>
                  <Link to="/reporting-analytics" onClick={() => setIsOpen(false)}>Reporting & Analytics</Link>
                  <Link to="/automation" onClick={() => setIsOpen(false)}>Workflow Automation</Link>
                  <Link to="/integrations" onClick={() => setIsOpen(false)}>Integrations</Link>
                </div>
              </li>

              <li className="mobile-nav-item">
                <button className="mobile-dropdown-btn" onClick={() => toggleDropdown('m-solutions')}>
                  Solutions <ChevronDown size={16} className={`chevron ${activeDropdown === 'm-solutions' ? 'rotated' : ''}`} />
                </button>
                <div className={`mobile-dropdown-content ${activeDropdown === 'm-solutions' ? 'open' : ''}`}>
                  <Link to="/solutions/enterprise" onClick={() => setIsOpen(false)}>Enterprise</Link>
                  <Link to="/solutions/security-teams" onClick={() => setIsOpen(false)}>Security Teams</Link>
                  <Link to="/solutions/compliance-teams" onClick={() => setIsOpen(false)}>Compliance Teams</Link>
                  <Link to="/solutions/risk-teams" onClick={() => setIsOpen(false)}>Risk Teams</Link>
                </div>
              </li>

              <li className="mobile-nav-item">
                <button className="mobile-dropdown-btn" onClick={() => toggleDropdown('m-resources')}>
                  Resources <ChevronDown size={16} className={`chevron ${activeDropdown === 'm-resources' ? 'rotated' : ''}`} />
                </button>
                <div className={`mobile-dropdown-content ${activeDropdown === 'm-resources' ? 'open' : ''}`}>
                  <Link to="/resources" onClick={() => setIsOpen(false)}>Resources Hub</Link>
                  <Link to="/blog" onClick={() => setIsOpen(false)}>Blog & Insights</Link>
                  <Link to="/insights" onClick={() => setIsOpen(false)}>Security Insights</Link>
                  <Link to="/case-studies" onClick={() => setIsOpen(false)}>Case Studies</Link>
                </div>
              </li>

              <li className="mobile-nav-item">
                <Link to="/security" className="mobile-nav-link" onClick={() => setIsOpen(false)}>Security</Link>
              </li>
              <li className="mobile-nav-item">
                <Link to="/about" className="mobile-nav-link" onClick={() => setIsOpen(false)}>About</Link>
              </li>
              <li className="mobile-nav-item">
                <Link to="/contact" className="mobile-nav-link" onClick={() => setIsOpen(false)}>Contact</Link>
              </li>
            </ul>
          </nav>
        </div>
        <div className="mobile-drawer-footer">
          <Link to="/request-demo" className="btn btn-primary w-full" onClick={() => setIsOpen(false)}>
            Request Demo <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </>
  );
}
