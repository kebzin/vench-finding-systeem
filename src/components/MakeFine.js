import { useTheme } from "@emotion/react";
import { LoadingButton } from "@mui/lab";
import { Box, FormControl, TextField } from "@mui/material";
import React, { useState } from "react";
import { tokens } from "../theme";

const addButtonContainer = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  margin: "auto",
  height: "100%",
};

const MakeFine = () => {
  // states
  const [loading, setLoading] = useState(false);

  const theme = useTheme();
  const COLORS = tokens(theme.palette.mode);
  const AddButtonContainerContent = {
    borderRadius: ".7rem",
    height: "auto",
    background: theme.palette.mode === "dark" ? COLORS.primary[400] : "white",
    padding: 3,
    margin: "auto",
    miniWidth: "50%",
    boxShadow:
      theme.palette.mode === "dark"
        ? COLORS.primary[400]
        : "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
    border: `1px solid 
        ${theme.palette.mode === "dark" ? COLORS.greenAccent[400] : null}`,
  };

  return (
    <Box sx={addButtonContainer} className="Transition">
      <Box sx={AddButtonContainerContent}>
        <Box display="flex" flexDirection="column" alignItems="center">
          <FormControl sx={{ width: "100%" }} variant="outlined">
            <TextField
              id="outlined-basic"
              label="Drivers Number Plate"
              variant="outlined"
              size="full"
              type="email"
              onChange={() => {}}
            />
          </FormControl>

          <FormControl sx={{ mt: 2, width: "100%" }} variant="outlined">
            <TextField
              id="outlined-basic"
              label=" Dreiver Licen Number"
              variant="outlined"
              size="full"
              type="email"
              onChange={() => {}}
            />
          </FormControl>

          <FormControl sx={{ mt: 2, width: "100%" }} variant="outlined">
            <TextField
              id="outlined-basic"
              label="Drivers Name"
              variant="outlined"
              size="full"
              type="email"
              onChange={() => {}}
            />
          </FormControl>

          <FormControl sx={{ mt: 2, width: "100%" }} variant="outlined">
            <TextField
              id="outlined-basic"
              label="Drivers Address"
              variant="outlined"
              size="full"
              type="email"
              onChange={() => {}}
            />
          </FormControl>

          <FormControl sx={{ mt: 2, width: "100%" }} variant="outlined">
            <TextField
              id="outlined-basic"
              label="Crime Commited"
              variant="outlined"
              size="full"
              type="email"
              onChange={() => {}}
            />
          </FormControl>

          <FormControl sx={{ mt: 2, width: "100%" }} variant="outlined">
            <TextField
              id="outlined-basic"
              label="Commited Crime Price"
              variant="outlined"
              size="full"
              type="email"
              onChange={() => {}}
            />
          </FormControl>

          <LoadingButton
            sx={{
              width: "100%",
              mt: 2,
              background:
                theme.palette.mode === "dark"
                  ? COLORS.greenAccent[700]
                  : COLORS.greenAccent[500],
              "&:hover": { background: COLORS.greenAccent[500] },
            }}
            onClick={() => {}}
            loading={loading}
            loadingPosition="end"
            variant="contained"
          >
            <span style={{ padding: "10px" }}>Post</span>
          </LoadingButton>
        </Box>
      </Box>
    </Box>
  );
};

export default MakeFine;
