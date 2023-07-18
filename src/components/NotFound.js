import { Box, Typography, useTheme } from "@mui/material";
import React, { useEffect } from "react";
import notfound from "../assets/illustration/notfound.svg";
import { useStateContext } from "../context/Contex";
import { LoadingButton } from "@mui/lab";
import { useNavigate } from "react-router-dom";
import { tokens } from "../theme";

const NotFound = () => {
  const { setIsSidebar, setTopbar } = useStateContext();
  useEffect(() => {
    setIsSidebar(false);
    setTopbar(false);
  }, [setIsSidebar, setTopbar]);

  const theme = useTheme();
  const color = tokens(theme.palette.mode);

  // hook
  const Navigate = useNavigate();
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
        <LoadingButton
          color="primary"
          onClick={() => Navigate(-1)}
          variant="contained"
          style={{ backgroundColor: color.greenAccent[600] }}
        >
          <span style={{ padding: "10px" }}>Go Back</span>
        </LoadingButton>
      </Box>
    </Box>
  );
};

export default NotFound;
