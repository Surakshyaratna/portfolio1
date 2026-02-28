import { Button } from "@/components/ui/button";
import { useTheme } from "@/contexts/ThemeContext";
import { Menu, Moon, Sun, X } from "lucide-react";
import { useEffect, useState } from "react";
import logoWhite from "@/assets/logo-white.png";
import logoBlack from "@/assets/logo-black.png";

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  const navItems = [
    { name: "Home", href: "#hero" },
    { name: "About", href: "#about" },
    { name: "Projects", href: "#projects" },
    { name: "Skills", href: "#skills" },
    { name: "Contact", href: "#contact" },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 px-6 py-4">
        <nav
          className={`
            max-w-[1200px] mx-auto flex justify-between items-center
            backdrop-blur-md bg-white/5 dark:bg-black/5
            border border-white/10
            px-6 py-3 rounded-2xl
            transition-all duration-300
            ${isScrolled ? "shadow-md dark:shadow-lg shadow-black/10 dark:shadow-black/30" : ""}
          `}
        >
          <button
            type="button"
            onClick={() => scrollToSection("#hero")}
            className="flex items-center transition-opacity hover:opacity-80 bg-transparent border-0 p-0 focus:outline-none"
            aria-label="Go to home section"
          >
            <img
              src={theme === "dark" ? logoWhite : logoBlack}
              alt="Surakshya Ratna Logo"
              className="h-8 md:h-9 lg:h-10 w-auto object-contain transition-all duration-300"
            />
          </button>

          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(item.href);
                }}
                className="text-sm font-medium uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors"
              >
                {item.name}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="text-foreground hover:bg-white/10 dark:hover:bg-white/10 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>

            <button
              type="button"
              onClick={() => scrollToSection("#contact")}
              className="hidden md:inline-flex items-center px-5 py-2 rounded-full text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              style={{
                fontFamily: "Space Grotesk, sans-serif",
                background: theme === "dark" ? "#ffffff" : "#111111",
                color: theme === "dark" ? "#000000" : "#ffffff",
              }}
            >
              Hire Me
            </button>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden text-foreground hover:bg-white/10 transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </nav>
      </header>

      {isMobileMenuOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/80 backdrop-blur-xl md:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
            onKeyDown={(e) => {
              if (e.key === "Escape") setIsMobileMenuOpen(false);
            }}
            aria-hidden="true"
          />

          <div className="fixed top-[76px] left-0 right-0 z-50 md:hidden px-6">
            <div className="max-w-[1200px] mx-auto">
              <div
                className={`
                  p-6 rounded-2xl
                  backdrop-blur-lg bg-white/5 dark:bg-black/5
                  border border-white/10
                  shadow-xl shadow-black/20 dark:shadow-black/40
                `}
              >
                <div className="flex flex-col gap-2">
                  {navItems.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      onClick={(e) => {
                        e.preventDefault();
                        scrollToSection(item.href);
                      }}
                      className="text-sm font-medium uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors py-3 px-4 rounded-lg hover:bg-foreground/5"
                    >
                      {item.name}
                    </a>
                  ))}

                  <div className="mt-2 pt-4 border-t border-border/30">
                    <button
                      type="button"
                      onClick={() => scrollToSection("#contact")}
                      className="flex items-center justify-center px-5 py-2.5 rounded-full text-sm font-medium transition-all w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      style={{
                        background: theme === "dark" ? "#ffffff" : "#111111",
                        color: theme === "dark" ? "#000000" : "#ffffff",
                      }}
                    >
                      Hire Me
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}