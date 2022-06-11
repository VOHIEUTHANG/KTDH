import Control_2D from "./Control_2D";
import Control_3D from "./Control_3D";

function Controls({ draw2D, ...rest }) {
  return draw2D ? (
    <Control_2D {...rest} />
  ) : (
    <Control_3D setDraw2D={rest.setDraw2D} />
  );
}
export default Controls;
