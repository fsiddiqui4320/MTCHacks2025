import "./App.css";
import GrainyGradientBackground from "./components/GrainyGradientBackground";
import Navbar from "./components/Navbar";
import ScreenOne from "./screens/ScreenOne";
import ScreenTwo from "./screens/ScreenTwo";
import ScreenThree from "./screens/ScreenThree";
import ScreenFour from "./screens/ScreenFour";
import ScreenFive from "./screens/ScreenFive";
import ScreenSix from "./screens/ScreenSix";
import { useViewport } from "./hooks/useViewport";
import { Analytics } from "@vercel/analytics/react";
function App() {
  // read viewport to trigger rerenders on size changes
  useViewport();
  return (
    <>
      <Analytics />
      <Navbar />
      <GrainyGradientBackground />
      <div className="snap-container">
        <ScreenOne />
        <ScreenTwo />
        <ScreenThree />
        <ScreenFour />
        <ScreenFive />
        <ScreenSix />
      </div>
      <div className="follow-links">
        <a
          href="https://www.instagram.com/mtcuiuc/"
          target="_blank"
          rel="noopener noreferrer"
          className="follow-link"
        >
          follow us
        </a>
        <a
          href="https://github.com/yaseenhalabi/MTCHacks2025"
          target="_blank"
          rel="noopener noreferrer"
          className="follow-link"
        >
          github
        </a>
      </div>
    </>
  );
}

export default App;
