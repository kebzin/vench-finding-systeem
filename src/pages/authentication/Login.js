import { Visibility, VisibilityOff } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import {
  Box,
  Button,
  colors,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const Navigate = useNavigate();

  // functions
  const handleClick = (event) => {
    event.preventDefault();
    setLoading(true);
    Navigate("/");
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
          Login
        </h1>
        <form>
          <Box display="flex" alignItems="center" flexDirection="column">
            <FormControl sx={{ m: 1, width: "100%" }} variant="outlined">
              <TextField
                id="outlined-basic"
                label="Enter Email Address"
                variant="outlined"
                size="full"
                type="email"
                onChange={(event) => setUser(event.target.value)}
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
                onChange={(event) => setPassword(event.target.value)}
                label="Password"
              />
              <Link
                style={{
                  textDecoration: "none",
                  paddingTop: "10px",
                  paddingBlockEnd: "10px",
                }}
              >
                Forget Password
              </Link>

              <LoadingButton
                size="larger"
                color="primary"
                onClick={handleClick}
                loading={loading}
                loadingPosition="end"
                variant="contained"
                style={{ backgroundColor: "none" }}
              >
                <span style={{ padding: "10px" }}>Login</span>
              </LoadingButton>
              <Link
                style={{
                  textDecoration: "none",
                  paddingTop: "10px",
                  paddingBlockEnd: "10px",
                }}
                to="/register"
              >
                Don't have an Account
              </Link>
            </FormControl>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default Login;
