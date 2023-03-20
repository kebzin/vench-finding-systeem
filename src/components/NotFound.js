import { Box, Typography } from "@mui/material";
import React from "react";
import notfound from "../assets/illustration/notfound.svg";

const NotFound = () => {
  return (
    <Box className="Header">
      <Box
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <img style={{ widht: "100%" }} src={notfound} alt="not fount" />
        <Typography
          sx={{
            mt: 5,
          }}
          variant="h4"
        >
          OOps Page Not Found
        </Typography>
      </Box>
    </Box>
  );
};

export default NotFound;
