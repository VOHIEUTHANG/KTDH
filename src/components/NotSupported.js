import { Alert } from "@mui/material";
export default function NotSupported() {
  return (
    <div>
      <Alert className="text-xl font-bold" severity="warning">
        The device's screen must be larger than 1900px, otherwise, the program
        will not supported !
      </Alert>
    </div>
  );
}
