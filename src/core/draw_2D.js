import {
  drawTrapezoid,
  drawRectangle,
  drawTriangle,
  drawFourPropeller,
  drawDoorOfWindmill,
  drawLake,
  drawWidthObjectCoor,
  drawGrass,
  drawFence,
} from "./draw_functions";

const drawWindmill = (
  ctx,
  rootPoint,
  width,
  height,
  setTimeoutID,
  setDegree,
  degree
) => {
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

  drawRectangle(
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
    [230, 250, 200],
    degree
  );

  // const TimeoutID = setTimeout(() => {
  //   setTimeoutID(TimeoutID);
  //   clearTimeout(TimeoutID);
  //   setDegree((prevDeg) => {
  //     if (prevDeg >= 360) {
  //       return 0;
  //     }
  //     return (prevDeg += 2);
  //   });
  // }, 1);
};
const drawHouse = (ctx, rootPoint, symmetricalLine) => {
  const leftUpperPoint = { x: 40, y: 74 };
  const leftBottomPoint = { x: 30, y: 50 };
  const roofWidth = 40;
  const houseHeight = 14;
  const doorWidth = 10;
  const doorHeight = houseHeight / 2 + 2;
  const bottomCenterPoint = {
    x: 40 + Math.round(roofWidth / 2),
    y: 50 - houseHeight,
  };
  // draw roof
  const roofCoorList = drawTrapezoid(
    ctx,
    rootPoint,
    leftUpperPoint,
    leftBottomPoint,
    roofWidth,
    [245, 214, 76],
    [140, 140, 140]
  );
  // draw wall ==========>
  const wallCoorList = drawRectangle(
    ctx,
    rootPoint,
    { x: 36, y: 50 },
    roofWidth + 8,
    houseHeight,
    [140, 140, 140],
    [200, 200, 200]
  );
  // draw door ==========>
  const doorCoorList = drawRectangle(
    ctx,
    rootPoint,
    {
      x: bottomCenterPoint.x - doorWidth / 2,
      y: bottomCenterPoint.y + doorHeight,
    },
    doorWidth,
    doorHeight,
    [140, 140, 140],
    [242, 242, 90]
  );

  // draw pillar ============>
  const pillarLeftCoorList = drawRectangle(
    ctx,
    rootPoint,
    {
      x: bottomCenterPoint.x - roofWidth / 2 + 1,
      y: bottomCenterPoint.y,
    },
    5,
    12,
    [140, 140, 140],
    [66, 43, 95]
  );

  const pillarRightCoorList = drawRectangle(
    ctx,
    rootPoint,
    {
      x: bottomCenterPoint.x + roofWidth / 2 - 6,
      y: bottomCenterPoint.y,
    },
    5,
    12,
    [140, 140, 140],
    [66, 43, 95]
  );

  const houseCoorList = [
    ...roofCoorList,
    ...wallCoorList,
    ...doorCoorList,
    ...pillarLeftCoorList,
    ...pillarRightCoorList,
  ];

  const houseShadowCoorList = houseCoorList.map((coor) => ({
    ...coor,
    y: 2 * symmetricalLine - coor.y,
  }));

  drawWidthObjectCoor(ctx, rootPoint, houseShadowCoorList, [0, 0, 0]);
};
const drawFences = (ctx, rootPoint, maxX, y, width, height, ...rest) => {
  for (let i = -maxX + 4; i <= maxX - 4; i += 14) {
    drawFence(ctx, rootPoint, { x: i, y }, width, height, ...rest);
  }
  drawGrass(
    ctx,
    rootPoint,
    -maxX,
    maxX,
    y + Math.round(height / 2) - 2,
    y + Math.round(height / 2) + 2,
    [...rest[1], [1]]
  );
};
const drawSky = (...props) => {
  drawGrass(...props);
};
export default function draw_2D(
  ctx,
  rootPoint,
  width,
  height,
  setTimeoutID,
  setDegree,
  degree
) {
  const boundary_y = 40;
  drawGrass(ctx, rootPoint, -120, 120, -80, boundary_y, [70, 255, 50, 0.4]);
  drawFences(
    ctx,
    rootPoint,
    Math.round(width / 10),
    boundary_y,
    4,
    16,
    [150, 150, 150],
    [176, 150, 58]
  );
  drawSky(ctx, rootPoint, -120, 120, boundary_y, 80, [129, 228, 230, 0.3]);
  drawHouse(ctx, rootPoint, 20);
  drawLake(
    ctx,
    rootPoint,
    { x: 14, y: 20 },
    92,
    60,
    [150, 150, 150],
    [118, 211, 232]
  );
  drawWindmill(ctx, rootPoint, width, height, setTimeoutID, setDegree, degree);
}
