import "./App.css";
import GrainyGradientBackground from "./GrainyGradientBackground";
import MainTitle from "./MainTitle";
import mtchackslogo from "./assets/mtchackslogo.png";

function App() {
  return (
    <>
      <div>
        <GrainyGradientBackground />
        <MainTitle
          src={mtchackslogo}
          x={window.innerWidth / 2 - window.innerWidth / 8}
          y={window.innerHeight / 2 - window.innerWidth / 16}
          alt="mtc hacks logo"
          width={window.innerWidth / 4}
        />
      </div>
    </>
  );
}

export default App;
