import React, { useEffect, useState } from 'react';
import { MapPin, Phone, Mail, Send, Terminal, Zap } from 'lucide-react';
import './VenueSection.css';

const VenueSection = () => {
  const [typedText, setTypedText] = useState('');
  const targetText = "NEXUS TERMINAL READY...";
  
  useEffect(() => {
    let index = 0;
    const typingInterval = setInterval(() => {
      if (index < targetText.length) {
        setTypedText(prev => prev + targetText.charAt(index));
        index++;
      } else {
        clearInterval(typingInterval);
      }
    }, 100);
    
    return () => clearInterval(typingInterval);
  }, []);
  
  // Generate random stars for background
  const renderStars = () => {
    const stars = [];
    for (let i = 0; i < 50; i++) {
      const size = Math.random() * 3 + 1;
      const top = Math.random() * 100;
      const left = Math.random() * 100;
      const animationDelay = Math.random() * 5;
      
      stars.push(
        <div 
          key={i} 
          className="star" 
          style={{
            width: `${size}px`,
            height: `${size}px`,
            top: `${top}%`,
            left: `${left}%`,
            animationDelay: `${animationDelay}s`
          }}
        />
      );
    }
    return stars;
  };
  
  return (
    <div className="venue-section">
      <div className="star-background">
        {renderStars()}
      </div>
      
      <div className="venue-header">
        <h1 className="venue-title">COMMUNICATION NEXUS</h1>
        <div className="venue-scanner">
          <div className="scanner-line"></div>
        </div>
        <div className="terminal-text">{typedText}<span className="cursor">_</span></div>
      </div>
      
      <div className="info-grid">
        {/* Contact Card */}
        <div className="contact-card">
          <div className="card-orbit">
            <div className="orbit-particle"></div>
          </div>
          
          <div className="card-header">
            <Terminal className="header-icon" />
            <h2 className="heading">Command Center</h2>
            <div className="header-line"></div>
          </div>
          
          <p className="subtext">// QUANTUM COMMUNICATION TERMINALS</p>
          
          <div className="contact-info">
            <div className="info-box">
              <div className="info-icon-container">
                <MapPin className="icon" />
              </div>
              <div>
                <h3 className="info-title">LOCATION</h3>
                <p className="info-text">Orbital Station X-742, Cosmic Quadrant 9</p>
              </div>
            </div>
            
            <div className="info-box">
              <div className="info-icon-container">
                <Phone className="icon" />
              </div>
              <div>
                <h3 className="info-title">QUANTUM LINK</h3>
                <p className="info-text">+1 (COSMIC) 123-WARP</p>
              </div>
            </div>
            
            <div className="info-box">
              <div className="info-icon-container">
                <Mail className="icon" />
              </div>
              <div>
                <h3 className="info-title">TRANSMISSION NODE</h3>
                <p className="info-text">quantum.connect@cosmos.universe</p>
              </div>
            </div>
          </div>
          
          <div className="status-indicator">
            <div className="status-dot"></div>
            <span className="status-text">ONLINE</span>
          </div>
        </div>
        
        {/* Location Component */}
        <div className="location-card">
          <div className="card-orbit">
            <div className="orbit-particle"></div>
          </div>
          
          <div className="card-header">
            <Zap className="header-icon" />
            <h2 className="heading">Navigation Matrix</h2>
            <div className="header-line"></div>
          </div>
          
          <p className="subtext">// HOLOGRAPHIC INTERFACE v7.42</p>
          
          {/* Stylized Map Placeholder */}
          <div className="map-container">
            <div className="map-grid-lines"></div>
            <div className="map-overlay"></div>
            <div className="map-ping">
              <div className="ping-outer"></div>
              <div className="ping-inner"></div>
            </div>
            
            <div className="sector-indicators">
              <div className="sector">SECTOR A</div>
              <div className="sector">SECTOR B</div>
              <div className="sector">SECTOR C</div>
              <div className="sector">SECTOR D</div>
            </div>
            
            <div className="map-coordinates">
              <p className="coordinates-text">LAT: 42.3601° N  |  LON: 71.0589° W</p>
            </div>
          </div>
          
          {/* Action Button */}
          <button className="navigation-button">
            <div className="button-glow"></div>
            <Send className="button-icon" />
            <span>INITIALIZE NAVIGATION SEQUENCE</span>
          </button>
          
          <div className="power-indicators">
            <div className="power-bar">
              <div className="power-level"></div>
            </div>
            <span className="power-text">WARP DRIVE: READY</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VenueSection;