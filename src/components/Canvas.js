import { useRef, useEffect } from "react";
import draw_2D from "../core/draw_2D";
import drawCoordinate from "../core/draw_coordinate";
function Canvas({ isShowCoordinate }) {
  const canvasRef = useRef();
  useEffect(() => {
    const { drawCoordinateSystem, rootPoint, FRAME_HEIGHT, FRAME_WIDTH, ctx } =
      drawCoordinate(canvasRef.current);
    drawCoordinateSystem(isShowCoordinate);
    draw_2D(ctx, rootPoint, FRAME_HEIGHT, FRAME_WIDTH);

    const p = ctx.getImageData(0, 0, 1, 1).data;

    return () => {
      ctx.clearRect(0, 0, FRAME_WIDTH, FRAME_WIDTH);
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
