import { Heart } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="relative border-t border-border/40 py-12">
      <div className="container mx-auto max-w-[1200px] px-6">
        <div className="flex flex-col items-center justify-center gap-4 text-center">
          <span className="text-lg font-bold text-foreground/60 tracking-tighter" style={{ fontFamily: "Orbitron, sans-serif" }}>SR.</span>
          <div className="h-px w-24 bg-border/50" />
          <p className="text-sm text-muted-foreground flex items-center gap-2 flex-wrap justify-center">
            © {currentYear}. Built with <Heart className="h-3.5 w-3.5 text-primary fill-primary/50 inline" /> by Surakshya Ratna
          </p>
        </div>
      </div>
    </footer>
  );
}