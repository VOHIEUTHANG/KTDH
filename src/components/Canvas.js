import { useRef, useEffect } from "react";
import drawCoordinate from "../core/draw_coordinate";
function Canvas() {
  const canvasRef = useRef();
  useEffect(() => {
    drawCoordinate(canvasRef.current);
  }, []);
  return (
    <canvas
      id="canvas"
      ref={canvasRef}
      className="bg-white rounded-xl overflow-hidden"
      width="1200px"
      height="800px"
    />
  );
}
export default Canvas;
