import {
  drawTrapezoid,
  drawRectangle,
  drawCloud,
  drawTriangle,
  drawFourPropeller,
  drawDoorOfWindmill,
  drawLake,
  drawWidthObjectCoor,
  drawGrass,
  drawFence,
  putPixel,
  CC_fromHumanToComputer,
} from "./draw_functions";

const drawWindmill = (
  ctx,
  rootPoint,
  width,
  height,
  setTimeoutID,
  setDegree,
  degree,
  setLocationCloud1,
  setLocationCloud2,
  setLocationCloud3,
  setWindmill,
  setCloud
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

  const topUpperPointOfPropeller = drawFourPropeller(
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

  const [x1, y1] = CC_fromHumanToComputer(
    rootPoint,
    centerCircle.x,
    centerCircle.y
  );

  const [x2, y2] = CC_fromHumanToComputer(
    rootPoint,
    topUpperPointOfPropeller[0],
    topUpperPointOfPropeller[1]
  );

  // ============================================================================================>
  putPixel(ctx, x1, y1, "red", 4);
  putPixel(ctx, x2, y2, "red", 4);
  // ============================================================================================>

  // Cloud handler

  let cloud1Value = localStorage.getItem("cloud1") ?? 1;
  let cloud2Value = localStorage.getItem("cloud2") ?? 1;
  let cloud3Value = localStorage.getItem("cloud3") ?? 1;

  const maxValue = 100;
  const minValue = -100;

  const setLocationCloud = (prev, cloudValue, type) => {
    if (prev > maxValue || prev < minValue) {
      type == 1 && localStorage.setItem("cloud1", Number(cloudValue) * -1);
      type == 2 && localStorage.setItem("cloud2", Number(cloudValue) * -1);
      type == 3 && localStorage.setItem("cloud3", Number(cloudValue) * -1);
      cloudValue = Number(cloudValue) * -1;
    }
    return prev + Number(cloudValue);
  };

  // ANIMATION ===============>

  const TimeoutID = setTimeout(() => {
    setTimeoutID(TimeoutID);
    clearTimeout(TimeoutID);
    setDegree((prevDeg) => {
      if (prevDeg >= 360) {
        return 0;
      }
      return (prevDeg += 4);
    });

    setLocationCloud1((prev) => setLocationCloud(prev, cloud1Value, 1));
    setLocationCloud2((prev) => setLocationCloud(prev, cloud2Value, 2));
    setLocationCloud3((prev) => setLocationCloud(prev, cloud3Value, 3));
    setWindmill((prev) => {
      return {
        ...prev,
        x1: centerCircle.x,
        y1: centerCircle.y,
        x2: topUpperPointOfPropeller[0],
        y2: topUpperPointOfPropeller[1],
      };
    });
  }, 1);
};
const drawHouse = (ctx, rootPoint, symmetricalLine, setHouse) => {
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

  setHouse((prev) => {
    return {
      ...prev,
      x1: leftBottomPoint.x,
      y1: leftBottomPoint.y,
      x2: bottomCenterPoint.x,
      y2: bottomCenterPoint.y,
    };
  });

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

  setHouse((prev) => {
    return {
      ...prev,
      x1: leftBottomPoint.x,
      y1: leftBottomPoint.y,
      x2: bottomCenterPoint.x,
      y2: bottomCenterPoint.y,
    };
  });

  const [x1, y1] = CC_fromHumanToComputer(
    rootPoint,
    leftBottomPoint.x,
    leftBottomPoint.y
  );
  const [x2, y2] = CC_fromHumanToComputer(
    rootPoint,
    bottomCenterPoint.x,
    bottomCenterPoint.y
  );

  // =======================================================================================>
  // putPixel(ctx, x2, y2, "red", 4);
  // putPixel(ctx, x1, y1, "red", 4);
  // =======================================================================================>

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
  degree,
  setLocationCloud1,
  setLocationCloud2,
  setLocationCloud3,
  locationCloud1,
  locationCloud2,
  locationCloud3,
  setWindmill,
  setHouse,
  setCloud
) {
  const boundary_y = 40;
  drawSky(ctx, rootPoint, -120, 120, boundary_y, 80, [200, 228, 250, 0.8]);

  drawCloud(ctx, rootPoint, 12, 4, [255, 255, 251], {
    x: locationCloud3,
    y: 70,
  });

  drawCloud(ctx, rootPoint, 18, 8, [255, 255, 251], {
    x: locationCloud1,
    y: 60,
  });
  drawCloud(ctx, rootPoint, 14, 6, [255, 255, 251], {
    x: locationCloud2,
    y: 67,
  });

  setCloud((prev) => {
    return { ...prev, x1: locationCloud1, y1: 60, x2: locationCloud2, y2: 67 };
  });

  const [x1, y1] = CC_fromHumanToComputer(rootPoint, locationCloud1, 60);
  const [x2, y2] = CC_fromHumanToComputer(rootPoint, locationCloud2, 67);

  // RED POINT AT HERE ==============>
  // putPixel(ctx, x1, y1, "red", 4);
  // putPixel(ctx, x2, y2, "red", 4);

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

  // RED POINT AT HERE ==============>
  drawHouse(ctx, rootPoint, 20, setHouse);

  drawLake(
    ctx,
    rootPoint,
    { x: 14, y: 20 },
    92,
    60,
    [150, 150, 150],
    [118, 211, 232]
  );

  // RED POINT AT HERE ==============>

  drawWindmill(
    ctx,
    rootPoint,
    width,
    height,
    setTimeoutID,
    setDegree,
    degree,
    setLocationCloud1,
    setLocationCloud2,
    setLocationCloud3,
    setWindmill,
    setCloud
  );
}
