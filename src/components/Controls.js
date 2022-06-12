import Control_2D from "./Control_2D";
import Control_3D from "./Control_3D";

function Controls({
  draw2D,
  setRectangular,
  setCylinder,
  typeDraw,
  setTypeDraw,
  ...rest
}) {
  return draw2D ? (
    <Control_2D {...rest} />
  ) : (
    <Control_3D
      setTypeDraw={setTypeDraw}
      setCylinder={setCylinder}
      setRectangular={setRectangular}
      setDraw2D={rest.setDraw2D}
      typeDraw={typeDraw}
    />
  );
}
export default Controls;
