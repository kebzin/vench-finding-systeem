import { LoadingButton } from "@mui/lab";
import {
  Box,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";
import { tokens } from "../../theme";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useStateContext } from "../../context/Contex";
import useAxiousPrivate from "../../hooks/useAxiousPrivate";

const Adduser = ({ setAddeUsers }) => {
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
  const [role, SetRole] = useState("");
  const { setDialogMessage, setOPenDialog, setErrorIcon } = useStateContext();
  const [loading, setLoading] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const AxiousPrivate = useAxiousPrivate();
  const queryclient = useQueryClient();

  const mutation = useMutation(
    (newPost) => {
      console.log(newPost);
      return AxiousPrivate.post(`/auth/register`, newPost);
    },
    {
      onSuccess: (respond) => {
        setOPenDialog(true);
        setDialogMessage(respond.data.message);
        setLoading(false);
        queryclient.invalidateQueries("users");
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
        Boolean(PoliceStation),
        Boolean(role),
        Boolean(PhoneNumber),
        Boolean(rank),
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
        PoliceStation: PoliceStation,
        role: role,
        email: email,
        PhoneNumber: PhoneNumber,
        password: password,
        rank: rank,
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
              Add Users
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
                    id="outlined-basic3"
                    label="Enter Your Rank"
                    variant="outlined"
                    size="full"
                    required={true}
                    type="text"
                    onChange={(event) => setrank(event.target.value)}
                  />
                </FormControl>
                <FormControl sx={{ m: 1, width: "100%" }} variant="outlined">
                  <InputLabel id="demo-simple-select-label">Role</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={role}
                    label="Role"
                    onChange={(event) => SetRole(event.target.value)}
                  >
                    <MenuItem value="Employee">Employee</MenuItem>
                    <MenuItem value="Sub Admin">Sub Admin</MenuItem>
                    <MenuItem value="Administrator">Administrator</MenuItem>
                  </Select>
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
                <FormControl sx={{ m: 1, width: "100%" }} variant="outlined">
                  <TextField
                    id="outlined-basic5"
                    label="Enter Phone Number"
                    variant="outlined"
                    size="full"
                    type="text"
                    required={true}
                    onChange={(event) => setPhoneNumber(event.target.value)}
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
                  <span style={{ padding: "10px" }}>Add user</span>
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

export default Adduser;
