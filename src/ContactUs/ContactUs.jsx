import React, { useState, useEffect } from 'react';

const HighTechRetroContact = () => {
  const [glitchActive, setGlitchActive] = useState(false);
  const [scanlineActive, setScanlineActive] = useState(true);
  const [hoverPerson, setHoverPerson] = useState(null);

  // Trigger glitch effect periodically
  useEffect(() => {
    const glitchInterval = setInterval(() => {
      setGlitchActive(true);
      setTimeout(() => setGlitchActive(false), 200);
    }, 8000);
    
    return () => clearInterval(glitchInterval);
  }, []);

  // Contact info for team
  const contactData = [
    {
      id: 1,
      name: "NEO MATSUDA",
      role: "LEAD DEVELOPER",
      email: "neo.matsuda@cyberhack.io",
      phone: "+1 (415) 555-0123",
      specialties: ["Neural Networks", "Blockchain", "AI Systems"]
    },
    {
      id: 2,
      name: "ZETA REEVES",
      role: "UX ARCHITECT",
      email: "zeta.reeves@cyberhack.io",
      phone: "+1 (415) 555-0189",
      specialties: ["Interface Design", "VR Environments", "Biometrics"]
    }
  ];

  const styles = `
    /* Base container with darker theme */
    .retro-container {
      background: linear-gradient(135deg, #0a0a0a, #121621);
      color: #4ee576;
      font-family: 'Courier New', monospace;
      padding: 2.5rem;
      border-radius: 8px;
      box-shadow: 0 0 20px rgba(0, 0, 0, 0.8);
      position: relative;
      overflow: hidden;
      border: 1px solid #1a2540;
      max-width: 1200px;
      margin: 0 auto;
    }

    /* Subtle scanline effect */
    .retro-container::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: repeating-linear-gradient(
        transparent 0px,
        rgba(20, 20, 20, 0.1) 1px,
        transparent 2px
      );
      pointer-events: none;
      z-index: 10;
      opacity: ${scanlineActive ? 0.07 : 0};
      animation: scanline 10s linear infinite;
    }

    /* Header section */
    .header {
      text-align: center;
      margin-bottom: 3rem;
      position: relative;
      padding-bottom: 1.5rem;
      border-bottom: 1px solid rgba(30, 143, 180, 0.2);
    }

    .header h2 {
      font-size: 2.5rem;
      letter-spacing: 5px;
      margin: 0;
      text-shadow: 0 0 10px rgba(0, 150, 255, 0.3);
      animation: pulse 6s infinite;
      font-weight: 700;
      color: #e0e0e0;
    }

    .header h3 {
      font-size: 1rem;
      color: #1e8fb4;
      margin-top: 0.75rem;
      letter-spacing: 2px;
      font-weight: normal;
      opacity: 0.8;
    }

    /* Contact grid with proper spacing */
    .contact-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 2.5rem;
    }

    /* Card styling with dark theme */
    .contact-card {
      background: rgba(10, 14, 25, 0.9);
      padding: 2rem;
      border: 1px solid ${glitchActive ? 'rgba(138, 43, 226, 0.5)' : 'rgba(30, 143, 180, 0.3)'};
      border-radius: 6px;
      position: relative;
      transition: all 0.4s ease;
      transform-style: preserve-3d;
      transform: ${glitchActive ? 'translateX(3px)' : 'none'};
    }

    .contact-card:hover {
      box-shadow: 0 0 15px rgba(30, 143, 180, 0.2);
      transform: translateY(-3px);
    }

    .contact-card.glitch {
      animation: glitch 0.3s cubic-bezier(.25, .46, .45, .94) both;
    }

    /* Name styling */
    .name {
      font-size: 1.5rem;
      font-weight: bold;
      margin-bottom: 0.8rem;
      color: #e0e0e0;
      position: relative;
      display: inline-block;
      letter-spacing: 1.5px;
    }

    .name::after {
      content: "";
      position: absolute;
      left: 0;
      bottom: -5px;
      width: 100%;
      height: 2px;
      background: linear-gradient(90deg, #1e8fb4, transparent);
    }

    /* Role styling */
    .role {
      color: #8a2be2;
      font-size: 0.9rem;
      margin-bottom: 1.2rem;
      letter-spacing: 1px;
      opacity: 0.85;
    }

    /* Contact details with improved spacing */
    .contact-detail {
      margin: 0.9rem 0;
      display: flex;
      align-items: center;
    }

    .label {
      color: #1e8fb4;
      width: 80px;
      display: inline-block;
      font-size: 0.9rem;
    }

    .value {
      color: #d0d0d0;
    }

    .value a {
      color: #4ee576;
      text-decoration: none;
      transition: color 0.3s;
    }

    .value a:hover {
      color: #8a2be2;
      text-decoration: underline;
    }

    /* Specialties tags with darker theme */
    .specialties {
      display: flex;
      flex-wrap: wrap;
      gap: 0.6rem;
      margin-top: 1.5rem;
    }

    .specialty {
      background: rgba(30, 143, 180, 0.1);
      border: 1px solid rgba(30, 143, 180, 0.3);
      padding: 0.4rem 0.7rem;
      border-radius: 3px;
      font-size: 0.8rem;
      color: #1e8fb4;
    }

    /* CTA button with dark theme */
    .cta-button {
      display: block;
      width: 100%;
      background: rgba(30, 143, 180, 0.05);
      color: #4ee576;
      border: 1px solid rgba(78, 229, 118, 0.4);
      padding: 1rem;
      margin-top: 1.8rem;
      font-family: 'Courier New', monospace;
      font-size: 1rem;
      cursor: pointer;
      transition: all 0.3s;
      position: relative;
      overflow: hidden;
      letter-spacing: 1px;
      border-radius: 4px;
    }

    .cta-button::before {
      content: "";
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(78, 229, 118, 0.1), transparent);
      transition: all 0.5s;
    }

    .cta-button:hover {
      background: rgba(30, 143, 180, 0.15);
      color: #e0e0e0;
      border-color: #1e8fb4;
    }

    .cta-button:hover::before {
      left: 100%;
    }

    /* Terminal line with adjusted styling */
    .terminal-line {
      color: #1e8fb4;
      font-size: 0.8rem;
      margin-top: 2.5rem;
      opacity: 0.7;
      font-family: monospace;
      animation: typing 4s steps(50, end) infinite;
      white-space: nowrap;
      overflow: hidden;
      text-align: center;
      border-top: 1px solid rgba(30, 143, 180, 0.1);
      padding-top: 1.5rem;
    }

    /* Animations */
    @keyframes scanline {
      0% {
        background-position: 0 0;
      }
      100% {
        background-position: 0 1000px;
      }
    }

    @keyframes pulse {
      0%, 100% {
        text-shadow: 0 0 10px rgba(30, 143, 180, 0.3);
      }
      50% {
        text-shadow: 0 0 15px rgba(30, 143, 180, 0.5), 0 0 30px rgba(30, 143, 180, 0.3);
      }
    }

    @keyframes glitch {
      0% {
        transform: translate(0);
      }
      20% {
        transform: translate(-4px, 4px);
      }
      40% {
        transform: translate(-4px, -4px);
      }
      60% {
        transform: translate(4px, 4px);
      }
      80% {
        transform: translate(4px, -4px);
      }
      100% {
        transform: translate(0);
      }
    }

    @keyframes typing {
      from { width: 0; margin-left: 50%; }
      to { width: 100%; margin-left: 0; }
    }

    /* Responsive styling */
    @media (min-width: 768px) {
      .contact-grid {
        grid-template-columns: repeat(2, 1fr);
      }
      
      .terminal-line {
        text-align: left;
      }
    }
  `;

  return (
    <>
      <style>{styles}</style>
      <div className="retro-container">
        <div className="header">
          <h2>CONTACT_CYBERHACK.EXE</h2>
          <h3>// SECURE LINE ESTABLISHED //</h3>
        </div>
        
        <div className="contact-grid">
          {contactData.map(person => (
            <div 
              key={person.id}
              className={`contact-card ${glitchActive ? 'glitch' : ''}`}
              onMouseEnter={() => setHoverPerson(person.id)}
              onMouseLeave={() => setHoverPerson(null)}
            >
              <div className="name">{person.name}</div>
              <div className="role">{person.role}</div>
              
              <div className="contact-detail">
                <span className="label">EMAIL:</span>
                <span className="value">
                  <a href={`mailto:${person.email}`}>{person.email}</a>
                </span>
              </div>
              
              <div className="contact-detail">
                <span className="label">SECURE:</span>
                <span className="value">{person.phone}</span>
              </div>
              
              <div className="specialties">
                {person.specialties.map((specialty, index) => (
                  <span key={index} className="specialty">{specialty}</span>
                ))}
              </div>
              
              <button 
                className="cta-button"
                onClick={() => {
                  setGlitchActive(true);
                  setTimeout(() => setGlitchActive(false), 300);
                }}
              >
                INIT_COMMUNICATION
              </button>
            </div>
          ))}
        </div>
        
        <div className="terminal-line">
          &gt; sys.connect_established --secure-channel --encryption=AES256 --status=waiting_input
        </div>
      </div>
    </>
  );
};

export default HighTechRetroContact;