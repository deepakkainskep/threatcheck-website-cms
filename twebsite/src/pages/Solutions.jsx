import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { ShieldCheck, ShieldAlert, Cpu, Eye, BarChart3 } from 'lucide-react';
import CTA from '../components/CTA';
import PremiumHero from '../components/PremiumHero';
import './Solutions.css';

export default function Solutions() {
  const { id } = useParams();

  // Content mapped by id
  const solutionsContent = {
    'enterprise': {
      titleLine1: "Enterprise Security &",
      titleLine2: "Compliance Mapping",
      badge: "SOLUTIONS / ENTERPRISE",
      lead: "Scale your compliance workflows across thousands of cloud resources, dozens of environments, and multiple frameworks without slowing down product delivery.",
      metric: "90%",
      metricLabel: "Average reduction in annual audit overhead",
      points: [
        "**Unified Security Ledger**: Compile all configuration evidence across multi-cloud environments in a single audit trail.",
        "**Role-Based Access Delegations**: Segment dashboard views by sub-organization or country to respect regional privacy regulations.",
        "**Third-Party Vendor Risk**: Catalog and vet vendor compliance status dynamically within your threat database."
      ],
      checkpoints: ["SOC 2, ISO 27001, GDPR Mapping", "SAML SSO / SCIM provisioning", "24/7 Enterprise SLAs", "Dedicated Security Engineer"],
      ctaTitle: "Ready to scale your enterprise compliance?",
      icon: Cpu
    },
    'security-teams': {
      titleLine1: "Continuous Telemetry &",
      titleLine2: "Security Drift Detection",
      badge: "SOLUTIONS / SECURITY TEAMS",
      lead: "Go beyond point-in-time compliance reports. Get real-time visibility into active cloud configurations, database encryption settings, and MFA coverages.",
      metric: "1.2 hrs",
      metricLabel: "Mean Time to Remediate configuration drifts",
      points: [
        "**Continuous Subnet Scanning**: Sweep network segments hourly for unauthorized open ports or exposed buckets.",
        "**Automated Drift Remediation**: Define pipeline rules to automatically revert configuration drifts to safe baselines.",
        "**Developer Ticket Integrations**: Push alerts directly to developer Slack and Jira backlogs to speed up vulnerability resolutions."
      ],
      checkpoints: ["Cloud Posture Scanning (CSPM)", "Hourly drift alert integrations", "Vulnerability timeline reports", "API-driven telemetry grids"],
      ctaTitle: "Eliminate configuration blindspots today",
      icon: ShieldAlert
    },
    'compliance-teams': {
      titleLine1: "Say Goodbye to Spreadsheet",
      titleLine2: "Evidence Compilations",
      badge: "SOLUTIONS / COMPLIANCE",
      lead: "Automate the collection of screenshot evidence and configuration logs. Grant your CPA auditors read-only access to a timestamped audit vault.",
      metric: "30 Days",
      metricLabel: "Average time to achieve audit-ready posture",
      points: [
        "**Automated Evidence Capture**: Connect to GitHub, AWS, and HR systems to pull logs and configurations daily.",
        "**Read-Only Auditor Dashboards**: Share a secure portal with your auditors, eliminating email threads and screenshot folder lists.",
        "**Control Mapping Engine**: Map one configuration check to multiple frameworks (e.g. MFA satisfying SOC 2 and ISO criteria)."
      ],
      checkpoints: ["Timestamped evidence ledger", "Auditor-specific access controls", "Framework mapping matrices", "Policy approval records"],
      ctaTitle: "Steamline your next compliance audit",
      icon: Eye
    },
    'risk-teams': {
      titleLine1: "Quantitative Operational Risk",
      titleLine2: "Posture Mapping",
      badge: "SOLUTIONS / RISK TEAMS",
      lead: "Eliminate alert fatigue. Map discovered vulnerabilities directly to operational risk factors, asset environments, and compliance implications.",
      metric: "Zero",
      metricLabel: "Unmapped critical cloud assets in production",
      points: [
        "**Contextual Risk Scoring**: Prioritize alerts based on data sensitivity and public-facing subnet configurations.",
        "**Vulnerability Remediation History**: Track remediation velocities and map vulnerability histories to compliance reports.",
        "**CIS Benchmarks Alignments**: Verify configurations against global standard industry benchmarks to establish baselines."
      ],
      checkpoints: ["Context-aware risk matrix", "CIS Benchmark audits", "Remediation velocity tracking", "Financial risk indicators"],
      ctaTitle: "Prioritize vulnerabilities based on real risk",
      icon: BarChart3
    }
  };

  const solution = solutionsContent[id];

  if (!solution) {
    return <Navigate to="/404" replace />;
  }

  const PageIcon = solution.icon;

  return (
    <div className="solution-detail-page">
      <PremiumHero
        key={id}
        label={solution.badge}
        titleLine1={solution.titleLine1}
        titleLine2={solution.titleLine2}
        description={solution.lead}
        primaryButtonText="Explore Capabilities"
        primaryButtonLink="/security"
      />

      <section className="solution-breakdown section-padding bg-secondary-theme">
        <div className="container breakdown-grid">
          <div className="breakdown-visual text-left">
            <div className="solution-metric-box glass-panel">
              <span className="sol-metric-num">{solution.metric}</span>
              <span className="sol-metric-lbl">{solution.metricLabel}</span>
            </div>

            <div className="solution-checkpoints-card glass-panel">
              <h4 className="checkpoints-title"><PageIcon size={16} /> Solution Capabilities</h4>
              <ul className="checkpoints-list">
                {solution.checkpoints.map((check, idx) => (
                  <li key={idx}><ShieldCheck size={14} className="text-teal" /> {check}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="breakdown-details text-left">
            <h2 className="gradient-text">How We Solve The Challenge</h2>

            <div className="solution-points-list">
              {solution.points.map((pt, idx) => {
                const parts = pt.split('**');
                return (
                  <div key={idx} className="solution-point-item">
                    <div className="point-marker">0{idx + 1}</div>
                    <div>
                      {parts.length > 2 ? (
                        <p className="point-text">
                          <strong>{parts[1]}</strong>
                          {parts[2]}
                        </p>
                      ) : (
                        <p className="point-text">{pt}</p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <CTA
        title={solution.ctaTitle}
        subtitle="Book a customized walktrough with our security architects to evaluate your compliance timeline."
      />
    </div>
  );
}
