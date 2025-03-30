import React, { useEffect, useRef, useState } from 'react';
import './sponsors.css';

const Sponsors = () => {
  const [titleVisible, setTitleVisible] = useState(false);
  const [cardsVisible, setCardsVisible] = useState([]);
  const [descriptionsVisible, setDescriptionsVisible] = useState([]);
  const titleRef = useRef(null);
  const sponsorsRef = useRef(null);
  const descriptionRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTitleVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.5 }
    );

    const cardsObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute('data-index'));
            setCardsVisible(prev => [...prev, index]);
            setTimeout(() => {
              setDescriptionsVisible(prev => [...prev, index]);
            }, 1000);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (titleRef.current) {
      observer.observe(titleRef.current);
    }

    const cards = sponsorsRef.current?.querySelectorAll('.sponsor-card');
    cards?.forEach(card => cardsObserver.observe(card));

    return () => {
      observer.disconnect();
      cardsObserver.disconnect();
    };
  }, []);

  const sponsors = [
    {
      name: "Google Cloud",
      tier: "Platinum Sponsor",
      logo: "https://cloud.google.com/_static/cloud/images/social-icon-google-cloud-1200-630.png",
      description: "Providing cloud computing resources and AI/ML credits"
    },
    {
      name: "Microsoft",
      tier: "Gold Sponsor",
      logo: "https://img-prod-cms-rt-microsoft-com.akamaized.net/cms/api/am/imageFileData/RE1Mu3b?ver=5c31",
      description: "Supporting innovation with Azure development tools"
    },
    {
      name: "GitHub",
      tier: "Silver Sponsor",
      logo: "https://github.githubassets.com/images/modules/logos_page/GitHub-Logo.png",
      description: "Offering developer collaboration platforms"
    }
  ];

  const splitDescription = (description) => {
    return description.split(" ").reduce((acc, word, index) => {
      const last = acc[acc.length - 1];
      if (last && last.split(" ").length < 10) {
        acc[acc.length - 1] = `${last} ${word}`;
      } else {
        acc.push(word);
      }
      return acc;
    }, []);
  };

  return (
    <div className="floating-hackathon-website">
      <div className="floating-background"></div>
      <div className="website-container">
        <section className="sponsors-section">
          <h2 
            ref={titleRef} 
            className={`sponsors_section-title ${titleVisible ? 'visible' : ''}`}
          >
            Our Amazing Sponsors
          </h2>
          <div className="sponsors-grid" ref={sponsorsRef}>
            {sponsors.map((sponsor, index) => (
              <div 
                key={index}
                data-index={index}
                className={`sponsor-card ${cardsVisible.includes(index) ? 'visible' : ''}`}
                style={{ '--card-index': index }}
              >
                <img src={sponsor.logo} alt={sponsor.name} className="sponsor-logo" />
                <div className="sponsor-details">
                  <h3>{sponsor.name}</h3>
                  <p className="sponsor-tier">{sponsor.tier}</p>
                  <div>
                    {splitDescription(sponsor.description).map((line, lineIndex) => (
                      <p
                        key={lineIndex}
                        className={`sponsor-description ${descriptionsVisible.includes(index) && lineIndex <= descriptionsVisible.length - 1 ? 'visible' : ''}`}
                        style={{
                          animationDelay: `${lineIndex * 1.5}s`
                        }}
                      >
                        {line}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Sponsors;
