import { Suspense } from "react";
import CustomCursor from "./components/CustomCursor";
import Footer from "./components/Footer";
import Navigation from "./components/Navigation";
import ParticleBackground from "./components/ParticleBackground";
import AboutSection from "./components/sections/AboutSection";
import ContactSection from "./components/sections/ContactSection";
import HeroSection from "./components/sections/HeroSection";
import ProjectsSection from "./components/sections/ProjectsSection";
import SkillsSection from "./components/sections/SkillsSection";
import { MouseProvider } from "./contexts/MouseContext";
import { ThemeProvider } from "./contexts/ThemeContext";

export default function App() {
  return (
    <ThemeProvider>
      <MouseProvider>
        <div className="relative min-h-screen overflow-x-hidden">
          <ParticleBackground />
          <Navigation />

          <main className="relative z-10">
            <Suspense fallback={<div className="h-screen" />}>
              <HeroSection />
            </Suspense>
            <Suspense fallback={<div className="min-h-screen" />}>
              <AboutSection />
            </Suspense>
            <Suspense fallback={<div className="min-h-screen" />}>
              <ProjectsSection />
            </Suspense>
            <Suspense fallback={<div className="min-h-screen" />}>
              <SkillsSection />
            </Suspense>
            <Suspense fallback={<div className="min-h-screen" />}>
              <ContactSection />
            </Suspense>
          </main>

          <Footer />
          <CustomCursor />
        </div>
      </MouseProvider>
    </ThemeProvider>
  );
}