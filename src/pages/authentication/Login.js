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
  useTheme,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";

import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContex";
import { useStateContext } from "../../context/Contex";
import { tokens } from "../../theme";
import { makeRequest } from "../../hooks/axious";

const Login = ({}) => {
  const { setUser } = useAuthContext();
  const { setIsSidebar, setTopbar } = useStateContext();
  useEffect(() => {
    setIsSidebar(false);
    setTopbar(false);
    setError(null);
    setUser(null);
  }, []);

  // states
  const theme = useTheme();
  const color = tokens(theme.palette.mode);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  // hooks
  const Navigate = useNavigate();
  const Location = useLocation();
  const from = Location.state?.from?.pathname || "/";

  // functions
  const handleClick = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        "https://venchfindsystemapi.onrender.com/api/auth/login",
        {
          email: email,
          password: password,
        },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      const accessToken = response?.data?.accessToken;
      await setUser(response.data, accessToken);

      // store the user to the local storage
      // localStorage.setItem("user", JSON.stringify(response.data));

      return await setUser(response.data), setLoading(false), Navigate("/");
    } catch (error) {
      setLoading(false);
      if (!error.response) {
        setError("No Server Response");
      }
      console.log(error);
      await setError(error.response.data.message);
      setLoading(false);

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
        backgroundColor={color.primary}
        boxShadow="rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;"
        border={`1px solid ${color.greenAccent[400]}`}
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
                onChange={(event) => {
                  setemail(event.target.value);
                  setError(null);
                }}
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
                onChange={(event) => {
                  setPassword(event.target.value);
                  setError(null);
                }}
                label="Password"
              />

              <Button
                sx={{
                  mt: 1,
                  color: color.redAccent[400],
                  textAlign: "left",
                  border: "none",
                }}
                variant="outlined"
                onClick={() => Navigate("/forgetpassword")}
              >
                Forget Password
              </Button>

              <LoadingButton
                size="larger"
                color="primary"
                onClick={handleClick}
                loading={loading}
                loadingPosition="end"
                variant="contained"
                style={{ backgroundColor: color.greenAccent[600] }}
              >
                <span style={{ padding: "10px" }}>Login</span>
              </LoadingButton>
              <Link
                style={{
                  textDecoration: "none",
                  paddingTop: "10px",
                  paddingBlockEnd: "10px",
                  color:
                    theme.palette.mode === "dark"
                      ? color.greenAccent[400]
                      : null,
                }}
                to="/register"
              >
                Don't have an Account
              </Link>
            </FormControl>
            <span>{error && error}</span>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default Login;
