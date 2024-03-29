import { LoadingButton } from "@mui/lab";
import {
  Box,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";
import { tokens } from "../../theme";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useMutation, useQueryClient } from "react-query";
import { useStateContext } from "../../context/Contex";
import useAxiousPrivate from "../../hooks/useAxiousPrivate";
import { useAuthContext } from "../../context/AuthContex";

const AddTeller = ({ setAddeUsers }) => {
  const theme = useTheme();
  const color = tokens(theme.palette.mode);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setemail] = useState("");
  const [firstName, setfirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [bankName, setBankName] = useState("");
  const [PhoneNumber, setPhoneNumber] = useState("");
  const [password, setpassword] = useState("");
  const { setDialogMessage, setOPenDialog, setErrorIcon } = useStateContext();
  const [loading, setLoading] = useState(false);
  const { user } = useAuthContext();

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const AxiousPrivate = useAxiousPrivate();
  const queryclient = useQueryClient();

  const mutation = useMutation(
    (newPost) => {
      console.log(newPost);
      return AxiousPrivate.post(`/teller/teller`, newPost);
    },
    {
      onSuccess: (respond) => {
        setOPenDialog(true);
        setDialogMessage(respond.data.message);
        setLoading(false);
        setAddeUsers(false);
        queryclient.invalidateQueries("teller");
      },
      onError: (error) => {
        setLoading(false);
        setOPenDialog(true);
        setErrorIcon(true);
        console.log("error", error.response.data.message);
        setDialogMessage(error.response.data.message);
      },
    }
  );

  const HandleSubmit = async () => {
    try {
      if (
        !(Boolean(firstName),
        Boolean(lastName),
        Boolean(bankName),
        Boolean(PhoneNumber),
        Boolean(password),
        Boolean(email))
      ) {
        return (
          setOPenDialog(true),
          setErrorIcon(true),
          setDialogMessage("All field are require")
        );
      }
      setLoading(true);
      mutation.mutate({
        firstName: firstName,
        lastName: lastName,
        bankName: bankName,
        officerId: user?.Officers?.id,
        Email: email,
        PhoneNumber: PhoneNumber,
        password: password,

        // AdminID: user.Officers.id,
      });
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        zIndex: 10,
        top: "5%",
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
              theme.palette.mode === "dark" ? color.primary[400] : "white",
            padding: 2,
            margin: "auto",

            boxShadow:
              theme.palette.mode === "dark"
                ? color.primary[400]
                : " rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px",
            border: `1px solid 
              ${theme.palette.mode === "dark" ? color.greenAccent[400] : null}`,
          }}
        >
          <Box display="flex" flexDirection="column" alignItems="center">
            <Typography variant="h3" sx={{ fontWeight: 1000 }}>
              Add Teller
            </Typography>

            <Box
              sx={{
                width: "100%",
                display: "flex",
                gap: 2,
                mt: 2,
              }}
            >
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
                    id="outlined-basic1"
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
                    id="outlined-basic2"
                    label="Bank Name"
                    variant="outlined"
                    size="full"
                    required={true}
                    type="text"
                    onChange={(event) => setBankName(event.target.value)}
                    value={bankName}
                  />
                </FormControl>

                <FormControl sx={{ m: 1, width: "100%" }} variant="outlined">
                  <TextField
                    id="outlined-basic5"
                    label="Enter Phone Number"
                    variant="outlined"
                    size="full"
                    type="number"
                    required={true}
                    onChange={(event) => setPhoneNumber(event.target.value)}
                  />
                </FormControl>
                <FormControl sx={{ m: 1, width: "100%" }} variant="outlined">
                  <TextField
                    id="outlined-basic4"
                    label="Enter Email Address"
                    variant="outlined"
                    size="full"
                    type="email"
                    required={true}
                    onChange={(event) => setemail(event.target.value)}
                  />
                </FormControl>

                <FormControl
                  sx={{ m: 1, width: "100%" }}
                  variant="outlined"
                  onChange={(event) => setpassword(event.target.value)}
                >
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
                  />
                </FormControl>

                <LoadingButton
                  size="larger"
                  color="primary"
                  onClick={HandleSubmit}
                  loading={loading}
                  loadingPosition="end"
                  variant="contained"
                  sx={{ mt: 1 }}
                  style={{
                    backgroundColor: color.greenAccent[600],
                    width: "100%",
                    mt: 3,
                  }}
                >
                  <span style={{ padding: "10px" }}>Add Teller</span>
                </LoadingButton>
                <LoadingButton
                  size="larger"
                  color="primary"
                  onClick={() => setAddeUsers(false)}
                  variant="contained"
                  sx={{ mt: 1 }}
                  style={{
                    backgroundColor: color.greenAccent[600],
                    width: "100%",
                    mt: 3,
                  }}
                >
                  <span style={{ padding: "10px" }}>cancel</span>
                </LoadingButton>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default AddTeller;
