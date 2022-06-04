function drawCoordinate(canvas) {
  const ctx = canvas.getContext("2d");

  const FRAME_WIDTH = canvas.offsetWidth;
  const FRAME_HEIGHT = canvas.offsetHeight;

  const rootPoint = {
    x: Math.floor(FRAME_WIDTH / 2),
    y: Math.floor(FRAME_HEIGHT / 2),
  };

  function putPixel(x, y, color = "dodgerblue", unit = 5) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, 5, 5);
  }

  function drawRect(x, y, width, height, color = "black") {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, width, height);
  }

  (function drawCoordinateSystem() {
    for (let i = rootPoint.x + 5; i < FRAME_WIDTH; i += 5) {
      drawRect(i, 0, 1, FRAME_HEIGHT, "#ccc");
    }
    for (let i = rootPoint.x - 5; i > 0; i -= 5) {
      drawRect(i, 0, 1, FRAME_HEIGHT, "#ccc");
    }
    for (let i = rootPoint.y + 5; i < FRAME_HEIGHT; i += 5) {
      drawRect(0, i, FRAME_WIDTH, 1, "#ccc");
    }
    for (let i = rootPoint.y - 5; i > 0; i -= 5) {
      drawRect(0, i, FRAME_WIDTH, 1, "#ccc");
    }

    drawRect(0, rootPoint.y, FRAME_WIDTH, 1, "blue");
    drawRect(rootPoint.x, 0, 1, FRAME_HEIGHT, "blue");
  })();
}
export default drawCoordinate;
