import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Button } from "@mui/material/";
import Cylinder from "./Cylinder";
import Reactangular from "./Rectangular";

export default function Control_3D({
  setDraw2D,
  setTypeDraw,
  typeDraw,
  setDimension,
}) {
  const handleChange = (e) => {
    setTypeDraw(Number(e.target.value));
  };

  return (
    <div className="ml-6 w-[400px] h-[800px] bg-white rounded-xl overflow-hidden p-10 flex flex-col justify-between">
      <p className="uppercase text-center text-xl font-semibold text-gray-500 mb-4">
        bảng điều khiển
      </p>
      <FormControl fullWidth className="mt-2">
        <InputLabel id="demo-simple-select-label">Hình</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={typeDraw}
          label="Hình"
          onChange={handleChange}
        >
          <MenuItem value={1}>Hình hộp chữ nhật</MenuItem>
          <MenuItem value={2}>Hình trụ</MenuItem>
        </Select>
      </FormControl>
      {typeDraw == 1 ? (
        <Reactangular setDimension={setDimension} />
      ) : (
        <Cylinder setDimension={setDimension} />
      )}
      <Button
        variant="container"
        size="large"
        className="w-full  py-4 mt-auto text-lg bg-blue-400 hover:bg-blue-500 font-bold  text-white"
        onClick={() => {
          setDraw2D((prev) => !prev);
        }}
      >
        Hệ tọa độ 2D
      </Button>
    </div>
  );
}
