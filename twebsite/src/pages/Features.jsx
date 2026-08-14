import React from 'react';
import { Shield, Eye, ShieldAlert, Cpu, BarChart3, Database, Key, Check } from 'lucide-react';
import SectionHeader from '../components/SectionHeader';
import FeatureCard from '../components/FeatureCard';
import CTA from '../components/CTA';
import ScrollReveal from '../components/ScrollReveal';

export default function Features() {
  const featureDirectory = [
    {
      icon: ShieldAlert,
      title: "Cloud Posture Auditing",
      desc: "Connect AWS, GCP, and Azure to scan firewall rules, S3 exposures, database encryption states, and subnet isolation settings.",
      tags: ["CSPM", "Subnet Scan"]
    },
    {
      icon: Key,
      title: "Identity & MFA Reviews",
      desc: "Audit Okta, Azure AD, and developer organizations to verify multi-factor authentication enforcement and find stale user credentials.",
      tags: ["IAM Audit", "MFA Scan"]
    },
    {
      icon: Shield,
      title: "Continuous Mapping Maps",
      desc: "Automatically map configuration tests to SOC 2 Type II criteria, ISO 27001 Annex A clauses, HIPAA Security Rules, and GDPR articles.",
      tags: ["SOC 2", "ISO 27001", "HIPAA"]
    },
    {
      icon: Cpu,
      title: "Auto-Remediation Pipelines",
      desc: "Configure automated triggers that run Lambda functions or webhook scripts to resolve common misconfigurations immediately.",
      tags: ["DevSecOps", "Auto-Heal"]
    },
    {
      icon: Database,
      title: "CPA Auditor evidence Vault",
      desc: "Share read-only access with external auditors, providing timestamped, secure proof logs of configuration compliance history.",
      tags: ["Auditor Portal", "Ledger"]
    },
    {
      icon: BarChart3,
      title: "Vulnerability MTTR Metrics",
      desc: "Review graphs detailing response speeds, mean time to remediate (MTTR), and general posture score trends over time.",
      tags: ["Metrics", "Board Reports"]
    }
  ];

  return (
    <div className="features-page bg-secondary-theme">
      {/* Hero Section */}
      <section className="pf-hero section-padding">
        <ScrollReveal variant="fade-up">
          <div className="container">
            <span className="badge badge-primary">Platform / Features</span>
            <h1 className="pf-main-title">Interactive Platform Features</h1>
            <p className="pf-main-lead">
              Explore the detailed capabilities of ThreatCheck's compliance automation and posture management stack.
            </p>
          </div>
        </ScrollReveal>
      </section>

      {/* Directory Grid */}
      <section className="pf-directory section-padding">
        <div className="container">
          <div className="grid-3">
            {featureDirectory.map((f, idx) => (
              <ScrollReveal key={idx} variant="scale-in" delay={idx * 80}>
                <FeatureCard 
                  icon={f.icon}
                  title={f.title}
                  description={f.desc}
                  tags={f.tags}
                />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <ScrollReveal variant="scale-up">
        <CTA />
      </ScrollReveal>
    </div>
  );
}
