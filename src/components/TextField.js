import { Button, TextField, InputAdornment, Avatar } from "@mui/material";

function TextFieldComp() {
  return (
    <div className="flex items-center">
      <div className="w-1/2 flex justify-start  items-center">
        <Avatar
          src="https://cdn.pixabay.com/photo/2018/07/31/04/16/windmill-3574169_960_720.jpg"
          sx={{ width: 100, height: 100 }}
        />
      </div>
      <div className="flex flex-col ">
        <TextField
          className="my-3"
          id="outlined-read-only-input"
          label="X value"
          defaultValue="10"
          InputProps={{
            readOnly: true,
            endAdornment: <InputAdornment position="end">pixel</InputAdornment>,
          }}
        />
        <TextField
          className="my-3"
          id="outlined-read-only-input"
          label="Y value"
          defaultValue="50"
          InputProps={{
            readOnly: true,
            endAdornment: <InputAdornment position="end">pixel</InputAdornment>,
          }}
        />
      </div>
    </div>
  );
}
export default TextFieldComp;
