import TextField from "@mui/material/TextField";
import { useState, memo } from "react";
import Button from "@mui/material/Button";
function Rectangular({ setRectangular }) {
  const [long, setLong] = useState(0);
  const [wide, setWide] = useState(0);
  const [high, setHigh] = useState(0);
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [z, setZ] = useState(0);

  return (
    <div>
      <hr className="my-6" />
      <p className=" text-center text-lg text-blue-700 mb-3 ">
        Nhập tọa độ điểm gốc
      </p>
      <div className="flex flex-row gap-2">
        <TextField
          label="X"
          value={x}
          onChange={(e) => {
            setX(e.target.value);
          }}
          size="small"
        />
        <TextField
          label="Y"
          value={y}
          onChange={(e) => {
            setY(e.target.value);
          }}
          size="small"
        />
        <TextField
          label="Z"
          value={z}
          onChange={(e) => {
            setZ(e.target.value);
          }}
          size="small"
        />
      </div>
      <p className=" text-center text-lg text-blue-700 mb-3 mt-4">
        Nhập kích thước của hình hộp chữ nhật
      </p>
      <TextField
        id="outlined-basic"
        label="Chiều dài"
        variant="outlined"
        value={long}
        onInput={(e) => {
          setLong(Number(e.target.value));
        }}
        className="w-full my-3"
      />
      <TextField
        id="outlined-basic"
        label="Chiều rộng"
        variant="outlined"
        value={wide}
        onInput={(e) => {
          setWide(Number(e.target.value));
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
          setRectangular({ long, wide, high, x, y, z });
        }}
      >
        Vẽ
      </Button>
    </div>
  );
}

export default memo(Rectangular);
