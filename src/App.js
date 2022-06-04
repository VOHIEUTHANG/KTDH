import "./App.css";
import Canvas from "./components/Canvas";
import Controls from "./components/Controls";

function App() {
  return (
    <div className="flex justify-center items-center w-screen h-screen bg-gradient-to-r from-indigo-800 to-pink-800">
      <Canvas />
      <Controls />
    </div>
  );
}

export default App;
