import {
  convert2DTo3DWidthCabinet,
  putPixel,
  drawLineUsingBreseham,
  getFullCoorListOfCircle,
  convertCoordinateFrom3DTo2D,
  matrixMultiply,
  CC_fromHumanToComputer,
} from "./draw_functions";

import draw3DCoordiante from "./draw_3D_coordinate";
import Control_2D from "../components/Control_2D";
const drawRectangular = (ctx, rootPoint, { long, wide, high }) => {
  long = Math.round(long);
  wide = Math.round(wide);
  high = Math.round(high);

  let a1 = [-40, 0, 0];
  let a2 = [long - 40, 0, 0];
  let a3 = [long - 40, 0, wide];
  let a4 = [-40, 0, wide];
  let a5 = [long - 40, high, 0];
  let a6 = [long - 40, high, wide];
  let a7 = [-40, high, wide];
  let a8 = [-40, high, 0];

  a2 = convert2DTo3DWidthCabinet(a2[0], a2[1], a2[2]);
  a3 = convert2DTo3DWidthCabinet(a3[0], a3[1], a3[2]);
  a4 = convert2DTo3DWidthCabinet(a4[0], a4[1], a4[2]);
  a5 = convert2DTo3DWidthCabinet(a5[0], a5[1], a5[2]);
  a6 = convert2DTo3DWidthCabinet(a6[0], a6[1], a6[2]);
  a7 = convert2DTo3DWidthCabinet(a7[0], a7[1], a7[2]);
  a8 = convert2DTo3DWidthCabinet(a8[0], a8[1], a8[2]);

  const [x1, y1] = a1;
  const [x2, y2] = a2;
  const [x3, y3] = a3;
  const [x4, y4] = a4;
  const [x5, y5] = a5;
  const [x6, y6] = a6;
  const [x7, y7] = a7;
  const [x8, y8] = a8;

  drawLineUsingBreseham(ctx, rootPoint, x1, y1, x2, y2, [120, 120, 0], 2);
  drawLineUsingBreseham(ctx, rootPoint, x1, y1, x4, y4, [120, 120, 0], 2);
  drawLineUsingBreseham(ctx, rootPoint, x2, y2, x3, y3, [120, 120, 0]);
  drawLineUsingBreseham(ctx, rootPoint, x3, y3, x4, y4, [120, 120, 0]);
  drawLineUsingBreseham(ctx, rootPoint, x1, y1, x8, y8, [120, 120, 0], 2);
  drawLineUsingBreseham(ctx, rootPoint, x2, y2, x5, y5, [120, 120, 0]);
  drawLineUsingBreseham(ctx, rootPoint, x3, y3, x6, y6, [120, 120, 0]);
  drawLineUsingBreseham(ctx, rootPoint, x4, y4, x7, y7, [120, 120, 0]);
  drawLineUsingBreseham(ctx, rootPoint, x8, y8, x5, y5, [120, 120, 0]);
  drawLineUsingBreseham(ctx, rootPoint, x6, y6, x5, y5, [120, 120, 0]);
  drawLineUsingBreseham(ctx, rootPoint, x7, y7, x6, y6, [120, 120, 0]);
  drawLineUsingBreseham(ctx, rootPoint, x8, y8, x7, y7, [120, 120, 0]);
};
const drawCylinder = (ctx, rootPoint, { radius, high }) => {
  radius = Math.round(radius);
  high = Math.round(high);

  let a1 = [radius * 2 - 40, 0, radius];
  let a2 = [-40, 0, radius];
  let a3 = [radius * 2 - 40, high, radius];
  let a4 = [-40, high, radius];

  let r1 = [radius - 40, 0, radius];
  let r2 = [radius - 40, high, radius];

  a1 = convert2DTo3DWidthCabinet(a1[0], a1[1], a1[2]);
  a2 = convert2DTo3DWidthCabinet(a2[0], a2[1], a2[2]);
  a3 = convert2DTo3DWidthCabinet(a3[0], a3[1], a3[2]);
  a4 = convert2DTo3DWidthCabinet(a4[0], a4[1], a4[2]);

  const [x1, y1] = a1;
  const [x2, y2] = a2;
  const [x3, y3] = a3;
  const [x4, y4] = a4;

  // drawLineUsingBreseham(ctx, rootPoint, x1, y1, x3, y3, [0, 120, 0]);

  const circleCoorList = getFullCoorListOfCircle(radius, {
    x: radius - 40,
    y: radius,
  });
  const bottomCircleList = circleCoorList.map((coor) => {
    return [coor.x, 0, coor.y];
  });
  const topCircleList = circleCoorList.map((coor) => {
    return [coor.x, high, coor.y];
  });

  const bottomCircle2DCoorLit = bottomCircleList.map((coor) => {
    return convertCoordinateFrom3DTo2D(rootPoint, coor[0], coor[1], coor[2]);
  });
  const topCircle2DCoorLit = topCircleList.map((coor) => {
    return convertCoordinateFrom3DTo2D(rootPoint, coor[0], coor[1], coor[2]);
  });

  bottomCircle2DCoorLit.forEach((coor) => {
    putPixel(ctx, coor[0], coor[1], "green", 4);
  });
  topCircle2DCoorLit.forEach((coor) => {
    putPixel(ctx, coor[0], coor[1], "green", 4);
  });
};
export default function draw_3D(
  ctx,
  rootPoint,
  FRAME_WIDTH,
  FRAME_HEIGHT,
  typeDraw,
  dimension
) {
  draw3DCoordiante(ctx, rootPoint, FRAME_WIDTH, FRAME_HEIGHT);
  if (typeDraw == 1) {
    if (dimension.long != 0 && dimension.wide != 0 && dimension.high != 0) {
      drawRectangular(ctx, rootPoint, dimension);
    }
  } else {
    drawCylinder(ctx, rootPoint, dimension);
  }
}
