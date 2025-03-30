import React, { useEffect, useState } from 'react';
import './LeadOrganizers.css';

const LeadOrganizers = () => {
  const [animatedElements, setAnimatedElements] = useState({});
  
  useEffect(() => {
    // Create random stars for background effect
    const createStars = () => {
      const starContainer = document.querySelector('.star-background');
      if (starContainer) {
        starContainer.innerHTML = '';
        const numStars = 100;
        
        for (let i = 0; i < numStars; i++) {
          const star = document.createElement('div');
          star.classList.add('star');
          star.style.top = `${Math.random() * 100}%`;
          star.style.left = `${Math.random() * 100}%`;
          star.style.animationDelay = `${Math.random() * 5}s`;
          star.style.width = `${Math.random() * 2 + 1}px`;
          star.style.height = star.style.width;
          starContainer.appendChild(star);
        }
      }
    };
    
    createStars();
    
    // Add hover effect detection for each card
    const cards = document.querySelectorAll('.lead-card');
    cards.forEach(card => {
      card.addEventListener('mouseenter', handleCardHover);
      card.addEventListener('mouseleave', handleCardLeave);
    });
    
    return () => {
      cards.forEach(card => {
        card.removeEventListener('mouseenter', handleCardHover);
        card.removeEventListener('mouseleave', handleCardLeave);
      });
    };
  }, []);
  
  const handleCardHover = (e) => {
    const card = e.currentTarget;
    const badgeEl = card.querySelector('.lead-badge');
    if (badgeEl) {
      badgeEl.classList.add('badge-pulse');
    }
  };
  
  const handleCardLeave = (e) => {
    const card = e.currentTarget;
    const badgeEl = card.querySelector('.lead-badge');
    if (badgeEl) {
      badgeEl.classList.remove('badge-pulse');
    }
  };
  
  // Particles for the background effect
  const particles = Array.from({ length: 15 }).map((_, i) => {
    const size = Math.random() * 5 + 1;
    return {
      id: i,
      size,
      left: Math.random() * 100,
      delay: Math.random() * 10,
      duration: Math.random() * 20 + 10
    };
  });

  const leads = [
    {
      name: "Gaurav Ghosh",
      title: "Lead Organizer\nHackNMU Command Center",
      initial: "G",
      badge: "Mission Commander",
      level: 5
    },
    {
      name: "Sejal",
      title: "Lead Organizer\nQuantum Operations",
      initial: "S",
      badge: "Quantum Specialist",
      level: 4
    },
    {
      name: "Tanmay",
      title: "Lead Organizer\nSystems Architect",
      initial: "T",
      badge: "System Engineer",
      level: 4
    }
  ];

  return (
    <div className="lead-organizers-section">
      {/* Star background */}
      <div className="star-background"></div>
      
      {/* Floating particles */}
      <div className="lead-particles">
        {particles.map(particle => (
          <div
            key={particle.id}
            className="lead-particle"
            style={{
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              left: `${particle.left}%`,
              animationDelay: `${particle.delay}s`,
              animationDuration: `${particle.duration}s`
            }}
          />
        ))}
      </div>
      
      <h2 className="lead-section-title">LEAD ORGANIZERS</h2>
      <p className="lead-section-subtitle">Commanding the cosmic hackathon</p>
      
      <div className="lead-organizers-grid">
        {leads.map((lead, index) => (
          <div className="lead-card" key={index}>
            <div className="card-orbit">
              <div className="orbit-particle"></div>
            </div>
            
            <div className="lead-photo-container">
              <div className="lead-photo-placeholder">
                {lead.initial}
              </div>
              <div className="lead-glow"></div>
            </div>
            
            <h3 className="lead-name">{lead.name}</h3>
            <div className="lead-badge">
              <span className="badge-icon">★</span>
              <span className="badge-text">{lead.badge}</span>
            </div>
            
            <div className="lead-level">
              <div className="level-text">Level {lead.level}</div>
              <div className="level-bar">
                <div className="level-progress" style={{ width: `${lead.level * 20}%` }}></div>
              </div>
            </div>
            
            <p className="lead-title">{lead.title}</p>
            
            <div className="lead-social">
  <a href="#" className="social-icon">
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M16 8C17.5913 8 19.1174 8.63214 20.2426 9.75736C21.3679 10.8826 22 12.4087 22 14V21H18V14C18 13.4696 17.7893 12.9609 17.4142 12.5858C17.0391 12.2107 16.5304 12 16 12C15.4696 12 14.9609 12.2107 14.5858 12.5858C14.2107 12.9609 14 13.4696 14 14V21H10V14C10 12.4087 10.6321 10.8826 11.7574 9.75736C12.8826 8.63214 14.4087 8 16 8Z" stroke="#00eeff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M6 9H2V21H6V9Z" stroke="#00eeff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M4 6C5.10457 6 6 5.10457 6 4C6 2.89543 5.10457 2 4 2C2.89543 2 2 2.89543 2 4C2 5.10457 2.89543 6 4 6Z" stroke="#00eeff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  </a>
  <a href="#" className="social-icon">
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M23 3C22.1 3.6 21.1 4.1 20 4.4C19.1 3.4 17.7 2.9 16.2 2.9C13.3 2.9 11 5.2 11 8.1C11 8.5 11 8.9 11.1 9.2C6.7 9 3.2 6.9 1.3 3.7C0.9 4.5 0.7 5.3 0.7 6.2C0.7 7.9 1.5 9.4 2.9 10.3C2.2 10.3 1.5 10.1 0.9 9.7C0.9 12.2 2.7 14.2 5 14.7C4.6 14.8 4.2 14.9 3.7 14.9C3.4 14.9 3.1 14.9 2.8 14.8C3.4 16.8 5.2 18.2 7.4 18.2C5.7 19.5 3.6 20.2 1.3 20.2C0.9 20.2 0.5 20.2 0.1 20.1C2.3 21.5 4.9 22.3 7.7 22.3C16.2 22.3 21 15 21 8.7C21 8.5 21 8.3 21 8.1C21.9 7.4 22.7 6.5 23.3 5.5L23 3Z" stroke="#00eeff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  </a>
  <a href="#" className="social-icon">
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5229 6.47715 22 12 22C17.5229 22 22 17.5229 22 12C22 6.47715 17.5229 2 12 2Z" stroke="#00eeff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M2 12H22" stroke="#00eeff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M12 2C14.5013 4.73835 15.9228 8.29203 16 12C15.9228 15.708 14.5013 19.2616 12 22C9.49872 19.2616 8.07725 15.708 8 12C8.07725 8.29203 9.49872 4.73835 12 2Z" stroke="#00eeff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  </a>
</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LeadOrganizers;