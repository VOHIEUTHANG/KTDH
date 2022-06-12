import { drawLine, CC_fromHumanToComputer } from "./draw_functions";
export default function draw3DCoordiante(
  ctx,
  rootPoint,
  FRAME_WIDTH,
  FRAME_HEIGHT
) {
  const [x0, y0] = CC_fromHumanToComputer(rootPoint, 80 - 120, 0);
  const [x1, y1] = CC_fromHumanToComputer(rootPoint, 120, 0);
  const [x2, y2] = CC_fromHumanToComputer(rootPoint, 80 - 120, 80);
  const [x3, y3] = CC_fromHumanToComputer(rootPoint, -120, -80);

  drawLine(ctx, x0, y0, x1, y1, "#777");
  drawLine(ctx, x0, y0, x2, y2, "#777");
  drawLine(ctx, x0, y0, x3, y3, "#777");
}
