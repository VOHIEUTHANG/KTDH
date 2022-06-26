import { useRef, useEffect, useState } from "react";
import draw_2D from "../core/draw_2D";
import draw_3D from "../core/draw_3D";
import drawCoordinate from "../core/draw_2D_coordinate";

function Canvas({
  isShowCoordinate,
  draw2D,
  setWindmill,
  setHouse,
  setCloud,
  typeDraw,
  rectangular,
  cylinder,
  setHouseCoorList,
  setCloudCoorList,
  setWindmillCoorList,
}) {
  const [timeoutID, setTimeoutID] = useState(-1);
  const [degree, setDegree] = useState(0);

  const [locationCloud1, setLocationCloud1] = useState(-90);
  const [locationCloud2, setLocationCloud2] = useState(-20);
  const [locationCloud3, setLocationCloud3] = useState(90);
  const [ratio, setRatio] = useState(0.2);
  const [flowerDirection, setFlowerDirection] = useState("ZoomIn");

  const canvasRef = useRef();
  useEffect(() => {
    const { drawCoordinateSystem, rootPoint, FRAME_HEIGHT, FRAME_WIDTH, ctx } =
      drawCoordinate(canvasRef.current);

    if (draw2D) {
      drawCoordinateSystem(isShowCoordinate);
      draw_2D(
        ctx,
        rootPoint,
        FRAME_WIDTH,
        FRAME_HEIGHT,
        setTimeoutID,
        setDegree,
        degree,
        setLocationCloud1,
        setLocationCloud2,
        setLocationCloud3,
        locationCloud1,
        locationCloud2,
        locationCloud3,
        setWindmill,
        setHouse,
        setCloud,
        ratio,
        setRatio,
        flowerDirection,
        setFlowerDirection,
        setHouseCoorList,
        setCloudCoorList,
        setWindmillCoorList
      );
    }

    if (!draw2D) {
      draw_3D(
        ctx,
        rootPoint,
        FRAME_WIDTH,
        FRAME_HEIGHT,
        typeDraw,
        rectangular,
        cylinder
      );
    }

    return () => {
      ctx.clearRect(0, 0, FRAME_WIDTH, FRAME_WIDTH);
      draw2D && clearTimeout(timeoutID);
    };
  }, [isShowCoordinate, degree, draw2D, rectangular, cylinder, typeDraw]);

  return (
    <canvas
      id="canvas"
      ref={canvasRef}
      className="bg-white rounded-xl overflow-hidden"
      width="1200px"
      height={"800px"}
    />
  );
}
export default Canvas;
