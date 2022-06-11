import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
export default function Rectangular() {
  return (
    <div>
      <hr className="my-6" />
      <p class=" text-center text-lg text-blue-700 mb-3">
        Nhập kích thước của hình hộp chữ nhật
      </p>
      <TextField
        id="outlined-basic"
        label="Chiều dài"
        variant="outlined"
        className="w-full my-3"
      />
      <TextField
        id="outlined-basic"
        label="Chiều rộng"
        variant="outlined"
        className="w-full my-3"
      />
      <TextField
        id="outlined-basic"
        label="Chiều cao"
        variant="outlined"
        className="w-full my-3"
      />
    </div>
  );
}
