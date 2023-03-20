import { LoadingButton } from "@mui/lab";
import { Box, Button, Typography, useTheme } from "@mui/material";
import { flexbox } from "@mui/system";
import React from "react";
import { useNavigate } from "react-router-dom";
import welcom from "../../assets/illustration/welcom.svg";
import { tokens } from "../../theme";

const Welcome = () => {
  const theme = useTheme();
  const color = tokens(theme.palette.mode);

  const Navigate = useNavigate();
  const HandleLogin = () => {
    localStorage.setItem("welcom", true);
    Navigate("/login");
  };
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      margin="auto"
      height={"100vh"}
      sx={{
        p: 2,
      }}
    >
      <Box>
        <Box>
          <img style={{ width: "100%" }} src={welcom} />
          <Typography
            sx={{
              textAlign: "center",
              fontWeight: 700,
              color: color.blueAccent[600],
            }}
            variant="h3"
          >
            To
          </Typography>
          <Typography
            sx={{
              textAlign: "center",
              fontWeight: 100,
              color: color.blueAccent[600],
            }}
            variant="h1"
          >
            Software Name System
          </Typography>
        </Box>

        {/* icon talk */}

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 3,
            mt: 5,
          }}
        >
          <LoadingButton
            size="larger"
            color="primary"
            onClick={HandleLogin}
            // loading={loading}
            loadingPosition="end"
            variant="contained"
            style={{ backgroundColor: color.greenAccent[600] }}
          >
            <span style={{ padding: "10px" }}>Login</span>
          </LoadingButton>
          <LoadingButton
            size="larger"
            color="primary"
            // loading={loading}
            loadingPosition="end"
            variant="contained"
            style={{ backgroundColor: color.greenAccent[600] }}
          >
            <span style={{ padding: "10px" }}>Register</span>
          </LoadingButton>
        </Box>
      </Box>
    </Box>
  );
};

export default Welcome;
