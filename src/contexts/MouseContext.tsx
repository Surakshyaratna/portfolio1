import { type ReactNode, createContext, useContext, useEffect, useState } from "react";

interface MousePosition { x: number; y: number; }
interface MouseContextType { mousePosition: MousePosition; }

const MouseContext = createContext<MouseContextType | undefined>(undefined);

export function MouseProvider({ children }: { children: ReactNode }) {
  const [mousePosition, setMousePosition] = useState<MousePosition>({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => setMousePosition({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return <MouseContext.Provider value={{ mousePosition }}>{children}</MouseContext.Provider>;
}

export function useMousePosition() {
  const context = useContext(MouseContext);
  if (!context) throw new Error("useMousePosition must be used within a MouseProvider");
  return context;
}