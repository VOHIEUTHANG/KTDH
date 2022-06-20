import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useState, memo } from "react";

function Cylinder({ setCylinder }) {
  const [radius, setRadius] = useState(0);
  const [high, setHigh] = useState(0);
  return (
    <div>
      <hr className="my-6" />
      <p className=" text-center text-lg text-blue-700 mb-3">
        Nhập kích thước của hình trụ
      </p>
      <TextField
        id="outlined-basic"
        label="Bán kính"
        variant="outlined"
        value={radius}
        onInput={(e) => {
          setRadius(Number(e.target.value));
        }}
        className="w-full my-3"
      />
      <TextField
        id="outlined-basic"
        label="Chiều cao"
        variant="outlined"
        value={high}
        onInput={(e) => {
          setHigh(Number(e.target.value));
        }}
        className="w-full my-3"
      />
      <Button
        variant="container"
        size="large"
        className="w-full  py-4 mt-4 text-lg bg-blue-400 hover:bg-blue-500 font-bold  text-white"
        onClick={() => {
          setCylinder({ radius, high });
        }}
      >
        Vẽ
      </Button>
    </div>
  );
}

export default memo(Cylinder);
