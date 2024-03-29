import { Visibility, VisibilityOff } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import {
  Avatar,
  Box,
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
  useTheme,
} from "@mui/material";

import React, { useEffect, useState } from "react";

import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContex";
import { useStateContext } from "../../context/Contex";
import { tokens } from "../../theme";
import { makeRequest } from "../../hooks/axious";
import { encryptData } from "../../global/EncriptData";
import { useLogout } from "../../hooks/logout";
import downlad from "../../assets/illustration/download.jpg";

const Login = ({}) => {
  const { setUser } = useAuthContext();
  const { setIsSidebar, setTopbar } = useStateContext();
  const { logout } = useLogout();
  useEffect(() => {
    setIsSidebar(false);
    setTopbar(false);
    setError(null);
    setUser(null);
    logout();
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

  // functions
  const handleClick = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await makeRequest.post(
        "/auth/login",
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
      await setUser(response?.data, accessToken);

      // Encrypt and store the user data in the local storage
      const encryptedUserData = encryptData(
        JSON.stringify(response.data),
        "secret_key"
      );
      localStorage.setItem("user", encryptedUserData);

      return await setUser(response.data), setLoading(false), Navigate("/");
    } catch (error) {
      setLoading(false);
      if (error.response) {
        // Server responded with an error message
        const statusCode = error.response?.status;
        if (statusCode === 400) {
          setError("Bad Request: Invalid email or password.");
        } else if (statusCode === 401) {
          setError(
            "Unauthorized: You are not authorized to access this resource."
          );
        } else if (statusCode === 403) {
          setError(
            "Forbidden: You don't have permission to access this resource."
          );
        } else if (statusCode === 404) {
          setError("Not Found: The requested resource was not found.");
        } else if (statusCode === 500) {
          setError(
            "Internal Server Error: Something went wrong on the server."
          );
        } else {
          setError("Unknown Error: An unknown error occurred.");
        }
      } else if (error.request) {
        // Network error or no server response
        setError("Network Error: Unable to connect to the server.");
      } else {
        // Other errors (e.g., code error)
        setError("Error: Something went wrong.");
      }
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
        <Avatar
          src={downlad}
          sx={{
            width: 150,
            height: 150,
            margin: "auto",
          }}
        />
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
            </FormControl>
            <span>{error && error}</span>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default Login;
