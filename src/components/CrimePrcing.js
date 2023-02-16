import { LoadingButton } from "@mui/lab";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { tokens } from "../theme";

const addButtonContainer = {};

const CrimePrcing = ({ setToggleAdd }) => {
  const theme = useTheme();
  const COLORS = tokens(theme.palette.mode);
  const [loading, setLoading] = useState(false);
  const Navigate = useNavigate();
  const [CrimeName, setCrimeName] = useState("");
  const [Category, setCategory] = useState("");
  const [price, setprice] = useState("");

  // handle submit function
  const HandleSubmit = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);
      setTimeout(() => {
        Navigate("");
      }, 1000);
    } catch (error) {
      console.log(error.message);
    }
  };

  //   handle cancel
  const HandleCancel = (event) => {
    event.preventDefault();
    // a function will be inplemented late to stop the post from happen when the user click the button
    setToggleAdd((previouse) => !previouse);
  };
  return (
    <Box
      sx={{
        position: "fixed",
        width: "100%",
        height: "100%",
        top: "50%",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            borderRadius: ".7rem",
            height: "auto",
            background:
              theme.palette.mode === "dark" ? COLORS.primary[400] : "white",
            padding: 3,
            margin: "auto",

            boxShadow:
              theme.palette.mode === "dark"
                ? COLORS.primary[400]
                : " rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px",
            border: `1px solid 
                ${
                  theme.palette.mode === "dark" ? COLORS.greenAccent[400] : null
                }`,
          }}
        >
          <Box display="flex" flexDirection="column" alignItems="center">
            <Typography variant="h3" sx={{ mb: 2 }}>
              Add Fine Prices
            </Typography>
            <FormControl sx={{ width: "100%" }} variant="outlined">
              <TextField
                id="outlined-basic"
                label="Enter Crime Name"
                variant="outlined"
                size="full"
                type="email"
                required="true"
                onChange={(event) => setCrimeName(event.target.value)}
                value={CrimeName}
              />
            </FormControl>

            <FormControl sx={{ mt: 2, width: "100%" }} variant="outlined">
              <TextField
                id="outlined-basic"
                label=" Enter Category Namee .g cars, trucks"
                variant="outlined"
                size="full"
                type="text"
                required="true"
                onChange={(event) => setCategory(event.target.value)}
                value={Category}
              />
            </FormControl>
            <FormControl sx={{ mt: 2, width: "100%" }} variant="outlined">
              <TextField
                id="outlined-basic"
                label=" Enter Fine Amount "
                variant="outlined"
                size="full"
                type="number"
                required="true"
                onChange={(event) => setprice}
                value={price}
              />
            </FormControl>

            {/* <FormControl fullWidth sx={{ mt: 2 }}>
              <InputLabel id="demo-simple-select-label">Age</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={"category"}
                label="Age"
                onChange={() => {}}
              >
                <MenuItem
                  sx={{
                    backgroundColor: COLORS.primary[400],

                    mt: 0,
                  }}
                  value={"Vench"}
                >
                  Vench
                </MenuItem>
                <MenuItem
                  sx={{
                    backgroundColor: COLORS.primary[400],

                    mt: 0,
                  }}
                  value={"Trucks"}
                >
                  Trucks
                </MenuItem>
                <MenuItem
                  sx={{
                    backgroundColor: COLORS.primary[400],

                    mt: 0,
                  }}
                  value={"Bicycles"}
                >
                  Bicycles
                </MenuItem>
                <MenuItem
                  sx={{
                    backgroundColor: COLORS.primary[400],

                    mt: 0,
                  }}
                  value={"MotoBicycle"}
                >
                  MotoBicycle
                </MenuItem>
                <MenuItem
                  sx={{
                    backgroundColor: COLORS.primary[400],

                    mt: 0,
                  }}
                  value={"Bicycles"}
                >
                  Bicycles
                </MenuItem>
              </Select>
            </FormControl> */}

            <Box
              sx={{
                width: "100%",
                display: "flex",
                gap: 2,
                mt: 2,
              }}
            >
              <LoadingButton
                size="larger"
                color="primary"
                onClick={HandleCancel}
                loading={false}
                loadingPosition="end"
                variant="contained"
                sx={{ mt: 1 }}
                style={{
                  backgroundColor: COLORS.greenAccent[600],
                  width: "100%",
                  mt: 3,
                }}
              >
                <span style={{ padding: "10px" }}>Cancel</span>
              </LoadingButton>
              <LoadingButton
                size="larger"
                color="primary"
                onClick={HandleSubmit}
                loading={loading}
                loadingPosition="end"
                variant="contained"
                sx={{ mt: 1 }}
                style={{
                  backgroundColor: COLORS.greenAccent[600],
                  width: "100%",
                  mt: 3,
                }}
              >
                <span style={{ padding: "10px" }}>add pricing</span>
              </LoadingButton>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default CrimePrcing;
