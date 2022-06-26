import { Stack, TextField } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

const HouseDetail = ({ coorList }) => {
  return (
    <Box className="absolute rounded-md object-detail bg-white shadow-md w-[300px] py-6 px-8 min-h-[200px] max-h-[400px] overflow-x-hidden overflow-y-scroll z-10">
      <p className=" text-center text-lg font-semibold uppercase text-gray-500 mb-3 ">
        Tọa độ chi tiết
      </p>
      {Array(10)
        .fill(0)
        .map((coor) => {
          return (
            <Stack direction="row" spacing={2} className="my-3">
              <TextField
                label="X"
                defaultValue="0"
                InputProps={{
                  readOnly: true,
                }}
                value={coor[0]}
                size="small"
              />
              <TextField
                label="Y"
                defaultValue="0"
                InputProps={{
                  readOnly: true,
                }}
                value={coor[1]}
                size="small"
              />
            </Stack>
          );
        })}
    </Box>
  );
};

export default HouseDetail;
