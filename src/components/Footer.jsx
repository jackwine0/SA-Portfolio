import React, { useMemo } from "react";
import { OWNER } from "../data/portfolio";
import "./Footer.css";

const SOCIAL_LINKS = [
  { label: "GitHub",   url: OWNER.github   },
  { label: "LinkedIn", url: OWNER.linkedin },
];

const Footer = () => {
  const year = useMemo(() => new Date().getFullYear(), []);

  return (
    <footer className="footer">
      <div className="container footer__inner">
        <p className="footer__copy">© {year} {OWNER.name}</p>

        <div className="footer__links">
          {SOCIAL_LINKS.map((link) => (
            <a key={link.label} href={link.url} target="_blank" rel="noopener noreferrer">
              {link.label}
            </a>
          ))}
          <a href={`mailto:${OWNER.email}`}>Email</a>
        </div>

        <button
          className="footer__top"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Back to top"
        >
          Back to top ↑
        </button>
      </div>
    </footer>
  );
};

export default React.memo(Footer);
