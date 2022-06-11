import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
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
      <Button
        variant="container"
        size="large"
        className="w-full  py-4 mt-4 text-lg bg-blue-400 hover:bg-blue-500 font-bold  text-white"
      >
        Vẽ
      </Button>
    </div>
  );
}
