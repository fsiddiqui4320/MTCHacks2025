import "./App.css";
import GrainyGradientBackground from "./GrainyGradientBackground";
import ScreenOne from "./screens/ScreenOne";
import ScreenTwo from "./screens/ScreenTwo";
import ScreenThree from "./screens/ScreenThree";
import { useViewport } from "./hooks/useViewport";

function App() {
  // read viewport to trigger rerenders on size changes
  useViewport();
  return (
    <>
      <GrainyGradientBackground />
      <div className="snap-container">
        <ScreenOne />
        <ScreenTwo />
        <ScreenThree />
      </div>
    </>
  );
}

export default App;
