import React, { useEffect, useState } from 'react';
import './sponsors.css';

const sponsors = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const calculateTransform = (baseOffset) => {
    return Math.sin(scrollY * 0.002 + baseOffset) * 10;
  };

  const sponsors = [
    {
      name: "Google Cloud",
      tier: "Platinum Sponsor",
      logo: "/api/placeholder/200/100",
      description: "Providing cloud computing resources and AI/ML credits"
    },
    {
      name: "Microsoft",
      tier: "Gold Sponsor",
      logo: "/api/placeholder/200/100",
      description: "Supporting innovation with Azure development tools"
    },
    {
      name: "GitHub",
      tier: "Silver Sponsor",
      logo: "/api/placeholder/200/100",
      description: "Offering developer collaboration platforms"
    }
  ];

  const timeline = [
    {
      date: "March 15, 2025",
      title: "Registration Opens",
      description: "Online application portal goes live for participants"
    },
    {
      date: "April 10, 2025",
      title: "Early Bird Deadline",
      description: "Last day for early registration with reduced fees"
    },
    {
      date: "May 1, 2025",
      title: "Hackathon Kickoff",
      description: "48-hour intensive innovation marathon begins"
    },
    {
      date: "May 3, 2025",
      title: "Final Presentations",
      description: "Teams showcase their innovative solutions to judges"
    }
  ];

  return (
    <div className="floating-hackathon-website">
      <div 
        className="floating-background"
        style={{
          transform: `translateY(${calculateTransform(0)}px)`,
        }}
      ></div>

      <div className="website-container">
        <section 
          className="sponsors-section"
          style={{
            transform: `translateY(${calculateTransform(2)}px)`,
          }}
        >
          <h2 className="sponsors_section-title">Our Sponsors</h2>
          <div className="sponsors-grid">
            {sponsors.map((sponsor, index) => (
              <div 
                key={index} 
                className="sponsor-card"
                style={{
                  transform: `translateY(${calculateTransform(index * 0.5)}px)`,
                }}
              >
                <img src={sponsor.logo} alt={sponsor.name} className="sponsor-logo" />
                <div className="sponsor-details">
                  <h3>{sponsor.name}</h3>
                  <p className="sponsor-tier">{sponsor.tier}</p>
                  <p className="sponsor-description">{sponsor.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        
      </div>
    </div>
  );
};

export default sponsors;