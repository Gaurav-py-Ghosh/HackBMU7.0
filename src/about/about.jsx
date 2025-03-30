import { useEffect, useRef, useState } from "react";
import "./about.css";

export default function AboutUs() {
  const galaxyRef = useRef(null);
  const starRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let lastScrollY = 0;
    let rafId = null;
    
    const handleScroll = () => {
      if (rafId) return;
      
      rafId = requestAnimationFrame(() => {
        if (galaxyRef.current && starRef.current) {
          const scrollY = window.scrollY;
          const maxScroll = window.innerHeight;
          
          // Add offset to delay animation start (300px in this case)
          const adjustedScrollY = Math.max(0, scrollY - 300);
          const progress = Math.min(adjustedScrollY / maxScroll, 1);
          
          // Apply smoother easing function for scale
          const easeOutCubic = t => 1 - Math.pow(1 - t, 3);
          const scale = 1 + easeOutCubic(progress) * 2.5;
          
          const fadePoint = 0.4;
          
          // Smoother translation with damping effect
          const translateY = Math.max(0, Math.min((adjustedScrollY - window.innerHeight * 0.2) * 0.8, window.innerHeight));
          galaxyRef.current.parentElement.style.transform = `translateY(-${translateY}px)`;
          
          // Apply smooth scale with GPU acceleration
          galaxyRef.current.style.transform = `scale3d(${scale},${scale},1)`;
          
          // Smoother opacity transition with easing
          galaxyRef.current.style.opacity = Math.max(1 - easeOutCubic(progress / fadePoint), 0);
          
          // Expand star with a threshold check to avoid constant re-renders
          if (progress > fadePoint && !isVisible) {
            setIsVisible(true);
            starRef.current.classList.add("expanded");
          } else if (progress <= fadePoint && isVisible) {
            setIsVisible(false);
            starRef.current.classList.remove("expanded");
          }
          
          // Update scroll position for next frame
          lastScrollY = scrollY;
        }
        rafId = null;
      });
    };
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    
    // Trigger initial animation
    setTimeout(() => {
      handleScroll();
    }, 100);
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
    };
  }, [isVisible]);

  // Generate star elements with improved distribution
  const TOTAL_STARS = 650;
  const INNER_STAR_DENSITY = 0.35;
  const INNER_ORBIT_RANGE = { min: 50, max: 220 };
  const OUTER_ORBIT_RANGE = { min: 220, max: 1400 };
  const ECCENTRICITY = {
    inner: { min: 0.2, max: 0.5 },
    outer: { min: 0.3, max: 0.7 },
  };
  
  const stars = [...Array(TOTAL_STARS)].map((_, i) => {
    const isInnerStar = i < TOTAL_STARS * INNER_STAR_DENSITY;
    
    const spiralFactor = 0.15;
    const startAngle = Math.random() * 360;
    const spiralOffset = (startAngle / 360) * 2 * Math.PI * spiralFactor;
    
    const semiMajorAxis = isInnerStar
      ? INNER_ORBIT_RANGE.min + (INNER_ORBIT_RANGE.max - INNER_ORBIT_RANGE.min) * 
        (Math.random() * 0.8 + spiralOffset)
      : OUTER_ORBIT_RANGE.min + (OUTER_ORBIT_RANGE.max - OUTER_ORBIT_RANGE.min) * 
        (Math.random() * 0.9 + spiralOffset);
    
    const eccentricity = isInnerStar
      ? Math.random() * (ECCENTRICITY.inner.max - ECCENTRICITY.inner.min) +
        ECCENTRICITY.inner.min
      : Math.random() * (ECCENTRICITY.outer.max - ECCENTRICITY.outer.min) +
        ECCENTRICITY.outer.min;
    
    const orbitRadius = semiMajorAxis * (1 - eccentricity * eccentricity);
    
    const rotationPeriod = isInnerStar 
      ? Math.random() * 15 + 15
      : Math.random() * 25 + 30;

    const delay = Math.random() * -60;
    const opacity = Math.random() * 0.5 + (isInnerStar ? 0.5 : 0.3);
    
    const size = isInnerStar 
      ? Math.random() * 2 + 2
      : Math.random() * 1.5 + 1;

    return (
      <div
        key={i}
        className="spiral-arm"
        style={{
          left: "50%",
          top: "50%",
          width: `${size}px`,
          height: `${size}px`,
          "--start-angle": `${startAngle}deg`,
          "--orbit-radius": `${orbitRadius}px`,
          "--delay": `${delay}s`,
          "--star-opacity": opacity,
          "--eccentricity": eccentricity,
          "--rotation-period": `${rotationPeriod}s`,
        }}
      />
    );
  });

  return (
    <div className="about-container">
      <div className="galaxy-section">
        <div className="central-star" ref={starRef}>
          <div className="nebula-glow"></div>
          <div className="star-particles"></div>
          <div className="about-content">
            <h1>About Us</h1>
            <p>
              We are explorers of the cosmic digital frontier, venturing from
              the vastness of galaxies to the quantum realm. Our journey through
              technology mirrors the universe itself - infinite in
              possibilities.
            </p>
            <button className="quantum-btn">Explore Quantum Realm</button>
          </div>
        </div>
        <div className="galaxy" ref={galaxyRef}>
          {stars}
        </div>
      </div>
    </div>
  );
}