import TextField from "@mui/material/TextField";
export default function Cylinder() {
  return (
    <div>
      <hr className="my-6" />
      <p class=" text-center text-lg text-blue-700 mb-3">
        Nhập kích thước của hình trụ
      </p>
      <TextField
        id="outlined-basic"
        label="Bán kính"
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
