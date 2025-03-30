import React, { useState, useRef, useEffect } from "react";
import "./navbar1.css";

const Navbar = () => {
  const [activeItem, setActiveItem] = useState(null);
  const navRef = useRef(null);

  const navItems = [
    { id: "home", label: "Home", x: 20, y: 30 },
    { id: "about", label: "About", x: 60, y: 20 },
    { id: "services", label: "Services", x: 80, y: 50 },
    { id: "portfolio", label: "Portfolio", x: 40, y: 70 },
    { id: "contact", label: "Contact", x: 30, y: 50 },
  ];

  useEffect(() => {
    const canvas = document.getElementById("constellation-canvas");
    if (canvas) {
      const ctx = canvas.getContext("2d");
      const rect = navRef.current.getBoundingClientRect();

      canvas.width = rect.width;
      canvas.height = rect.height;

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw connecting lines
      if (activeItem) {
        const activeNode = navItems.find((item) => item.id === activeItem);

        navItems.forEach((item) => {
          const startX = (activeNode.x * canvas.width) / 100;
          const startY = (activeNode.y * canvas.height) / 100;
          const endX = (item.x * canvas.width) / 100;
          const endY = (item.y * canvas.height) / 100;

          ctx.beginPath();
          ctx.moveTo(startX, startY);
          ctx.lineTo(endX, endY);
          ctx.strokeStyle = "rgba(255, 255, 255, 0.2)";
          ctx.stroke();
        });
      }

      // Draw stars
      navItems.forEach((item) => {
        const x = (item.x * canvas.width) / 100;
        const y = (item.y * canvas.height) / 100;

        ctx.beginPath();
        ctx.arc(x, y, 2, 0, Math.PI * 2);
        ctx.fillStyle =
          item.id === activeItem ? "#ffffff" : "rgba(255, 255, 255, 0.7)";
        ctx.fill();
      });
    }
  }, [activeItem]);

  const handleResize = () => {
    const canvas = document.getElementById("constellation-canvas");
    const rect = navRef.current.getBoundingClientRect();

    canvas.width = rect.width;
    canvas.height = rect.height;
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <nav className="constellation-navbar" ref={navRef}>
      <canvas id="constellation-canvas"></canvas>
      <div className="navbar-content">
        <div className="navbar-brand">HackBMU</div>
      </div>
      {navItems.map((item) => (
        <div
          key={item.id}
          className={`nav-star ${activeItem === item.id ? "active" : ""}`}
          style={{ left: `${item.x}%`, top: `${item.y}%` }}
          onMouseEnter={() => setActiveItem(item.id)}
          onMouseLeave={() => setActiveItem(null)}
        >
          <div className="star-dot"></div>
          <div className="star-label">{item.label}</div>
        </div>
      ))}
    </nav>
  );
};

export default Navbar;
