import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, ShieldAlert, Zap, AlertTriangle, Layers, Eye, RefreshCw, Check } from 'lucide-react';
import InteractiveDashboard from '../components/InteractiveDashboard';
import SectionHeader from '../components/SectionHeader';
import FeatureCard from '../components/FeatureCard';
import CaseStudyCard from '../components/CaseStudyCard';
import BlogCard from '../components/BlogCard';
import CTA from '../components/CTA';
import ScrollReveal from '../components/ScrollReveal';
import SecurityJourney from '../components/SecurityJourney';
import GlowParticles from '../components/GlowParticles';
import IndustryTrack from '../components/IndustryTrack';

import { apiService } from '../services/api';
import { useApi } from '../hooks/useApi';

// Image imports
import heroImg from '../assets/hero.png';
import img1 from '../assets/image1.png';
import img2 from '../assets/image2.png';
import img3 from '../assets/image3.png';

import './Home.css';

const stackLayers = [
  {
    title: "Cloud Infrastructure Posture",
    desc: "Continuously scans multi-cloud setups (AWS, GCP, Azure) for misconfigurations, public storage drives, and configuration shifts.",
    controls: ["IAM over-privilege checks", "Encryption-at-rest verification", "Network subnet firewall sweeps", "S3 bucket exposure blocks"],
    evidence: ["Infrastructure baseline exports", "Daily configuration diffs", "Change management audit history"]
  },
  {
    title: "Identity & Access Guard",
    desc: "Connects to your IDPs, directory structures, and code systems to verify users, roles, and credential health.",
    controls: ["MFA enforcement validation", "Orphaned accounts scanning", "Least-privilege permission validation", "Single Sign-On coverage reports"],
    evidence: ["Access control checklists", "Terminated employee access logs", "Privileged session audits"]
  },
  {
    title: "Continuous Audit Mapping",
    desc: "Automatically maps discovered configurations to SOC 2, ISO 27001, HIPAA, and GDPR frameworks in real-time.",
    controls: ["Multi-framework controls mapping", "Control coverage dashboards", "Automated compliance gap analyses", "Readiness dry-runs"],
    evidence: ["Audit-ready compliance export spreadsheets", "CPA partner read-only portals", "Mapped framework criteria reports"]
  },
  {
    title: "Remediation Automation",
    desc: "Triggers webhooks and developer tickets when drifts occur, and runs automated pipelines to restore compliance.",
    controls: ["Drift auto-remediation scripts", "Jira & Slack alert triggers", "Continuous deployment security checkers", "Container image vulnerability scanning"],
    evidence: ["Remediation event log history", "Vulnerability timeline reports", "Drift correction logs"]
  }
];

export default function Home() {
  const { data: blogData = [], loading: loadingBlogs } = useApi(apiService.getBlogs);
  const { data: caseStudiesData = [], loading: loadingCases } = useApi(apiService.getCaseStudies);

  const [activeStackLayer, setActiveStackLayer] = useState(0);
  const activeStackLayerRef = useRef(0);
  activeStackLayerRef.current = activeStackLayer;

  const stackWrapperRef = useRef(null);

  const isPinnedRef = useRef(false);
  const wheelDeltaRef = useRef(0);
  const lastScrollY = useRef(0);

  // Sync state with ref
  useEffect(() => {
    activeStackLayerRef.current = activeStackLayer;
  }, [activeStackLayer]);

  // Main scroll lock and intersection logic
  useEffect(() => {
    let rafId;
    lastScrollY.current = window.scrollY;

    const handleScroll = () => {
      rafId = requestAnimationFrame(() => {
        const section = stackWrapperRef.current;
        if (!section) return;

        const rect = section.getBoundingClientRect();
        const offset = 70; // Pin position (below navbar)
        const currentScrollY = window.scrollY;
        const scrollingDown = currentScrollY > lastScrollY.current;
        const scrollingUp = currentScrollY < lastScrollY.current;

        if (isPinnedRef.current) {
          // If the page scrolled while pinned, they bypassed the lock (e.g. scrollbar drag)
          // We use a high tolerance (150) because trackpad momentum can fight window.scrollTo
          if (Math.abs(rect.top - offset) > 150) {
            isPinnedRef.current = false;
            if (rect.top < offset) {
              setActiveStackLayer(stackLayers.length - 1);
            } else {
              setActiveStackLayer(0);
            }
          }
          lastScrollY.current = currentScrollY;
          return;
        }

        // Not pinned, check for boundaries to snap and pin
        if (scrollingDown && activeStackLayerRef.current === 0) {
          if (rect.top <= offset && rect.top > offset - 250) {
            window.scrollTo({ top: currentScrollY + rect.top - offset });
            isPinnedRef.current = true;
            wheelDeltaRef.current = 0;
          }
        } else if (scrollingUp && activeStackLayerRef.current === stackLayers.length - 1) {
          if (rect.top >= offset && rect.top < offset + 250) {
            window.scrollTo({ top: currentScrollY + rect.top - offset });
            isPinnedRef.current = true;
            wheelDeltaRef.current = 0;
          }
        }

        // Handle fast scrolling / skipping (only if they scrolled way past the tolerance)
        if (rect.top < offset - 250 && activeStackLayerRef.current !== stackLayers.length - 1) {
          setActiveStackLayer(stackLayers.length - 1);
        }
        if (rect.top > offset + 250 && activeStackLayerRef.current !== 0) {
          setActiveStackLayer(0);
        }

        lastScrollY.current = currentScrollY;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(rafId);
    };
  }, [stackLayers.length]);

  // Wheel and Touch interception for progressing steps
  useEffect(() => {
    let lastTransitionTime = 0;
    const cooldown = 600; // ms to wait between step changes

    const handleWheel = (e) => {
      if (!isPinnedRef.current) return;

      e.preventDefault();

      const now = Date.now();
      if (now - lastTransitionTime < cooldown) {
        // Prevent momentum from carrying over to the next step
        wheelDeltaRef.current = 0;
        return;
      }

      wheelDeltaRef.current += e.deltaY;
      const threshold = 150; // Scroll sensitivity

      if (wheelDeltaRef.current > threshold) {
        wheelDeltaRef.current = 0;
        if (activeStackLayerRef.current < stackLayers.length - 1) {
          setActiveStackLayer(prev => prev + 1);
          lastTransitionTime = now;
        } else {
          isPinnedRef.current = false; // Release lock
        }
      } else if (wheelDeltaRef.current < -threshold) {
        wheelDeltaRef.current = 0;
        if (activeStackLayerRef.current > 0) {
          setActiveStackLayer(prev => prev - 1);
          lastTransitionTime = now;
        } else {
          isPinnedRef.current = false; // Release lock
        }
      }
    };

    let touchStartY = 0;
    const handleTouchStart = (e) => {
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchMove = (e) => {
      if (!isPinnedRef.current) return;
      e.preventDefault();

      const now = Date.now();
      if (now - lastTransitionTime < cooldown) {
        wheelDeltaRef.current = 0;
        return;
      }

      const touchY = e.touches[0].clientY;
      const deltaY = touchStartY - touchY;
      touchStartY = touchY;

      wheelDeltaRef.current += deltaY;
      const threshold = 60; // Touch sensitivity

      if (wheelDeltaRef.current > threshold) {
        wheelDeltaRef.current = 0;
        if (activeStackLayerRef.current < stackLayers.length - 1) {
          setActiveStackLayer(prev => prev + 1);
          lastTransitionTime = now;
        } else {
          isPinnedRef.current = false;
        }
      } else if (wheelDeltaRef.current < -threshold) {
        wheelDeltaRef.current = 0;
        if (activeStackLayerRef.current > 0) {
          setActiveStackLayer(prev => prev - 1);
          lastTransitionTime = now;
        } else {
          isPinnedRef.current = false;
        }
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [stackLayers.length]);

  const handleTabClick = (idx) => {
    setActiveStackLayer(idx);
    if (!isPinnedRef.current && stackWrapperRef.current) {
      const rect = stackWrapperRef.current.getBoundingClientRect();
      window.scrollTo({ top: window.scrollY + rect.top - 70, behavior: 'smooth' });
    }
  };


  return (
    <div className="home-page">

      {/* ── Hero Section ── */}
      <section className="hero-section hero-section-animated">
        {/* Animated background */}
        <GlowParticles variant="grid" count={25} />

        <div className="container hero-container">
          <div className="hero-content">
            <span className="badge badge-primary hero-badge">Next-Gen Cyber Security</span>
            <h1 className="hero-title">
              Security-Driven <span className="highlight-word">Compliance</span>.<br />
              Zero Audit Theater.
            </h1>
            <p className="hero-lead">
              Deploy ThreatCheck to continuously monitor cloud posture, verify identities, and automatically compile audit evidence for SOC 2, ISO 27001, and HIPAA.
            </p>

            <div className="hero-actions">
              <Link to="/request-demo" className="btn btn-primary tc-magnetic">
                Book A Demo <ArrowRight size={16} />
              </Link>
              <Link to="/platform" className="btn btn-secondary">
                Explore Platform
              </Link>
            </div>

            {/* Animated stat badges */}
            <div className="hero-stats">
              <div className="hero-stat-item">
                <span className="stat-value hero-stat-animated">98.4%</span>
                <span className="stat-label">Average Compliance Score</span>
              </div>
              <div className="hero-stat-separator"></div>
              <div className="hero-stat-item">
                <span className="stat-value hero-stat-animated">1.2 hrs</span>
                <span className="stat-label">Mean Time to Remediate</span>
              </div>
              <div className="hero-stat-separator"></div>
              <div className="hero-stat-item">
                <span className="stat-value hero-stat-animated">350+</span>
                <span className="stat-label">Compliance Controls</span>
              </div>
            </div>
          </div>

          <div className="hero-visual">
            <div className="hero-dashboard-wrapper">
              {/* Scan beam overlay */}
              <div className="hero-scan-beam" />
              <InteractiveDashboard />
            </div>
          </div>
        </div>

        {/* Animated scroll hint */}
        {/* <div className="hero-scroll-hint">
          <div className="scroll-hint-dot" />
          <span>Scroll to explore</span>
        </div> */}
      </section>

      {/* ── Trust Banner with marquee ── */}
      <section className="trust-banner">
        <div className="container">
          <p className="trust-title">TRUSTED BY HIGH-GROWTH COMPANIES SELLING TO REGULATED ENTERPRISES</p>
        </div>
        <div className="trust-marquee-outer">
          <div className="tc-marquee-track">
            {/* duplicated for seamless loop */}
            {['Apex Financial', 'BioHealth Systems', 'Nexus Cloud', 'Logix Logistics', 'Synergy Labs', 'Meridian Tech', 'Vantage AI', 'CoreStack Inc',
              'Apex Financial', 'BioHealth Systems', 'Nexus Cloud', 'Logix Logistics', 'Synergy Labs', 'Meridian Tech', 'Vantage AI', 'CoreStack Inc'].map((name, i) => (
                <div key={i} className="trust-logo-item">
                  <span className="trust-logo-text">{name}</span>
                </div>
              ))}
          </div>
        </div>
      </section>

      {/* ── Industry Categories / Seamless Track ── */}
      <IndustryTrack />

      {/* ── The Problem ── */}
      <section className="section-padding bg-secondary-theme">
        <div className="container">
          <ScrollReveal variant="fade-up" parallax={true} parallaxSpeed={-0.03}>
            <SectionHeader
              badge="01 / The Vulnerability"
              title="The Checklist Fallacy: Why Static Compliance Fails"
              subtitle="Passing an annual security audit does not guarantee that your infrastructure is secure today. Static checkpoints create blindspots that attackers easily exploit."
            />
          </ScrollReveal>

          <div className="grid-3 sr-stagger">
            {[
              { icon: AlertTriangle, className: 'text-warning', title: 'The Posture Gap', body: 'Systems are verified once a year, but configurations drift daily. A single open database port on a Tuesday afternoon exposes client data, regardless of a SOC 2 certificate.' },
              { icon: ShieldAlert, className: 'text-danger', title: 'Scattered Evidence', body: 'Security teams waste hundreds of hours manually compiling spreadsheets, user directories, training confirmations, and screenshots for CPA auditors.' },
              { icon: Layers, className: 'text-teal', title: 'Multi-Framework Redundancy', body: 'Re-collecting the exact same evidence logs in slightly different formats to satisfy SOC 2, ISO 27001, and HIPAA multiply administrative compliance efforts.' },
            ].map(({ icon: Icon, className, title, body }, i) => (
              <ScrollReveal key={i} variant="scale-in" delay={i * 100} style={{ height: '100%' }}>
                <div className="problem-card glass-panel tc-premium-card" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <Icon className={`problem-icon ${className}`} size={24} />
                  <h3>{title}</h3>
                  <p style={{ flexGrow: 1 }}>{body}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── The Solution ── */}
      <section className="section-padding">
        <div className="container solution-grid">
          <ScrollReveal variant="fade-right">
            <div className="solution-text">
              <span className="badge badge-primary">02 / The Solution</span>
              <h2 className="gradient-text">Continuous Posture Mapping</h2>
              <p className="solution-lead">ThreatCheck links directly into your tech stack via API, creating a continuous feedback loop of security verification.</p>

              <ul className="solution-list">
                {[
                  { title: 'Continuous Posture Checks', desc: 'Verify encryption, MFA, firewalls, and employee logs every hour, not every year.' },
                  { title: 'Cross-Framework Mapping', desc: 'Map one configuration control to multiple compliance regulations automatically.' },
                  { title: 'Audit-Ready Evidence Vault', desc: 'Provide read-only CPA access to automated, timestamped config logs.' },
                ].map(({ title, desc }, i) => (
                  <li key={i} style={{ animationDelay: `${i * 120}ms` }}>
                    <CheckCircle2 className="check-icon" size={18} />
                    <div>
                      <strong>{title}</strong>
                      <p>{desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>

          <ScrollReveal variant="fade-left" delay={150} parallax={true} parallaxSpeed={0.04}>
            <div className="solution-visual glass-panel tc-premium-card">
              <div className="card-blueprint-wrapper">
                {[
                  { num: '1', title: 'API Connection', desc: 'Authorize read-only credentials for cloud databases and HR systems.' },
                  { num: '2', title: 'Vulnerability Sweeping', desc: 'Identify missing MFA and unencrypted backups instantly.' },
                  { num: '3', title: 'Autoremediation', desc: 'Revert security drifts to safe defaults automatically.' },
                ].map(({ num, title, desc }, i) => (
                  <React.Fragment key={num}>
                    <div className="bp-card active" style={{ animationDelay: `${i * 200}ms` }}>
                      <span className="bp-num">{num}</span>
                      <div>
                        <h4>{title}</h4>
                        <p>{desc}</p>
                      </div>
                    </div>
                    {i < 2 && <div className="bp-line bp-line-animated" />}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── SecurityJourney (Finite State-style) ── */}
      <ScrollReveal variant="fade-up" threshold={0.05}>
        <SecurityJourney />
      </ScrollReveal>

      {/* ── Platform Stack ── */}
      <div className="stack-scroll-wrapper" ref={stackWrapperRef}>
        <section className="section-padding bg-secondary-theme stack-sticky-section">
          <ScrollReveal variant="fade-up">
            <div className="container">
              <SectionHeader
                badge="03 / Platform Architecture"
                title="The ThreatCheck Security & Compliance Stack"
                subtitle="Real security controls that map directly to compliance frameworks, generating evidence logs automatically."
              />

              <div className="stack-showcase">
                <div className="stack-menu">
                  {stackLayers.map((layer, idx) => (
                    <button
                      key={idx}
                      className={`stack-menu-btn ${activeStackLayer === idx ? 'active' : ''}`}
                      onClick={() => handleTabClick(idx)}
                    >
                      <span className="stack-btn-num">0{idx + 1}</span>
                      <span className="stack-btn-title">{layer.title}</span>
                    </button>
                  ))}
                </div>

                <div className="stack-details glass-panel tc-premium-card" key={activeStackLayer}>
                  <div className="stack-details-content">
                    <h3 className="stack-details-title">{stackLayers[activeStackLayer].title}</h3>
                    <p className="stack-details-desc">{stackLayers[activeStackLayer].desc}</p>

                    <div className="stack-info-grid">
                      <div className="stack-info-col">
                        <h4 className="info-col-title"><Eye size={14} /> Security Controls Checked</h4>
                        <ul className="info-col-list">
                          {stackLayers[activeStackLayer].controls.map((ctrl, i) => (
                            <li key={i} style={{ animationDelay: `${i * 80}ms` }}><Check size={12} /> {ctrl}</li>
                          ))}
                        </ul>
                      </div>

                      <div className="stack-info-col">
                        <h4 className="info-col-title"><RefreshCw size={14} /> Evidence Logs Compiled</h4>
                        <ul className="info-col-list text-primary-color">
                          {stackLayers[activeStackLayer].evidence.map((ev, i) => (
                            <li key={i} style={{ animationDelay: `${i * 80 + 40}ms` }}><Check size={12} /> {ev}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </section>
      </div>



      {/* ── Case Study ── */}
      <section className="section-padding">
        <ScrollReveal variant="fade-up">
          <div className="container">
            <SectionHeader
              badge="04 / Customer Results"
              title="Proven Impact: Compliance without Engineering Slowdowns"
              subtitle="See how modern high-growth software companies secure their platforms and close enterprise deals."
            />

            <div className="home-case-studies">
              {loadingCases ? (
                <div className="glass-panel tc-premium-card" style={{ padding: '2rem', textAlign: 'center' }}>Loading case studies...</div>
              ) : caseStudiesData && caseStudiesData.length > 0 ? (
                caseStudiesData.slice(0, 1).map((study) => (
                  <div key={study._id} className="featured-case-study glass-panel tc-premium-card">
                    <div className="featured-cs-image-panel" style={{ height: '100%' }}>
                      <div className="results-graphic" style={{ width: '100%', height: '100%' }}>
                        <img src={study.image || heroImg} alt="Customer Results Visualization" style={{ width: '100%', height: '100%', display: 'block', objectFit: 'cover' }} />
                      </div>
                    </div>
                    <div className="featured-cs-info">
                      <span className="badge badge-secondary">{study.industry}</span>
                      <h3>{study.title}</h3>

                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <p className="featured-cs-desc">{study.challenge}</p>
                        <Link to={`/case-studies/${study._id}`} style={{ fontSize: '0.9rem', fontWeight: '600', color: 'var(--color-primary)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
                          Read More <ArrowRight size={14} />
                        </Link>
                      </div>

                      <div className="featured-cs-stats">
                        {study.results && study.results.map((res, i) => (
                          <div key={i} className="featured-stat">
                            <span className="f-num">{res.metric}</span>
                            <span className="f-lbl">{res.label}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="glass-panel tc-premium-card" style={{ padding: '2rem', textAlign: 'center' }}>No case studies found.</div>
              )}
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* ── Blog / Resources ── */}
      <section className="section-padding bg-secondary-theme">
        <div className="container">
          <ScrollReveal variant="fade-up">
            <div className="resources-section-header">
              <SectionHeader
                badge="05 / Resource Library"
                title="Learn and Optimize Your Security Posture"
                align="left"
              />
              <Link to="/blog" className="btn btn-secondary view-all-btn">
                All Articles <ArrowRight size={16} />
              </Link>
            </div>
          </ScrollReveal>

          <div className="grid-3">
            {loadingBlogs ? (
              <div style={{ padding: '2rem', textAlign: 'center', gridColumn: '1 / -1' }}>Loading articles...</div>
            ) : blogData && blogData.length > 0 ? (
              blogData.slice(0, 3).map((article, i) => {
                const images = [img1, img2, img3];
                return (
                  <ScrollReveal key={article._id} variant="scale-in" delay={i * 120}>
                    <BlogCard article={{ ...article, image: article.image || images[i] }} />
                  </ScrollReveal>
                );
              })
            ) : (
              <div style={{ padding: '2rem', textAlign: 'center', gridColumn: '1 / -1' }}>No articles found.</div>
            )}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <ScrollReveal variant="scale-up">
        <CTA />
      </ScrollReveal>
    </div>
  );
}
