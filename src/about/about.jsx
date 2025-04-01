import React, { useState, useEffect, useRef } from 'react';
import './About.css';

const About = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const sectionRef = useRef(null);
  const [stars, setStars] = useState([]);
  const [nebulae, setNebulae] = useState([]);
  const [inView, setInView] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const textRef = useRef(null);
  
  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Generate stars and nebulae on component mount
  useEffect(() => {
    // Generate responsive number of stars based on screen size
    const starCount = windowWidth < 768 ? 80 : 150;
    
    // Generate stars
    const newStars = [];
    for (let i = 0; i < starCount; i++) {
      newStars.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 1.5 + 0.5,
        opacity: Math.random() * 0.7 + 0.3,
        pulse: Math.random() * 5 + 3
      });
    }
    setStars(newStars);
    
    // Generate responsive number of nebulae based on screen size
    const nebulaCount = windowWidth < 768 ? 4 : 8;
    
    // Generate nebulae
    const newNebulae = [];
    for (let i = 0; i < nebulaCount; i++) {
      const baseHue = i < nebulaCount/2 ? 
        Math.floor(Math.random() * 60) + 260 : // Purple range
        Math.floor(Math.random() * 60) + 180;  // Blue range
      
      newNebulae.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        scale: Math.random() * 0.7 + 0.4,
        rotation: Math.random() * 360,
        hue: baseHue,
        isBlue: i >= nebulaCount/2
      });
    }
    setNebulae(newNebulae);
  }, [windowWidth]);

  // Improved scroll effect with throttling
  useEffect(() => {
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (sectionRef.current) {
            const element = sectionRef.current;
            const rect = element.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            
            const elementTop = rect.top;
            const elementBottom = rect.bottom;
            const elementHeight = rect.height;
            
            if (elementTop < windowHeight && elementBottom > 0) {
              setInView(true);
              
              const visiblePortion = Math.min(windowHeight, elementBottom) - Math.max(0, elementTop);
              const progress = Math.min(1, Math.max(0, visiblePortion / Math.min(windowHeight, elementHeight)));
              setScrollProgress(progress);
            } else {
              setInView(false);
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial call
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Dynamic background colors with improved contrast
  const backgroundColorTop = `rgb(${5 + scrollProgress * 10}, ${5 + scrollProgress * 15}, ${15 + scrollProgress * 35})`;
  const backgroundColorBottom = `rgb(${3 + scrollProgress * 12}, ${8 + scrollProgress * 32}, ${30 + scrollProgress * 55})`;

  const handleRegisterClick = () => {
    window.open('https://unstop.com/hackathons/hackbmu-70-glitch-by-acm-bmu-student-chapter-bml-munjal-university-bmu-gurgaon-1432718', '_blank');
  };

  // Responsive sizing for planets
  const saturnSize = windowWidth < 768 ? 8 : windowWidth < 1024 ? 10 : 12;
  const bluePlanetSize = windowWidth < 768 ? 5.5 : windowWidth < 1024 ? 7 : 8.5;

  return (
    <div 
      ref={sectionRef}
      className="space-section"
    >
      {/* Background gradient with dynamic color transition */}
      <div 
        className="background-gradient"
        style={{
          background: `linear-gradient(to bottom, ${backgroundColorTop}, ${backgroundColorBottom})`,
          transform: `translateZ(${-50 * scrollProgress}px)`
        }}
      />
      
      {/* Nebulae with improved color transitions */}
      {nebulae.map(nebula => (
        <div
          key={`nebula-${nebula.id}`}
          className="nebula"
          style={{
            left: `${nebula.x}%`,
            top: `${nebula.y}%`,
            width: `${windowWidth < 768 ? 200 : 300 * nebula.scale}px`,
            height: `${windowWidth < 768 ? 200 : 300 * nebula.scale}px`,
            background: `radial-gradient(circle, hsla(${nebula.hue}, 100%, ${50 + scrollProgress * 20}%, ${nebula.isBlue ? scrollProgress * 0.6 : 0.3 - scrollProgress * 0.1}), transparent 70%)`,
            transform: `rotate(${nebula.rotation}deg) scale(${1 + scrollProgress * 0.3})`,
            opacity: nebula.isBlue ? 0.1 + scrollProgress * 0.7 : 0.3 - scrollProgress * 0.15,
            filter: `blur(${windowWidth < 768 ? 20 : 30 + scrollProgress * 15}px)`,
          }}
        />
      ))}

      {/* Stars with dynamic brightness and improved mobile performance */}
      <div className="stars-container" style={{ transform: `translateZ(${-20 * scrollProgress}px)` }}>
        {stars.map(star => (
          <div
            key={`star-${star.id}`}
            className="star"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              opacity: star.opacity * (0.7 + 0.5 * scrollProgress + 0.3 * Math.sin(Date.now() / 1000 / star.pulse)),
              boxShadow: `0 0 ${star.size * (3 + scrollProgress * 3)}px rgba(${175 + scrollProgress * 80}, ${200 + scrollProgress * 55}, 255, ${star.opacity * (0.8 + scrollProgress * 0.2)})`,
              transform: `translateZ(${star.size * 50 * scrollProgress}px)`,
              willChange: 'opacity, transform',
            }}
          />
        ))}
      </div>
      
      {/* Saturn planet with responsive positioning */}
      <div 
        className="planet saturn"
        style={{
          transform: `translateX(${windowWidth < 768 ? 70 - scrollProgress * 100 : 100 - scrollProgress * 150}px) translateY(${-30 * scrollProgress}px) scale(${0.8 + scrollProgress * 0.4})`,
          opacity: scrollProgress * 1.5,
          overflow: 'visible',
          right: windowWidth < 768 ? '8%' : '12%',
          top: windowWidth < 768 ? '30%' : '25%'
        }}
      >
        <img 
          src="/img/saturn.png" 
          alt="Saturn planet" 
          className="real-planet-image"
          style={{
            width: `${saturnSize}rem`,
            height: `${saturnSize}rem`,
            objectFit: 'contain',
            filter: `brightness(${0.7 + scrollProgress * 0.5}) saturate(${0.8 + scrollProgress * 0.7})`,
            display: 'block'
          }}
        />
      </div>
      
      {/* Blue planet with responsive positioning */}
      <div 
        className="planet blue-planet"
        style={{
          transform: `translateX(${windowWidth < 768 ? -50 + scrollProgress * 80 : -80 + scrollProgress * 120}px) translateY(${50 - scrollProgress * 70}px) scale(${0.6 + scrollProgress * 0.6})`,
          opacity: scrollProgress * 1.3,
          left: windowWidth < 768 ? '12%' : '15%',
          bottom: windowWidth < 768 ? '25%' : '20%'
        }}
      >
        <img 
          src="/img/blue.png" 
          alt="Blue planet" 
          className="real-planet-image"
          style={{
            width: `${bluePlanetSize}rem`,
            height: `${bluePlanetSize}rem`,
            filter: `brightness(${0.6 + scrollProgress * 0.8}) saturate(${0.7 + scrollProgress * 1.2}) hue-rotate(${-20 + scrollProgress * 30}deg)`
          }}
        />
      </div>
      
      {/* Content container with improved text visibility */}
      <div 
        ref={textRef}
        className="content-container"
        style={{
          opacity: Math.min(1, scrollProgress * 2.5),
          transform: `translateY(${50 - scrollProgress * 50}px)`,
        }}
      >
        <div className={`content-wrapper ${windowWidth < 768 ? 'mobile' : ''}`}>
          <h2 
            className="discover-text" 
            style={{ 
              animationPlayState: inView ? 'running' : 'paused',
              color: `rgba(${130 + scrollProgress * 100}, ${160 + scrollProgress * 90}, ${210 + scrollProgress * 45}, ${0.9 + scrollProgress * 0.1})`,
              fontSize: windowWidth < 768 ? '1.25rem' : '1.5rem'
            }}
          >
            ABOUT HACKBMU
          </h2>
          
          <h1 
            className="vision-title" 
            style={{ 
              animationPlayState: inView ? 'running' : 'paused',
              backgroundImage: `linear-gradient(to right, 
                rgba(${120 + scrollProgress * 60}, ${150 + scrollProgress * 70}, ${255 - scrollProgress * 5}, 1), 
                rgba(${160 + scrollProgress * 60}, ${170 + scrollProgress * 50}, ${255 - scrollProgress * 10}, 1), 
                rgba(${180 + scrollProgress * 40}, ${140 + scrollProgress * 70}, ${255 - scrollProgress * 15}, 1))`,
              fontSize: windowWidth < 768 ? '2rem' : windowWidth < 1024 ? '3rem' : '4.5rem'
            }}
          >
            HackBMU 7.0
          </h1>
          
          <div className="divider" style={{ 
            animationPlayState: inView ? 'running' : 'paused',
            backgroundColor: `rgb(${50 + scrollProgress * 50}, ${80 + scrollProgress * 80}, ${230 + scrollProgress * 25})`,
            width: windowWidth < 768 ? '3rem' : '4rem'
          }}></div>
          
          <div className="content-box" style={{
            backgroundColor: `rgba(${5 + scrollProgress * 10}, ${10 + scrollProgress * 15}, ${30 + scrollProgress * 30}, ${0.6 + scrollProgress * 0.1})`,
            boxShadow: `0 25px 50px -12px rgba(${20 + scrollProgress * 20}, ${40 + scrollProgress * 30}, ${80 + scrollProgress * 50}, 0.5)`,
            padding: windowWidth < 768 ? '1.5rem' : '2rem'
          }}>
            <p className="content-paragraph first" style={{ 
              animationPlayState: inView ? 'running' : 'paused',
              color: `rgb(${200 + scrollProgress * 30}, ${210 + scrollProgress * 30}, ${240 + scrollProgress * 15})`,
              fontSize: windowWidth < 768 ? '1rem' : '1.125rem'
            }}>
              A hackathon focused on promoting innovation, diversity and networking among all future hackers. 
              We will be hosting upcoming engineers and developers from all over the World to create mobile, 
              web, and hardware hacks for an intense session.
            </p>
            
            <p className="content-paragraph second" style={{ 
              animationPlayState: inView ? 'running' : 'paused',
              color: `rgb(${200 + scrollProgress * 30}, ${210 + scrollProgress * 30}, ${240 + scrollProgress * 15})`,
              fontSize: windowWidth < 768 ? '1rem' : '1.125rem'
            }}>
              Our hackathon aims to disrupt the norm by challenging conventions, rethinking the ordinary, 
              and creating bold, game-changing solutions. If it's "how it's always been done," it's time 
              to disrupt it.
            </p>

            <p className="content-paragraph third" style={{ 
              animationPlayState: inView ? 'running' : 'paused',
              color: `rgb(${200 + scrollProgress * 30}, ${210 + scrollProgress * 30}, ${240 + scrollProgress * 15})`,
              opacity: 0,
              animation: 'fade-in 0.8s ease-out forwards paused',
              animationDelay: '1.2s',
              animationFillMode: 'forwards',
              marginBottom: '2rem',
              fontSize: windowWidth < 768 ? '1rem' : '1.125rem'
            }}>
              HackBMU seeks to provide a welcoming and supportive environment to all participants 
              to develop their skills, regardless of their background. Last year and the year before, 
              HackBMU garnered huge attention with 30+ teams from around the country.
            </p>
            
            <div className="button-container" style={{ 
              animationPlayState: inView ? 'running' : 'paused',
              display: 'flex',
              justifyContent: 'center'
            }}>
              <button 
                className="expertise-button" 
                onClick={handleRegisterClick}
                style={{
                  backgroundImage: `linear-gradient(to right, 
                    rgb(${30 + scrollProgress * 30}, ${70 + scrollProgress * 50}, ${200 + scrollProgress * 35}), 
                    rgb(${60 + scrollProgress * 30}, ${60 + scrollProgress * 40}, ${180 + scrollProgress * 40}))`,
                  padding: windowWidth < 768 ? '0.6rem 1.5rem' : '0.75rem 2rem',
                  fontSize: windowWidth < 768 ? '0.9rem' : '1rem'
                }}
              >
                Register Now
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Removed the particles-container section */}
    </div>
  );
};

export default About;