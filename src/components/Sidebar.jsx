import React, { useEffect, useRef } from "react";
import { usePortfolio } from "../context/PortfolioContext";
import { ExternalLink } from "./ui/ExternalLink";
import { NAV_LINKS, OWNER } from "../data/portfolio";
import "./Sidebar.css";

const NavLinks = React.memo(function NavLinks({ onClick }) {
  return (
    <>
      {NAV_LINKS.map((item) => (
        <a key={item.href} href={item.href} className="sidebar__link" onClick={onClick}>
          {item.label}
        </a>
      ))}
    </>
  );
});

const Sidebar = () => {
  const { menuOpen, closeMenu, toggleMenu } = usePortfolio();
  const menuOpenRef = useRef(menuOpen);

  useEffect(() => { menuOpenRef.current = menuOpen; }, [menuOpen]);

  // Close on Escape, from anywhere in the document.
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape" && menuOpenRef.current) closeMenu();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [closeMenu]);

  // Lock background scroll while the mobile panel is open.
  useEffect(() => {
    if (!menuOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previousOverflow; };
  }, [menuOpen]);

  return (
    <>
      {/* ─── Desktop: always-visible fixed left sidebar ─── */}
      <aside className="sidebar" aria-label="Primary">
        <a href="#" className="sidebar__mark" aria-label="Home">
          SA
        </a>

        <nav className="sidebar__nav" aria-label="Main navigation">
          <NavLinks />
        </nav>

        <div className="sidebar__foot">
          <ExternalLink href={OWNER.resumeUrl} download="Samuel_Akande_CV.pdf" className="sidebar__resume">
            Résumé
          </ExternalLink>
          <ExternalLink href={OWNER.github} className="sidebar__social">GitHub ↗</ExternalLink>
        </div>
      </aside>

      {/* ─── Mobile: top bar + slide-down panel ─── */}
      <header className="mobile-bar">
        <a href="#" className="mobile-bar__mark" aria-label="Home">SA</a>
        <button
          className={`mobile-bar__toggle${menuOpen ? " is-open" : ""}`}
          onClick={toggleMenu}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          aria-controls="mobile-panel"
        >
          <span /><span />
        </button>
      </header>

      <div
        id="mobile-panel"
        className={`mobile-panel${menuOpen ? " is-open" : ""}`}
        aria-hidden={!menuOpen}
      >
        <nav aria-label="Mobile navigation">
          <NavLinks onClick={closeMenu} />
        </nav>
        <div className="mobile-panel__foot">
          <ExternalLink href={OWNER.resumeUrl} download="Samuel_Akande_CV.pdf" className="mobile-panel__resume">
            Download résumé
          </ExternalLink>
          <ExternalLink href={OWNER.github} className="mobile-panel__social">GitHub ↗</ExternalLink>
        </div>
      </div>
    </>
  );
};

export default React.memo(Sidebar);
