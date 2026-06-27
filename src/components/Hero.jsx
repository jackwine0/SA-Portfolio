// src/components/Hero.jsx
import React, { useEffect, useState } from "react";
import { OWNER } from "../data/portfolio";
import "./Hero.css";

const Hero = () => {
  const [visible, setVisible] = useState(false);
  
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="hero" aria-label="Introduction">
      <div className={`container hero__inner${visible ? " is-visible" : ""}`}>
        <p className="eyebrow hero__eyebrow">
          {OWNER.title} · {OWNER.location}
        </p>

        

        <h1 className="hero__headline">
          I build interfaces<br />
          that get out of<br />
          your way.
        </h1>
        
        

        <div className="hero__row">
          <p className="hero__sub">
            Frontend developer working mainly in React — focused on
            speed, clarity, and details most people won&rsquo;t notice
            but will feel.
          </p>
          

          <a href="#work" className="hero__cta">
            <span>View work</span>
            <span className="hero__cta-arrow" aria-hidden="true">→</span>
          </a>
        </div>
      </div>


    </section>
  );
};

export default React.memo(Hero);