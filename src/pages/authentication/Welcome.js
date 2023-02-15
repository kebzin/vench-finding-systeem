import { Box, Button } from "@mui/material";
import { flexbox } from "@mui/system";
import React from "react";

const Welcome = () => {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      margin="auto"
      width={500}
      height={"100vh"}
    >
      <Box>
        <h1>Welcome</h1>
        <p>welcome to the vwnch finding ystem</p>
        <Button variant="contained" size="larger" onClick={() => {}}>
          Continue
        </Button>
      </Box>
    </Box>
  );
};

export default Welcome;
