import React, { useLayoutEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Lenis from "@studio-freight/lenis";
import Faq from "../faqs/faq.jsx";
import Sponsors from "../Sponsors/sponsors.jsx";
import Roadmap from "../timeline/Roadmap.jsx";
import Navbar from "../navbar/navbar1.jsx"
import Footer from "../footer/footer.jsx";
import Glimpses from "../glimpses/glimpses.jsx";
import About from "../about/about.jsx";
import Location from "../location/location.jsx";

function Homepage() {
  const lenis = new Lenis({
    duration: 2,
  });

  lenis.on("scroll", (e) => {
    console.log(e);
  });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);

  useLayoutEffect(() => {
    AOS.init();
  }, []);
  return (
    <>
      <Navbar />
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
