import {
  matrixMultiply,
  createRotateMatrix,
  createTranslationMatrix,
} from "./matrix_calculator";
const drawLine = (ctx, x1, y1, x2, y2, color = "black") => {
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.strokeStyle = color;
  ctx.stroke();
};
const putPixel = (ctx, x, y, color = "blue", area = 3) => {
  ctx.beginPath();
  ctx.moveTo(x, y + area);
  ctx.lineTo(x + area, y);
  ctx.lineTo(x, y - area);
  ctx.lineTo(x - area, y);
  ctx.fillStyle = color;
  ctx.fill();
};
const drawRect = (ctx, x, y, width, height, color = "black") => {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, width, height);
};
const getCoorListWidthBresenham = (x1, y1, x2, y2) => {
  const coorList = [];
  const Dx = Math.abs(x2 - x1);
  const Dy = Math.abs(y2 - y1);
  let x = x1;
  let y = y1;

  let p_case2 = 2 * Dx - Dy;
  const c1_case2 = 2 * Dx;
  const c2_case2 = 2 * (Dx - Dy);
  let p_case1 = 2 * Dy - Dx;
  const c1_case1 = 2 * Dy;
  const c2_case1 = 2 * (Dy - Dx);

  coorList.push({ x, y });

  const sx = x1 < x2 ? 1 : -1;
  const sy = y1 < y2 ? 1 : -1;

  if (Dy <= Dx) {
    while (x != x2) {
      if (p_case1 < 0) p_case1 += c1_case1;
      else {
        p_case1 += c2_case1;
        y += sy;
      }
      x += sx;
      coorList.push({ x, y });
    }
  } else {
    while (y != y2) {
      if (p_case2 < 0) p_case2 += c1_case2;
      else {
        p_case2 += c2_case2;
        x += sx;
      }
      y += sy;
      coorList.push({ x, y });
    }
  }
  return coorList;
};
const getRotateCoorList = (initialCoorList, deg, translationPoint) => {
  return initialCoorList.map((coor) => {
    const coorItem = matrixMultiply(
      [[coor.x, coor.y, 1]],
      matrixMultiply(
        createRotateMatrix(deg),
        createTranslationMatrix(translationPoint.x, translationPoint.y)
      )
    );
    coorItem[0].pop();
    return coorItem[0].map((coor) => Math.round(coor));
  });
};
const getRotateCoor = (coor, deg) => {
  const coorItem = matrixMultiply(
    [[coor.x, coor.y, 1]],
    createRotateMatrix(deg)
  );
  coorItem[0].pop();
  return coorItem[0].map((coor) => Math.round(coor));
};
// CC mean convert coordinate
const CC_fromComputerToHuman = (rootPoint, x, y) => {
  return [Math.round((x - rootPoint.x) / 5), Math.floor((rootPoint.y - y) / 5)];
};
const CC_fromHumanToComputer = (rootPoint, x, y) => {
  return [rootPoint.x + x * 5, rootPoint.y - y * 5];
};
const drawWidthObjectCoor = (
  ctx,
  rootPoint,
  coorList,
  color = [120, 120, 120]
) => {
  coorList.forEach((coor) => {
    const [x, y] = CC_fromHumanToComputer(rootPoint, coor.x, coor.y);
    putPixel(ctx, x, y, `rgb(${color[0]},${color[1]},${color[2]})`, 3);
  });
};
const drawWidthArrayCoor = (
  ctx,
  rootPoint,
  coorList,
  color = [120, 120, 120]
) => {
  coorList.forEach((coor) => {
    const [x, y] = CC_fromHumanToComputer(rootPoint, coor[0], coor[1]);
    putPixel(ctx, x, y, `rgb(${color[0]},${color[1]},${color[2]})`, 3);
  });
};
const getAn8thCoordinateListOfCircleWidthBresenham = (r) => {
  const coorList = [];
  let x = 0;
  let y = r;
  let p = 3 - 2 * r;
  coorList.push({ x, y });
  while (x < y - 1) {
    if (p < 0) {
      p += 4 * x + 6;
    } else {
      p += 4 * (x - y) + 10;
      y--;
    }
    x++;
    coorList.push({ x, y });
  }
  return coorList;
};
const getFullCoordinateList = (an8thCoordinate, centerPoint) => {
  const coorList = [...an8thCoordinate];
  const lastCoor = an8thCoordinate[an8thCoordinate.length - 1];
  const firstCoor = an8thCoordinate.shift();
  for (let i = an8thCoordinate.length - 1; i >= 0; i--) {
    const item = an8thCoordinate[i];
    if (item.x !== item.y) {
      coorList.push({ x: item.y, y: item.x });
    }
  }
  coorList.push({ x: firstCoor.y, y: firstCoor.x });

  for (let i = coorList.length - 2; i >= 0; i--) {
    coorList.push({ x: coorList[i].x, y: -coorList[i].y });
  }

  for (let i = coorList.length - 2; i > 0; i--) {
    coorList.push({ x: -coorList[i].x, y: coorList[i].y });
  }
  return coorList.map((coor) => {
    return { x: coor.x + centerPoint.x, y: coor.y + centerPoint.y };
  });
};
const tintColor = (ctx, rootPoint, x, y, color, border) => {
  const [x_c, y_c] = CC_fromHumanToComputer(rootPoint, x, y);
  const pixelData = ctx.getImageData(x_c, y_c, 1, 1).data;
  const currentColor = [pixelData[0], pixelData[1], pixelData[2]];
  if (
    JSON.stringify(currentColor) !== JSON.stringify(color) &&
    JSON.stringify(currentColor) !== JSON.stringify(border)
  ) {
    putPixel(ctx, x_c, y_c, `rgba(${color[0]},${color[1]},${color[2]})`);
    tintColor(ctx, rootPoint, x - 1, y, color, border);
    tintColor(ctx, rootPoint, x + 1, y, color, border);
    tintColor(ctx, rootPoint, x, y - 1, color, border);
    tintColor(ctx, rootPoint, x, y + 1, color, border);
  }
  return;
};
const getRectangleCoorList = (topUpperPoint, width, height) => {
  const TopLineCoorList = getCoorListWidthBresenham(
    topUpperPoint.x,
    topUpperPoint.y,
    topUpperPoint.x + width,
    topUpperPoint.y
  );
  const RightLineCoorList = getCoorListWidthBresenham(
    topUpperPoint.x + width,
    topUpperPoint.y,
    topUpperPoint.x + width,
    topUpperPoint.y - height
  );
  const BottomLineCoorList = getCoorListWidthBresenham(
    topUpperPoint.x + width,
    topUpperPoint.y - height,
    topUpperPoint.x,
    topUpperPoint.y - height
  );
  const LeftLineCoorList = getCoorListWidthBresenham(
    topUpperPoint.x,
    topUpperPoint.y - height,
    topUpperPoint.x,
    topUpperPoint.y
  );
  return [
    ...TopLineCoorList,
    ...RightLineCoorList,
    ...BottomLineCoorList,
    ...LeftLineCoorList,
  ];
};
const drawRectangle = (
  ctx,
  rootPoint,
  topUpperPoint,
  width,
  height,
  borderColor,
  color
) => {
  const coorList = getRectangleCoorList(topUpperPoint, width, height);
  drawWidthObjectCoor(ctx, rootPoint, coorList, borderColor);
  tintColor(
    ctx,
    rootPoint,
    topUpperPoint.x + 2,
    topUpperPoint.y - 3,
    color,
    borderColor
  );
  return coorList;
};
const drawTrapezoid = (
  ctx,
  rootPoint,
  topLeftPoint,
  bottomLeftPoint,
  smallWidth,
  color = [230, 161, 35],
  borderColor = [120, 120, 120]
) => {
  const largeWidth = smallWidth + 2 * (topLeftPoint.x - bottomLeftPoint.x);
  // left line
  const leftLineCoorList = getCoorListWidthBresenham(
    bottomLeftPoint.x,
    bottomLeftPoint.y,
    topLeftPoint.x,
    topLeftPoint.y
  );
  const topLineCoorList = getCoorListWidthBresenham(
    topLeftPoint.x,
    topLeftPoint.y,
    topLeftPoint.x + smallWidth,
    topLeftPoint.y
  );
  const rightLineCoorList = getCoorListWidthBresenham(
    topLeftPoint.x + smallWidth,
    topLeftPoint.y,
    bottomLeftPoint.x + largeWidth,
    bottomLeftPoint.y
  );
  const bottomLieCoorList = getCoorListWidthBresenham(
    bottomLeftPoint.x + largeWidth,
    bottomLeftPoint.y,
    bottomLeftPoint.x,
    bottomLeftPoint.y
  );

  drawWidthObjectCoor(ctx, rootPoint, leftLineCoorList, borderColor);
  // top line
  drawWidthObjectCoor(ctx, rootPoint, topLineCoorList, borderColor);
  // right line
  drawWidthObjectCoor(ctx, rootPoint, rightLineCoorList, borderColor);
  // bottom line
  drawWidthObjectCoor(ctx, rootPoint, bottomLieCoorList, borderColor);

  tintColor(
    ctx,
    rootPoint,
    topLeftPoint.x + 1,
    topLeftPoint.y - 1,
    color,
    borderColor
  );
  return [
    ...leftLineCoorList,
    ...topLineCoorList,
    ...rightLineCoorList,
    ...bottomLieCoorList,
  ];
};
const drawTriangle = (
  ctx,
  rootPoint,
  p1,
  p2,
  p3,
  color = [250, 250, 20],
  borderColor = [120, 120, 120]
) => {
  drawWidthObjectCoor(
    ctx,
    rootPoint,
    getCoorListWidthBresenham(p1.x, p1.y, p2.x, p2.y),
    borderColor
  );
  drawWidthObjectCoor(
    ctx,
    rootPoint,
    getCoorListWidthBresenham(p2.x, p2.y, p3.x, p3.y),
    borderColor
  );
  drawWidthObjectCoor(
    ctx,
    rootPoint,
    getCoorListWidthBresenham(p3.x, p3.y, p1.x, p1.y),
    borderColor
  );
  tintColor(ctx, rootPoint, p3.x, p3.y - 3, color, borderColor);
};
const drawCircle = (
  ctx,
  rootPoint,
  r,
  centerPoint,
  color = [250, 230, 110],
  borderColor = [120, 120, 120]
) => {
  const an8thCoordinate = getAn8thCoordinateListOfCircleWidthBresenham(r);
  const coorList = getFullCoordinateList(an8thCoordinate, centerPoint);
  drawWidthObjectCoor(ctx, rootPoint, coorList);
  tintColor(ctx, rootPoint, centerPoint.x, centerPoint.y, color, borderColor);
  const [x, y] = CC_fromHumanToComputer(
    rootPoint,
    centerPoint.x,
    centerPoint.y
  );
  putPixel(ctx, x, y, "green", 3);
};
const getPropellerCoorList = (
  centerCircle,
  widthTotal,
  widthPropeller,
  heightPropeller
) => {
  const coorListMid = getCoorListWidthBresenham(
    centerCircle.x + 1,
    centerCircle.y,
    centerCircle.x + widthTotal,
    centerCircle.y
  );
  const coorListTop = getCoorListWidthBresenham(
    centerCircle.x + 1,
    centerCircle.y + 1,
    centerCircle.x + widthTotal,
    centerCircle.y + 1
  );
  const coorListRec = getRectangleCoorList(
    {
      x: centerCircle.x + widthTotal - widthPropeller,
      y: centerCircle.y - 1,
    },
    widthPropeller,
    heightPropeller
  );

  return [...coorListMid, ...coorListTop, ...coorListRec];
};
const drawFourPropeller = (
  ctx,
  rootPoint,
  centerCircle,
  widthTotal,
  widthPropeller,
  heightPropeller,
  borderColor,
  color,
  deg
) => {
  const getFourRotateCoorInPropeller = (rightPointPropeller, centerCircle) => {
    const rightPoint = matrixMultiply(
      [[rightPointPropeller[0], rightPointPropeller[1], 1]],
      createTranslationMatrix(centerCircle.x, centerCircle.y)
    );
    rightPoint[0].pop();
    const topPoint = matrixMultiply(
      [[rightPointPropeller[0], rightPointPropeller[1], 1]],
      matrixMultiply(
        createRotateMatrix(90),
        createTranslationMatrix(centerCircle.x, centerCircle.y)
      )
    );
    topPoint[0].pop();
    const leftPoint = matrixMultiply(
      [[rightPointPropeller[0], rightPointPropeller[1], 1]],
      matrixMultiply(
        createRotateMatrix(180),
        createTranslationMatrix(centerCircle.x, centerCircle.y)
      )
    );
    leftPoint[0].pop();
    const bottomPoint = matrixMultiply(
      [[rightPointPropeller[0], rightPointPropeller[1], 1]],
      matrixMultiply(
        createRotateMatrix(270),
        createTranslationMatrix(centerCircle.x, centerCircle.y)
      )
    );
    bottomPoint[0].pop();
    return [...rightPoint, ...topPoint, ...leftPoint, ...bottomPoint];
  };
  const tintColorForPropeller = (
    ctx,
    rootPoint,
    coorList,
    color,
    borderColor
  ) => {
    coorList.forEach((coor) => {
      tintColor(ctx, rootPoint, coor[0], coor[1], color, borderColor);
    });
  };

  const rightCoorList_ObjectType = getPropellerCoorList(
    { x: 0, y: 0 },
    widthTotal,
    widthPropeller,
    heightPropeller
  );

  const topCoorList = getRotateCoorList(
    rightCoorList_ObjectType,
    90 + deg,
    centerCircle
  );
  const leftCoorList = getRotateCoorList(
    rightCoorList_ObjectType,
    180 + deg,
    centerCircle
  );
  const bottomCoorList = getRotateCoorList(
    rightCoorList_ObjectType,
    270 + deg,
    centerCircle
  );
  let rightCoorList = getRotateCoorList(
    rightCoorList_ObjectType,
    deg,
    centerCircle
  );

  const pointInPropeller = { x: widthTotal - widthPropeller + 10, y: -6 };

  const newCoorLocation = getRotateCoor(pointInPropeller, deg);

  const fourRotateCoorInPropeller = getFourRotateCoorInPropeller(
    newCoorLocation,
    centerCircle
  );

  drawWidthArrayCoor(ctx, rootPoint, rightCoorList, borderColor);
  drawWidthArrayCoor(ctx, rootPoint, topCoorList, borderColor);
  drawWidthArrayCoor(ctx, rootPoint, leftCoorList, borderColor);
  drawWidthArrayCoor(ctx, rootPoint, bottomCoorList, borderColor);
  tintColorForPropeller(
    ctx,
    rootPoint,
    fourRotateCoorInPropeller,
    color,
    borderColor
  );

  drawCircle(ctx, rootPoint, 6, centerCircle);
};
const drawDoorOfWindmill = (
  ctx,
  rootPoint,
  bottomCenterPoint,
  width,
  height,
  borderColor,
  color
) => {
  const BottomLeftPoint = {
    x: bottomCenterPoint.x - Math.round(width / 2),
    y: bottomCenterPoint.y,
  };
  const BottomRightPoint = {
    x: bottomCenterPoint.x + Math.round(width / 2),
    y: bottomCenterPoint.y,
  };
  const topLeftPoint = {
    x: bottomCenterPoint.x - Math.round(width / 2),
    y: bottomCenterPoint.y + height,
  };
  const topRightPoint = {
    x: bottomCenterPoint.x + Math.round(width / 2),
    y: bottomCenterPoint.y + height,
  };

  const leftLineCoorList = getCoorListWidthBresenham(
    BottomLeftPoint.x,
    BottomLeftPoint.y,
    topLeftPoint.x,
    topLeftPoint.y
  );
  const rightLineCoorList = getCoorListWidthBresenham(
    BottomRightPoint.x,
    BottomRightPoint.y,
    topRightPoint.x,
    topRightPoint.y
  );
  drawWidthObjectCoor(ctx, rootPoint, leftLineCoorList, borderColor);
  drawWidthObjectCoor(ctx, rootPoint, rightLineCoorList, borderColor);

  const an8thCoordinate = getAn8thCoordinateListOfCircleWidthBresenham(
    Math.round(width / 2)
  );
  const fullCircleCoorList = getFullCoordinateList(an8thCoordinate, {
    x: bottomCenterPoint.x,
    y: bottomCenterPoint.y + height,
  });

  const halfCircleCoorList = [];
  fullCircleCoorList.forEach((coor) => {
    coor.y >= bottomCenterPoint.y + height && halfCircleCoorList.push(coor);
  });
  drawWidthObjectCoor(ctx, rootPoint, halfCircleCoorList, borderColor);

  tintColor(
    ctx,
    rootPoint,
    bottomCenterPoint.x,
    bottomCenterPoint.y + 5,
    color,
    borderColor
  );
};
const drawLake = (
  ctx,
  rootPoint,
  topUpperPoint,
  width,
  height,
  borderColor,
  color
) => {
  drawRectangle(
    ctx,
    rootPoint,
    topUpperPoint,
    width,
    height,
    borderColor,
    color
  );

  tintColor(
    ctx,
    rootPoint,
    topUpperPoint.x + 5,
    topUpperPoint.y - 10,
    color,
    borderColor
  );
};
export {
  drawRect,
  drawRectangle,
  drawTrapezoid,
  drawTriangle,
  drawFourPropeller,
  drawDoorOfWindmill,
  drawLake,
};
