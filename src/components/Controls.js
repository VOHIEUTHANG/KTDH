import ViewInArIcon from "@mui/icons-material/ViewInAr";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { Button } from "@mui/material/";
import TextField from "./TextField";

import { useEffect, useState } from "react";
function Controls({ ShowCoordinate }) {
  const { showCoordinate, setShowCoordinate } = ShowCoordinate;

  return (
    <div className="ml-6 w-[400px] h-[800px] bg-white rounded-xl overflow-hidden p-10 flex flex-col justify-between">
      <p className="uppercase text-center text-xl font-semibold text-gray-500 mb-4">
        bảng điều khiển
      </p>
      <div>
        <TextField />
        <hr className="my-3" />
        <TextField />
        <hr className="my-3" />
      </div>

      <Button
        variant="outlined"
        className="p-4 mt-4 text-lg text-gray-500 "
        endIcon={<VisibilityOffIcon />}
        onClick={() => {
          setShowCoordinate(!showCoordinate);
        }}
      >
        Hide Coordinate
      </Button>

      <Button
        variant="container"
        size="large"
        className="w-full  py-4 mt-auto text-lg bg-blue-400 hover:bg-blue-500 font-bold  text-white"
        endIcon={<ViewInArIcon />}
      >
        3D coordinate
      </Button>
    </div>
  );
}
export default Controls;
