import "./App.css";
import { useState } from "react";
import Canvas from "./components/Canvas";
import Controls from "./components/Controls";

function App() {
  const [showCoordinate, setShowCoordinate] = useState(2);
  return (
    <div className="flex justify-center items-center w-screen h-screen bg-gradient-to-r from-indigo-800 to-pink-800">
      <Canvas isShowCoordinate={showCoordinate} />
      <Controls ShowCoordinate={{ setShowCoordinate, showCoordinate }} />
    </div>
  );
}

export default App;
