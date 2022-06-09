import {
  drawTrapezoid,
  drawTriangle,
  drawFourPropeller,
  drawPillarBase,
  drawDoorOfWindmill,
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
  const largeWidth = smallWidth + (leftUpperPoint.x - leftBottomPoint.x) * 2;
  const pillarBaseHeight = 10;
  const pillarBaseWidth = largeWidth + 8;
  const triangleHeight = 20;
  const doorWidth = 26;
  const doorHeight = 26;
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

  const pillarBaseTopUpperPoint = {
    x: leftBottomPoint.x - (pillarBaseWidth - largeWidth) / 2,
    y: leftBottomPoint.y + pillarBaseHeight,
  };

  drawTrapezoid(ctx, rootPoint, leftUpperPoint, leftBottomPoint, smallWidth);
  drawTriangle(
    ctx,
    rootPoint,
    trianglePoint.p1,
    trianglePoint.p2,
    trianglePoint.p3
  );
  drawPillarBase(
    ctx,
    rootPoint,
    pillarBaseTopUpperPoint,
    pillarBaseWidth,
    pillarBaseHeight,
    [90, 90, 90],
    [150, 100, 15]
  );

  drawDoorOfWindmill(
    ctx,
    rootPoint,
    {
      x: pillarBaseTopUpperPoint.x + Math.round(pillarBaseWidth / 2),
      y: pillarBaseTopUpperPoint.y,
    },
    doorWidth,
    doorHeight,
    [90, 90, 90],
    [250, 250, 0]
  );

  drawFourPropeller(
    ctx,
    rootPoint,
    centerCircle,
    60,
    50,
    10,
    [100, 100, 100],
    [200, 230, 200],
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
  }, 1);
}
