import { Button, TextField, InputAdornment, Avatar } from "@mui/material";

function TextFieldComp({ img, coorVal }) {
  const { x1, x2, y1, y2 } = coorVal;
  return (
    <div className="flex items-center">
      <div className="w-1/2 flex justify-start  items-center">
        <Avatar src={img} sx={{ width: 100, height: 100 }} />
      </div>
      <div className="ml-2">
        <div className="flex ">
          <TextField
            className="my-3 mx-2"
            id="outlined-read-only-input"
            label="X"
            value={x1}
            defaultValue="0"
            InputProps={{
              readOnly: true,
            }}
          />
          <TextField
            className="my-3 "
            id="outlined-read-only-input"
            label="Y"
            value={y1}
            defaultValue="0"
            InputProps={{
              readOnly: true,
            }}
          />
        </div>
        <div className="flex  ">
          <TextField
            className="my-3 mx-2"
            id="outlined-read-only-input"
            label="X"
            value={x2}
            defaultValue="0"
            InputProps={{
              readOnly: true,
            }}
          />
          <TextField
            className="my-3"
            id="outlined-read-only-input"
            label="Y"
            value={y2}
            defaultValue="0"
            InputProps={{
              readOnly: true,
            }}
          />
        </div>
      </div>
    </div>
  );
}
export default TextFieldComp;
