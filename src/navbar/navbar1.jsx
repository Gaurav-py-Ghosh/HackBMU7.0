import React, { useState, useRef, useEffect } from 'react';

const EnhancedCosmicNav = () => {
  const [activeConstellation, setActiveConstellation] = useState('home');
  const [hoveringStar, setHoveringStar] = useState(null);
  const [navMode, setNavMode] = useState('interactive');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isExploring, setIsExploring] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [showLabels, setShowLabels] = useState(true);
  
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const animationRef = useRef(null);
  
  // Enhanced star map with more celestial bodies and deeper information
  const celestialMap = {
    home: {
      name: "Orion",
      description: "The Hunter's Gateway",
      lore: "Orion, a mighty hunter of Greek mythology, stands as one of the most recognizable constellations in the night sky.",
      stars: [
        { id: "home", name: "Betelgeuse", label: "Home", x: 20, y: 40, size: 4.5, color: "#ff7b4d" },
        { id: "about", name: "Bellatrix", label: "About", x: 40, y: 25, size: 3.5, color: "#b1e5ff" },
        { id: "services", name: "Alnilam", label: "Services", x: 50, y: 50, size: 4, color: "#ffffff" },
        { id: "portfolio", name: "Rigel", label: "Portfolio", x: 75, y: 60, size: 4.5, color: "#a1dfff" },
        { id: "contact", name: "Saiph", label: "Contact", x: 30, y: 70, size: 3.5, color: "#b5edff" }
      ],
      connections: [
        ["home", "about"], ["about", "services"], ["services", "portfolio"],
        ["portfolio", "contact"], ["contact", "home"], ["about", "contact"]
      ],
      nebula: { x: 50, y: 45, size: 120, opacity: 0.15, color: "#ff5c32" }
    },
    about: {
      name: "Cassiopeia",
      description: "The Queen's Wisdom",
      lore: "Named after the vain queen in Greek mythology, this W-shaped constellation contains ancient knowledge.",
      stars: [
        { id: "home", name: "Schedar", label: "Home", x: 20, y: 40, size: 3.5, color: "#ffcb8c" },
        { id: "about", name: "Caph", label: "About", x: 35, y: 20, size: 4, color: "#f8f7ff" },
        { id: "services", name: "Gamma Cas", label: "Services", x: 60, y: 30, size: 3, color: "#b9e9ff" },
        { id: "portfolio", name: "Ruchbah", label: "Portfolio", x: 45, y: 60, size: 3.5, color: "#e3ffeb" },
        { id: "contact", name: "Segin", label: "Contact", x: 75, y: 50, size: 3, color: "#c9f0ff" }
      ],
      connections: [
        ["home", "about"], ["about", "services"], ["services", "portfolio"], ["portfolio", "contact"]
      ],
      nebula: { x: 45, y: 40, size: 90, opacity: 0.2, color: "#5c9dff" }
    },
    services: {
      name: "Lyra",
      description: "The Cosmic Harp",
      lore: "Home to Vega, one of the brightest stars in the night sky, Lyra represents harmony and service.",
      stars: [
        { id: "home", name: "Vega", label: "Home", x: 50, y: 25, size: 5, color: "#f0ffff" },
        { id: "about", name: "Sheliak", label: "About", x: 30, y: 40, size: 3, color: "#c9dbff" },
        { id: "services", name: "Sulafat", label: "Services", x: 65, y: 45, size: 3.5, color: "#d1f6ff" },
        { id: "portfolio", name: "Epsilon Lyrae", label: "Portfolio", x: 45, y: 60, size: 3, color: "#cde8ff" },
        { id: "contact", name: "Zeta Lyrae", label: "Contact", x: 20, y: 70, size: 2.5, color: "#dbefff" }
      ],
      connections: [
        ["home", "about"], ["home", "services"], ["home", "portfolio"], 
        ["portfolio", "contact"], ["services", "portfolio"]
      ],
      nebula: { x: 40, y: 45, size: 100, opacity: 0.15, color: "#4287f5" }
    },
    portfolio: {
      name: "Andromeda",
      description: "The Princess of Projects",
      lore: "Named after the mythological princess, this constellation contains the nearest major galaxy to our Milky Way.",
      stars: [
        { id: "home", name: "Alpheratz", label: "Home", x: 25, y: 30, size: 4, color: "#f3f3ff" },
        { id: "about", name: "Mirach", label: "About", x: 15, y: 50, size: 3.5, color: "#ffcbaf" },
        { id: "services", name: "Almach", label: "Services", x: 40, y: 70, size: 3.5, color: "#ffbebe" },
        { id: "portfolio", name: "Delta And", label: "Portfolio", x: 60, y: 35, size: 4.5, color: "#ffffff" },
        { id: "contact", name: "Nu And", label: "Contact", x: 75, y: 60, size: 3, color: "#e0f0ff" }
      ],
      connections: [
        ["home", "about"], ["about", "services"], ["home", "portfolio"], 
        ["portfolio", "contact"], ["home", "services"]
      ],
      nebula: { x: 55, y: 50, size: 130, opacity: 0.2, color: "#a56bff" }
    },
    contact: {
      name: "Aquila",
      description: "The Messenger Eagle",
      lore: "Representing an eagle, the messenger of Zeus, this constellation connects you to distant realms.",
      stars: [
        { id: "home", name: "Altair", label: "Home", x: 50, y: 40, size: 4.5, color: "#ffffff" },
        { id: "about", name: "Tarazed", label: "About", x: 35, y: 25, size: 3, color: "#ffdcb8" },
        { id: "services", name: "Alshain", label: "Services", x: 65, y: 30, size: 3, color: "#eaffda" },
        { id: "portfolio", name: "Theta Aql", label: "Portfolio", x: 25, y: 60, size: 3, color: "#d4e6ff" },
        { id: "contact", name: "Delta Aql", label: "Contact", x: 80, y: 65, size: 4, color: "#c8fffc" }
      ],
      connections: [
        ["home", "about"], ["home", "services"], ["home", "portfolio"], 
        ["home", "contact"], ["portfolio", "contact"]
      ],
      nebula: { x: 50, y: 45, size: 110, opacity: 0.15, color: "#00ccff" }
    }
  };

  // Handle mouse position tracking for interactive mode
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setMousePosition({
          x: ((e.clientX - rect.left) / rect.width) * 100,
          y: ((e.clientY - rect.top) / rect.height) * 100
        });
      }
    };
    
    if (navMode === 'interactive') {
      window.addEventListener('mousemove', handleMouseMove);
    }
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [navMode]);

  // Main canvas drawing function
  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    
    // Clear canvas
    ctx.clearRect(0, 0, width, height);
    
    // Draw space background with depth
    drawSpaceBackground(ctx, width, height);
    
    // Get current constellation
    const constellation = celestialMap[activeConstellation];
    
    // Draw nebula if present
    if (constellation.nebula) {
      drawNebula(ctx, constellation.nebula, width, height);
    }
    
    // Draw distant stars in background
    drawBackgroundStars(ctx, width, height);
    
    // Draw connections between stars
    drawConnections(ctx, constellation.stars, constellation.connections, width, height);
    
    // Draw constellation stars
    drawConstellationStars(ctx, constellation.stars, width, height);
    
    // Draw interactive effects if in that mode
    if (navMode === 'interactive' && !isExploring) {
      drawInteractiveEffects(ctx, mousePosition, width, height);
    }
    
    // Draw cosmic dust
    drawCosmicDust(ctx, width, height);
    
  }, [activeConstellation, hoveringStar, navMode, mousePosition, isExploring, zoomLevel, showLabels]);

  // Drawing functions
  const drawSpaceBackground = (ctx, width, height) => {
    // Create a transparent background
    ctx.fillStyle = 'rgba(0, 0, 0, 0)';
    ctx.fillRect(0, 0, width, height);
    
    // Add subtle noise texture
    ctx.save();
    ctx.globalAlpha = 0.03;
    for (let i = 0; i < width * height * 0.0005; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height;
      const size = Math.random() * 1;
      
      ctx.fillStyle = `rgba(255, 255, 255, ${Math.random() * 0.2})`;
      ctx.fillRect(x, y, size, size);
    }
    ctx.restore();
  };
  
  const drawBackgroundStars = (ctx, width, height) => {
    // Draw distant background stars
    for (let i = 0; i < 150; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height;
      const size = Math.random() * 1.2;
      const opacity = Math.random() * 0.7 + 0.3;
      
      // Twinkle effect
      const twinkle = Math.sin(Date.now() * 0.001 + i) * 0.2 + 0.8;
      
      ctx.beginPath();
      ctx.arc(x, y, size * twinkle, 0, Math.PI * 2);
      
      // Vary star colors slightly
      const colorShift = Math.floor(Math.random() * 30);
      ctx.fillStyle = `rgba(${255-colorShift}, ${255-colorShift}, ${255}, ${opacity * twinkle})`;
      ctx.fill();
    }
  };
  
  const drawNebula = (ctx, nebula, width, height) => {
    const x = (nebula.x * width) / 100;
    const y = (nebula.y * height) / 100;
    const size = nebula.size * (width / 400);
    
    // Create a gradient for the nebula
    const gradient = ctx.createRadialGradient(
      x, y, 0,
      x, y, size
    );
    
    const color = nebula.color;
    gradient.addColorStop(0, `${color}30`);
    gradient.addColorStop(0.5, `${color}15`);
    gradient.addColorStop(1, `${color}00`);
    
    ctx.save();
    ctx.globalAlpha = nebula.opacity;
    ctx.beginPath();
    ctx.fillStyle = gradient;
    ctx.arc(x, y, size, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  };
  
  const drawConnections = (ctx, stars, connections, width, height) => {
    ctx.save();
    
    connections.forEach(([startId, endId]) => {
      const startStar = stars.find(s => s.id === startId);
      const endStar = stars.find(s => s.id === endId);
      
      if (startStar && endStar) {
        const startX = (startStar.x * width) / 100;
        const startY = (startStar.y * height) / 100;
        const endX = (endStar.x * width) / 100;
        const endY = (endStar.y * height) / 100;
        
        // Draw line with gradient
        const gradient = ctx.createLinearGradient(startX, startY, endX, endY);
        gradient.addColorStop(0, `rgba(120, 255, 240, 0.6)`);
        gradient.addColorStop(0.5, `rgba(100, 210, 255, 0.4)`);
        gradient.addColorStop(1, `rgba(120, 255, 240, 0.6)`);
        
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(endX, endY);
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 1.5;
        ctx.shadowColor = '#64ffda';
        ctx.shadowBlur = 8;
        ctx.stroke();
        
        // Draw static particles along the connection
        const particleCount = Math.floor(Math.hypot(endX - startX, endY - startY) / 15);
        for (let i = 0; i < particleCount; i++) {
          const ratio = Math.random();
          const x = startX + (endX - startX) * ratio;
          const y = startY + (endY - startY) * ratio;
          const size = Math.random() * 1.2;
          
          ctx.beginPath();
          ctx.arc(x, y, size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(150, 255, 240, ${Math.random() * 0.5 + 0.2})`;
          ctx.fill();
        }
      }
    });
    
    ctx.restore();
  };
  
  const drawConstellationStars = (ctx, stars, width, height) => {
    stars.forEach((star) => {
      const x = (star.x * width) / 100;
      const y = (star.y * height) / 100;
      const isHovered = hoveringStar === star.id;
      
      // Draw glow effect
      const glowSize = isHovered ? 25 : star.size * 3;
      const gradient = ctx.createRadialGradient(x, y, 0, x, y, glowSize);
      gradient.addColorStop(0, star.color || '#ffffff');
      gradient.addColorStop(0.5, `${star.color || '#ffffff'}40`);
      gradient.addColorStop(1, `${star.color || '#ffffff'}00`);
      
      ctx.beginPath();
      ctx.fillStyle = gradient;
      ctx.arc(x, y, glowSize, 0, Math.PI * 2);
      ctx.fill();
      
      // Draw star
      ctx.beginPath();
      ctx.arc(x, y, isHovered ? star.size * 1.5 : star.size, 0, Math.PI * 2);
      ctx.fillStyle = star.color || '#ffffff';
      ctx.shadowColor = star.color || '#ffffff';
      ctx.shadowBlur = isHovered ? 15 : 8;
      ctx.fill();
      
      // Draw label if enabled
      if (showLabels) {
        ctx.font = isHovered ? 'bold 14px Arial' : '12px Arial';
        ctx.fillStyle = isHovered ? '#64ffda' : '#ffffff';
        ctx.textAlign = 'center';
        ctx.shadowColor = '#000000';
        ctx.shadowBlur = 4;
        ctx.fillText(star.label, x, y + 20);
        
        // Draw star name on hover
        if (isHovered) {
          ctx.font = 'italic 11px Arial';
          ctx.fillStyle = '#a0e8ff';
          ctx.fillText(star.name, x, y + 35);
        }
      }
    });
  };
  
  const drawInteractiveEffects = (ctx, position, width, height) => {
    const x = (position.x * width) / 100;
    const y = (position.y * height) / 100;
    
    // Draw cursor effect
    ctx.beginPath();
    ctx.arc(x, y, 10, 0, Math.PI * 2);
    const cursorGradient = ctx.createRadialGradient(x, y, 0, x, y, 10);
    cursorGradient.addColorStop(0, 'rgba(100, 255, 218, 0.5)');
    cursorGradient.addColorStop(1, 'rgba(100, 255, 218, 0)');
    ctx.fillStyle = cursorGradient;
    ctx.fill();
    
    // Draw tracking particles
    for (let i = 0; i < 5; i++) {
      const particleX = x + (Math.random() - 0.5) * 30;
      const particleY = y + (Math.random() - 0.5) * 30;
      const size = Math.random() * 2;
      
      ctx.beginPath();
      ctx.arc(particleX, particleY, size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(100, 255, 218, ${Math.random() * 0.3})`;
      ctx.fill();
    }
  };

  const drawCosmicDust = (ctx, width, height) => {
    // Add static dust particles (no animation)
    ctx.save();
    for (let i = 0; i < 30; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height;
      const size = Math.random() * 1.5;
      
      ctx.beginPath();
      ctx.arc(x, y, size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${Math.random() * 0.1 + 0.05})`;
      ctx.fill();
    }
    ctx.restore();
  };

  // Handle canvas resize
  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current && containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        canvasRef.current.width = rect.width;
        canvasRef.current.height = rect.height;
      }
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Handle star interactions
  const handleStarHover = (starId) => {
    setHoveringStar(starId);
  };
  
  const handleStarClick = (starId) => {
    setActiveConstellation(starId);
    
    // Scroll to corresponding section
    const element = document.getElementById(starId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const currentConstellation = celestialMap[activeConstellation];
  
  return (
    <nav className="cosmic-nav">
      <div className="cosmic-nav-container">
        <div className="cosmic-nav-header">
          <div className="cosmic-nav-title">
            CosmicNav <span className="cosmic-nav-version">3D</span>
          </div>
          
          <div className="cosmic-nav-controls">
            <button 
              onClick={() => setNavMode(navMode === 'interactive' ? 'fixed' : 'interactive')}
              className="cosmic-nav-button"
            >
              {navMode === 'interactive' ? 'Fixed View' : 'Interactive'}
            </button>
            
            <button 
              onClick={() => setIsExploring(!isExploring)}
              className="cosmic-nav-button"
            >
              {isExploring ? 'Exit Explore' : 'Explore'}
            </button>
          </div>
        </div>
        
        <div 
          ref={containerRef}
          className="cosmic-nav-canvas-container"
        >
          <canvas 
            ref={canvasRef}
            className="cosmic-nav-canvas"
          />
          
          {currentConstellation.stars.map((star) => (
            <div
              key={star.id}
              className="cosmic-nav-star-hotspot"
              style={{ 
                left: `calc(${star.x}% - 16px)`, 
                top: `calc(${star.y}% - 16px)`,
                transform: hoveringStar === star.id ? 'scale(1.1)' : 'scale(1)'
              }}
              onMouseEnter={() => handleStarHover(star.id)}
              onMouseLeave={() => setHoveringStar(null)}
              onClick={() => handleStarClick(star.id)}
            />
          ))}
        </div>
        
        <div className="cosmic-nav-footer">
          <div className="cosmic-nav-constellation-info">
            <div className="cosmic-nav-constellation-name">
              {currentConstellation.name}
            </div>
            <div className="cosmic-nav-constellation-description">
              {currentConstellation.description}
            </div>
          </div>
          
          {hoveringStar && (
            <div className="cosmic-nav-tooltip">
              <div className="cosmic-nav-tooltip-title">
                {currentConstellation.stars.find(s => s.id === hoveringStar)?.label}
              </div>
              <div className="cosmic-nav-tooltip-subtitle">
                {currentConstellation.stars.find(s => s.id === hoveringStar)?.name}
              </div>
            </div>
          )}
          
          <div className="cosmic-nav-controls-bottom">
            <div className="cosmic-nav-indicators">
              {Object.keys(celestialMap).map((key) => (
                <div
                  key={key}
                  className={`cosmic-nav-indicator ${activeConstellation === key ? 'active' : ''}`}
                  onClick={() => handleStarClick(key)}
                />
              ))}
            </div>
            
            <div className="cosmic-nav-zoom-controls">
              <button 
                onClick={() => setZoomLevel(Math.max(0.5, zoomLevel - 0.1))}
                className="cosmic-nav-zoom-button"
              >
                -
              </button>
              <button 
                onClick={() => setShowLabels(!showLabels)}
                className="cosmic-nav-zoom-button"
              >
                {showLabels ? 'Hide Labels' : 'Show Labels'}
              </button>
              <button 
                onClick={() => setZoomLevel(Math.min(1.5, zoomLevel + 0.1))}
                className="cosmic-nav-zoom-button"
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .cosmic-nav {
          width: 100%;
          display: block;
          position: relative;
          z-index: 10;
          background: transparent;
        }
        
        .cosmic-nav-container {
          background-color: transparent;
          padding: 1rem;
          border-radius: 0.5rem;
          box-shadow: none;
          border: none;
          margin-bottom: 2rem;
          position: relative;
          overflow: visible;
        }
        
        .cosmic-nav-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
          background: rgba(15, 23, 42, 0.8);
          padding: 0.75rem 1rem;
          border-radius: 0.5rem;
          backdrop-filter: blur(4px);
        }
        
        .cosmic-nav-title {
          color: #67e8f9;
          font-size: 1.25rem;
          font-weight: bold;
          letter-spacing: 0.05em;
        }
        
        .cosmic-nav-version {
          font-size: 0.75rem;
          color: rgba(103, 232, 249, 0.7);
        }
        
        .cosmic-nav-controls {
          display: flex;
          gap: 0.75rem;
        }
        
        .cosmic-nav-button {
          padding: 0.25rem 0.75rem;
          font-size: 0.75rem;
          background-color: rgba(30, 58, 138, 0.5);
          color: #7dd3fc;
          border-radius: 0.25rem;
          border: 1px solid rgba(103, 232, 249, 0.3);
          cursor: pointer;
          transition: background-color 0.2s;
        }
        
        .cosmic-nav-button:hover {
          background-color: rgba(30, 64, 175, 0.5);
        }
        
        .cosmic-nav-canvas-container {
          position: relative;
          width: 100%;
          height: 16rem;
          border-radius: 0.5rem;
          overflow: hidden;
          background: transparent;
        }
        
        @media (min-width: 768px) {
          .cosmic-nav-canvas-container {
            height: 20rem;
          }
        }
        
        @media (min-width: 1024px) {
          .cosmic-nav-canvas-container {
            height: 24rem;
          }
        }
        
        .cosmic-nav-canvas {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: transparent;
        }
        
        .cosmic-nav-star-hotspot {
          position: absolute;
          width: 2rem;
          height: 2rem;
          cursor: pointer;
          z-index: 5;
          transition: transform 0.3s ease;
          border-radius: 50%;
        }
        
        .cosmic-nav-footer {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-top: 1rem;
          background: transparent;
          padding: 1rem;
          border-radius: 0.5rem;
          backdrop-filter: blur(4px);
        }
        
        .cosmic-nav-constellation-info {
          text-align: center;
          margin-bottom: 0.5rem;
        }
        
        .cosmic-nav-constellation-name {
          color: #67e8f9;
          font-weight: bold;
          font-size: 1rem;
        }

        .cosmic-nav-constellation-description {
          color: #7dd3fc;
          font-size: 0.875rem;
          opacity: 0.8;
        }

        .cosmic-nav-tooltip {
          position: absolute;
          background-color: rgba(15, 23, 42, 0.85);
          border: 1px solid rgba(103, 232, 249, 0.3);
          border-radius: 0.25rem;
          padding: 0.5rem 0.75rem;
          z-index: 10;
          pointer-events: none;
          transform: translateY(-100%);
          top: -0.5rem;
        }

        .cosmic-nav-tooltip-title {
          color: #67e8f9;
          font-weight: bold;
          font-size: 0.875rem;
        }

        .cosmic-nav-tooltip-subtitle {
          color: #7dd3fc;
          font-size: 0.75rem;
          opacity: 0.8;
        }

        .cosmic-nav-controls-bottom {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
          margin-top: 0.75rem;
        }

        .cosmic-nav-indicators {
          display: flex;
          gap: 0.5rem;
        }

        .cosmic-nav-indicator {
          width: 0.5rem;
          height: 0.5rem;
          border-radius: 50%;
          background-color: rgba(147, 197, 253, 0.3);
          cursor: pointer;
          transition: background-color 0.2s;
        }

        .cosmic-nav-indicator.active {
          background-color: #67e8f9;
        }

        .cosmic-nav-zoom-controls {
          display: flex;
          gap: 0.5rem;
        }

        .cosmic-nav-zoom-button {
          padding: 0.25rem 0.5rem;
          font-size: 0.75rem;
          background-color: rgba(30, 58, 138, 0.5);
          color: #7dd3fc;
          border-radius: 0.25rem;
          border: 1px solid rgba(103, 232, 249, 0.3);
          cursor: pointer;
          transition: background-color 0.2s;
        }

        .cosmic-nav-zoom-button:hover {
          background-color: rgba(30, 64, 175, 0.5);
        }
      `}</style>
    </nav>
  );
};

export default EnhancedCosmicNav;