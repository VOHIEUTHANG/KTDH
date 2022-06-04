import { useRef, useEffect } from "react";
import drawCoordinate from "../core/draw_coordinate";
function Canvas() {
  const canvasRef = useRef();
  useEffect(() => {
    drawCoordinate(canvasRef.current);
  }, []);
  return (
    <canvas
      ref={canvasRef}
      className="w-[1200px] h-[800px] bg-white rounded-xl overflow-hidden"
    />
  );
}
export default Canvas;
