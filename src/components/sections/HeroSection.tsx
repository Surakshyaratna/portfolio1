import React from "react";

const scrollToSection = (href: string) => {
  const element = document.querySelector(href);
  element?.scrollIntoView({ behavior: "smooth" });
};

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 pt-20"
    >
      {/* Role */}
      <p
        className="text-xs sm:text-sm uppercase tracking-widest mb-4 opacity-50 text-foreground"
        style={{ fontFamily: "JetBrains Mono, monospace" }}
      >
        Frontend Developer
      </p>

      {/* Name */}
      <h1
        className={`
    font-bold text-5xl sm:text-6xl md:text-7xl lg:text-8xl 
    leading-tight mb-6 
    text-black dark:text-transparent 
    dark:bg-clip-text dark:gradient-chrome
  `}
        style={{ fontFamily: "Orbitron, sans-serif" }}
      >
        Surakshya
        <br />
        Ratna
      </h1>

      {/* Strong Minimal Statement */}
      <p
        className="text-sm sm:text-base md:text-lg opacity-60 max-w-xl text-foreground mb-10"
        style={{ fontFamily: "Space Grotesk, sans-serif" }}
      >
        Engineering immersive, high-performance digital experiences with precision and modern design.
      </p>

      {/* CTA */}
      <div className="flex gap-4 flex-wrap justify-center">
        <button
          type="button"
          onClick={() => scrollToSection("#projects")}
          className="px-6 py-3 rounded-full text-sm font-medium transition-all bg-foreground text-background hover:opacity-80"
          style={{ fontFamily: "Space Grotesk, sans-serif" }}
        >
          View Work
        </button>

        <button
          type="button"
          onClick={() => scrollToSection("#contact")}
          className="px-6 py-3 rounded-full text-sm font-medium transition-all bg-foreground text-background hover:opacity-80"
          style={{ fontFamily: "Space Grotesk, sans-serif" }}
        >
          Contact
        </button>
      </div>

    </section>
  );
}