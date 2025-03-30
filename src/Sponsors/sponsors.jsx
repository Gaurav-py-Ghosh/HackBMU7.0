import React, { useEffect, useState } from "react";

const Sponsors = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const calculateTransform = (baseOffset) => {
    return Math.sin(scrollY * 0.002 + baseOffset) * 10;
  };

  const sponsors = [
    {
      name: "Google Cloud",
      tier: "Platinum Sponsor",
      logo: "/api/placeholder/200/100",
      description: "Providing cloud computing resources and AI/ML credits",
    },
    {
      name: "Microsoft",
      tier: "Gold Sponsor",
      logo: "/api/placeholder/200/100",
      description: "Supporting innovation with Azure development tools",
    },
    {
      name: "GitHub",
      tier: "Silver Sponsor",
      logo: "/api/placeholder/200/100",
      description: "Offering developer collaboration platforms",
    },
  ];

  return (
    <div className="relative bg-gray-900 text-white py-16 px-6 md:px-12 lg:px-24">
      <div className="absolute inset-0 bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 opacity-25 blur-3xl"></div>
      <div className="relative z-10 text-center">
        <h2 className="text-4xl font-extrabold tracking-wide mb-10 text-white">Our Sponsors</h2>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
        {sponsors.map((sponsor, index) => (
          <div
            key={index}
            className="bg-gray-800 p-6 rounded-2xl shadow-lg transform transition-all duration-500 hover:scale-105"
            style={{ transform: `translateY(${calculateTransform(index * 0.5)}px)` }}
          >
            <img
              src={sponsor.logo}
              alt={sponsor.name}
              className="mx-auto mb-4 w-32 h-16 object-contain"
            />
            <h3 className="text-xl font-semibold text-white mb-2">{sponsor.name}</h3>
            <p className="text-sm text-green-400 font-medium mb-2">{sponsor.tier}</p>
            <p className="text-gray-300">{sponsor.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sponsors;
