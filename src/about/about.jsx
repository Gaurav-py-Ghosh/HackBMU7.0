import { useEffect, useRef } from "react";
import "./about.css";

export default function AboutUs() {
  const galaxyRef = useRef(null);
  const starRef = useRef(null);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (galaxyRef.current && starRef.current) {
            const scroll = window.scrollY;
            const maxScroll = window.innerHeight;
            const progress = Math.min(scroll / maxScroll, 1);
            const scale = 1 + progress * 2.5;
            const fadePoint = 0.4;

            // Calculate smooth translation based on scroll with increased speed
            const translateY = Math.max(0, Math.min((scroll - window.innerHeight), window.innerHeight));
            galaxyRef.current.parentElement.style.transform = `translateY(-${translateY}px)`;
            
            galaxyRef.current.style.transform = `scale3d(${scale},${scale},1)`;
            galaxyRef.current.style.opacity = Math.max(
              1 - progress / fadePoint,
              0,
            );

            if (progress > fadePoint) {
              starRef.current.classList.add("expanded");
            } else {
              starRef.current.classList.remove("expanded");
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Generate star elements
  const TOTAL_STARS = 500;
  const INNER_STAR_DENSITY = 0.3; // 30% of stars will be inner stars
  const INNER_ORBIT_RANGE = { min: 50, max: 200 };
  const OUTER_ORBIT_RANGE = { min: 200, max: 1200 };
  const ECCENTRICITY = {
    inner: { min: 0.3, max: 0.6 },
    outer: { min: 0.4, max: 0.8 },
  };

  const stars = [...Array(TOTAL_STARS)].map((_, i) => {
    const isInnerStar = i < TOTAL_STARS * INNER_STAR_DENSITY;
    const startAngle = Math.random() * 360;
    
    // Calculate semi-major axis (a) and eccentricity (e)
    const semiMajorAxis = isInnerStar
      ? Math.random() * (INNER_ORBIT_RANGE.max - INNER_ORBIT_RANGE.min) +
        INNER_ORBIT_RANGE.min
      : Math.random() * (OUTER_ORBIT_RANGE.max - OUTER_ORBIT_RANGE.min) +
        OUTER_ORBIT_RANGE.min;
    
    const eccentricity = isInnerStar
      ? Math.random() * (ECCENTRICITY.inner.max - ECCENTRICITY.inner.min) +
        ECCENTRICITY.inner.min
      : Math.random() * (ECCENTRICITY.outer.max - ECCENTRICITY.outer.min) +
        ECCENTRICITY.outer.min;
    
    // Calculate orbit properties
    const orbitRadius = semiMajorAxis * (1 - eccentricity * eccentricity);
    const delay = Math.random() * -50 - (isInnerStar ? 10 : 0);
    const opacity = Math.random() * 0.5 + (isInnerStar ? 0.5 : 0.3);

    return (
      <div
        key={i}
        className="spiral-arm"
        style={{
          left: "50%",
          top: "50%",
          "--start-angle": `${startAngle}deg`,
          "--orbit-radius": `${orbitRadius}px`,
          "--delay": `${delay}s`,
          "--star-opacity": opacity,
          "--eccentricity": eccentricity,
        }}
      />
    );
  });

  return (
    <div className="about-container">
      <div className="galaxy-section">
        <div className="central-star" ref={starRef}>
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