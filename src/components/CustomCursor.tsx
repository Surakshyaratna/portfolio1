import { useMousePosition } from "@/contexts/MouseContext";
import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const { mousePosition } = useMousePosition();
  const [isHovering, setIsHovering] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const requestRef = useRef<number | null>(null);

  useEffect(() => {
    const animate = () => {
      setCursorPos((prev) => ({
        x: prev.x + (mousePosition.x - prev.x) * 0.15,
        y: prev.y + (mousePosition.y - prev.y) * 0.15,
      }));
      requestRef.current = requestAnimationFrame(animate);
    };
    requestRef.current = requestAnimationFrame(animate);
    return () => { if (requestRef.current) cancelAnimationFrame(requestRef.current); };
  }, [mousePosition]);

  useEffect(() => {
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      setIsHovering(!!(target.tagName === "BUTTON" || target.tagName === "A" || target.closest("button") || target.closest("a") || target.classList.contains("cursor-interactive")));
    };
    document.addEventListener("mouseover", handleMouseOver);
    return () => document.removeEventListener("mouseover", handleMouseOver);
  }, []);

  return (
    <>
      <div className="fixed pointer-events-none z-[9999]" style={{ left: `${mousePosition.x}px`, top: `${mousePosition.y}px`, transform: "translate(-50%, -50%)" }}>
        <div className="w-1 h-1 rounded-full bg-primary" />
      </div>
      <div className="fixed pointer-events-none z-[9999] transition-all duration-150" style={{ left: `${cursorPos.x}px`, top: `${cursorPos.y}px`, transform: `translate(-50%, -50%) scale(${isHovering ? 1.5 : 1})` }}>
        <div className="w-8 h-8 rounded-full border-2 border-primary" />
      </div>
    </>
  );
}
