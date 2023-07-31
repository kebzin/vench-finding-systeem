import { Visibility, VisibilityOff } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import {
  Box,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
  useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { tokens } from "../../theme";
import axios from "axios";
import { useStateContext } from "../../context/Contex";
import swal from "sweetalert";

const Register = () => {
  const theme = useTheme();
  const color = tokens(theme.palette.mode);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setemail] = useState("");
  const [firstName, setfirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [PoliceStation, setPoliceStation] = useState("");
  const [PhoneNumber, setPhoneNumber] = useState("");
  const [rank, setrank] = useState("");
  const [password, setpassword] = useState("");
  const [error, seterror] = useState(null);

  const [loading, setLoading] = useState(false);
  const Navigate = useNavigate();

  const { setIsSidebar, setTopbar } = useStateContext();
  useEffect(() => {
    setIsSidebar(false);
    setTopbar(false);
  }, []);

  // handle submit function
  const HandleSubmit = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:3009/api/auth/register",

        {
          firstName: firstName,
          lastName: lastName,
          PoliceStation: PoliceStation,
          rank: rank,
          email: email,
          password: password,
          PhoneNumber: PhoneNumber,
        },
        { withCredentials: true }
      );

      swal(
        "Register Successfull!",
        "Your account will be verified withen 24hr!  please be patent",
        "success",
        {
          button: "ok",
        }
      );

      Navigate("/login");
    } catch (error) {
      console.log(error.message);
      seterror(error.response.data.message);
      setLoading(false);
    }
  };

  // const alarfunction = () => {
  //   <Alert
  //     action={
  //       <Button color="inherit" size="small">
  //         Login
  //       </Button>
  //     }
  //   >
  //     Register Succesfull!! Your account will be activated withen 24hrs
  //   </Alert>;
  // };

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
        border={`1px solid ${color.greenAccent[500]}`}
      >
        <h1
          style={{
            textAlign: "center",
            fontSize: 40,
            fontWeight: "bolder",
          }}
        >
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
                type="text"
                onChange={(event) => setfirstName(event.target.value)}
              />
            </FormControl>
            <FormControl sx={{ m: 1, width: "100%" }} variant="outlined">
              <TextField
                id="outlined-basic"
                label="Enter Last Name"
                variant="outlined"
                size="full"
                required={true}
                type="text"
                onChange={(event) => {
                  setLastName(event.target.value);
                }}
              />
            </FormControl>
            <FormControl sx={{ m: 1, width: "100%" }} variant="outlined">
              <TextField
                id="outlined-basic"
                label="Enter Your post Station"
                variant="outlined"
                size="full"
                required={true}
                type="text"
                onChange={(event) => setPoliceStation(event.target.value)}
              />
            </FormControl>

            <FormControl sx={{ m: 1, width: "100%" }} variant="outlined">
              <TextField
                id="outlined-basic"
                label="Enter Your Rank"
                variant="outlined"
                size="full"
                required={true}
                type="text"
                onChange={(event) => setrank(event.target.value)}
              />
            </FormControl>

            <FormControl sx={{ m: 1, width: "100%" }} variant="outlined">
              <TextField
                id="outlined-basic"
                label="Enter Email Address"
                variant="outlined"
                size="full"
                type="email"
                required={true}
                onChange={(event) => setemail(event.target.value)}
              />
            </FormControl>
            <FormControl sx={{ m: 1, width: "100%" }} variant="outlined">
              <TextField
                id="outlined-basic"
                label="Enter Phone Number"
                variant="outlined"
                size="full"
                type="text"
                required={true}
                onChange={(event) => setPhoneNumber(event.target.value)}
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
                required={true}
                onChange={(event) => setpassword(event.target.value)}
              />

              <LoadingButton
                size="larger"
                color="primary"
                onClick={HandleSubmit}
                loading={loading}
                loadingPosition="end"
                variant="contained"
                sx={{
                  mt: 1,
                  backgroundColor: color.greenAccent[600],
                }}
              >
                <span style={{ padding: "10px" }}>Register</span>
              </LoadingButton>
              <Link
                style={{
                  textDecoration: "none",
                  paddingTop: "10px",
                  paddingBlockEnd: "10px",
                  color: color.greenAccent[400],
                }}
                to="/login"
              >
                Already have an Account
              </Link>
            </FormControl>
            <span>{error && error}</span>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default Register;
