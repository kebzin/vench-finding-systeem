import { LoadingButton } from "@mui/lab";
import {
  Box,
  Button,
  FormControl,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { tokens } from "../../theme";

const ForgetPassword = () => {
  const theme = useTheme();
  const color = tokens(theme.palette.mode);

  //   state
  const [loading, setLoading] = useState(false);
  const [PhoneNumberField, setPhoneNumberField] = useState("");
  const [PhoneNumberDisplay, setPhoneNumberDisplay] = useState(true);
  const [codeDisplay, setcodeDisplay] = useState(false);
  const [CodeOne, setCodeOne] = useState("");
  const [CodeTwo, setCodeTwo] = useState("");
  const [CodeThree, setCodeThree] = useState("");
  const [CodeFour, setCodeFour] = useState("");
  const [forgetPasswordDisplay, setForgetPasswordDisplay] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confermPassword, setConfermPassword] = useState("");
  const [error, setError] = useState("");

  // hooks
  const Navigate = useNavigate();

  // handle Phone Number submititng
  const HandlePhoneNumberSubmit = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);
      if (PhoneNumberField.length < 6) {
        return (
          setError("This Number is too small to be a valid phone number"),
          setLoading(false)
        );
      }

      // on sucess set navigat to another page and set the previouse page to false
      setPhoneNumberDisplay(false);
      setcodeDisplay(true);
      setError(null);
      setLoading(false);
    } catch (error) {
      // on error set loading to false
      setLoading(false);
    }
  };

  // handle Phone Number submititng
  const HandleCodeSubmit = async () => {
    setLoading(true);
    setPhoneNumberDisplay(false);
    setcodeDisplay(false);
    setForgetPasswordDisplay(true);
    setLoading(false);
  };

  const HandleBckNavigation = async () => {
    setLoading(false);
    setPhoneNumberDisplay(true);
    setcodeDisplay(false);
    setCodeFour("");
    setCodeOne("");
    setCodeTwo("");
    setCodeThree("");
  };

  //  Handle submit
  const HandleSubmit = (event) => {
    event.preventDefault();

    try {
      if (newPassword.length <= 8)
        return setError("Password must be at least 8 characters");
      if (confermPassword !== newPassword)
        return setError("Password do not match");
    } catch (error) {
      // set the error
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <Box
        padding="2rem"
        minWidth={"25%"}
        borderRadius=".7rem "
        backgroundColor={color.primary}
        boxShadow="rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;"
        border={`1px solid ${
          theme.palette.mode === "dark" ? color.greenAccent[400] : null
        }`}
      >
        <Typography
          variant="h2"
          style={{ textAlign: "center", fontWeight: "bolder" }}
        >
          Forget Password
        </Typography>

        {
          // enter your number
          PhoneNumberDisplay && (
            <Box>
              <form>
                <Typography sx={{ mt: 2 }}>
                  Please enter the Phone number your used <br></br> to created
                  your account previousely
                </Typography>

                <FormControl
                  sx={{ mt: 2, width: "100%", mb: 3 }}
                  variant="outlined"
                  onChange={(event) => setPhoneNumberField(event.target.value)}
                >
                  <TextField
                    id="outlined-basic"
                    label="Enter Your Phone Number"
                    variant="outlined"
                    size="full"
                    type="text"
                    value={PhoneNumberField}
                  />
                </FormControl>
              </form>
              <LoadingButton
                size="larger"
                color="primary"
                onClick={HandlePhoneNumberSubmit}
                loading={loading}
                loadingPosition="end"
                variant="contained"
                style={{ backgroundColor: color.greenAccent[600] }}
              >
                <span style={{ padding: "10px", mt: 3, textAlign: "center" }}>
                  Next
                </span>
              </LoadingButton>
            </Box>
          )
        }

        {
          // enter verify phone number
          codeDisplay && (
            <Box>
              <Typography sx={{ mt: 3, mb: 3 }}>
                {`Please enter the 4 Digit number sent to *****${PhoneNumberField.charAt(
                  PhoneNumberField.length - 2
                )}${PhoneNumberField.charAt(PhoneNumberField.length - 1)}`}
              </Typography>
              <Button
                sx={{
                  color: color.redAccent[400],
                  textAlign: "left",
                }}
                variant="outlined"
                onClick={HandleBckNavigation}
              >
                Back
              </Button>
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(70px, 4fr))",
                  gridAutoRows: "60px",
                  justifyContent: "center",
                  mb: 3,
                }}
              >
                <FormControl
                  sx={{
                    m: 1,

                    borderRadius: 5,
                    textAlign: "center",
                  }}
                  variant="outlined"
                  onChange={(event) => setCodeOne(event.target.value)}
                  value={CodeOne}
                >
                  <TextField
                    id="outlined-basic"
                    label="Enter Code"
                    variant="outlined"
                    size="full"
                    type="email"
                  />
                </FormControl>
                <FormControl
                  sx={{
                    m: 1,

                    borderRadius: 5,
                    textAlign: "center",
                  }}
                  variant="outlined"
                  onChange={(event) => setCodeTwo(event.target.value)}
                  value={CodeTwo}
                >
                  <TextField
                    id="outlined-basic"
                    label="Enter Code"
                    variant="outlined"
                    size="full"
                    type="email"
                  />
                </FormControl>
                <FormControl
                  sx={{
                    m: 1,

                    borderRadius: 5,
                    textAlign: "center",
                  }}
                  variant="outlined"
                  onChange={(event) => setCodeThree(event.target.value)}
                  value={CodeThree}
                >
                  <TextField
                    id="outlined-basic"
                    label="Enter Code"
                    variant="outlined"
                    size="full"
                    type="email"
                  />
                </FormControl>
                <FormControl
                  sx={{
                    m: 1,

                    borderRadius: 5,
                    textAlign: "center",
                  }}
                  variant="outlined"
                  onChange={(event) => setCodeFour(event.target.value)}
                  value={CodeFour}
                >
                  <TextField
                    id="outlined-basic"
                    label="Enter Code"
                    variant="outlined"
                    size="full"
                    type="text"
                  />
                </FormControl>
              </Box>
              <LoadingButton
                size="larger"
                color="primary"
                onClick={HandleCodeSubmit}
                loading={loading}
                loadingPosition="end"
                variant="contained"
                style={{ backgroundColor: color.greenAccent[600] }}
              >
                <span style={{ padding: "10px", mt: 3, textAlign: "center" }}>
                  Next
                </span>
              </LoadingButton>
            </Box>
          )
        }

        {
          // change password

          forgetPasswordDisplay && (
            <form>
              <Typography sx={{ m: 1 }}>Enter Your New Password </Typography>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <FormControl
                  sx={{
                    m: 1,

                    borderRadius: 5,
                    textAlign: "center",
                  }}
                  variant="outlined"
                  onChange={(event) => setNewPassword(event.target.value)}
                  value={newPassword}
                >
                  <TextField
                    id="outlined-basic"
                    label="Enter New Password"
                    variant="outlined"
                    size="full"
                    type="text"
                  />
                </FormControl>

                <FormControl
                  sx={{
                    m: 1,

                    borderRadius: 5,
                    textAlign: "center",
                  }}
                  variant="outlined"
                  onChange={(event) => setConfermPassword(event.target.values)}
                  value={confermPassword}
                >
                  <TextField
                    id="outlined-basic"
                    label="Conferm Password"
                    variant="outlined"
                    size="full"
                    type="text"
                  />
                </FormControl>

                <LoadingButton
                  size="larger"
                  color="primary"
                  onClick={HandleSubmit}
                  loading={loading}
                  loadingPosition="end"
                  variant="contained"
                  style={{ backgroundColor: color.greenAccent[600] }}
                >
                  <span style={{ padding: "10px", mt: 3, textAlign: "center" }}>
                    submit
                  </span>
                </LoadingButton>
              </Box>
            </form>
          )
        }
        <Typography
          sx={{
            mt: 2,
            color: color.redAccent[600],
          }}
        >
          {error}
        </Typography>
      </Box>
      <Button
        sx={{
          color: color.redAccent[400],
          position: "absolute",
          top: "25%",
          left: "25%",
        }}
        variant="outlined"
        onClick={() => Navigate(-1)}
      >
        Back to Login
      </Button>
    </Box>
  );
};

export default ForgetPassword;
