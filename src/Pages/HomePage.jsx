import React, { useLayoutEffect, useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Lenis from "@studio-freight/lenis";
import Faq from "../faqs/faq.jsx";
import Sponsors from "../Sponsors/sponsors.jsx";
import Roadmap from "../timeline/Roadmap.jsx";
import Navbar from "../navbar/navbar1.jsx";
import Footer from "../footer/footer.jsx";
import Glimpses from "../glimpses/glimpses.jsx";
import About from "../about/about.jsx";
import Location from "../location/location.jsx";
import "./HomePage.css";

function Homepage() {
  const lenis = new Lenis({ duration: 2 });

  // lenis.on("scroll", (e) => {
  //   console.log(e);
  // });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);

  useLayoutEffect(() => {
    AOS.init();
  }, []);

  const [belowNavVisible, setBelowNavVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      setBelowNavVisible(currentScrollPos < 10);  // Adjust 200 as needed
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <Navbar />
      <div className={`below-nav-content ${belowNavVisible ? "visible" : "hidden"}`}>
        <button className="nav-register">Register Now</button>
        <span className="nav-time">48:00:00</span>
      </div>
      <About />
      <Glimpses />
      <Sponsors />
      <Roadmap />
      <Location />
      <Faq />
      <Footer />
    </>
  );
}

export default Homepage;
