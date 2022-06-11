import CropSquareIcon from "@mui/icons-material/CropSquare";
import RectangleIcon from "@mui/icons-material/Rectangle";
import { Button } from "@mui/material/";

export default function Control_3D({ setDraw2D }) {
  return (
    <div className="ml-6 w-[400px] h-[800px] bg-white rounded-xl overflow-hidden p-10 flex flex-col justify-between">
      <p className="uppercase text-center text-xl font-semibold text-gray-500 mb-4">
        bảng điều khiển
      </p>

      <Button
        variant="container"
        size="large"
        className="w-full  py-4 mt-auto text-lg bg-blue-400 hover:bg-blue-500 font-bold  text-white"
        endIcon={<RectangleIcon />}
        onClick={() => {
          setDraw2D((prev) => !prev);
        }}
      >
        2D coordinate
      </Button>
    </div>
  );
}
