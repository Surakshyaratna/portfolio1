import { useRef, useEffect } from "react";
import { ExternalLink, Github } from "lucide-react";

export default function ProjectsSection() {
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
    <section id="projects" ref={sectionRef} className="relative py-24 md:py-32 bg-secondary/20">
      <div className="container mx-auto max-w-[1200px] px-6">
        <h2 className="scroll-reveal text-3xl md:text-5xl font-semibold mb-12 text-center text-foreground">
          Featured <span className="gradient-text gradient-chrome">Projects</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {/* Project 1 */}
          <div className="scroll-reveal glass hover-lift p-8 md:p-10 rounded-2xl shadow-glass" style={{ transitionDelay: "0.1s" }}>
            <div className="space-y-6">
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div>
                  <h3 className="text-xl md:text-2xl font-semibold mb-2 text-foreground">
                    Pneumonia <span className="gradient-text gradient-steel">Detection</span> Web Application
                  </h3>
                  <p className="text-sm text-muted-foreground">AI-Integrated Medical Diagnostic Tool</p>
                </div>
                <div className="flex gap-3">
                  <a href="https://github.com" target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-3 py-2 glass-hover rounded-lg text-sm font-medium hover:text-foreground transition-colors">
                    <Github className="h-4 w-4" />
                  </a>
                  <a href="https://github.com" target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-3 py-2 bg-foreground/10 hover:bg-foreground/20 rounded-lg text-sm font-medium text-foreground/70 transition-colors">
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </div>
              </div>
              <div className="h-px bg-border/50" />
              <p className="text-sm md:text-base text-foreground/90 leading-relaxed">
                A deep learning-powered web application that detects pneumonia from chest X-ray images using CNN. Demonstrates practical AI application in healthcare with accurate diagnostic assistance.
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Full-stack architecture using Node.js and Express, with a clean medical-themed responsive interface processing medical imaging data in real-time.
              </p>
              <div className="h-px bg-border/50" />
              <div>
                <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Technologies Used</h4>
                <div className="flex flex-wrap gap-2">
                  {["Python", "TensorFlow", "CNN", "Node.js", "Express", "React", "HTML5", "CSS3", "JavaScript"].map((tech) => (
                    <span key={tech} className="px-3 py-1.5 glass-hover rounded-full text-xs font-medium border border-border/50">{tech}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Project 2 */}
          <div className="scroll-reveal glass hover-lift p-8 md:p-10 rounded-2xl shadow-glass" style={{ transitionDelay: "0.2s" }}>
            <div className="space-y-6">
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div>
                  <h3 className="text-xl md:text-2xl font-semibold mb-2 text-foreground">
                    Bardali <span className="gradient-text gradient-chrome">Creations</span>
                  </h3>
                  <p className="text-sm text-muted-foreground">IT Company & Digital Marketing Agency Website</p>
                </div>
                <a href="https://bardali.com.np/" target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3 py-2 bg-foreground/10 hover:bg-foreground/20 rounded-lg text-sm font-medium text-foreground/70 transition-colors">
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>
              <div className="h-px bg-border/50" />
              <p className="text-sm md:text-base text-foreground/90 leading-relaxed">
                Professional business website for Bardali Creations, an IT company and digital marketing agency based in Itahari, showcasing services, portfolio, and digital marketing solutions.
              </p>
              <div className="h-px bg-border/50" />
              <div>
                <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Technologies Used</h4>
                <div className="flex flex-wrap gap-2">
                  {["HTML5", "CSS3", "JavaScript", "Responsive Design", "SEO Optimization"].map((tech) => (
                    <span key={tech} className="px-3 py-1.5 glass-hover rounded-full text-xs font-medium border border-border/50">{tech}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}