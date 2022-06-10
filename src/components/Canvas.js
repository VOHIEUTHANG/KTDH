import { clear } from "@testing-library/user-event/dist/clear";
import { useRef, useEffect, useState } from "react";
import draw_2D from "../core/draw_2D";
import drawCoordinate from "../core/draw_coordinate";

function Canvas({ isShowCoordinate }) {
  const [timeoutID, setTimeoutID] = useState(-1);
  const [degree, setDegree] = useState(0);
  const canvasRef = useRef();
  useEffect(() => {
    const { drawCoordinateSystem, rootPoint, FRAME_HEIGHT, FRAME_WIDTH, ctx } =
      drawCoordinate(canvasRef.current);
    drawCoordinateSystem(isShowCoordinate);
    draw_2D(
      ctx,
      rootPoint,
      FRAME_WIDTH,
      FRAME_HEIGHT,
      setTimeoutID,
      setDegree,
      degree
    );
    return () => {
      ctx.clearRect(0, 0, FRAME_WIDTH, FRAME_WIDTH);
      clearTimeout(timeoutID);
    };
  }, [isShowCoordinate, degree]);
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
