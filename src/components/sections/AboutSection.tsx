import { useRef, useEffect } from "react";

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => { entries.forEach((entry) => { if (entry.isIntersecting) entry.target.classList.add("revealed"); }); },
      { threshold: 0.1 }
    );
    const elements = sectionRef.current?.querySelectorAll(".scroll-reveal");
    elements?.forEach((el) => { observer.observe(el); });
    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="relative py-24 md:py-32">
      <div className="container mx-auto max-w-[1200px] px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="scroll-reveal text-3xl md:text-5xl font-semibold mb-12 text-center text-foreground">
            About <span className="gradient-text gradient-platinum">Me</span>
          </h2>
          <div className="scroll-reveal glass hover-lift p-8 md:p-12 rounded-2xl shadow-glass" style={{ transitionDelay: "0.1s" }}>
            <p className="text-lg md:text-xl text-foreground/90 leading-relaxed mb-6">
              Surakshya Ratna is a Frontend Developer focused on building clean, responsive, and scalable web applications.
            </p>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-6">
              She emphasizes semantic structure, modular architecture, and elegant user interfaces. Her work demonstrates a commitment to writing maintainable code that balances technical excellence with user experience.
            </p>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
              She integrates AI-powered systems into real-world applications, bridging the gap between cutting-edge technology and practical, user-centered design.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}