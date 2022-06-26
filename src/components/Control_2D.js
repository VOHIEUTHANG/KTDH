import ViewInArIcon from "@mui/icons-material/ViewInAr";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { Button } from "@mui/material/";
import TextField from "./TextField";

export default function Control_2D({
  ShowCoordinate,
  setDraw2D,
  windmill,
  house,
  cloud,
}) {
  return (
    <div className="ml-6 w-[400px] h-[800px] bg-white rounded-xl  p-10 flex flex-col justify-between">
      <p className="uppercase text-center text-xl font-semibold text-gray-500 mb-4">
        bảng điều khiển
      </p>
      <div>
        <TextField
          img="https://cdn.pixabay.com/photo/2018/07/31/04/16/windmill-3574169_960_720.jpg"
          coorVal={windmill}
        />
        <hr className="my-2" />
        <TextField
          img="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/suburban-house-royalty-free-image-1584972559.jpg"
          coorVal={house}
        />
        <hr className="my-2" />
        <TextField
          img="https://images.unsplash.com/photo-1569428034239-f9565e32e224?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8&w=1000&q=80"
          coorVal={cloud}
        />
      </div>

      <Button
        variant="outlined"
        className="p-4 mt-4 text-lg text-gray-500 "
        endIcon={<VisibilityOffIcon />}
        onClick={() => {
          ShowCoordinate.setShowCoordinate((prevState) => {
            if (prevState == 3) {
              return 1;
            } else {
              return prevState + 1;
            }
          });
        }}
      >
        Ẩn hiện tọa độ
      </Button>

      <Button
        variant="container"
        size="large"
        className="w-full  py-4 mt-auto text-lg bg-blue-400 hover:bg-blue-500 font-bold  text-white"
        endIcon={<ViewInArIcon />}
        onClick={() => {
          setDraw2D((prev) => !prev);
        }}
      >
        Hệ tọa độ 3D
      </Button>
    </div>
  );
}
