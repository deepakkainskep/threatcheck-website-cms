import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ScrollReveal from './ScrollReveal';
import imgIndustrial from '../assets/industry_industrial.png';
import imgAutomotive from '../assets/industry_automotive.png';
import imgConnected from '../assets/industry_connected_devices.png';
import './IndustryTrack.css';

const industries = [
  {
    title: 'Enterprise',
    desc: 'Security Risk & Compliance',
    image: imgIndustrial
  },
  {
    title: 'Technology',
    desc: 'Product & Application Security',
    image: imgConnected
  },
  {
    title: 'Financial Services',
    desc: 'Cyber Risk & Regulatory Compliance',
    image: imgAutomotive
  },
  {
    title: 'Manufacturing',
    desc: 'Industrial Security & Compliance',
    image: imgIndustrial
  },
  // {
  //   title: 'Retail & E-commerce',
  //   desc: 'Data Protection & Security',
  //   image: imgIndustrial
  // },
  {
    title: 'Energy & Utilities',
    desc: 'Critical Infrastructure Security',
    image: imgAutomotive
  }
];

export default function IndustryTrack() {
  // Duplicate array for seamless infinite scrolling (4 sets to be safe with lerping)
  const trackItems = [...industries, ...industries, ...industries, ...industries];

  const trackRef = React.useRef(null);
  const scrollPos = React.useRef(0);
  const targetPos = React.useRef(0);

  React.useEffect(() => {
    let animationId;
    let isHovered = false;

    const track = trackRef.current;
    if (!track) return;

    const onEnter = () => (isHovered = true);
    const onLeave = () => (isHovered = false);
    track.addEventListener('mouseenter', onEnter);
    track.addEventListener('mouseleave', onLeave);

    const update = () => {
      if (!isHovered) {
        targetPos.current -= 0.5; // continuous speed
      }

      // Lerp for smooth button scroll
      scrollPos.current += (targetPos.current - scrollPos.current) * 0.1;

      // Infinite loop logic (1 set = scrollWidth / 4)
      const setWidth = track.scrollWidth / 4;

      if (Math.abs(scrollPos.current) >= setWidth * 2) {
        scrollPos.current += setWidth;
        targetPos.current += setWidth;
      } else if (scrollPos.current > 0) {
        scrollPos.current -= setWidth;
        targetPos.current -= setWidth;
      }

      track.style.transform = `translateX(${scrollPos.current}px)`;
      animationId = requestAnimationFrame(update);
    };

    animationId = requestAnimationFrame(update);

    return () => {
      cancelAnimationFrame(animationId);
      track.removeEventListener('mouseenter', onEnter);
      track.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  const handleScrollLeft = () => {
    targetPos.current += 360; // card width (320) + gap (40)
  };

  const handleScrollRight = () => {
    targetPos.current -= 360;
  };

  return (
    <section className="industry-track-section dark-section">
      <div className="industry-track-header">
        <ScrollReveal variant="fade-up" className="industry-track-header-content">
          <div className="industry-track-text">
            <span className="industry-track-eyebrow">INDUSTRIES</span>
            <h2 className="industry-track-title">
              Built for Cloud-Native,<br />Regulated Enterprises
            </h2>
            <p className="industry-track-subtitle">
              Designed for high-growth teams shipping in high-stakes environments where continuous security, compliance, and defensible audit proof all matter.
            </p>
          </div>

          <div className="industry-track-controls">
            <button className="industry-nav-btn" aria-label="Previous" onClick={handleScrollLeft}>
              <ChevronLeft size={20} />
            </button>
            <button className="industry-nav-btn" aria-label="Next" onClick={handleScrollRight}>
              <ChevronRight size={20} />
            </button>
          </div>
        </ScrollReveal>
      </div>

      <div className="industry-marquee-outer">
        <div className="industry-marquee-track" ref={trackRef}>
          {trackItems.map((item, index) => (
            <div className="industry-card" key={index}>
              <div className="industry-card-img-wrapper">
                <img src={item.image} alt={item.title} className="industry-card-img" />
                <div className="industry-card-overlay" />
              </div>
              <div className="industry-card-content">
                <h3 className="industry-card-title">{item.title}</h3>
                <p className="industry-card-desc">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
