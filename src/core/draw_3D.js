import {
  convert2DTo3DWidthCabinet,
  putPixel,
  drawLineUsingBreseham,
  getFullCoorListOfCircle,
  convertCoordinateFrom3DTo2D,
  matrixMultiply,
  CC_fromHumanToComputer,
  drawText,
  CC_fromComputerToHuman,
} from "./draw_functions";

import draw3DCoordiante from "./draw_3D_coordinate";

const getText = (pointName, point) =>
  `${pointName}(${point[0]},${point[1]},${point[2]})`;
const drawTextFromInitialPoint = (
  rootPoint,
  ctx,
  x1,
  y1,
  point,
  text,
  distanceX = 6,
  distanceY = -10,
  color = "dodgerblue"
) => {
  const [a, b] = CC_fromHumanToComputer(rootPoint, x1, y1);
  drawText(
    ctx,
    "dodgerblue",
    getText(text, [point[0] + 40, point[1], point[2]]),
    a + distanceX,
    b + distanceY
  );
};
const drawRectangular = (ctx, rootPoint, { long, wide, high, x, y, z }) => {
  long = Math.round(long);
  wide = Math.round(wide);
  high = Math.round(high);
  x = Math.round(Number(x));
  y = Math.round(Number(y));
  z = Math.round(Number(z));

  let a1 = [x - 40, y, z];
  const [xa, ya, za] = a1;

  let a2 = [xa + long, ya, za];
  let a3 = [xa + long, ya, za + wide];
  let a4 = [xa, ya, za + wide];
  let a5 = [xa + long, ya + high, za];
  let a6 = [xa + long, ya + high, za + wide];
  let a7 = [xa, ya + high, za + wide];
  let a8 = [xa, ya + high, za];

  // Convet from 3D coordinate to 2D coordinate with Cabinet.
  const a1_c = convert2DTo3DWidthCabinet(a1[0], a1[1], a1[2]);
  const a2_c = convert2DTo3DWidthCabinet(a2[0], a2[1], a2[2]);
  const a3_c = convert2DTo3DWidthCabinet(a3[0], a3[1], a3[2]);
  const a4_c = convert2DTo3DWidthCabinet(a4[0], a4[1], a4[2]);
  const a5_c = convert2DTo3DWidthCabinet(a5[0], a5[1], a5[2]);
  const a6_c = convert2DTo3DWidthCabinet(a6[0], a6[1], a6[2]);
  const a7_c = convert2DTo3DWidthCabinet(a7[0], a7[1], a7[2]);
  const a8_c = convert2DTo3DWidthCabinet(a8[0], a8[1], a8[2]);

  const [x1, y1] = a1_c;
  const [x2, y2] = a2_c;
  const [x3, y3] = a3_c;
  const [x4, y4] = a4_c;
  const [x5, y5] = a5_c;
  const [x6, y6] = a6_c;
  const [x7, y7] = a7_c;
  const [x8, y8] = a8_c;

  // Draw line from calculated points.
  drawLineUsingBreseham(ctx, rootPoint, x1, y1, x2, y2, [80, 20, 50], 2);
  drawLineUsingBreseham(ctx, rootPoint, x1, y1, x4, y4, [80, 20, 50], 2);
  drawLineUsingBreseham(ctx, rootPoint, x2, y2, x3, y3, [80, 20, 50]);
  drawLineUsingBreseham(ctx, rootPoint, x3, y3, x4, y4, [80, 20, 50]);
  drawLineUsingBreseham(ctx, rootPoint, x1, y1, x8, y8, [80, 20, 50], 2);
  drawLineUsingBreseham(ctx, rootPoint, x2, y2, x5, y5, [80, 20, 50]);
  drawLineUsingBreseham(ctx, rootPoint, x3, y3, x6, y6, [80, 20, 50]);
  drawLineUsingBreseham(ctx, rootPoint, x4, y4, x7, y7, [80, 20, 50]);
  drawLineUsingBreseham(ctx, rootPoint, x8, y8, x5, y5, [80, 20, 50]);
  drawLineUsingBreseham(ctx, rootPoint, x6, y6, x5, y5, [80, 20, 50]);
  drawLineUsingBreseham(ctx, rootPoint, x7, y7, x6, y6, [80, 20, 50]);
  drawLineUsingBreseham(ctx, rootPoint, x8, y8, x7, y7, [80, 20, 50]);

  // Draw coordinate into canvas frame
  drawTextFromInitialPoint(rootPoint, ctx, x1, y1, a1, "A");
  drawTextFromInitialPoint(rootPoint, ctx, x2, y2, a2, "B");
  drawTextFromInitialPoint(rootPoint, ctx, x3, y3, a3, "C", 0, 24);
  drawTextFromInitialPoint(rootPoint, ctx, x4, y4, a4, "D", -10, 30);

  drawTextFromInitialPoint(rootPoint, ctx, x5, y5, a5, "E");
  drawTextFromInitialPoint(rootPoint, ctx, x6, y6, a6, "F", 10, 20);
  drawTextFromInitialPoint(rootPoint, ctx, x7, y7, a7, "G", -120, 10);
  drawTextFromInitialPoint(rootPoint, ctx, x8, y8, a8, "H", 0, -14);
};
const drawCylinder = (ctx, rootPoint, { radius, high, x, y, z }) => {
  radius = Math.round(radius);
  high = Math.round(high);
  x = Math.round(Number(x));
  y = Math.round(Number(y));
  z = Math.round(Number(z));

  let r1 = [x - 40, y, z];
  let r2 = [x - 40, y + high, z];

  const [r1X, r1Y] = convertCoordinateFrom3DTo2D(
    rootPoint,
    r1[0],
    r1[1],
    r1[2]
  );
  putPixel(ctx, r1X, r1Y, "darkblue", 4);
  drawText(
    ctx,
    "dodgerblue",
    getText("O", [r1[0] + 40, r1[1], r1[2]]),
    r1X + 10,
    r1Y
  );

  const [r2X, r2Y] = convertCoordinateFrom3DTo2D(
    rootPoint,
    r2[0],
    r2[1],
    r2[2]
  );
  putPixel(ctx, r2X, r2Y, "darkblue", 4);
  drawText(
    ctx,
    "dodgerblue",
    getText("O'", [r2[0] + 40, r2[1], r2[2]]),
    r2X + 10,
    r2Y
  );

  const circleCoorList = getFullCoorListOfCircle(radius, {
    x: r1[0],
    y: r1[2],
  });
  const bottomCircleList = circleCoorList.map((coor) => {
    return [coor.x, r1[1], coor.y];
  });
  const topCircleList = circleCoorList.map((coor) => {
    return [coor.x, r2[1], coor.y];
  });

  const bottomCircle2DCoorLit = bottomCircleList.map((coor) => {
    return convertCoordinateFrom3DTo2D(rootPoint, coor[0], coor[1], coor[2]);
  });
  const topCircle2DCoorLit = topCircleList.map((coor) => {
    return convertCoordinateFrom3DTo2D(rootPoint, coor[0], coor[1], coor[2]);
  });

  let maxX = 0;
  let minX = 1200;
  const a1 = { x: 0, y: 0 };
  const a2 = { x: 0, y: 0 };
  let maxIndex = -1;
  let minIndex = -1;

  bottomCircle2DCoorLit.forEach((coor, index) => {
    if (coor[0] > maxX) {
      maxX = coor[0];
      a1.x = coor[0];
      a1.y = coor[1];
      maxIndex = index;
    }
    if (coor[0] < minX) {
      minX = coor[0];
      a2.x = coor[0];
      a2.y = coor[1];
      minIndex = index;
    }
  });

  const behindHalfOfBottomCircleCoorList = bottomCircle2DCoorLit.slice(
    maxIndex,
    minIndex
  );
  console.log(behindHalfOfBottomCircleCoorList.length);

  bottomCircle2DCoorLit.splice(
    maxIndex,
    behindHalfOfBottomCircleCoorList.length
  );

  let unique = behindHalfOfBottomCircleCoorList.filter((coor, i, arr) => {
    for (let j = 0; j < i; j++) {
      if (
        coor[0] == behindHalfOfBottomCircleCoorList[j][0] &&
        coor[1] == behindHalfOfBottomCircleCoorList[j][1]
      ) {
        return false;
      }
    }
    return true;
  });

  unique.forEach((coor, index) => {
    if (index % 3 != 2) {
      putPixel(ctx, coor[0], coor[1], "darkblue", 4);
    }
  });

  bottomCircle2DCoorLit.forEach((coor) => {
    putPixel(ctx, coor[0], coor[1], "darkblue", 4);
  });

  // Find min max of a point in topcircle
  maxX = 0;
  minX = 1200;
  const a3 = { x: 0, y: 0 };
  const a4 = { x: 0, y: 0 };

  topCircle2DCoorLit.forEach((coor) => {
    if (coor[0] > maxX) {
      maxX = coor[0];
      a3.x = coor[0];
      a3.y = coor[1];
    }
    if (coor[0] < minX) {
      minX = coor[0];
      a4.x = coor[0];
      a4.y = coor[1];
    }
    putPixel(ctx, coor[0], coor[1], "darkblue", 4);
  });

  drawText(ctx, "dodgerblue", "A", a1.x + 10, a1.y);
  drawText(ctx, "dodgerblue", "B", a2.x - 20, a2.y);
  drawText(ctx, "dodgerblue", "C", a3.x + 10, a3.y);
  drawText(ctx, "dodgerblue", "D", a4.x - 20, a4.y);

  const [x1, y1] = CC_fromComputerToHuman(rootPoint, a1.x, a1.y);
  const [x2, y2] = CC_fromComputerToHuman(rootPoint, a2.x, a2.y);
  const [x3, y3] = CC_fromComputerToHuman(rootPoint, a3.x, a3.y);
  const [x4, y4] = CC_fromComputerToHuman(rootPoint, a4.x, a4.y);

  drawLineUsingBreseham(ctx, rootPoint, x1, y1, x3, y3, [0, 0, 139]);
  drawLineUsingBreseham(ctx, rootPoint, x2, y2, x4, y4, [0, 0, 139]);
};

export default function draw_3D(
  ctx,
  rootPoint,
  FRAME_WIDTH,
  FRAME_HEIGHT,
  typeDraw,
  rectangular,
  cylinder
) {
  draw3DCoordiante(ctx, rootPoint, FRAME_WIDTH, FRAME_HEIGHT);
  if (typeDraw == 1) {
    if (
      rectangular.long != 0 &&
      rectangular.wide != 0 &&
      rectangular.high != 0
    ) {
      drawRectangular(ctx, rootPoint, rectangular);
    }
  } else if (typeDraw == 2) {
    if (cylinder.radius != 0 && cylinder.high != 0) {
      drawCylinder(ctx, rootPoint, cylinder);
    }
  } else {
    console.log("invalid type draw");
  }
}
