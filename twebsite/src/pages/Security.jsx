import React from 'react';
import { Shield, ShieldCheck, Check, ShieldAlert, AlertTriangle, Eye, Activity } from 'lucide-react';
import SectionHeader from '../components/SectionHeader';
import CTA from '../components/CTA';
import ScrollReveal from '../components/ScrollReveal';
import GlowParticles from '../components/GlowParticles';
import PremiumHero from '../components/PremiumHero';
import './PlatformFeatures.css';

export default function Security() {
  return (
    <div className="security-page">
      {/* Hero Section */}
      <PremiumHero
        label="SECURITY OPERATIONS"
        titleLine1="Real-Time Threat Detection &"
        titleLine2="Continuous Posture Monitoring"
        description="Automatically discover assets, scan for vulnerabilities, and continuously monitor telemetry across your entire infrastructure."
        primaryButtonText="Get a Demo"
        primaryButtonLink="/request-demo"
        secondaryButtonText="View Integrations"
        secondaryButtonLink="/integrations"
      />

      {/* Threat Detection Section */}
      <section id="threat-detection" className="pf-details-section section-padding">
        <ScrollReveal variant="fade-up" parallax={{ y: 30 }}>
          <div className="container pf-grid">
            <div className="pf-text">
              <ScrollReveal variant="fade-up" delay={300}>
                <h2 className="gradient-text">Real-Time Threat Detection & Vulnerability Sweeping</h2>
              </ScrollReveal>
              <p>Static vulnerabilities scans represent a risk. In cloud deployments, new resources are spawned daily. ThreatCheck scans settings dynamically to identify exposure windows early.</p>

              <ul className="pf-list">
                <li>
                  <Check size={18} />
                  <div>
                    <strong>Automated Cloud Asset Discovery</strong>
                    <p>Catalog all active servers, serverless functions, database subnets, and object storage drives.</p>
                  </div>
                </li>
                <li>
                  <Check size={18} />
                  <div>
                    <strong>Vulnerability Database Alignment</strong>
                    <p>Map configurations against global vulnerability databases (CVEs) and CIS Security benchmarks.</p>
                  </div>
                </li>
                <li>
                  <Check size={18} />
                  <div>
                    <strong>Configuration Security Checking</strong>
                    <p>Detect unencrypted database volumes, open firewall subnets, and public-facing storage buckets.</p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="pf-visual-card glass-panel tc-premium-card">
              <div className="tc-premium-glow"></div>
              <h4 className="pf-visual-title"><ShieldAlert size={14} /> Scan Flaws Detected</h4>
              <ul className="pf-visual-list">
                <li><AlertTriangle size={14} className="text-warning" /> AWS S3: public read allowed (drifted)</li>
                <li><AlertTriangle size={14} className="text-warning" /> RDS Instance: unencrypted volume</li>
                <li><ShieldCheck size={14} className="text-success" /> IAM Root: MFA enforce verified</li>
                <li><ShieldCheck size={14} className="text-success" /> Security Group 80/443: open checked</li>
              </ul>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* Security Monitoring Section */}
      <section id="continuous-monitoring" className="pf-details-section section-padding bg-secondary-theme">
        <ScrollReveal variant="fade-up" parallax={{ y: 20 }}>
          <div className="container pf-grid">

            <div className="pf-text">
              <ScrollReveal variant="fade-up" delay={150}>
                <h2 className="gradient-text">Continuous Posture & Security Telemetry Monitoring</h2>
              </ScrollReveal>
              <p>Traditional audits review a system on a single day. ThreatCheck sweeps credentials, storage buckets, and firewall rules continuously to detect security drifts.</p>

              <ul className="pf-list">
                <li>
                  <Check size={18} />
                  <div>
                    <strong>Automated Telemetry Collector</strong>
                    <p>Aggregate cloud metadata, user directories, and repository access configurations hourly.</p>
                  </div>
                </li>
                <li>
                  <Check size={18} />
                  <div>
                    <strong>Configuration Drift Sweeper</strong>
                    <p>Detect unauthorized overrides made inside AWS/GCP console accounts and trigger warnings.</p>
                  </div>
                </li>
                <li>
                  <Check size={18} />
                  <div>
                    <strong>IAM Role Access Reviews</strong>
                    <p>Audit user authorizations, active keys, and directory access permissions continuously.</p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="pf-visual-card glass-panel tc-premium-card">
              <div className="tc-premium-glow"></div>
              <h4 className="pf-visual-title"><Activity size={14} /> Telemetry Feeds</h4>
              <ul className="pf-visual-list">
                <li><ShieldCheck size={14} className="text-success" /> Cloud IAM: MFA coverage checked (100%)</li>
                <li><ShieldCheck size={14} className="text-success" /> AWS KMS: Key rotations checked</li>
                <li><ShieldCheck size={14} className="text-success" /> GitHub: branch protections verified</li>
                <li><ShieldCheck size={14} className="text-success" /> RDS Subnets: routing rules locked</li>
              </ul>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* Security Modules Grid */}
      <section className="security-modules section-padding">
        <ScrollReveal variant="fade-up" parallax={{ y: 15 }}>
          <div className="container">
            <SectionHeader
              badge="Security Center"
              title="Comprehensive Security Coverage"
              subtitle="Deep scanning and inventory capabilities mapping directly to compliance controls."
            />

            <div className="grid-3" style={{ gap: '1.5rem', marginTop: '3rem' }}>

              <div className="glass-panel tc-premium-card" style={{ padding: '1.75rem', borderRadius: 'var(--radius-lg)', background: 'var(--bg-card)', border: '1px solid var(--border-color-subtle)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                  <Shield className="text-teal" size={20} />
                  <h3 style={{ fontSize: '1.15rem', fontWeight: '800', margin: 0, color: 'var(--text-primary)' }}>Asset Inventory</h3>
                </div>
                <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: '1.6', margin: 0 }}>
                  Auto-discovered assets from cloud scans: compute, storage, containers, clusters, AI models, databases.
                </p>
              </div>

              <div className="glass-panel tc-premium-card" style={{ padding: '1.75rem', borderRadius: 'var(--radius-lg)', background: 'var(--bg-card)', border: '1px solid var(--border-color-subtle)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                  <Shield className="text-teal" size={20} />
                  <h3 style={{ fontSize: '1.15rem', fontWeight: '800', margin: 0, color: 'var(--text-primary)' }}>SBOM Generation</h3>
                </div>
                <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: '1.6', margin: 0 }}>
                  Software Bill of Materials generated from containers, repositories, and deployed workloads.
                </p>
              </div>

              <div className="glass-panel tc-premium-card" style={{ padding: '1.75rem', borderRadius: 'var(--radius-lg)', background: 'var(--bg-card)', border: '1px solid var(--border-color-subtle)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                  <Shield className="text-teal" size={20} />
                  <h3 style={{ fontSize: '1.15rem', fontWeight: '800', margin: 0, color: 'var(--text-primary)' }}>SBOM Format Export</h3>
                </div>
                <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: '1.6', margin: 0 }}>
                  Export in CycloneDX JSON, SPDX JSON, CSV; machine-readable per CRA requirement.
                </p>
              </div>

              <div className="glass-panel tc-premium-card" style={{ padding: '1.75rem', borderRadius: 'var(--radius-lg)', background: 'var(--bg-card)', border: '1px solid var(--border-color-subtle)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                  <Shield className="text-teal" size={20} />
                  <h3 style={{ fontSize: '1.15rem', fontWeight: '800', margin: 0, color: 'var(--text-primary)' }}>CVE Mapping to SBOM</h3>
                </div>
                <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: '1.6', margin: 0 }}>
                  When new CVE disclosed, alert if affected component in company's SBOM; show affected controls.
                </p>
              </div>

              <div className="glass-panel tc-premium-card" style={{ padding: '1.75rem', borderRadius: 'var(--radius-lg)', background: 'var(--bg-card)', border: '1px solid var(--border-color-subtle)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                  <Shield className="text-teal" size={20} />
                  <h3 style={{ fontSize: '1.15rem', fontWeight: '800', margin: 0, color: 'var(--text-primary)' }}>Container Image Scanning</h3>
                </div>
                <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: '1.6', margin: 0 }}>
                  ECR, ACR, Docker Hub images scanned for CVEs; findings mapped to PCI DSS Req 6, SOC 2 CC7.1.
                </p>
              </div>

              <div className="glass-panel tc-premium-card" style={{ padding: '1.75rem', borderRadius: 'var(--radius-lg)', background: 'var(--bg-card)', border: '1px solid var(--border-color-subtle)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                  <Shield className="text-teal" size={20} />
                  <h3 style={{ fontSize: '1.15rem', fontWeight: '800', margin: 0, color: 'var(--text-primary)' }}>IaC Scanning</h3>
                </div>
                <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: '1.6', margin: 0 }}>
                  Terraform, CloudFormation, Bicep, Kubernetes YAML scanned for misconfigurations; mapped to controls.
                </p>
              </div>

              <div className="glass-panel tc-premium-card" style={{ padding: '1.75rem', borderRadius: 'var(--radius-lg)', background: 'var(--bg-card)', border: '1px solid var(--border-color-subtle)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                  <Shield className="text-teal" size={20} />
                  <h3 style={{ fontSize: '1.15rem', fontWeight: '800', margin: 0, color: 'var(--text-primary)' }}>Kubernetes Security Checks</h3>
                </div>
                <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: '1.6', margin: 0 }}>
                  RBAC, pod security standards, network policies, privileged containers; maps to CC6.3, NIST PR.AC.
                </p>
              </div>

              <div className="glass-panel tc-premium-card" style={{ padding: '1.75rem', borderRadius: 'var(--radius-lg)', background: 'var(--bg-card)', border: '1px solid var(--border-color-subtle)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                  <Shield className="text-teal" size={20} />
                  <h3 style={{ fontSize: '1.15rem', fontWeight: '800', margin: 0, color: 'var(--text-primary)' }}>Dependency Vulnerability Scan</h3>
                </div>
                <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: '1.6', margin: 0 }}>
                  SCA (Software Composition Analysis) on connected repos; flag outdated/vulnerable libraries.
                </p>
              </div>

              <div className="glass-panel tc-premium-card" style={{ padding: '1.75rem', borderRadius: 'var(--radius-lg)', background: 'var(--bg-card)', border: '1px solid var(--border-color-subtle)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                  <Shield className="text-teal" size={20} />
                  <h3 style={{ fontSize: '1.15rem', fontWeight: '800', margin: 0, color: 'var(--text-primary)' }}>License Compliance Scan</h3>
                </div>
                <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: '1.6', margin: 0 }}>
                  Identify open-source licenses in dependencies; flag GPL/AGPL in commercial software.
                </p>
              </div>

              <div className="glass-panel tc-premium-card" style={{ padding: '1.75rem', borderRadius: 'var(--radius-lg)', background: 'var(--bg-card)', border: '1px solid var(--border-color-subtle)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                  <Shield className="text-teal" size={20} />
                  <h3 style={{ fontSize: '1.15rem', fontWeight: '800', margin: 0, color: 'var(--text-primary)' }}>Secret Detection in Code</h3>
                </div>
                <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: '1.6', margin: 0 }}>
                  Scan repos for hardcoded credentials, API keys, tokens; auto-finding with remediation guidance.
                </p>
              </div>

            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* CTA */}
      <ScrollReveal variant="fade-up">
        <CTA
          title="Secure your entire infrastructure"
          subtitle="Book a customized walkthrough of our vulnerability scanning engine."
        />
      </ScrollReveal>
    </div>
  );
}
