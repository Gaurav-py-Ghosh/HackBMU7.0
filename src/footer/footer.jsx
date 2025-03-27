import React, { useState, useEffect } from 'react';
import './footer.css';

const Footer = () => {
  const [revealLinks, setRevealLinks] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [currentTime, setCurrentTime] = useState('');
  
  useEffect(() => {
    const handleScroll = () => {
      const position = window.pageYOffset;
      setScrollPosition(position);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    // Function to update time
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}));
    };
    
    // Update time immediately and then every second
    updateTime();
    const timeInterval = setInterval(updateTime, 1000);
    
    // Clean up interval on component unmount
    return () => clearInterval(timeInterval);
  }, []);

  return (
    <footer className="sophisticated-footer">
      <div className="parallax-layer" style={{ transform: `translateY(${scrollPosition * 0.1}px)` }}></div>
      
      <div className="footer-content">
        <div className="footer-identity">
          <div className="company-mark">
            <div className="geometric-logo">
              
            </div>
            <h3 className="company-name">ACM BMU STUDENT CHAPTER</h3>
          </div>
          
          <p className="tagline">Bringing Our Legacy to you in an Innovative way.</p>
        </div>
        
        <div className="interactive-panel">
          <div className={`linkset ${revealLinks ? 'revealed' : ''}`}>
            <div className="linkset-column">
              <span className="link-item">Services</span>
              <span className="link-item">About Us</span>
              <span className="link-item">Projects</span>
            </div>
            <div className="linkset-column">
              <span className="link-item">Blog</span>
              <span className="link-item">Careers</span>
              <span className="link-item">Contact</span>
            </div>
            <div className="linkset-column">
              <span className="link-item">Twitter</span>
              <span className="link-item">LinkedIn</span>
              <span className="link-item">Instagram</span>
            </div>
          </div>
          
          <button 
            className="reveal-button" 
            onClick={() => setRevealLinks(!revealLinks)}
            aria-label={revealLinks ? "Hide navigation" : "Show navigation"}
          >
            <span className="reveal-icon"></span>
          </button>
        </div>
      </div>
      
      <div className="footer-lower">
        
        <div className="legal">
          <span>© 2024-25 ACM BMU STUDENT SHAPTER</span>
          <span className="separator">|</span>
          <span>HACKBMU 7.0</span>
          
        </div>
        <div className="time-indicator">
          <span className="dot pulse"></span>
          <span>{currentTime}</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;