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
// CC meaning convert coordinate
const CC_fromComputerToHuman = (rootPoint, x, y) => {
  return [Math.round((x - rootPoint.x) / 5), Math.floor((rootPoint.y - y) / 5)];
};
const CC_fromHumanToComputer = (rootPoint, x, y) => {
  return [rootPoint.x + x * 5, rootPoint.y - y * 5];
};
const draw = (ctx, rootPoint, coorList, color = "green") => {
  coorList.forEach((coor) => {
    const [x, y] = CC_fromHumanToComputer(rootPoint, coor.x, coor.y);
    putPixel(ctx, x, y, color, 3);
  });
};
function tintColor(ctx, rootPoint, x, y, color, border) {
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
}
const drawTrapezoid = (
  ctx,
  rootPoint,
  topLeftPoint,
  bottomLeftPoint,
  smallWidth,
  color = "purple"
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
    "purple"
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
    "purple"
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
    "purple"
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
    "purple"
  );

  tintColor(
    ctx,
    rootPoint,
    topLeftPoint.x + 1,
    topLeftPoint.y - 1,
    [0, 0, 254],
    [128, 0, 128]
  );
};
const drawTriangle = (ctx, rootPoint, p1, p2, p3, color = "purple") => {
  draw(
    ctx,
    rootPoint,
    getCoorListWidthBresenham(p1.x, p1.y, p2.x, p2.y),
    color
  );
  draw(
    ctx,
    rootPoint,
    getCoorListWidthBresenham(p2.x, p2.y, p3.x, p3.y),
    color
  );
  draw(
    ctx,
    rootPoint,
    getCoorListWidthBresenham(p3.x, p3.y, p1.x, p1.y),
    color
  );
  tintColor(ctx, rootPoint, p3.x, p3.y - 3, [250, 250, 0], [128, 0, 128]);
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
};
