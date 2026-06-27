import React, { useCallback, useRef, useState } from "react";
import { PROJECTS } from "../data/portfolio";
import "./Work.css";

// ─── Floating thumbnail that follows the cursor ───────────
const HoverPreview = React.memo(function HoverPreview({ project, x, y, visible }) {
  if (!project) return null;
  return (
    <div
      className={`work__preview${visible ? " is-visible" : ""}`}
      style={{ transform: `translate3d(${x}px, ${y}px, 0) scale(var(--preview-scale))` }}
      aria-hidden="true"
    >
      <img src={project.image} alt={`${project.title} preview`} loading="lazy" />
    </div>
  );
});

// Offsets so the preview sits just above-right of the cursor
const OFFSET_X = 24;
const OFFSET_Y = -190;
const PREVIEW_W = 280;
const PREVIEW_H = 180;
const SIDEBAR_BREAKPOINT = 860;

function clampToViewport(x, y) {
  const minX = window.innerWidth > SIDEBAR_BREAKPOINT ? 236 : 16;
  const maxX = window.innerWidth - PREVIEW_W - 16;
  const maxY = window.innerHeight - PREVIEW_H - 16;
  return {
    x: Math.min(Math.max(x, minX), maxX),
    y: Math.min(Math.max(y, 16), maxY),
  };
}

// ─── One project row ───────────────────────────────────────
const ProjectRow = React.memo(function ProjectRow({ project, onHover, onLeave }) {
  const handleMove = useCallback(
    (e) => {
      const { x, y } = clampToViewport(e.clientX + OFFSET_X, e.clientY + OFFSET_Y);
      onHover(project, x, y);
    },
    [project, onHover]
  );

  const handleFocus = useCallback(
    (e) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const { x, y } = clampToViewport(rect.left + OFFSET_X, rect.top + OFFSET_Y);
      onHover(project, x, y);
    },
    [project, onHover]
  );

  // Check if project has a live link
  const hasLiveLink = project.liveLink && project.liveLink !== "#";
  const hasCodeLink = project.codeLink && project.codeLink !== "#";

  return (
    <div className="work__row-wrapper">
      <a
        href={hasLiveLink ? project.liveLink : undefined}
        target={hasLiveLink ? "_blank" : undefined}
        rel={hasLiveLink ? "noopener noreferrer" : undefined}
        className="work__row"
        onMouseMove={handleMove}
        onMouseEnter={handleMove}
        onMouseLeave={onLeave}
        onFocus={handleFocus}
        onBlur={onLeave}
        aria-label={`${project.title} — ${hasLiveLink ? 'view live site' : 'project details'}`}
        style={{ cursor: hasLiveLink ? 'pointer' : 'default' }}
      >
        <span className="work__index">{project.index}</span>
        <span className="work__title">{project.title}</span>
        <span className="work__tech">
          {project.tech.map((t) => (
            <span key={t} className="work__tech-tag">{t}</span>
          ))}
        </span>
        <span className="work__year">{project.year}</span>
        <span className="work__arrow" aria-hidden="true">
          {hasLiveLink ? "↗" : "→"}
        </span>
      </a>
      
      {/* GitHub link - shown as a separate button */}
      {hasCodeLink && (
        <a
          href={project.codeLink}
          target="_blank"
          rel="noopener noreferrer"
          className="work__github-link"
          aria-label={`${project.title} source code on GitHub`}
        >
          <svg viewBox="0 0 16 16" width="20" height="20" fill="currentColor">
            <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/>
          </svg>
          <span className="work__github-label">Code</span>
        </a>
      )}
    </div>
  );
});

// ─── Section ────────────────────────────────────────────────
const Work = () => {
  const [hovered, setHovered] = useState(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [visibleProjects, setVisibleProjects] = useState(6); // Show 6 initially
  const rafRef = useRef(null);

  const handleHover = useCallback((project, x, y) => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      setHovered(project);
      setCoords({ x, y });
    });
  }, []);

  const handleLeave = useCallback(() => setHovered(null), []);

  const handleViewMore = useCallback(() => {
    setVisibleProjects(prev => prev + 6);
  }, []);

  const visibleProjectsList = PROJECTS.slice(0, visibleProjects);
  const hasMoreProjects = visibleProjects < PROJECTS.length;

  return (
    <section id="work" className="work" aria-labelledby="work-heading">
      <div className="container">
        <div className="work__header">
          <h2 id="work-heading" className="work__heading">Selected work</h2>
          <p className="eyebrow">{String(PROJECTS.length).padStart(2, "0")} projects</p>
        </div>

        <div className="hairline" />

        <div className="work__list" role="list">
          {visibleProjectsList.map((project) => (
            <ProjectRow
              key={project.id}
              project={project}
              onHover={handleHover}
              onLeave={handleLeave}
            />
          ))}
        </div>

        {/* View More button */}
        {hasMoreProjects && (
          <div className="work__view-more">
            <button 
              onClick={handleViewMore}
              className="work__view-more-btn"
              aria-label="Load more projects"
            >
              View More Projects
              <span className="work__view-more-count">
                (+{PROJECTS.length - visibleProjects} remaining)
              </span>
            </button>
          </div>
        )}
      </div>

      <HoverPreview project={hovered} x={coords.x} y={coords.y} visible={Boolean(hovered)} />
    </section>
  );
};

export default Work;