import React, { useState, useEffect } from 'react';
import './faq.css';

const FAQ = () => {
  const [openSection, setOpenSection] = useState(null);
  const [visibleItems, setVisibleItems] = useState([]);

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisibleItems(sections.map((_, index) => index));
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  const sections = [
    { 
      title: "Participant Eligibility", 
      content: "Open to tech professionals, students, and innovators globally. Participants must be 18 years or older. Multidisciplinary teams are encouraged." 
    },
    { 
      title: "Competition Tracks", 
      content: "Competitive tracks include Artificial Intelligence, Blockchain Technologies, Climate Tech, Digital Health, and Open Innovation. Each track emphasizes cutting-edge technological solutions." 
    },
    { 
      title: "Registration Process", 
      content: "Online registration through our secure portal. Early registration offers significant advantages. Individual and team submissions accepted. Application review takes 5-7 business days." 
    },
    { 
      title: "Awards & Recognition", 
      content: "Comprehensive prize structure including cash awards, venture capital introductions, and acceleration program opportunities. Top three teams receive $15,000, $10,000, and $5,000 respectively." 
    },
    { 
      title: "Technical Infrastructure", 
      content: "High-performance computing resources provided. Access to cloud credits from major providers. Dedicated technical support throughout the event. Recommended: Latest development tools and frameworks." 
    },
    { 
      title: "Evaluation Methodology", 
      content: "Rigorous multi-stage evaluation by industry experts. Criteria include technological innovation, scalability, potential societal impact, code quality, and pitch presentation effectiveness." 
    }
  ];

  return (
    <div className="hackathon-retro-faq-container">
      <div className="hackathon-retro-faq">
        <div className="hackathon-retro-faq__header">
          <h2 className="hackathon-retro-faq__title">FAQs</h2>
          <div className="hackathon-retro-faq__edition-container">
            <div className="hackathon-retro-faq__edition">7TH EDITION</div>
          </div>
          <p className="hackathon-retro-faq__description">
            A comprehensive platform for innovators to showcase groundbreaking technological solutions across diverse domains.
          </p>
        </div>

        <div className="hackathon-retro-faq__list">
          {sections.map((section, index) => (
            <div 
              key={index} 
              className={`hackathon-retro-faq__item ${openSection === index ? 'is-active' : ''} ${visibleItems.includes(index) ? 'is-visible' : ''}`}
              style={{ '--item-index': index }}
            >
              <div 
                className="hackathon-retro-faq__item-header" 
                onClick={() => toggleSection(index)}
              >
                <h3 className="hackathon-retro-faq__item-title">{section.title}</h3>
                <span className="hackathon-retro-faq__toggle-icon">
                  {openSection === index ? '−' : '+'}
                </span>
              </div>
              
              <div className={`hackathon-retro-faq__item-content ${openSection === index ? 'is-visible' : ''}`}>
                <p className="hackathon-retro-faq__item-text">{section.content}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQ;