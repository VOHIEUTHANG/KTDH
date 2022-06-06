import {
  getCoorListWidthBresenham,
  draw,
  drawTrapezoid,
  drawTriangle,
} from "./draw_functions";

export default function draw_2D(ctx, rootPoint, width, height) {
  const leftUpperPoint = { x: -80, y: 20 };
  const leftBottomPoint = { x: -90, y: -50 };
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
  drawTrapezoid(ctx, rootPoint, leftUpperPoint, leftBottomPoint, smallWidth);
  drawTriangle(
    ctx,
    rootPoint,
    trianglePoint.p1,
    trianglePoint.p2,
    trianglePoint.p3
  );
}
