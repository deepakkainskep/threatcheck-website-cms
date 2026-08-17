import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, ShieldCheck, Heart, Award, ArrowRight, Lock } from 'lucide-react';
import SectionHeader from '../components/SectionHeader';
import CTA from '../components/CTA';
import ScrollReveal from '../components/ScrollReveal';
import PremiumHero from '../components/PremiumHero';
import originImage from '../assets/origin.jpg';
import './About.css';

export default function About() {
  const values = [
    {
      icon: ShieldCheck,
      title: "Real Protection over Theater",
      desc: "We reject the checkbox compliance mindset. We design systems that enforce real operational security first, knowing that compliance is the organic outcome of safety."
    },
    {
      icon: Lock,
      title: "Security by Design",
      desc: "Our platform features robust security by design, ensuring customer configuration metadata is heavily encrypted and protected to the highest standards."
    },
    {
      icon: Heart,
      title: "Developer Friction Reduction",
      desc: "We build automated pipelines to spare developers from screenshot collection tasks, allowing engineering velocity and audits to scale together."
    }
  ];

  const leaders = [
    {
      name: "Dimitri Volk",
      role: "CEO & Co-Founder",
      bio: "Former CTO who scaled fintech payments unicorn NIUM to $2B. Over 15 years building high-growth regulated financial infrastructure.",
      avatar: "DV"
    },
    {
      name: "Elena Rostova",
      role: "Chief Information Security Officer",
      bio: "Former Lead Security Architect at CrowdStrike. Expert in cloud-native microservice defense and Zero Trust architecture.",
      avatar: "ER"
    },
    {
      name: "Sarah Jenkins",
      role: "VP of Compliance & Audits",
      bio: "Managed enterprise IT risk and compliance assessments at Deloitte for 10 years, leading over 200 SOC 2 and ISO audits.",
      avatar: "SJ"
    }
  ];

  return (
    <div className="about-page">
      {/* Hero Section */}
      <PremiumHero
        label="OUR MISSION"
        titleLine1="Replacing Checkbox Compliance"
        titleLine2="with Real Security Posture"
        description="We believe that the annual audit model is broken. ThreatCheck was founded to replace static spreadsheets with continuous security mapping and automated compliance."
        primaryButtonText="Join Our Team"
        primaryButtonLink="/contact"
      />

      {/* Core Values */}
      <section className="about-values section-padding bg-secondary-theme">
        <div className="container">
          <SectionHeader
            badge="01 / Core Values"
            title="The Principles That Drive ThreatCheck"
            subtitle="We hold ourselves to the same security standards we map for our customers."
          />

          <div className="grid-3">
            {values.map((v, idx) => (
              <ScrollReveal key={idx} variant="scale-in" delay={idx * 100}>
                <div className="value-card glass-panel tc-glow-card">
                  <div className="value-icon-container">
                    <v.icon size={22} className="value-icon" />
                  </div>
                  <h3>{v.title}</h3>
                  <p>{v.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="about-story section-padding">
        <div className="container story-grid">
          <ScrollReveal variant="fade-right">
            <div className="story-image-panel glass-panel" style={{ padding: 0, overflow: 'hidden' }}>
              <img src={originImage} alt="Our Origin Story" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          </ScrollReveal>
          <ScrollReveal variant="fade-left" delay={150}>
            <div className="story-content text-left">
              <span className="badge badge-primary">02 / Our Origin</span>
              <h2 className="gradient-text">Why We Built ThreatCheck</h2>
              <p>
                Our founders spent years scaling fintech platforms in highly regulated sectors. They noticed a painful pattern: every time audit season arrived, engineering teams ground to a halt. Developers spent weeks taking manual screenshots of firewall settings and Okta configurations, while compliance officers struggled to track Excel tasks.
              </p>
              <p>
                Worse, these point-in-time reviews did nothing to keep the platform secure on a daily basis. Configurations drifted, yet reports remained green until the next audit.
              </p>
              <p>
                We built ThreatCheck to solve this. By connecting to cloud accounts and identity systems via API, we provide continuous security monitoring that satisfies technical CISOs while automatically mapping evidence to regulatory frameworks.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Leadership */}
      <section className="about-leadership section-padding bg-secondary-theme">
        <div className="container">
          <SectionHeader
            badge="03 / Leadership"
            title="Founded by Security and Compliance Engineers"
            subtitle="Our leadership team has scaled regulated software systems, verified audits, and defended enterprise perimeters."
          />

          <div className="grid-3">
            {leaders.map((leader, idx) => (
              <ScrollReveal key={idx} variant="fade-up" delay={idx * 100}>
                <div className="leader-card glass-panel text-left">
                  <div className="leader-avatar-wrapper">
                    <div className="leader-avatar">{leader.avatar}</div>
                    <div className="avatar-glow"></div>
                  </div>
                  <h3 className="leader-name">{leader.name}</h3>
                  <span className="leader-role">{leader.role}</span>
                  <p className="leader-bio">{leader.bio}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <ScrollReveal variant="scale-up">
        <CTA
          title="Ready to meet the ThreatCheck team?"
          subtitle="Schedule a technical discussion with our architects to evaluate your compliance roadmap."
        />
      </ScrollReveal>
    </div>
  );
}

