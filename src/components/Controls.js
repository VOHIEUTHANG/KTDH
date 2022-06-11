import ViewInArIcon from "@mui/icons-material/ViewInAr";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { Button } from "@mui/material/";
import TextField from "./TextField";

function Controls({ ShowCoordinate, setDraw2D, windmill, house, cloud }) {
  const { showCoordinate, setShowCoordinate } = ShowCoordinate;

  return (
    <div className="ml-6 w-[400px] h-[800px] bg-white rounded-xl overflow-hidden p-10 flex flex-col justify-between">
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
        <TextField
          img="https://cloudgeeks.net/wp-content/uploads/2020/07/cloud-computing-concept.jpg"
          coorVal={cloud}
        />
      </div>

      <Button
        variant="outlined"
        className="p-4 mt-4 text-lg text-gray-500 "
        endIcon={<VisibilityOffIcon />}
        onClick={() => {
          setShowCoordinate((prevState) => {
            if (prevState == 3) {
              return 1;
            } else {
              return prevState + 1;
            }
          });
        }}
      >
        Toggle Coordinate
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
        3D coordinate
      </Button>
    </div>
  );
}
export default Controls;
