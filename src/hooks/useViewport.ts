import { useEffect, useRef, useState } from "react";

export type ViewportSize = {
  width: number;
  height: number;
};

function readViewport(): ViewportSize {
  if (typeof window === "undefined") return { width: 0, height: 0 };
  const vv = window.visualViewport;
  if (vv) {
    return { width: Math.round(vv.width), height: Math.round(vv.height) };
  }
  return { width: window.innerWidth, height: window.innerHeight };
}

export function useViewport(): ViewportSize {
  const [size, setSize] = useState<ViewportSize>(() => readViewport());
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    const apply = () => {
      if (rafId.current != null) cancelAnimationFrame(rafId.current);
      rafId.current = requestAnimationFrame(() => setSize(readViewport()));
    };

    const onResize = () => apply();
    const onOrientation = () => apply();

    window.addEventListener("resize", onResize, { passive: true });
    window.addEventListener("orientationchange", onOrientation, {
      passive: true,
    });

    if (window.visualViewport) {
      window.visualViewport.addEventListener("resize", onResize, {
        passive: true,
      });
    }

    return () => {
      if (rafId.current != null) cancelAnimationFrame(rafId.current);
      window.removeEventListener("resize", onResize as EventListener);
      window.removeEventListener(
        "orientationchange",
        onOrientation as EventListener
      );
      if (window.visualViewport) {
        window.visualViewport.removeEventListener(
          "resize",
          onResize as EventListener
        );
      }
    };
  }, []);

  return size;
}
