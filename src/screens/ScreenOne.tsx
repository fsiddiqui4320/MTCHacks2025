import { useEffect, useState } from "react";
import MainTitle from "../MainTitle";
import mtchackslogo from "../assets/mtchackslogo.png";
import { useViewport } from "../hooks/useViewport";
import { ChevronDown } from "lucide-react";

export default function ScreenOne() {
  const { width } = useViewport();
  const [showArrow, setShowArrow] = useState(true);
  const isMobile = width <= 768;
  const logoWidth = isMobile ? width / 2 : width / 4;

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
    <section id="page1" className="screen">
      <div className="main-title-wrapper">
        <MainTitle src={mtchackslogo} alt="mtc hacks logo" width={logoWidth} />
      </div>
      {showArrow && (
        <div className="scroll-indicator">
          <ChevronDown size={32} />
        </div>
      )}
    </section>
  );
}
