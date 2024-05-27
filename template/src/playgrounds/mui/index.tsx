import { createRoot } from "react-dom/client";
import { Button, Typography } from "@mui/material";
import * as React from "react";

const Counter = () => {
  const [count, setCount] = React.useState(0);

  console.log(count);
  return (
    <>
      <Typography>{count}</Typography>
      <Button onClick={() => setCount((x) => x + 1)}>Increment</Button>
      <Button onClick={() => setCount((x) => x - 1)}>Decrement</Button>
    </>
  );
};

createRoot(document.getElementById("root")!).render(<Counter />);
