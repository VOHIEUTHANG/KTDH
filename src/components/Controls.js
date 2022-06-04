import { Button, TextField, InputAdornment, Avatar } from "@mui/material";
import ViewInArIcon from "@mui/icons-material/ViewInAr";
import { useEffect, useState } from "react";
function Controls() {
  const [title, setTitle] = useState("");

  useEffect(() => {
    console.log("main");

    return () => {
      console.log("clean up function");
    };
  }, []);

  return (
    <div className="ml-6 w-[400px] h-[800px] bg-white rounded-xl overflow-hidden p-10 flex flex-col justify-between">
      <p className="uppercase text-center text-xl font-semibold text-gray-500 mb-4">
        bảng điều khiển
      </p>

      <div>
        <div className="flex items-center">
          <div className="w-1/2 flex justify-start  items-center">
            <Avatar src="" sx={{ width: 100, height: 100 }} />
          </div>
          <div className="flex flex-col ">
            <TextField
              className="my-3"
              id="outlined-read-only-input"
              label="X value"
              defaultValue="10"
              InputProps={{
                readOnly: true,
                endAdornment: (
                  <InputAdornment position="end">pixel</InputAdornment>
                ),
              }}
            />
            <TextField
              className="my-3"
              id="outlined-read-only-input"
              label="X value"
              defaultValue="50"
              InputProps={{
                readOnly: true,
                endAdornment: (
                  <InputAdornment position="end">pixel</InputAdornment>
                ),
              }}
            />
          </div>
        </div>
        <hr className="my-4" />
        <div className="flex items-center">
          <div className="w-1/2 flex justify-start  items-center">
            <Avatar src="" sx={{ width: 100, height: 100 }} />
          </div>
          <div className="flex flex-col ">
            <TextField
              className="my-3"
              id="outlined-read-only-input"
              label="X value"
              defaultValue="10"
              InputProps={{
                readOnly: true,
                endAdornment: (
                  <InputAdornment position="end">pixel</InputAdornment>
                ),
              }}
            />
            <TextField
              className="my-3"
              id="outlined-read-only-input"
              label="X value"
              defaultValue="50"
              InputProps={{
                readOnly: true,
                endAdornment: (
                  <InputAdornment position="end">pixel</InputAdornment>
                ),
              }}
            />
          </div>
        </div>
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
