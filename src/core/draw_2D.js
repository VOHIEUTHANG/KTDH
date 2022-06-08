import {
  drawTrapezoid,
  drawTriangle,
  drawCircle,
  drawPropeller,
  drawFourPropeller,
} from "./draw_functions";

export default function draw_2D(ctx, rootPoint, width, height) {
  const leftUpperPoint = { x: -70, y: 6 };
  const leftBottomPoint = { x: -80, y: -70 };
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
    [50, 100, 10],
    [255, 255, 0]
  );
  drawCircle(ctx, rootPoint, 6, centerCircle);
}
