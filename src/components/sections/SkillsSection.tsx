import { useRef, useEffect } from "react";
import { Code2, Server, Sparkles } from "lucide-react";

function SkillCard({ title, skills, icon, delay }: { title: string; skills: string[]; icon: React.ReactNode; delay: string; }) {
  return (
    <div className="scroll-reveal glass hover-lift p-6 md:p-8 rounded-xl shadow-glass" style={{ transitionDelay: delay }}>
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-foreground/10 rounded-lg text-foreground/70">{icon}</div>
        <h3 className="text-xl font-semibold text-foreground">{title}</h3>
      </div>
      <ul className="space-y-3">
        {skills.map((skill) => (
          <li key={skill} className="flex items-center gap-3 text-muted-foreground">
            <span className="h-1.5 w-1.5 bg-foreground/40 rounded-full" />
            <span>{skill}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function SkillsSection() {
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

  const skillCategories = [
    { title: "Frontend", skills: ["HTML5", "CSS3", "JavaScript", "React"], icon: <Code2 className="h-6 w-6" /> },
    { title: "Backend", skills: ["Node.js", "Express"], icon: <Server className="h-6 w-6" /> },
    { title: "Core Strengths", skills: ["Responsive Design", "Clean Code", "Modular Architecture", "AI Integration"], icon: <Sparkles className="h-6 w-6" /> },
  ];

  return (
    <section id="skills" ref={sectionRef} className="relative py-24 md:py-32">
      <div className="container mx-auto max-w-[1200px] px-6">
        <h2 className="scroll-reveal text-3xl md:text-5xl font-semibold mb-12 text-center text-foreground">
          Technical <span className="gradient-text gradient-silver">Skills</span>
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category, index) => (
            <SkillCard key={category.title} title={category.title} skills={category.skills} icon={category.icon} delay={`${index * 0.1}s`} />
          ))}
        </div>
      </div>
    </section>
  );
}