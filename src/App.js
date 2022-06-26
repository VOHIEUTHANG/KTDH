import "./App.css";
import { useState, useEffect } from "react";
import Canvas from "./components/Canvas";
import Controls from "./components/Controls";
import NotSupported from "./components/NotSupported";

function App() {
  const [isDisplay, setIsDisplay] = useState(false);
  const [showCoordinate, setShowCoordinate] = useState(3);
  const [draw2D, setDraw2D] = useState(true);
  const [rectangular, setRectangular] = useState({
    long: 0,
    wide: 0,
    high: 0,
    x: 0,
    y: 0,
    z: 0,
  });
  const [cylinder, setCylinder] = useState({ long: 0, wide: 0 });
  const [windmill, setWindmill] = useState({ x1: 0, y1: 0, x2: 0, y2: 0 });
  const [house, setHouse] = useState({ x1: 0, y1: 0, x2: 0, y2: 0 });
  const [cloud, setCloud] = useState({ x1: 0, y1: 0, x2: 0, y2: 0 });
  const [typeDraw, setTypeDraw] = useState(1);

  useEffect(() => {
    setIsDisplay(window?.innerWidth >= 1800);
  });

  return (
    <div className="flex justify-center items-center w-screen h-screen bg-gradient-to-r from-indigo-800 to-pink-800">
      {!isDisplay && <NotSupported />}
      {isDisplay && (
        <Canvas
          isShowCoordinate={showCoordinate}
          draw2D={draw2D}
          setWindmill={setWindmill}
          setHouse={setHouse}
          setCloud={setCloud}
          rectangular={rectangular}
          cylinder={cylinder}
          typeDraw={typeDraw}
        />
      )}
      {isDisplay && (
        <Controls
          ShowCoordinate={{ setShowCoordinate, showCoordinate }}
          setDraw2D={setDraw2D}
          draw2D={draw2D}
          windmill={windmill}
          house={house}
          cloud={cloud}
          setRectangular={setRectangular}
          setCylinder={setCylinder}
          setTypeDraw={setTypeDraw}
          typeDraw={typeDraw}
        />
      )}
    </div>
  );
}

export default App;
