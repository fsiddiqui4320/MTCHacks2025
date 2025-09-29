import { useEffect, useState } from "react";
import MainTitle from "../MainTitle";
import mtchackslogo from "../assets/mtchackslogo.png";
import { useViewport } from "../hooks/useViewport";
import { ChevronDown } from "lucide-react";

export default function ScreenOne() {
  const { width, height } = useViewport();
  const [showArrow, setShowArrow] = useState(true);
  const centerX = width / 2 - width / 8;
  const centerY = height / 2 - width / 16;

  useEffect(() => {
    const handleScroll = () => {
      const scrollContainer = document.querySelector(".snap-container");
      if (scrollContainer && scrollContainer.scrollTop > 0) {
        setShowArrow(false);
      }
    };

    const scrollContainer = document.querySelector(".snap-container");
    if (scrollContainer) {
      scrollContainer.addEventListener("scroll", handleScroll, {
        passive: true,
      });
      handleScroll(); // Initial check
    }

    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  return (
    <section className="screen">
      <MainTitle
        src={mtchackslogo}
        x={centerX}
        y={centerY}
        alt="mtc hacks logo"
        width={width / 4}
      />
      {showArrow && (
        <div className="scroll-indicator">
          <ChevronDown size={32} />
        </div>
      )}
    </section>
  );
}
