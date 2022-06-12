import "./App.css";
import { useState } from "react";
import Canvas from "./components/Canvas";
import Controls from "./components/Controls";

function App() {
  const [showCoordinate, setShowCoordinate] = useState(3);
  const [draw2D, setDraw2D] = useState(true);
  const [dimension, setDimension] = useState({ long: 0, wide: 0, high: 0 });
  const [windmill, setWindmill] = useState({ x1: 0, y1: 0, x2: 0, y2: 0 });
  const [house, setHouse] = useState({ x1: 0, y1: 0, x2: 0, y2: 0 });
  const [cloud, setCloud] = useState({ x1: 0, y1: 0, x2: 0, y2: 0 });
  console.log("dimension", dimension);
  return (
    <div className="flex justify-center items-center w-screen h-screen bg-gradient-to-r from-indigo-800 to-pink-800">
      <Canvas
        isShowCoordinate={showCoordinate}
        draw2D={draw2D}
        setWindmill={setWindmill}
        setHouse={setHouse}
        setCloud={setCloud}
        dimension={dimension}
      />
      <Controls
        ShowCoordinate={{ setShowCoordinate, showCoordinate }}
        setDraw2D={setDraw2D}
        draw2D={draw2D}
        windmill={windmill}
        house={house}
        cloud={cloud}
        setDimension={setDimension}
      />
    </div>
  );
}

export default App;
