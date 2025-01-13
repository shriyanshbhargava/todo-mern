import React from "react";
import { Element } from "react-scroll";
import Hero from "../Hero";
import Features from "../Features";
import HowItWorks from "../HowItWorks";
import Testimonials from "../Testimonials";
import FAQ from "../FAQ";

function HomePage() {
  return (
    <div className="text-black">
      <Element name="hero">
        <Hero />
      </Element>
      <Element name="features">
        <Features />
      </Element>
      <Element name="how-it-works">
        <HowItWorks />
      </Element>
      <Element name="testimonials">
        <Testimonials />
      </Element>
      <Element name="faq">
        <FAQ />
      </Element>
    </div>
  );
}

export default HomePage;
