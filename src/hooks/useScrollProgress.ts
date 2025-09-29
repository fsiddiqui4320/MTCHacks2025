import { useEffect, useState, type RefObject } from "react";

export function useScrollProgress(containerRef: RefObject<HTMLElement>) {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollTop = container.scrollTop;
      const viewportHeight = container.clientHeight;
      // Calculate progress through first screen (0 = top, 1 = fully scrolled past first screen)
      const progress = Math.min(1, Math.max(0, scrollTop / viewportHeight));
      setScrollProgress(progress);
    };

    container.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial calculation

    return () => {
      container.removeEventListener("scroll", handleScroll);
    };
  }, [containerRef]);

  return scrollProgress;
}
