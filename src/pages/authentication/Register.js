import { Visibility, VisibilityOff } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import SaveIcon from "@mui/icons-material/Save";
import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const Navigate = useNavigate();

  // handle submit function
  const HandleSubmit = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);
      setTimeout(() => {
        Navigate("/login");
      }, 1000);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      margin="auto"
      height="100vh"
    >
      <Box
        padding="2rem"
        minWidth={"25%"}
        borderRadius=".7rem "
        backgroundColor="#ffff"
        boxShadow="rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;"
      >
        <h1 style={{ textAlign: "center", fontSize: 40, fontWeight: "bolder" }}>
          Register
        </h1>
        <form>
          <Box display="flex" alignItems="center" flexDirection="column">
            <FormControl sx={{ m: 1, width: "100%" }} variant="outlined">
              <TextField
                id="outlined-basic"
                label="Enter First Name"
                variant="outlined"
                size="full"
                required="true"
                type="text"
              />
            </FormControl>
            <FormControl sx={{ m: 1, width: "100%" }} variant="outlined">
              <TextField
                id="outlined-basic"
                label="Enter Last Name"
                variant="outlined"
                size="full"
                required="true"
                type="text"
              />
            </FormControl>
            <FormControl sx={{ m: 1, width: "100%" }} variant="outlined">
              <TextField
                id="outlined-basic"
                label="Enter Your post Station"
                variant="outlined"
                size="full"
                required="true"
                type="text"
              />
            </FormControl>

            <FormControl sx={{ m: 1, width: "100%" }} variant="outlined">
              <TextField
                id="outlined-basic"
                label="Enter Your Rank"
                variant="outlined"
                size="full"
                required="true"
                type="text"
              />
            </FormControl>

            <FormControl sx={{ m: 1, width: "100%" }} variant="outlined">
              <TextField
                id="outlined-basic"
                label="Enter Email Address"
                variant="outlined"
                size="full"
                type="email"
                required="true"
              />
            </FormControl>

            <FormControl sx={{ m: 1, width: "100%" }} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">
                Password
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={showPassword ? "text" : "password"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
                required="true"
              />

              <LoadingButton
                size="larger"
                color="primary"
                onClick={HandleSubmit}
                loading={loading}
                loadingPosition="end"
                variant="contained"
                sx={{ mt: 1 }}
                style={{ backgroundColor: "none" }}
              >
                <span style={{ padding: "10px" }}>Register</span>
              </LoadingButton>
              <Link
                style={{
                  textDecoration: "none",
                  paddingTop: "10px",
                  paddingBlockEnd: "10px",
                }}
                to="/login"
              >
                Already have an Account
              </Link>
            </FormControl>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default Register;
