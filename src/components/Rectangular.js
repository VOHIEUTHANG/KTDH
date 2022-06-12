import TextField from "@mui/material/TextField";
import { useState } from "react";
import Button from "@mui/material/Button";
export default function Rectangular({ setDimension }) {
  const [long, setLong] = useState(0);
  const [wide, setWide] = useState(0);
  const [high, setHigh] = useState(0);
  return (
    <div>
      <hr className="my-6" />
      <p className=" text-center text-lg text-blue-700 mb-3">
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
          setDimension({ long, wide, high });
        }}
      >
        Vẽ
      </Button>
    </div>
  );
}
