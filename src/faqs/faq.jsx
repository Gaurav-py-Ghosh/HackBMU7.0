import React, { useState } from 'react';
import './faq.css';

const faq = () => {
  const [openSection, setOpenSection] = useState(null);

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

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
    <div className="hackathon-footer-fullscreen">
      <div className="footer-container">
        <h1 className="footer-title">FAQs</h1>
        
        <p className="footer-description">
          A comprehensive platform for innovators to showcase groundbreaking technological solutions across diverse domains.
        </p>

        <div className="accordion">
          {sections.map((section, index) => (
            <div key={index} className="accordion-section">
              <button 
                onClick={() => toggleSection(index)} 
                className={`accordion-header ${openSection === index ? 'active' : ''}`}
              >
                <span className="section-title">{section.title}</span>
                <span className="toggle-icon">
                  {openSection === index ? '−' : '+'}
                </span>
              </button>
              {openSection === index && (
                <div className="accordion-content">
                  {section.content}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );

};

export default faq;