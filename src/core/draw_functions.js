export const drawLine = (ctx, x1, y1, x2, y2, color = "black") => {
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.strokeStyle = color;
  ctx.stroke();
};

export const putPixel = (ctx, x, y, color = "dodgerblue", unit = 5) => {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, 5, 5);
};

export const drawRect = (ctx, x, y, width, height, color = "black") => {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, width, height);
};
