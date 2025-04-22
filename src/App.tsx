import "./App.css";
import CatAnimation from "./components/CatAnimation";
import Controls from "./components/Controls";
import SoundToggle from "./components/SoundToggle";
import Timer from "./components/Timer";

function App() {
  return (
    <>
      <Timer />
      <SoundToggle />
      <Controls />
      <CatAnimation />
    </>
  );
}

export default App;
