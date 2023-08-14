import { LoadingButton } from "@mui/lab";
import { Box, FormControl, TextField, Typography } from "@mui/material";
import { useTheme } from "@mui/system";
import React, { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { useAuthContext } from "../../context/AuthContex";
import { useStateContext } from "../../context/Contex";
import useAxiousPrivate from "../../hooks/useAxiousPrivate";
import { tokens } from "../../theme";

const EditProfile = ({ setEditProfile, data }) => {
  const theme = useTheme();
  const color = tokens(theme.palette.mode);

  // states
  const [firstName, setFirstName] = useState(data?.firstName);
  const [lastName, setLastName] = useState(data?.lastName);
  const [rank, setRank] = useState(data?.rank);
  const [PoliceStation, setPoliceStation] = useState(data?.PoliceStation);
  const [PhoneNumber, setPhoneNumber] = useState(data?.PhoneNumber);
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");

  //hooks
  const AxiousPrivate = useAxiousPrivate();
  const queryclient = useQueryClient();
  const { user } = useAuthContext();
  const { setDialogMessage, setOPenDialog } = useStateContext();

  const mutation = useMutation(
    (newPost) => {
      return AxiousPrivate.put(
        `/officers/officers/${user?.Officers?.id}`,
        newPost
      );
    },
    {
      onSuccess: (res) => {
        setLoading(false);
        setOPenDialog(true);
        setDialogMessage(res.data.message);
        queryclient.invalidateQueries("users");
        setEditProfile(false);
      },

      onError: (err) => {
        setOPenDialog(true);
        setDialogMessage(err.message);
        setLoading(false);
      },
    }
  );

  // functios
  const HandleFineSubmit = () => {
    setLoading(true);
    mutation.mutate({
      lastName: lastName,
      lastName: lastName,
      PoliceStation: PoliceStation,
      rank: rank,
      PhoneNumber: PhoneNumber,
      password: password,
    });
  };

  return (
    <Box
      sx={{
        position: "fixed",

        height: "auto",
        top: "30%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        margin: "auto",
        justifyItems: "center",

        borderRadius: 2,

        zIndex: 100,

        background:
          theme.palette.mode === "dark" ? color.primary[400] : "white",

        boxShadow:
          theme.palette.mode === "dark"
            ? color.primary[400]
            : " rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px",
        border: `1px solid 
       ${theme.palette.mode === "dark" ? color.greenAccent[400] : null}`,
      }}
    >
      <Box>
        {" "}
        <Box sx={{ p: 2 }}>
          {" "}
          <Typography sx={{ fontSize: 20, textAlign: "center" }}>
            Edit Profile
          </Typography>{" "}
          <FormControl sx={{ mt: 2, width: "100%" }} variant="outlined">
            <TextField
              id="outlined-basic"
              placeholder="Enter Your First Name"
              variant="outlined"
              size="full"
              type="text"
              onChange={(event) => setFirstName(event.target.value)}
              value={firstName}
            />
          </FormControl>
          <FormControl
            sx={{ mt: 2, width: "100%" }}
            variant="outlined"
            onChange={(event) => setLastName(event.target.value)}
          >
            <TextField
              id="outlined-basic"
              placeholder=" Enter your Last Name"
              variant="outlined"
              size="full"
              type="text"
              value={lastName}
            />
          </FormControl>
          <FormControl
            sx={{ mt: 2, width: "100%" }}
            variant="outlined"
            onChange={(event) => setPoliceStation(event.target.value)}
          >
            <TextField
              id="outlined-basic"
              placeholder=" Enter Your Police Station Name"
              variant="outlined"
              size="full"
              type="text"
              value={PoliceStation}
            />
          </FormControl>
          <FormControl
            sx={{ mt: 2, width: "100%" }}
            variant="outlined"
            onChange={(event) => setRank(event.target.value)}
          >
            <TextField
              id="outlined-basic"
              placeholder=" Enter Your Rank"
              variant="outlined"
              size="full"
              type="text"
              value={rank}
            />
          </FormControl>
          <FormControl
            sx={{ mt: 2, width: "100%" }}
            variant="outlined"
            onChange={(event) => setPhoneNumber(event.target.value)}
          >
            <TextField
              id="outlined-basic"
              placeholder=" Enter Your Phone Number"
              variant="outlined"
              size="full"
              type="number"
              value={PhoneNumber}
            />
          </FormControl>
          <FormControl
            sx={{ mt: 2, width: "100%" }}
            variant="outlined"
            onChange={(event) => setPassword(event.target.value)}
          >
            <TextField
              id="outlined-basic"
              placeholder="Update Password"
              variant="outlined"
              size="full"
              type="text"
              value={password}
            />
          </FormControl>
          <LoadingButton
            sx={{
              width: "100%",
              mt: 2,
              background:
                theme.palette.mode === "dark"
                  ? color.greenAccent[700]
                  : color.greenAccent[500],
              "&:hover": { background: color.greenAccent[500] },
            }}
            onClick={HandleFineSubmit}
            loading={loading}
            loadingPosition="end"
            variant="contained"
          >
            <span style={{ padding: "10px" }}>Update</span>
          </LoadingButton>
          <LoadingButton
            sx={{
              width: "100%",
              mt: 2,
              background:
                theme.palette.mode === "dark"
                  ? color.greenAccent[700]
                  : color.greenAccent[500],
              "&:hover": { background: color.greenAccent[500] },
            }}
            onClick={() => setEditProfile((previousestate) => !previousestate)}
            // loading={loading}
            loadingPosition="end"
            variant="contained"
          >
            <span style={{ padding: "10px" }}>Cancel</span>
          </LoadingButton>
        </Box>
      </Box>
    </Box>
  );
};

export default EditProfile;
