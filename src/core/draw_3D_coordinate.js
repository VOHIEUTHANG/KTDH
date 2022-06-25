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

  const [x4, y4] = CC_fromHumanToComputer(rootPoint, 116, -5);
  const [x5, y5] = CC_fromHumanToComputer(rootPoint, -39, 75);
  const [x6, y6] = CC_fromHumanToComputer(rootPoint, -114, -78);

  ctx.font = "20px Arial";
  ctx.fillStyle = "dodgerblue";
  ctx.fillText("X", x4, y4);
  ctx.fillText("Y", x5, y5);
  ctx.fillText("Z", x6, y6);

  drawLine(ctx, x0, y0, x1, y1, "#777");
  drawLine(ctx, x0, y0, x2, y2, "#777");
  drawLine(ctx, x0, y0, x3, y3, "#777");
}
