import React from 'react';
import { MapPin, Phone, Mail, Send } from 'lucide-react';
import './location.css'; // Importing the CSS file
// psh 

const Location = () => {
  return (
    <div className="location-container">
      {/* Starry Background */}
      <div className="starry-background">
        {[...Array(200)].map((_, i) => (
          <div 
            key={i} 
            className="star"
            style={{
              width: `${Math.random() * 3}px`,
              height: `${Math.random() * 3}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`
            }}
          />
        ))}
      </div>

      <div className="content-wrapper">
        <div className="info-grid">
          {/* Contact Card */}
          <div className="contact-card">
            <div className="text-center">
              <h2 className="heading">Contact Nexus</h2>
              <p className="subtext">Quantum Communication Terminals</p>
            </div>

            <div className="contact-info">
              <div className="info-box">
                <MapPin className="icon" />
                <div>
                  <h3 className="info-title">Location</h3>
                  <p className="info-text">Orbital Station X-742, Cosmic Quadrant 9</p>
                </div>
              </div>

              <div className="info-box">
                <Phone className="icon" />
                <div>
                  <h3 className="info-title">Quantum Link</h3>
                  <p className="info-text">+1 (COSMIC) 123-WARP</p>
                </div>
              </div>

              <div className="info-box">
                <Mail className="icon" />
                <div>
                  <h3 className="info-title">Transmission Node</h3>
                  <p className="info-text">quantum.connect@cosmos.universe</p>
                </div>
              </div>
            </div>
          </div>

          {/* Location Component */}
          <div className="location-card">
            <div className="text-center">
              <h2 className="heading">Geospatial Coordinates</h2>
              <p className="subtext">Navigational Holographic Interface</p>
            </div>

            {/* Stylized Map Placeholder */}
            <div className="map-container">
              <div className="map-overlay"></div>
              <div className="map-ping">
                <div className="ping-outer"></div>
                <div className="ping-inner"></div>
              </div>
              <div className="map-coordinates">
                <p className="coordinates-text">Latitude: 42.3601° N Longitude: 71.0589° W</p>
              </div>
            </div>

            {/* Action Button */}
            <button className="navigation-button">
              <Send className="w-6 h-6" />
              <span>Initialize Navigation</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Location;
