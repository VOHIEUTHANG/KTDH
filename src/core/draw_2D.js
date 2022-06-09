import { isOptionGroup } from "@mui/base";
import {
  drawTrapezoid,
  drawTriangle,
  drawCircle,
  drawPropeller,
  drawFourPropeller,
} from "./draw_functions";

export default function draw_2D(
  ctx,
  rootPoint,
  width,
  height,
  setTimeoutID,
  setDegree,
  degree
) {
  const leftUpperPoint = { x: -70, y: 6 };
  const leftBottomPoint = { x: -76, y: -70 };
  const smallWidth = 40;
  const triangleHeight = 20;
  const trianglePoint = {
    p1: leftUpperPoint,
    p2: { x: leftUpperPoint.x + smallWidth, y: leftUpperPoint.y },
    p3: {
      x: leftUpperPoint.x + smallWidth / 2,
      y: leftUpperPoint.y + triangleHeight,
    },
  };
  const centerCircle = {
    x: trianglePoint.p3.x,
    y: trianglePoint.p3.y - triangleHeight / 2 - 2,
  };

  drawTrapezoid(ctx, rootPoint, leftUpperPoint, leftBottomPoint, smallWidth);
  drawTriangle(
    ctx,
    rootPoint,
    trianglePoint.p1,
    trianglePoint.p2,
    trianglePoint.p3
  );

  drawFourPropeller(
    ctx,
    rootPoint,
    centerCircle,
    60,
    50,
    10,
    [100, 100, 100],
    [200, 160, 0],
    degree
  );

  const TimeoutID = setTimeout(() => {
    setTimeoutID(TimeoutID);
    clearTimeout(TimeoutID);
    setDegree((prevDeg) => {
      console.log(prevDeg);
      if (prevDeg >= 360) {
        return 0;
      }
      return (prevDeg += 2);
    });
  }, 10);
}
