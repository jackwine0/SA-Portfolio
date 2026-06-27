import React from "react";
import { STATS, CURRENT_SKILLS, LEARNING_SKILLS, OWNER } from "../data/portfolio";
import "./About.css";

const SkillTag = React.memo(function SkillTag({ name }) {
  return <span className="about__tag">{name}</span>;
});

const About = () => {
  return (
    <section id="about" className="about" aria-labelledby="about-heading">
      <div className="container">
        <div className="hairline" />

        <div className="about__grid">
          <div className="about__copy">
            <p className="eyebrow">About</p>
            <h2 id="about-heading" className="about__heading">
              Based in Lagos, working with teams anywhere.
            </h2>
            <p className="about__paragraph">
              I&rsquo;m {OWNER.firstName} — a frontend developer with three years
              of freelance work behind me, mostly in React. I care about the
              parts of an interface people don&rsquo;t consciously notice: load
              times, focus states, the half-second before something responds.
            </p>
            <p className="about__paragraph">
              I&rsquo;m currently extending into backend work — Node, Express,
              MongoDB — so I can take a product from idea to deploy without
              handing off the pieces in between.
            </p>
          </div>

          <div className="about__stats">
            {STATS.map((stat) => (
              <div key={stat.label} className="about__stat">
                <span className="about__stat-value">{stat.value}</span>
                <span className="about__stat-label">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="about__skills">
          <div className="about__skills-group">
            <p className="eyebrow">Working with</p>
            <div className="about__tags">
              {CURRENT_SKILLS.map((s) => <SkillTag key={s.id} name={s.name} />)}
            </div>
          </div>
          <div className="about__skills-group">
            <p className="eyebrow">Learning now</p>
            <div className="about__tags">
              {LEARNING_SKILLS.map((s) => <SkillTag key={s.id} name={s.name} />)}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default React.memo(About);
