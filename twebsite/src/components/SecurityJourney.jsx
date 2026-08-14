import React, { useState, useEffect, useRef } from 'react';
import { Shield, Scan, BarChart3, Wrench, Activity, Check } from 'lucide-react';
import './SecurityJourney.css';

const STEPS = [
  {
    id: 'threat',
    phase: '01',
    title: 'Threat Detection',
    subtitle: 'Continuous Attack Surface Scanning',
    description:
      'ThreatCheck continuously scans your entire cloud infrastructure — AWS, GCP, Azure — detecting misconfigurations, unencrypted storage, and open attack surfaces before they become incidents.',
    icon: Scan,
    metric: '138',
    metricLabel: 'Assets Scanned',
    metricSuffix: '',
    tags: ['CSPM', 'CVE Detection', 'Asset Discovery'],
    visual: 'scan',
    color: '#E5484D',
  },
  {
    id: 'analysis',
    phase: '02',
    title: 'Risk Analysis',
    subtitle: 'Contextual Vulnerability Prioritization',
    description:
      'Not all vulnerabilities are equal. ThreatCheck scores each finding by business impact, regulatory mapping, and exploitability — so your team fixes what matters most first.',
    icon: BarChart3,
    metric: '94',
    metricLabel: 'Risk Score Reduction',
    metricSuffix: '%',
    tags: ['Risk Scoring', 'CVSS Mapping', 'Priority Queue'],
    visual: 'risk',
    color: '#F5A623',
  },
  {
    id: 'compliance',
    phase: '03',
    title: 'Compliance Mapping',
    subtitle: 'Automatic Framework Alignment',
    description:
      'Every detected control is automatically mapped to SOC 2, ISO 27001, HIPAA, and GDPR. One finding, multiple framework coverages — zero duplicate evidence collection.',
    icon: Shield,
    metric: '350',
    metricLabel: 'Controls Mapped',
    metricSuffix: '+',
    tags: ['SOC 2', 'ISO 27001', 'HIPAA', 'GDPR'],
    visual: 'compliance',
    color: '#6702BA',
  },
  {
    id: 'remediation',
    phase: '04',
    title: 'Automated Remediation',
    subtitle: 'Drift Correction Without Toil',
    description:
      'When a configuration drifts from the secure baseline, ThreatCheck auto-remediates or opens a tracked Jira ticket. Mean time to remediate drops from weeks to 1.2 hours.',
    icon: Wrench,
    metric: '1.2',
    metricLabel: 'Hrs Mean Time to Remediate',
    metricSuffix: '',
    tags: ['Auto-Fix', 'Jira Webhooks', 'Drift Rollback'],
    visual: 'remediate',
    color: '#34C777',
  },
  {
    id: 'monitoring',
    phase: '05',
    title: 'Continuous Monitoring',
    subtitle: '24/7 Posture Intelligence',
    description:
      'Security is not a point-in-time event. ThreatCheck runs hourly posture sweeps, feeds audit evidence into a timestamped vault, and keeps compliance scores above 98% — automatically.',
    icon: Activity,
    metric: '98.4',
    metricLabel: 'Average Compliance Score',
    metricSuffix: '%',
    tags: ['Hourly Sweeps', 'Evidence Vault', 'Audit Ready'],
    visual: 'monitor',
    color: '#4B8CF0',
  },
];

// --- Mini SVG visualizations per step ---
function StepVisual({ visual, color, isActive }) {
  if (visual === 'scan') return (
    <svg viewBox="0 0 200 140" className={`journey-svg ${isActive ? 'active' : ''}`}>
      {/* Network nodes */}
      {[[30,70],[80,30],[80,110],[150,50],[150,90],[170,70]].map(([x,y],i) => (
        <g key={i}>
          <circle cx={x} cy={y} r={8} fill="none" stroke={color} strokeWidth={1.5} opacity={0.6}/>
          <circle cx={x} cy={y} r={3} fill={color} opacity={0.8}/>
          {isActive && <circle cx={x} cy={y} r={8} fill={color} opacity={0} className="journey-ping" style={{animationDelay:`${i*0.2}s`}}/>}
        </g>
      ))}
      {/* Connections */}
      <line x1={30} y1={70} x2={80} y2={30} stroke={color} strokeWidth={1} opacity={0.3}/>
      <line x1={30} y1={70} x2={80} y2={110} stroke={color} strokeWidth={1} opacity={0.3}/>
      <line x1={80} y1={30} x2={150} y2={50} stroke={color} strokeWidth={1} opacity={0.3}/>
      <line x1={80} y1={110} x2={150} y2={90} stroke={color} strokeWidth={1} opacity={0.3}/>
      <line x1={150} y1={50} x2={170} y2={70} stroke={color} strokeWidth={1} opacity={0.3}/>
      <line x1={150} y1={90} x2={170} y2={70} stroke={color} strokeWidth={1} opacity={0.3}/>
      {/* Scan beam */}
      {isActive && (
        <line x1={0} y1={70} x2={200} y2={70} stroke={color} strokeWidth={2} opacity={0.6} className="journey-scan-line"/>
      )}
    </svg>
  );

  if (visual === 'risk') return (
    <svg viewBox="0 0 200 140" className={`journey-svg ${isActive ? 'active' : ''}`}>
      {/* Bar chart */}
      {[
        {x:20, h:100, c:0.9},
        {x:50, h:70, c:0.7},
        {x:80, h:110, c:0.9},
        {x:110, h:40, c:0.4},
        {x:140, h:60, c:0.5},
        {x:170, h:20, c:0.2},
      ].map(({x, h, c}, i) => (
        <rect key={i} x={x} y={140-h} width={20} height={isActive ? h : 0}
          fill={color} opacity={c * 0.8} rx={3}
          style={{transition:`height 0.8s var(--ease-out-expo) ${i*0.1}s, y 0.8s var(--ease-out-expo) ${i*0.1}s`}}/>
      ))}
      {/* Threshold line */}
      <line x1={0} y1={80} x2={200} y2={80} stroke={color} strokeWidth={1.5} strokeDasharray="6 4" opacity={0.5}/>
      <text x={4} y={75} fill={color} fontSize={9} opacity={0.7}>HIGH</text>
    </svg>
  );

  if (visual === 'compliance') return (
    <svg viewBox="0 0 200 140" className={`journey-svg ${isActive ? 'active' : ''}`}>
      {/* Framework badges */}
      {[
        {x:10, y:20, label:'SOC 2'},
        {x:80, y:20, label:'ISO 27001'},
        {x:145, y:20, label:'HIPAA'},
        {x:45, y:80, label:'GDPR'},
        {x:120, y:80, label:'NIST'},
      ].map(({x,y,label},i)=>(
        <g key={i} style={{opacity: isActive ? 1 : 0, transition:`opacity 0.5s ${i*0.15}s`}}>
          <rect x={x} y={y} width={55} height={22} rx={4} fill={color} opacity={0.15} stroke={color} strokeWidth={1}/>
          <text x={x+27.5} y={y+15} fill={color} fontSize={8} textAnchor="middle" fontWeight="600">{label}</text>
        </g>
      ))}
      {/* Shield center */}
      <path d="M100 45 L85 55 L85 75 Q85 90 100 100 Q115 90 115 75 L115 55 Z" fill={color} opacity={0.7} className={isActive ? 'journey-shield-pulse' : ''}/>
      <text x={100} y={78} fill="#fff" fontSize={14} textAnchor="middle" fontWeight="bold">✓</text>
    </svg>
  );

  if (visual === 'remediate') return (
    <svg viewBox="0 0 200 140" className={`journey-svg ${isActive ? 'active' : ''}`}>
      {/* Timeline */}
      <line x1={20} y1={70} x2={180} y2={70} stroke={color} strokeWidth={2} opacity={0.3}/>
      {[
        {x:40, label:'Drift', bad:true},
        {x:90, label:'Detect', bad:false},
        {x:140, label:'Fix', bad:false},
        {x:175, label:'Safe', bad:false},
      ].map(({x,label,bad},i)=>(
        <g key={i} style={{opacity: isActive ? 1 : 0, transition:`opacity 0.4s ${i*0.2}s`}}>
          <circle cx={x} cy={70} r={10} fill={bad ? '#E5484D' : color} opacity={0.85}/>
          <text x={x} y={74} fill="#fff" fontSize={8} textAnchor="middle" fontWeight="bold">{i+1}</text>
          <text x={x} y={92} fill={color} fontSize={8} textAnchor="middle">{label}</text>
        </g>
      ))}
      {/* Arrow */}
      {isActive && (
        <path 
          d="M 152 70 L 162 70 M 158 66 L 162 70 L 158 74" 
          fill="none" 
          stroke={color} 
          strokeWidth={1.5} 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          style={{ animation: 'tc-fade-right 0.4s ease 0.5s both' }}
        />
      )}
    </svg>
  );

  if (visual === 'monitor') return (
    <svg viewBox="0 0 200 140" className={`journey-svg ${isActive ? 'active' : ''}`}>
      {/* Score dial */}
      <circle cx={100} cy={75} r={50} fill="none" stroke={color} strokeWidth={1} opacity={0.2}/>
      <circle cx={100} cy={75} r={50} fill="none" stroke={color} strokeWidth={4} opacity={0.8}
        strokeDasharray="314"
        strokeDashoffset={isActive ? "20" : "314"}
        style={{transition:'stroke-dashoffset 1.5s var(--ease-out-expo)', transformOrigin:'center', transform:'rotate(-90deg)'}}/>
      <text x={100} y={70} fill={color} fontSize={22} textAnchor="middle" fontWeight="800">98%</text>
      <text x={100} y={85} fill={color} fontSize={9} textAnchor="middle" opacity={0.7}>COMPLIANCE</text>
      {/* Pulse ring */}
      {isActive && <circle cx={100} cy={75} r={50} fill="none" stroke={color} strokeWidth={1} className="journey-ping-ring"/>}
    </svg>
  );

  return null;
}

export default function SecurityJourney() {
  const [activeStep, setActiveStep] = useState(0);
  const sectionRef = useRef(null);
  const stepsRef = useRef([]);
  const timerRef = useRef(null);

  // Auto-advance steps every 3.5s
  useEffect(() => {
    timerRef.current = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % STEPS.length);
    }, 3500);
    return () => clearInterval(timerRef.current);
  }, []);

  const handleStepClick = (idx) => {
    clearInterval(timerRef.current);
    setActiveStep(idx);
    timerRef.current = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % STEPS.length);
    }, 3500);
  };

  const step = STEPS[activeStep];
  const StepIcon = step.icon;

  return (
    <section className="security-journey section-padding" ref={sectionRef}>
      <div className="container">
        {/* Section header */}
        <div className="sj-header sr-fade-up">
          <span className="badge badge-primary">The Security Journey</span>
          <h2 className="gradient-text">From Threat to Continuous Trust</h2>
          <p className="sj-subtitle">
            Every organization's security story follows the same path. ThreatCheck automates every step.
          </p>
        </div>

        <div className="sj-layout">
          {/* Left: Step selector */}
          <nav className="sj-nav" aria-label="Security Journey Steps">
            {STEPS.map((s, idx) => {
              const Icon = s.icon;
              const isActive = idx === activeStep;
              const isDone = idx < activeStep;
              return (
                <button
                  key={s.id}
                  className={`sj-step ${isActive ? 'active' : ''} ${isDone ? 'done' : ''}`}
                  onClick={() => handleStepClick(idx)}
                  style={{ '--step-color': s.color }}
                >
                  <div className="sj-step-indicator">
                    <div className="sj-step-dot">
                      {isDone ? <Check size={12} /> : <Icon size={13} />}
                    </div>
                    {idx < STEPS.length - 1 && <div className="sj-step-line" />}
                  </div>
                  <div className="sj-step-content">
                    <span className="sj-step-phase">{s.phase}</span>
                    <span className="sj-step-title">{s.title}</span>
                    <span className="sj-step-sub">{s.subtitle}</span>
                  </div>
                  {/* Progress bar */}
                  {isActive && <div className="sj-step-progress" />}
                </button>
              );
            })}
          </nav>

          {/* Right: Active step content */}
          <div className="sj-content" key={activeStep}>
            <div className="sj-content-inner">
              {/* Visual */}
              <div className="sj-visual glass-panel" style={{ '--step-color': step.color }}>
                <StepVisual visual={step.visual} color={step.color} isActive={true} />
                {/* Metric overlay */}
                <div className="sj-metric">
                  <span className="sj-metric-num" style={{ color: step.color }}>
                    {step.metric}{step.metricSuffix}
                  </span>
                  <span className="sj-metric-label">{step.metricLabel}</span>
                </div>
              </div>

              {/* Text */}
              <div className="sj-text">
                <div className="sj-step-badge" style={{ '--step-color': step.color }}>
                  <StepIcon size={16} /> {step.phase}
                </div>
                <h3 className="sj-content-title">{step.title}</h3>
                <p className="sj-content-desc">{step.description}</p>

                <div className="sj-tags">
                  {step.tags.map((t) => (
                    <span key={t} className="sj-tag" style={{ '--step-color': step.color }}>{t}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Step dots for mobile */}
        <div className="sj-dots">
          {STEPS.map((_, idx) => (
            <button
              key={idx}
              className={`sj-dot ${idx === activeStep ? 'active' : ''}`}
              onClick={() => handleStepClick(idx)}
              aria-label={`Go to step ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
