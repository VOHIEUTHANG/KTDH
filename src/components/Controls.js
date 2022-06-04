import ViewInArIcon from "@mui/icons-material/ViewInAr";
import { Button } from "@mui/material/";
import TextField from "./TextField";

import { useEffect, useState } from "react";
function Controls() {
  return (
    <div className="ml-6 w-[400px] h-[800px] bg-white rounded-xl overflow-hidden p-10 flex flex-col justify-between">
      <p className="uppercase text-center text-xl font-semibold text-gray-500 mb-4">
        bảng điều khiển
      </p>
      <div>
        <TextField />
        <TextField />
        <TextField />
      </div>

      <Button
        variant="outlined"
        size="large"
        className="w-full mt-8 py-4"
        endIcon={<ViewInArIcon />}
      >
        3D coordinate
      </Button>
    </div>
  );
}
export default Controls;
