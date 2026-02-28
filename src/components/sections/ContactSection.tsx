import { useRef, useEffect } from "react";
import { Mail, Github, Linkedin } from "lucide-react";

export default function ContactSection() {
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

  const contactLinks = [
    { name: "Email", href: "mailto:surakshya.ratna@example.com", icon: <Mail className="h-5 w-5" />, label: "surakshya.ratna@example.com" },
    { name: "GitHub", href: "https://github.com/surakshyaratna", icon: <Github className="h-5 w-5" />, label: "github.com/surakshyaratna" },
    { name: "LinkedIn", href: "https://linkedin.com/in/surakshyaratna", icon: <Linkedin className="h-5 w-5" />, label: "linkedin.com/in/surakshyaratna" },
  ];

  return (
    <section id="contact" ref={sectionRef} className="relative py-24 md:py-32 bg-secondary/20">
      <div className="container mx-auto max-w-[1200px] px-6">
        <div className="max-w-2xl mx-auto">
          <h2 className="scroll-reveal text-3xl md:text-5xl font-semibold mb-6 text-center text-foreground">
            Get In <span className="gradient-text gradient-platinum gradient-shimmer">Touch</span>
          </h2>
          <p className="scroll-reveal text-base md:text-lg text-muted-foreground text-center mb-12" style={{ transitionDelay: "0.1s" }}>
            I'm always open to discussing new projects, creative ideas, or opportunities to collaborate.
          </p>
          <div className="scroll-reveal glass p-8 md:p-12 rounded-2xl shadow-glass" style={{ transitionDelay: "0.2s" }}>
            <div className="space-y-6">
              {contactLinks.map((link) => (
                <a key={link.name} href={link.href} target="_blank" rel="noopener noreferrer"
                  className="group flex items-center gap-4 p-4 glass-hover rounded-xl transition-all">
                  <div className="p-3 bg-foreground/10 group-hover:bg-foreground/15 rounded-lg text-foreground/70 transition-colors">
                    {link.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-1">{link.name}</div>
                    <div className="text-base text-foreground group-hover:text-foreground/80 transition-colors truncate">{link.label}</div>
                  </div>
                  <svg className="h-5 w-5 text-muted-foreground group-hover:text-foreground group-hover:translate-x-1 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}