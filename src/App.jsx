// src/App.jsx
import React, { lazy, Suspense } from "react";
import { PortfolioProvider } from "./context/PortfolioContext";
import Sidebar from "./components/Sidebar";
import Hero from "./components/Hero";
// import ParticleBackground from "./components/ParticleBackground"; // Add this import

const Work    = lazy(() => import("./components/Work"));
const About   = lazy(() => import("./components/About"));
const Contact = lazy(() => import("./components/Contact"));
const Footer  = lazy(() => import("./components/Footer"));

function SectionSkeleton() {
  return <div style={{ minHeight: "40vh" }} aria-hidden="true" />;
}

export default function App() {
  return (
    <PortfolioProvider>
      {/* Particle background - fixed behind everything */}
      {/* <ParticleBackground /> */}
      
      <Sidebar />
      <Hero />

      <main className="page">
        <Suspense fallback={<SectionSkeleton />}>
          <Work />
        </Suspense>
        <Suspense fallback={<SectionSkeleton />}>
          <About />
        </Suspense>
        <Suspense fallback={<SectionSkeleton />}>
          <Contact />
        </Suspense>
      </main>
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </PortfolioProvider>
  );
}