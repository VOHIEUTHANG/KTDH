const matrixMultiply = (matrix1, matrix2) => {
  let aNumRows = matrix1.length,
    aNumCols = matrix1[0].length,
    bNumRows = matrix2.length,
    bNumCols = matrix2[0].length,
    m = new Array(aNumRows);
  for (let r = 0; r < aNumRows; ++r) {
    m[r] = new Array(bNumCols);
    for (let c = 0; c < bNumCols; ++c) {
      m[r][c] = 0;
      for (let i = 0; i < aNumCols; ++i) {
        m[r][c] += matrix1[r][i] * matrix2[i][c];
      }
    }
  }
  return m;
};
const createRotateMatrix = (deg) => {
  const radianValue = (deg * Math.PI) / 180;
  return [
    [Math.cos(radianValue), Math.sin(radianValue), 0],
    [-Math.sin(radianValue), Math.cos(radianValue), 0],
    [0, 0, 1],
  ];
};
const createTranslationMatrix = (x, y) => {
  return [
    [1, 0, 0],
    [0, 1, 0],
    [x, y, 1],
  ];
};
const convertMatrixToArray = (ObjectMatrix) => {
  return ObjectMatrix.map((coor) => {
    return [coor.x, coor.y, 1];
  });
};

export {
  createRotateMatrix,
  matrixMultiply,
  createTranslationMatrix,
  convertMatrixToArray,
};
