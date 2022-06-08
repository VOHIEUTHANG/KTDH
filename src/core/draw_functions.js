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
// CC mean convert coordinate
const CC_fromComputerToHuman = (rootPoint, x, y) => {
  return [Math.round((x - rootPoint.x) / 5), Math.floor((rootPoint.y - y) / 5)];
};
const CC_fromHumanToComputer = (rootPoint, x, y) => {
  return [rootPoint.x + x * 5, rootPoint.y - y * 5];
};
const draw = (ctx, rootPoint, coorList, color = [120, 120, 120]) => {
  coorList.forEach((coor) => {
    const [x, y] = CC_fromHumanToComputer(rootPoint, coor.x, coor.y);
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
const drawRectangle = (
  ctx,
  rootPoint,
  topUpperPoint,
  width,
  height,
  borderColor,
  color
) => {
  draw(
    ctx,
    rootPoint,
    getCoorListWidthBresenham(
      topUpperPoint.x,
      topUpperPoint.y,
      topUpperPoint.x + width,
      topUpperPoint.y
    ),
    borderColor
  );
  draw(
    ctx,
    rootPoint,
    getCoorListWidthBresenham(
      topUpperPoint.x + width,
      topUpperPoint.y,
      topUpperPoint.x + width,
      topUpperPoint.y - height
    ),
    borderColor
  );
  draw(
    ctx,
    rootPoint,
    getCoorListWidthBresenham(
      topUpperPoint.x + width,
      topUpperPoint.y - height,
      topUpperPoint.x,
      topUpperPoint.y - height
    ),
    borderColor
  );
  draw(
    ctx,
    rootPoint,
    getCoorListWidthBresenham(
      topUpperPoint.x,
      topUpperPoint.y - height,
      topUpperPoint.x,
      topUpperPoint.y
    ),
    borderColor
  );
  tintColor(
    ctx,
    rootPoint,
    topUpperPoint.x + 1,
    topUpperPoint.y - 1,
    color,
    borderColor
  );
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
  draw(
    ctx,
    rootPoint,
    getCoorListWidthBresenham(
      bottomLeftPoint.x,
      bottomLeftPoint.y,
      topLeftPoint.x,
      topLeftPoint.y
    ),
    borderColor
  );
  // top line
  draw(
    ctx,
    rootPoint,
    getCoorListWidthBresenham(
      topLeftPoint.x,
      topLeftPoint.y,
      topLeftPoint.x + smallWidth,
      topLeftPoint.y
    ),
    borderColor
  );
  // right line
  draw(
    ctx,
    rootPoint,
    getCoorListWidthBresenham(
      topLeftPoint.x + smallWidth,
      topLeftPoint.y,
      bottomLeftPoint.x + largeWidth,
      bottomLeftPoint.y
    ),
    borderColor
  );
  // bottom line
  draw(
    ctx,
    rootPoint,
    getCoorListWidthBresenham(
      bottomLeftPoint.x + largeWidth,
      bottomLeftPoint.y,
      bottomLeftPoint.x,
      bottomLeftPoint.y
    ),
    borderColor
  );

  tintColor(
    ctx,
    rootPoint,
    topLeftPoint.x + 1,
    topLeftPoint.y - 1,
    color,
    borderColor
  );
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
  draw(
    ctx,
    rootPoint,
    getCoorListWidthBresenham(p1.x, p1.y, p2.x, p2.y),
    borderColor
  );
  draw(
    ctx,
    rootPoint,
    getCoorListWidthBresenham(p2.x, p2.y, p3.x, p3.y),
    borderColor
  );
  draw(
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
  draw(ctx, rootPoint, coorList);
  tintColor(ctx, rootPoint, centerPoint.x, centerPoint.y, color, borderColor);
  const [x, y] = CC_fromHumanToComputer(
    rootPoint,
    centerPoint.x,
    centerPoint.y
  );
  putPixel(ctx, x, y, "orange", 3);
};
const drawPropeller = (
  ctx,
  rootPoint,
  centerCircle,
  widthTotal,
  widthPropeller,
  heightPropeller,
  borderColor,
  color
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
  draw(ctx, rootPoint, coorListMid, borderColor);
  draw(ctx, rootPoint, coorListTop, borderColor);
  drawRectangle(
    ctx,
    rootPoint,
    {
      x: centerCircle.x + widthTotal - widthPropeller,
      y: centerCircle.y - 1,
    },
    widthPropeller,
    heightPropeller,
    borderColor,
    color
  );
};

export {
  drawLine,
  putPixel,
  drawRect,
  getCoorListWidthBresenham,
  CC_fromComputerToHuman,
  CC_fromHumanToComputer,
  draw,
  drawTrapezoid,
  drawTriangle,
  drawCircle,
  drawPropeller,
};
