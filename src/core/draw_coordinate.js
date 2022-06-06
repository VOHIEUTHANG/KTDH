import { drawRect } from "./draw_functions";

function drawCoordinate(canvas) {
  const ctx = canvas.getContext("2d");

  const FRAME_WIDTH = canvas.offsetWidth;
  const FRAME_HEIGHT = canvas.offsetHeight;

  const rootPoint = {
    x: Math.floor(FRAME_WIDTH / 2),
    y: Math.floor(FRAME_HEIGHT / 2),
  };

  return {
    drawCoordinateSystem: (isShowFullCoorindate = 1) => {
      if (isShowFullCoorindate == 1) {
        for (let i = rootPoint.x + 5; i < FRAME_WIDTH; i += 5) {
          drawRect(ctx, i, 0, 1, FRAME_HEIGHT, "#ccc");
        }
        for (let i = rootPoint.x - 5; i > 0; i -= 5) {
          drawRect(ctx, i, 0, 1, FRAME_HEIGHT, "#ccc");
        }
        for (let i = rootPoint.y + 5; i < FRAME_HEIGHT; i += 5) {
          drawRect(ctx, 0, i, FRAME_WIDTH, 1, "#ccc");
        }
        for (let i = rootPoint.y - 5; i > 0; i -= 5) {
          drawRect(ctx, 0, i, FRAME_WIDTH, 1, "#ccc");
        }
      }
      if (isShowFullCoorindate !== 3) {
        drawRect(ctx, 0, rootPoint.y, FRAME_WIDTH, 1, "blue");
        drawRect(ctx, rootPoint.x, 0, 1, FRAME_HEIGHT, "blue");
      }
    },
    FRAME_WIDTH,
    FRAME_HEIGHT,
    rootPoint,
    ctx,
  };
}
export default drawCoordinate;
