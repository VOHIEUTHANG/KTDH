import { useRef, useEffect } from "react";
import drawCoordinate from "../core/draw_coordinate";
function Canvas({ isShowCoordinate }) {
  const canvasRef = useRef();
  useEffect(() => {
    const props = drawCoordinate(canvasRef.current);
    props.drawCoordinateSystem(isShowCoordinate);
    return () => {
      props.ctx.clearRect(0, 0, props.FRAME_WIDTH, props.FRAME_WIDTH);
    };
  }, [isShowCoordinate]);
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
